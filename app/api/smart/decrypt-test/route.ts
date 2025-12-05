import { NextResponse } from 'next/server'
import { aesDecryptFromBase64 } from '@/lib/crypto/aes'

/**
 * 서버 응답 암호문을 여러 키/IV 조합으로 복호화 테스트
 */
export async function POST(request: Request) {
	try {
		const { ciphertext } = await request.json()
		
		if (!ciphertext || typeof ciphertext !== 'string') {
			return NextResponse.json({ error: 'ciphertext required' }, { status: 400 })
		}

		// 테스트할 키/IV 조합들
		const testCases = [
			{ name: '문서 예시 (9335517002079237)', key: '9335517002079237', iv: '9335517002079237' },
			{ name: 'Zero IV', key: '9335517002079237', iv: '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0' },
			{ name: 'Empty IV', key: '9335517002079237', iv: '' },
		]

		const results = testCases.map((testCase) => {
			try {
				const decrypted = aesDecryptFromBase64(ciphertext, {
					key: testCase.key,
					iv: testCase.iv,
				})
				
				// JSON 파싱 시도
				let parsed: unknown = null
				let isValidJson = false
				try {
					parsed = JSON.parse(decrypted)
					isValidJson = true
				} catch {
					// not JSON
				}

				return {
					name: testCase.name,
					key: testCase.key,
					iv: testCase.iv.replace(/\0/g, '\\0'),
					success: true,
					decrypted,
					isValidJson,
					parsed,
					preview: decrypted.substring(0, 100),
				}
			} catch (error) {
				return {
					name: testCase.name,
					key: testCase.key,
					iv: testCase.iv.replace(/\0/g, '\\0'),
					success: false,
					error: error instanceof Error ? error.message : String(error),
				}
			}
		})

		return NextResponse.json({ results })
	} catch (error) {
		return NextResponse.json(
			{
				error: 'Decrypt test error',
				detail: error instanceof Error ? error.message : String(error),
			},
			{ status: 500 },
		)
	}
}

