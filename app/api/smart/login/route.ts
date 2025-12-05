import { NextResponse } from 'next/server'
import { aesDecryptFromBase64, aesEncryptToBase64, formatTimestamp } from '@/lib/crypto/aes'
import crypto from 'crypto'

const LOGIN_ENDPOINT = 'http://tobe-smart2.iptime.org:9995/userExt/checkUserLoginOnlyMo.jspx'

interface LoginRequestBody {
	userid?: string
	password?: string
	app_install_uid?: string
	from?: string
	at?: string
	mUid?: string
	pUid?: string
	ver?: string
	timeStamp?: string
	// optional test overrides
	key?: string
	iv?: string
}

function tryDecryptVariant(params: {
	cipherB64: string
	algo: 'aes-128-cbc' | 'aes-128-ecb'
	key: Buffer
	iv?: Buffer
	autoPadding: boolean
	trimZero: boolean
}): { ok: boolean; text?: string; json?: unknown; error?: string } {
	try {
		const decipher = crypto.createDecipheriv(params.algo, params.key, params.iv)
		decipher.setAutoPadding(params.autoPadding)
		const out = Buffer.concat([
			decipher.update(Buffer.from(params.cipherB64, 'base64')),
			decipher.final(),
		])
		let buf = out
		if (params.trimZero) {
			let end = buf.length
			while (end > 0 && buf[end - 1] === 0) end--
			buf = buf.subarray(0, end)
		}
		const text = buf.toString('utf8')
		try {
			const json = JSON.parse(text)
			return { ok: true, text, json }
		} catch {
			return { ok: true, text }
		}
	} catch (e) {
		return { ok: false, error: e instanceof Error ? e.message : String(e) }
	}
}

