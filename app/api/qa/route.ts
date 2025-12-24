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
	is_notice: boolean | null
}

function getMaskedLoginId(loginId: string | null | undefined): string | null {
	if (!loginId) return null
	const id = String(loginId)
	if (id.length === 0) return null
	return id.slice(-4)
}

// Supabase 에서는 아래와 같은 테이블을 생성해 두어야 합니다.
// 테이블명: qa_posts
// 컬럼 예시:
// - id: bigint, primary key, identity
// - title: text, not null
// - content: text, not null
// - author_name: text, null 가능
// - is_deleted: boolean, not null, default false
// - is_notice: boolean, not null, default false  (공지 고정용)
// - created_at: timestamptz, not null, default now()
// - updated_at: timestamptz, null (trigger 로 관리하거나 애플리케이션에서 업데이트)

export async function GET(request: Request) {
	try {
		const supabase = getSupabaseServerClient()
		const { searchParams } = new URL(request.url)

		const pageParam = searchParams.get('page')
		const pageSizeParam = searchParams.get('pageSize')

		const page = Math.max(Number(pageParam) || 1, 1)
		const pageSize = Math.min(Math.max(Number(pageSizeParam) || 10, 1), 50) // 최대 50개까지

		const from = (page - 1) * pageSize
		const to = from + pageSize - 1

		const { data, error, count } = await supabase
			.from('qa_posts')
			.select('*', { count: 'exact' })
			.eq('is_deleted', false)
			.order('is_notice', { ascending: false })
			.order('created_at', { ascending: false })
			.range(from, to)

		if (error) {
			console.error('Supabase GET /qa error', error)
			return NextResponse.json(
				{ message: '게시글 목록을 불러오는 중 오류가 발생했습니다.' },
				{ status: 500 },
			)
		}

		const totalCount = count ?? 0
		const totalPages = totalCount === 0 ? 1 : Math.ceil(totalCount / pageSize)

		return NextResponse.json(
			{
				items: data ?? [],
				page,
				pageSize,
				totalCount,
				totalPages,
			},
			{ status: 200 },
		)
	} catch (error) {
		console.error('GET /api/qa unexpected error', error)
		return NextResponse.json(
			{
				message: '알 수 없는 오류가 발생했습니다.',
			},
			{ status: 500 },
		)
	}
}

export async function POST(request: Request) {
	try {
		const supabase = getSupabaseServerClient()

		const member = await getCurrentMemberFromCookie()
		if (!member) {
			return NextResponse.json(
				{ message: '로그인 후에만 글을 작성할 수 있습니다.' },
				{ status: 401 },
			)
		}

		const body = (await request.json().catch(() => null)) as {
			title?: string
			content?: string
			authorName?: string
			imageUrls?: string[]
			isNotice?: boolean
		} | null

		if (!body || !body.title || !body.content) {
			return NextResponse.json(
				{ message: '제목과 내용을 모두 입력해주세요.' },
				{ status: 400 },
			)
		}

		const { title, content, authorName, imageUrls, isNotice } = body

		// 작성자 표시 이름: 1) 요청에서 명시된 authorName, 2) 회원 닉네임(user_name),
		// 3) 닉네임이 없으면 로그인 아이디 뒤 4자리만 사용
		const fallbackAuthorName =
			authorName?.trim() ||
			member.user_name?.trim() ||
			getMaskedLoginId(member.login_id) ||
			null

		const { data, error } = await supabase
			.from('qa_posts')
			.insert({
				title,
				content,
				author_name: fallbackAuthorName,
				author_user_uid: member.user_uid,
				image_urls: Array.isArray(imageUrls) && imageUrls.length > 0 ? imageUrls : null,
				// 공지는 관리자만 설정 가능
				is_notice: member.is_admin ? Boolean(isNotice) : false,
			})
			.select()
			.single()

		if (error || !data) {
			console.error('Supabase POST /qa error', error)
			return NextResponse.json(
				{ message: '게시글을 저장하는 중 오류가 발생했습니다.' },
				{ status: 500 },
			)
		}

		return NextResponse.json(
			{ item: data },
			{ status: 201 },
		)
	} catch (error) {
		console.error('POST /api/qa unexpected error', error)
		return NextResponse.json(
			{
				message: '알 수 없는 오류가 발생했습니다.',
			},
			{ status: 500 },
		)
	}
}



