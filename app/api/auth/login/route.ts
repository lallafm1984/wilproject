import { NextResponse } from 'next/server'
import { aesDecryptFromBase64, aesEncryptToBase64, formatTimestamp } from '@/lib/crypto/aes'
import { getSupabaseServerClient } from '@/lib/supabaseClient'
import {
	LOGIN_COOKIE_NAME,
	type MemberRow,
	mapMemberToCurrentUser,
} from '@/lib/auth'

// 실서버/테스트 서버 URL은 환경변수 SMART_LOGIN_ENDPOINT 로만 제어합니다.
// 예) SMART_LOGIN_ENDPOINT="https://example.com/userExt/checkUserLoginOnlyMo.jspx"
const LOGIN_ENDPOINT = process.env.SMART_LOGIN_ENDPOINT
const LOGIN_FAILURE_MESSAGE = '로그인 실패: 아이디 또는 비밀번호를 확인해주세요.'

interface LoginRequestBody {
	userid?: string
	password?: string
}

interface ExternalLoginResponse {
	user_jnum?: string
	user_sex?: string
	userName?: string
	cloth_size?: string
	mbti_type_name?: string
	userUid?: string
	at_fix?: string
	at_mod?: string
	timeStamp?: string
	at?: string
	result_yne?: string
	result_msg?: string
	[key: string]: unknown
}

