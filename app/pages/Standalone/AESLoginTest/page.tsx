'use client'

import { useState } from 'react'

type ProxyResult = {
	requestPlain: Record<string, unknown>
	requestEncryptedBase64: string
	// 서버에서 실제 AES에 사용한 평문 문자열 (UTF-8 기준)
	requestPlainString?: string
	// 외부 서버로 실제 전송한 요청 전체 정보
	upstreamRequest?: {
		url: string
		method: string
		headers: Record<string, string>
		body: unknown
	}
	upstream: {
		status: number
		ok: boolean
		body: unknown
	}
	decryptedResponse: unknown
	decryptError?: string | null
	cipherDebug?: {
		base64Length: number
		byteLength: number
		blockAligned: boolean
	}
	algo?: string
	keyInfo?: {
		keyLen: number
		ivLen: number
	}
	decryptVariants?: Array<{
		variant: string
		ok: boolean
		hasJson: boolean
		textPreview?: string
		error?: string
	}>
	error?: string
	detail?: string
}

type DecryptTestResult = {
	results: Array<{
		name: string
		key: string
		iv: string
		success: boolean
		decrypted?: string
		isValidJson?: boolean
		parsed?: unknown
		preview?: string
		error?: string
	}>
}

export default function AESLoginTestPage() {
	const [userid, setUserid] = useState('')
	const [password, setPassword] = useState('')
	const [key, setKey] = useState('9335517002079237')
	const [iv, setIv] = useState('9335517002079237')
	const [loading, setLoading] = useState(false)
	const [result, setResult] = useState<ProxyResult | null>(null)
	const [error, setError] = useState<string | null>(null)
	const [testCiphertext, setTestCiphertext] = useState('')
	const [decryptTestResult, setDecryptTestResult] = useState<DecryptTestResult | null>(null)

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault()
		setLoading(true)
		setError(null)
		setResult(null)
		try {
			const formBody = new URLSearchParams({
				userid,
				password,
				key,
				iv,
			}).toString()

			const res = await fetch('/api/smart/login', {
				method: 'POST',
				headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
				body: formBody,
			})
			const data: ProxyResult = await res.json()
			if (!res.ok) {
				setError(data?.detail || '요청 중 오류가 발생했습니다.')
			}
			setResult(data)
		} catch (err) {
			setError(err instanceof Error ? err.message : String(err))
		} finally {
			setLoading(false)
		}
	}

	async function handleDecryptTest(e: React.FormEvent) {
		e.preventDefault()
		setDecryptTestResult(null)
		try {
			const res = await fetch('/api/smart/decrypt-test', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ ciphertext: testCiphertext }),
			})
			const data: DecryptTestResult = await res.json()
			setDecryptTestResult(data)
		} catch (err) {
			setError(err instanceof Error ? err.message : String(err))
		}
	}

	return (
		<div className="mx-auto max-w-3xl px-4 py-10">
			<h1 className="mb-6 text-2xl font-semibold">회원 로그인 API 테스트</h1>

			<form onSubmit={handleSubmit} className="rounded-lg border border-neutral-light p-4 shadow-sm">
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
					<div className="flex flex-col">
						<label className="mb-1 text-sm text-neutral-dark">휴대폰번호 (userid)</label>
						<input
							type="text"
							value={userid}
							onChange={(e) => setUserid(e.target.value)}
							placeholder="01012345678"
							className="rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-primary"
							required
						/>
					</div>
					<div className="flex flex-col">
						<label className="mb-1 text-sm text-neutral-dark">비밀번호 (password)</label>
						<input
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							placeholder="******"
							className="rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-primary"
							required
						/>
					</div>
					<div className="flex flex-col">
						<label className="mb-1 text-sm text-neutral-dark">AES Key (16바이트)</label>
						<input
							type="text"
							value={key}
							onChange={(e) => setKey(e.target.value)}
							className="rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-primary"
						/>
					</div>
					<div className="flex flex-col">
						<label className="mb-1 text-sm text-neutral-dark">IV (16바이트)</label>
						<input
							type="text"
							value={iv}
							onChange={(e) => setIv(e.target.value)}
							className="rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-primary"
						/>
					</div>
				</div>

				<div className="mt-4 flex items-center gap-3">
					<button
						type="submit"
						disabled={loading}
						className="rounded-md bg-primary px-4 py-2 text-white hover:bg-primary-light disabled:opacity-60"
					>
						{loading ? '요청 중...' : '테스트 요청 보내기'}
					</button>
					<span className="text-sm text-gray-500">외부 서버에 실제로 요청합니다.</span>
				</div>
			</form>

			{error && (
				<div className="mt-6 rounded-md border border-red-200 bg-red-50 p-4 text-red-700">
					<strong>오류:</strong> {error}
				</div>
			)}

			{result && (
				<div className="mt-8 space-y-6">
					{result.upstreamRequest && (
						<section className="rounded-lg border p-4">
							<h2 className="mb-2 font-medium">외부 서버로 전송한 요청 전체</h2>
							<pre className="max-h-80 overflow-auto rounded bg-neutral-light p-3 text-sm">
								{JSON.stringify(result.upstreamRequest, null, 2)}
							</pre>
						</section>
					)}

					<section className="rounded-lg border p-4">
						<h2 className="mb-2 font-medium">요청 원문 (암호화 전, 보기 좋게 포맷된 JSON)</h2>
						<pre className="max-h-80 overflow-auto rounded bg-neutral-light p-3 text-sm">
							{JSON.stringify(result.requestPlain, null, 2)}
						</pre>
					</section>

					<section className="rounded-lg border p-4">
						<h2 className="mb-2 font-medium">요청 평문 문자열 (UTF-8 / AES 입력값 그대로)</h2>
						<pre className="max-h-80 overflow-auto rounded bg-neutral-light p-3 text-sm">
							{result.requestPlainString ?? JSON.stringify(result.requestPlain)}
						</pre>
					</section>

					<section className="rounded-lg border p-4">
						<h2 className="mb-2 font-medium">요청 암호문 (Base64)</h2>
						<pre className="max-h-80 overflow-auto rounded bg-neutral-light p-3 text-sm">
							{result.requestEncryptedBase64}
						</pre>
					</section>

					<section className="rounded-lg border p-4">
						<h2 className="mb-2 font-medium">외부 서버 응답 원문</h2>
						<pre className="max-h-80 overflow-auto rounded bg-neutral-light p-3 text-sm">
							{JSON.stringify(result.upstream, null, 2)}
						</pre>
					</section>

					<section className="rounded-lg border p-4">
						<h2 className="mb-2 font-medium">응답 복호화 (data 복호화 결과)</h2>
						<pre className="max-h-80 overflow-auto rounded bg-neutral-light p-3 text-sm">
							{typeof result.decryptedResponse === 'string'
								? result.decryptedResponse
								: JSON.stringify(result.decryptedResponse, null, 2)}
						</pre>
					</section>

					{result.decryptError && (
						<section className="rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-yellow-800">
							<h2 className="mb-2 font-medium">복호화 에러</h2>
							<pre className="overflow-auto text-sm">{result.decryptError}</pre>
						</section>
					)}

					{result.cipherDebug && (
						<section className="rounded-lg border p-4">
							<h2 className="mb-2 font-medium">디버그 정보</h2>
							<pre className="max-h-80 overflow-auto rounded bg-neutral-light p-3 text-sm">
								{JSON.stringify(
									{
										algo: result.algo,
										keyInfo: result.keyInfo,
										cipherDebug: result.cipherDebug,
									},
									null,
									2,
								)}
							</pre>
						</section>
					)}

					{result.decryptVariants && (
						<section className="rounded-lg border p-4">
							<h2 className="mb-2 font-medium">대체 복호화 시도 결과</h2>
							<pre className="max-h-80 overflow-auto rounded bg-neutral-light p-3 text-sm">
								{JSON.stringify(result.decryptVariants, null, 2)}
							</pre>
						</section>
					)}
				</div>
			)}

			<div className="mt-12 border-t pt-8">
				<h2 className="mb-4 text-xl font-semibold">암호문 직접 복호화 테스트</h2>
				<p className="mb-4 text-sm text-gray-600">
					서버 응답의 암호문(data 필드)을 여러 키/IV 조합으로 테스트합니다.
				</p>

				<form onSubmit={handleDecryptTest} className="rounded-lg border border-neutral-light p-4 shadow-sm">
					<div className="flex flex-col">
						<label className="mb-1 text-sm text-neutral-dark">암호문 (Base64)</label>
						<textarea
							value={testCiphertext}
							onChange={(e) => setTestCiphertext(e.target.value)}
							placeholder="Z3/qwYAHggWgMBdF1Fh9tL+2q2hVITU0p5tfy2hbpvM..."
							className="rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-primary"
							rows={4}
							required
						/>
					</div>

					<div className="mt-4">
						<button
							type="submit"
							className="rounded-md bg-primary px-4 py-2 text-white hover:bg-primary-light"
						>
							복호화 테스트 실행
						</button>
					</div>
				</form>

				{decryptTestResult && (
					<div className="mt-6 space-y-4">
						{decryptTestResult.results.map((item, idx) => (
							<section
								key={idx}
								className={`rounded-lg border p-4 ${item.success && item.isValidJson ? 'border-green-500 bg-green-50' : ''}`}
							>
								<h3 className="mb-2 font-medium">
									{item.name} {item.success && item.isValidJson && '✅ JSON 성공'}
								</h3>
								<div className="mb-2 text-xs text-gray-500">
									Key: {item.key} / IV: {item.iv}
								</div>
								{item.success ? (
									<>
										<div className="mb-2 text-sm">
											<strong>복호화 결과:</strong>
										</div>
										<pre className="max-h-60 overflow-auto rounded bg-neutral-light p-3 text-sm">
											{item.isValidJson ? JSON.stringify(item.parsed, null, 2) : item.preview}
										</pre>
									</>
								) : (
									<div className="text-sm text-red-600">
										<strong>에러:</strong> {item.error}
									</div>
								)}
							</section>
						))}
					</div>
				)}
			</div>
		</div>
	)
}


