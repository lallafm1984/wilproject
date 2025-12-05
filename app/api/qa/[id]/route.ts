import { NextResponse } from 'next/server'
import { getSupabaseServerClient } from '@/lib/supabaseClient'
import { getCurrentMemberFromCookie } from '@/lib/auth'

interface QAPostRow {
	id: number
	title: string
	content: string
	author_name: string | null
	author_user_uid: string | null
	image_urls: string[] | null
	answer_content: string | null
	answer_author_uid: string | null
	answer_author_name: string | null
	answered_at: string | null
	created_at: string
	updated_at: string | null
	is_deleted: boolean | null
}

interface RouteParams {
	params: Promise<{
		id: string
	}>
}

export async function GET(_request: Request, context: RouteParams) {
	try {
		const supabase = getSupabaseServerClient()
		const member = await getCurrentMemberFromCookie()

		if (!member) {
			return NextResponse.json(
				{ message: '로그인 후에만 게시글을 조회할 수 있습니다.' },
				{ status: 401 },
			)
		}

		const id = Number((await context.params).id)

		if (!Number.isFinite(id) || id <= 0) {
			return NextResponse.json({ message: '유효하지 않은 게시글 ID 입니다.' }, { status: 400 })
		}

		const { data, error } = await supabase
			.from('qa_posts')
			.select('*')
			.eq('id', id)
			.eq('is_deleted', false)
			.single()

		if (error && error.code !== 'PGRST116') {
			console.error('Supabase GET /qa/:id error', error)
			return NextResponse.json(
				{ message: '게시글을 불러오는 중 오류가 발생했습니다.' },
				{ status: 500 },
			)
		}

		const row = data as QAPostRow | null

		if (!row) {
			return NextResponse.json({ message: '해당 게시글을 찾을 수 없습니다.' }, { status: 404 })
		}

		// 관리자가 아니면 본인 글만 조회 가능
		if (!member.is_admin && row.author_user_uid && row.author_user_uid !== member.user_uid) {
			return NextResponse.json(
				{ message: '본인이 작성한 게시글만 조회할 수 있습니다.' },
				{ status: 403 },
			)
		}

		return NextResponse.json({ item: row }, { status: 200 })
	} catch (error) {
		console.error('GET /api/qa/[id] unexpected error', error)
		return NextResponse.json(
			{
				message: '알 수 없는 오류가 발생했습니다.',
			},
			{ status: 500 },
		)
	}
}

export async function PATCH(request: Request, context: RouteParams) {
	try {
		const supabase = getSupabaseServerClient()

		const member = await getCurrentMemberFromCookie()
		if (!member) {
			return NextResponse.json(
				{ message: '로그인 후에만 글을 수정할 수 있습니다.' },
				{ status: 401 },
			)
		}
		const id = Number((await context.params).id)

		if (!Number.isFinite(id) || id <= 0) {
			return NextResponse.json({ message: '유효하지 않은 게시글 ID 입니다.' }, { status: 400 })
		}

		const body = await request.json().catch(() => null) as {
			title?: string
			content?: string
			authorName?: string
			answerContent?: string
			imageUrls?: string[]
		} | null

		if (!body) {
			return NextResponse.json({ message: '수정할 데이터가 없습니다.' }, { status: 400 })
		}

		const updatePayload: Partial<QAPostRow> = {}

		if (typeof body.title === 'string') {
			updatePayload.title = body.title
		}
		if (typeof body.content === 'string') {
			updatePayload.content = body.content
		}
		if (typeof body.authorName === 'string') {
			updatePayload.author_name = body.authorName
		}
		if (Array.isArray(body.imageUrls)) {
			updatePayload.image_urls = body.imageUrls
		}
		if (typeof body.answerContent === 'string' && member.is_admin) {
			updatePayload.answer_content = body.answerContent
			updatePayload.answer_author_uid = member.user_uid
			updatePayload.answer_author_name = member.user_name ?? '관리자'
			updatePayload.answered_at = new Date().toISOString()
		}

		if (Object.keys(updatePayload).length === 0) {
			return NextResponse.json(
				{ message: '수정할 필드가 없습니다.' },
				{ status: 400 },
			)
		}

		// updated_at 은 DB trigger 로 관리하거나 여기서 now() 로 직접 넣어도 됩니다.
		let query = supabase
			.from('qa_posts')
			.update(updatePayload)
			.eq('id', id)
			.eq('is_deleted', false)

		// 관리자는 모든 글 수정 가능, 일반 회원은 자신의 글만 수정
		if (!member.is_admin) {
			query = query.eq('author_user_uid', member.user_uid)
		}

		const { data, error } = await query.select().single()

		if (error && error.code !== 'PGRST116') {
			console.error('Supabase PATCH /qa/:id error', error)
			return NextResponse.json(
				{ message: '게시글을 수정하는 중 오류가 발생했습니다.' },
				{ status: 500 },
			)
		}

		if (!data) {
			return NextResponse.json({ message: '해당 게시글을 찾을 수 없습니다.' }, { status: 404 })
		}

		return NextResponse.json({ item: data }, { status: 200 })
	} catch (error) {
		console.error('PATCH /api/qa/[id] unexpected error', error)
		return NextResponse.json(
			{
				message: '알 수 없는 오류가 발생했습니다.',
			},
			{ status: 500 },
		)
	}
}

export async function DELETE(_request: Request, context: RouteParams) {
	try {
		const supabase = getSupabaseServerClient()

		const member = await getCurrentMemberFromCookie()
		if (!member) {
			return NextResponse.json(
				{ message: '로그인 후에만 글을 삭제할 수 있습니다.' },
				{ status: 401 },
			)
		}
		const id = Number((await context.params).id)

		if (!Number.isFinite(id) || id <= 0) {
			return NextResponse.json({ message: '유효하지 않은 게시글 ID 입니다.' }, { status: 400 })
		}

		// 실제 삭제 대신 is_deleted=true 로 soft delete
		let query = supabase
			.from('qa_posts')
			.update({ is_deleted: true })
			.eq('id', id)
			.eq('is_deleted', false)

		// 관리자는 모든 글 삭제 가능, 일반 회원은 자신의 글만 삭제
		if (!member.is_admin) {
			query = query.eq('author_user_uid', member.user_uid)
		}

		const { error } = await query

		if (error) {
			console.error('Supabase DELETE /qa/:id error', error)
			return NextResponse.json(
				{ message: '게시글을 삭제하는 중 오류가 발생했습니다.' },
				{ status: 500 },
			)
		}

		return NextResponse.json(
			{ success: true },
			{ status: 200 },
		)
	} catch (error) {
		console.error('DELETE /api/qa/[id] unexpected error', error)
		return NextResponse.json(
			{
				message: '알 수 없는 오류가 발생했습니다.',
			},
			{ status: 500 },
		)
	}
}



