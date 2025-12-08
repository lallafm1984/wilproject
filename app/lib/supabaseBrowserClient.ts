const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
	throw new Error(
		'Supabase 브라우저 클라이언트를 초기화할 수 없습니다. NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY 환경 변수를 확인하세요.',
	)
}

const QA_BUCKET = 'qa-attachments'

function buildPublicUrl(path: string): string {
	// Supabase 공개 버킷의 공개 URL 규칙
	return `${SUPABASE_URL}/storage/v1/object/public/${QA_BUCKET}/${encodeURIComponent(path)}`
}

export async function uploadQaAttachment(path: string, file: File): Promise<string> {
	const endpoint = `${SUPABASE_URL}/storage/v1/object/${QA_BUCKET}/${encodeURIComponent(path)}`

	const res = await fetch(endpoint, {
		method: 'POST',
		headers: {
			apikey: SUPABASE_ANON_KEY,
			Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
			'Content-Type': file.type || 'application/octet-stream',
		},
		body: file,
	})

	if (!res.ok) {
		throw new Error('이미지 업로드 중 오류가 발생했습니다.')
	}

	// 업로드 성공 시 공개 URL 반환
	return buildPublicUrl(path)
}