export async function POST(request: Request) {
	try {
		const input: LoginRequestBody = await request.json().catch(() => ({}))

		const userid = input.userid?.trim()
		const password = input.password?.trim()

		if (!userid || !password) {
			// 프론트에서 모든 로그인 실패 시 동일한 문구를 보여줄 수 있도록 통일
			return NextResponse.json({ message: LOGIN_FAILURE_MESSAGE }, { status: 400 })
		}

		// 관리자는 외부 서버를 거치지 않고, 내부 설정된 아이디/비밀번호로만 인증합니다.
		const adminLoginId = process.env.ADMIN_LOGIN_ID
		const adminPassword = process.env.ADMIN_LOGIN_PASSWORD

		if (adminLoginId && adminPassword && userid === adminLoginId && password === adminPassword) {
			const supabase = getSupabaseServerClient()

			const upsertPayload: Partial<MemberRow> = {
				login_id: userid,
				user_uid: `ADMIN_${userid}`,
				user_name: '관리자',
				is_admin: true,
				last_login_at: new Date().toISOString(),
			}

			const { data: member, error } = await supabase
				.from('members')
				.upsert(upsertPayload, { onConflict: 'user_uid' })
				.select()
				.single()

			if (error || !member) {
				console.error('Supabase upsert admin member error', error)
				return NextResponse.json(
					{ message: '관리자 정보를 저장하는 중 오류가 발생했습니다.' },
					{ status: 500 },
				)
			}

			const user = mapMemberToCurrentUser(member)

			const response = NextResponse.json(
				{
					user,
				},
				{ status: 200 },
			)

			response.cookies.set(LOGIN_COOKIE_NAME, member.user_uid, {
				httpOnly: true,
				secure: process.env.NODE_ENV === 'production',
				sameSite: 'lax',
				path: '/',
				maxAge: 60 * 60 * 24 * 30,
			})

			return response
		}

		// 외부 로그인 서버 URL 이 설정되어 있지 않으면 에러를 반환합니다.
		if (!LOGIN_ENDPOINT) {
			console.error('SMART_LOGIN_ENDPOINT 환경변수가 설정되어 있지 않습니다.')
			return NextResponse.json(
				{ message: '로그인 서버 설정이 올바르지 않습니다. 관리자에게 문의해주세요.' },
				{ status: 500 },
			)
		}

		const payload = {
			userid,
			password,
			app_install_uid: '',
			from: 'M',
			at: '',
			mUid: '',
			pUid: '',
			ver: '0.0.1',
			timeStamp: formatTimestamp(),
		}

		const plainJson = JSON.stringify(payload)
		const encryptedBase64 = aesEncryptToBase64(plainJson)

		const upstreamRequestBody = new URLSearchParams({ data: encryptedBase64 }).toString()

		const upstreamRes = await fetch(LOGIN_ENDPOINT, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: upstreamRequestBody,
		})

		const upstreamText = await upstreamRes.text()

		// 외부 로그인 서버 디버깅용 로그 (Vercel Logs 에서 확인 가능)
		console.log('SMART LOGIN upstream response', {
			status: upstreamRes.status,
			ok: upstreamRes.ok,
			bodyPreview: upstreamText.slice(0, 300),
		})

		let upstreamJson: unknown = null
		try {
			upstreamJson = JSON.parse(upstreamText)
		} catch {
			// JSON 이 아닐 수도 있으므로 무시
		}

		if (!upstreamRes.ok || !upstreamJson || typeof upstreamJson !== 'object') {
			return NextResponse.json(
				{ message: '외부 로그인 서버 통신 중 오류가 발생했습니다.' },
				{ status: 502 },
			)
		}

		const dataField = (upstreamJson as { data?: string }).data
		if (typeof dataField !== 'string') {
			return NextResponse.json(
				{ message: '외부 로그인 응답 형식이 올바르지 않습니다.' },
				{ status: 502 },
			)
		}

		let decrypted: ExternalLoginResponse
		try {
			const decryptedText = aesDecryptFromBase64(dataField)
			decrypted = JSON.parse(decryptedText) as ExternalLoginResponse
		} catch (error) {
			console.error('Failed to decrypt or parse external login response', error)
			return NextResponse.json(
				{ message: '외부 로그인 응답을 해석하는 중 오류가 발생했습니다.' },
				{ status: 502 },
			)
		}

		if (decrypted.result_yne !== 'Y') {
			// 디버깅을 위해 외부 로그인 서버에서 내려준 메시지도 로그로 남깁니다.
			console.warn('SMART LOGIN failed', {
				result_yne: decrypted.result_yne,
				result_msg: decrypted.result_msg,
			})

			// 외부 서버에서 실패 사유를 내려주더라도 사용자에게는 통일된 실패 문구를 보여줍니다.
			return NextResponse.json({ message: LOGIN_FAILURE_MESSAGE }, { status: 401 })
		}

		if (!decrypted.userUid) {
			return NextResponse.json(
				{ message: '외부 로그인 응답에 사용자 정보가 없습니다.' },
				{ status: 502 },
			)
		}

		const supabase = getSupabaseServerClient()

		const upsertPayload = {
			login_id: userid,
			user_jnum: decrypted.user_jnum ?? null,
			user_sex: decrypted.user_sex ?? null,
			user_name: decrypted.userName ?? null,
			cloth_size: decrypted.cloth_size ?? null,
			mbti_type_name: decrypted.mbti_type_name ?? null,
			user_uid: decrypted.userUid,
			last_login_at: new Date().toISOString(),
		}

		const { data: member, error: upsertError } = await supabase
			.from('members')
			.upsert(upsertPayload, {
				onConflict: 'user_uid',
			})
			.select()
			.single()

		if (upsertError || !member) {
			console.error('Supabase upsert member error', upsertError)
			return NextResponse.json(
				{ message: '회원 정보를 저장하는 중 오류가 발생했습니다.' },
				{ status: 500 },
			)
		}

		const user = mapMemberToCurrentUser(member)

		const response = NextResponse.json(
			{
				user,
			},
			{ status: 200 },
		)

		response.cookies.set(LOGIN_COOKIE_NAME, member.user_uid, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'lax',
			path: '/',
			// 30일 유지
			maxAge: 60 * 60 * 24 * 30,
		})

		return response
	} catch (error) {
		console.error('POST /api/auth/login unexpected error', error)
		return NextResponse.json(
			{
				message: '로그인 처리 중 알 수 없는 오류가 발생했습니다.',
			},
			{ status: 500 },
		)
	}
}


