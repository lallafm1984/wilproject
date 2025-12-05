import { createClient, type SupabaseClient } from '@supabase/supabase-js'

// Q/A 게시판 등 서버 사이드에서 사용할 Supabase 클라이언트
// env.local 에 아래 값이 설정되어 있어야 합니다.
// NEXT_PUBLIC_SUPABASE_URL=...
// NEXT_PUBLIC_SUPABASE_ANON_KEY=...
// SUPABASE_SERVICE_ROLE_KEY=... (선택, 있으면 서버에서 우선 사용)

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

// 서버에서는 가능하면 Service Role Key 를 사용하고,
// 없으면 익명 키(anon key)를 사용합니다.
const SUPABASE_SERVER_KEY = SUPABASE_SERVICE_ROLE_KEY ?? SUPABASE_ANON_KEY

if (!SUPABASE_URL || !SUPABASE_SERVER_KEY) {
	// 빌드/런타임 시 환경 변수 누락을 바로 알 수 있도록 에러를 던집니다.
	throw new Error(
		'Supabase 환경 변수(NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY 또는 SUPABASE_SERVICE_ROLE_KEY)가 설정되지 않았습니다.',
	)
}

let supabaseServerClient: SupabaseClient | null = null

export function getSupabaseServerClient(): SupabaseClient {
	if (!supabaseServerClient) {
		supabaseServerClient = createClient(SUPABASE_URL, SUPABASE_SERVER_KEY, {
			auth: {
				persistSession: false,
			},
		})
	}
	return supabaseServerClient
}



