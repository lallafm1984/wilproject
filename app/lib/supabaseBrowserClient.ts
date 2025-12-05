import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
	throw new Error(
		'Supabase 브라우저 클라이언트를 초기화할 수 없습니다. NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY 환경 변수를 확인하세요.',
	)
}

export const supabaseBrowserClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)


