import { cookies } from 'next/headers'
import { getSupabaseServerClient } from './supabaseClient'

export interface MemberRow {
	id: string
	login_id: string
	user_jnum: string | null
	user_sex: string | null
	user_name: string | null
	cloth_size: string | null
	mbti_type_name: string | null
	user_uid: string
	created_at: string
	updated_at: string | null
	last_login_at: string | null
	is_admin: boolean
}

export const LOGIN_COOKIE_NAME = 'laffair_user_uid'

export interface CurrentUser {
	userUid: string
	loginId: string
	name: string | null
	isAdmin: boolean
}

export async function getCurrentMemberFromCookie(): Promise<MemberRow | null> {
	const cookieStore = await cookies()
	const userUid = cookieStore.get(LOGIN_COOKIE_NAME)?.value
	if (!userUid) {
		return null
	}

	const supabase = getSupabaseServerClient()
	const { data, error } = await supabase
		.from('members')
		.select('*')
		.eq('user_uid', userUid)
		.maybeSingle()

	if (error || !data) {
		return null
	}

	return data
}

export function mapMemberToCurrentUser(member: MemberRow): CurrentUser {
	return {
		userUid: member.user_uid,
		loginId: member.login_id,
		name: member.user_name,
		isAdmin: member.is_admin,
	}
}


