import crypto from 'crypto'

const DEFAULT_SECRET_KEY = process.env.SMART_AES_KEY ?? '9335517002079237'
const DEFAULT_IV = process.env.SMART_AES_IV ?? '9335517002079237'

/**
 * AES-128-CBC 암호화 (Java AgentAESCipher.AES_Encode와 동일)
 * - 알고리즘: AES/CBC/PKCS5Padding
 * - 키/IV: UTF-8 바이트로 변환 (16바이트)
 * - 입력: UTF-8 문자열
 * - 출력: Base64 문자열
 */
export function aesEncryptToBase64(plainText: string, opts?: { key?: string; iv?: string }): string {
	const secretKey = opts?.key ?? DEFAULT_SECRET_KEY
	const ivStr = opts?.iv ?? DEFAULT_IV
	
	// Java: byte[] keyData = secretKey.getBytes()
	const keyData = Buffer.from(secretKey, 'utf8')
	// Java: new IvParameterSpec(IV.getBytes("UTF-8"))
	const ivData = Buffer.from(ivStr, 'utf8')
	
	// Java: Cipher.getInstance("AES/CBC/PKCS5Padding")
	const cipher = crypto.createCipheriv('aes-128-cbc', keyData, ivData)
	
	// Java: c.doFinal(str.getBytes("UTF-8"))
	const encrypted = Buffer.concat([
		cipher.update(Buffer.from(plainText, 'utf8')),
		cipher.final(),
	])
	
	// Java: Base64.encodeBase64(encrypted)
	return encrypted.toString('base64')
}

/**
 * AES-128-CBC 복호화 (Java AgentAESCipher.AES_Decode와 동일)
 * - 알고리즘: AES/CBC/PKCS5Padding
 * - 키/IV: UTF-8 바이트로 변환 (16바이트)
 * - 입력: Base64 문자열
 * - 출력: UTF-8 문자열
 */
export function aesDecryptFromBase64(base64CipherText: string, opts?: { key?: string; iv?: string }): string {
	const secretKey = opts?.key ?? DEFAULT_SECRET_KEY
	const ivStr = opts?.iv ?? DEFAULT_IV
	
	// Java: byte[] keyData = secretKey.getBytes()
	const keyData = Buffer.from(secretKey, 'utf8')
	// Java: new IvParameterSpec(IV.getBytes("UTF-8"))
	const ivData = Buffer.from(ivStr, 'utf8')
	
	// Java: Base64.decodeBase64(str.getBytes())
	const encryptedBytes = Buffer.from(base64CipherText, 'base64')
	
	// Java: Cipher.getInstance("AES/CBC/PKCS5Padding")
	const decipher = crypto.createDecipheriv('aes-128-cbc', keyData, ivData)
	
	// Java: c.doFinal(byteStr)
	const decrypted = Buffer.concat([
		decipher.update(encryptedBytes),
		decipher.final(),
	])
	
	// Java: new String(c.doFinal(byteStr), "UTF-8")
	return decrypted.toString('utf8')
}

export function formatTimestamp(date: Date = new Date()): string {
	// 서버 런타임의 로컬 타임존(예: Vercel = UTC)에 영향을 받지 않고
	// 항상 한국 시간(Asia/Seoul, UTC+9)을 기준으로 타임스탬프를 생성한다.
	const pad = (n: number) => n.toString().padStart(2, '0')

	const formatter = new Intl.DateTimeFormat('ko-KR', {
		timeZone: 'Asia/Seoul',
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit',
		hour12: false,
	})

	const parts = formatter.formatToParts(date)
	const get = (type: string) => parts.find((p) => p.type === type)?.value ?? '00'

	const yyyy = get('year')
	const MM = get('month')
	const dd = get('day')
	const HH = get('hour')
	const mm = get('minute')
	const ss = get('second')

	return `${yyyy}${MM}${dd}${HH}${mm}${ss}`
}