export async function POST(request: Request) {
	try {
		const input: LoginRequestBody = await request.json().catch(() => ({}))

		// 현재 시간을 기준으로 timeStamp 생성
		const fixedTestTimestamp = formatTimestamp()

		const payload = {
			userid: input.userid ?? '',
			password: input.password ?? '',
			app_install_uid: input.app_install_uid ?? '',
			from: input.from ?? 'M',
			at: input.at ?? '',
			mUid: input.mUid ?? '',
			pUid: input.pUid ?? '',
			ver: input.ver ?? '0.0.1',
			// 요청 바디에 timeStamp가 없으면 고정 값 사용
			timeStamp: input.timeStamp ?? fixedTestTimestamp,
		}

		const plainJson = JSON.stringify(payload)
		const encryptedBase64 = aesEncryptToBase64(plainJson, { key: input.key, iv: input.iv })

		// 실제 외부 서버로 전송되는 요청 정보 (form 방식: data=<암호문>)
		const upstreamRequestFormBody = new URLSearchParams({ data: encryptedBase64 }).toString()

		const upstreamRes = await fetch(LOGIN_ENDPOINT, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: upstreamRequestFormBody,
		})

		const upstreamText = await upstreamRes.text()
		let upstreamJson: unknown = null
		try {
			upstreamJson = JSON.parse(upstreamText)
		} catch {
			// keep text only
		}

		let decryptedResponse: unknown = null
		let decryptError: string | null = null
		let cipherDebug:
			| {
					base64Length: number
					byteLength: number
					blockAligned: boolean
			  }
			| undefined
		let decryptVariants:
			| Array<{
					variant: string
					ok: boolean
					hasJson: boolean
					textPreview?: string
					error?: string
			  }>
			| undefined
		if (upstreamJson && typeof upstreamJson === 'object' && upstreamJson !== null && 'data' in upstreamJson) {
			const dataVal = (upstreamJson as Record<string, unknown>).data
			if (typeof dataVal === 'string') {
				try {
					const cipherBytes = Buffer.from(dataVal, 'base64')
					cipherDebug = {
						base64Length: dataVal.length,
						byteLength: cipherBytes.length,
						blockAligned: cipherBytes.length % 16 === 0,
					}

					const decryptedText = aesDecryptFromBase64(dataVal, { key: input.key, iv: input.iv })
					decryptedResponse = JSON.parse(decryptedText)
				} catch (e) {
					// return decrypted as text if not JSON
					try {
						const decryptedText = aesDecryptFromBase64(String(dataVal), { key: input.key, iv: input.iv })
						decryptedResponse = decryptedText
					} catch (e2) {
						// 패딩 미적용 시도 (일부 서버 구현이 NoPadding일 경우를 대비)
						const key = Buffer.from(input.key ?? (process.env.SMART_AES_KEY ?? '9335517002079237'), 'utf8')
						const ivFixed = Buffer.from(input.iv ?? (process.env.SMART_AES_IV ?? '9335517002079237'), 'utf8')
						const ivZero = Buffer.alloc(16, 0)

						const variants = [
							{ variant: 'cbc_fixed_iv_pkcs', algo: 'aes-128-cbc' as const, iv: ivFixed, autoPadding: true, trimZero: false },
							{ variant: 'cbc_zero_iv_pkcs', algo: 'aes-128-cbc' as const, iv: ivZero, autoPadding: true, trimZero: false },
							{ variant: 'ecb_pkcs', algo: 'aes-128-ecb' as const, iv: undefined, autoPadding: true, trimZero: false },
							{ variant: 'cbc_fixed_iv_nopad_trimzero', algo: 'aes-128-cbc' as const, iv: ivFixed, autoPadding: false, trimZero: true },
							{ variant: 'cbc_zero_iv_nopad_trimzero', algo: 'aes-128-cbc' as const, iv: ivZero, autoPadding: false, trimZero: true },
							{ variant: 'ecb_nopad_trimzero', algo: 'aes-128-ecb' as const, iv: undefined, autoPadding: false, trimZero: true },
						]

						const results = variants.map((v) => {
							const r = tryDecryptVariant({
								cipherB64: String(dataVal),
								algo: v.algo,
								key,
								iv: v.iv,
								autoPadding: v.autoPadding,
								trimZero: v.trimZero,
							})
							return {
								variant: v.variant,
								ok: r.ok,
								hasJson: !!r.json,
								textPreview: r.text ? r.text.slice(0, 200) : undefined,
								error: r.error,
								json: r.json,
							}
						})

						decryptVariants = results.map(({ variant, ok, hasJson, textPreview, error }) => ({
							variant,
							ok,
							hasJson,
							textPreview,
							error,
						}))

						const winner = results.find((r) => r.json)
						if (winner?.json) {
							decryptedResponse = winner.json
						} else {
							decryptError = e2 instanceof Error ? e2.message : String(e2)
							decryptedResponse = results[0]?.textPreview ?? null
						}
					}
				}
			}
		}

		return NextResponse.json(
			{
				requestPlain: payload,
				// 실제 AES 암호화에 사용된 평문 문자열 (UTF-8 기준)
				requestPlainString: plainJson,
				requestEncryptedBase64: encryptedBase64,
				// 외부 서버로 실제 전송된 전체 요청 정보 (form body 그대로 노출)
				upstreamRequest: {
					url: LOGIN_ENDPOINT,
					method: 'POST',
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded',
					},
					body: upstreamRequestFormBody,
				},
				upstream: {
					status: upstreamRes.status,
					ok: upstreamRes.ok,
					body: upstreamJson ?? upstreamText,
				},
				decryptedResponse,
				cipherDebug,
				algo: 'aes-128-cbc/pkcs5 (primary), fallback: no-padding trim-zero',
				keyInfo: {
					keyLen: 16,
					ivLen: 16,
				},
				decryptVariants,
				decryptError,
			},
			{ status: 200 },
		)
	} catch (error) {
		return NextResponse.json(
			{
				error: 'Login test proxy error',
				detail: error instanceof Error ? error.message : String(error),
			},
			{ status: 500 },
		)
	}
}


