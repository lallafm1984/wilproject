'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Footer from '../../components/Footer'
import { uploadQaAttachment } from '../../lib/supabaseBrowserClient'

interface QAPost {
	id: number
	title: string
	content: string
	author_name: string | null
	image_urls: string[] | null
	answer_content: string | null
	answered_at: string | null
	created_at: string
	updated_at: string | null
}

interface QAPaginatedResponse {
	items: QAPost[]
	page: number
	pageSize: number
	totalCount: number
	totalPages: number
}

const PAGE_SIZE = 10

export default function QnAPageClient() {
	const router = useRouter()
	const [posts, setPosts] = useState<QAPost[]>([])
	const [page, setPage] = useState(1)
	const [totalPages, setTotalPages] = useState(1)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	const [currentUser, setCurrentUser] = useState<{
		userUid: string
		loginId: string
		name: string | null
	} | null>(null)

	const [isFormOpen, setIsFormOpen] = useState(false)
	const [editingPost, setEditingPost] = useState<QAPost | null>(null)
	const [formTitle, setFormTitle] = useState('')
	const [formContent, setFormContent] = useState('')
	const [formSubmitting, setFormSubmitting] = useState(false)

	const [imageUrls, setImageUrls] = useState<string[]>([]) // 서버에 저장된 이미지 URL (수정 시 유지용)
	const [previewUrls, setPreviewUrls] = useState<string[]>([]) // 새로 선택한 이미지 미리보기용
	const [pendingFiles, setPendingFiles] = useState<File[]>([]) // 등록 시 업로드할 파일들
	const [uploadingImages, setUploadingImages] = useState(false)
	const [uploadError, setUploadError] = useState<string | null>(null)

	const [isLoginOpen, setIsLoginOpen] = useState(false)
	const [loginUserid, setLoginUserid] = useState('')
	const [loginPassword, setLoginPassword] = useState('')
	const [loginLoading, setLoginLoading] = useState(false)
	const [loginError, setLoginError] = useState<string | null>(null)
	const [openWriteAfterLogin, setOpenWriteAfterLogin] = useState(false)

	async function loadPosts(targetPage: number) {
		try {
			setLoading(true)
			setError(null)
			const res = await fetch(`/api/qa?page=${targetPage}&pageSize=${PAGE_SIZE}`, {
				method: 'GET',
			})

			if (!res.ok) {
				const data = await res.json().catch(() => null)
				throw new Error(data?.message ?? '게시글 목록을 불러오는 중 오류가 발생했습니다.')
			}

			const data = (await res.json()) as QAPaginatedResponse
			setPosts(data.items)
			setPage(data.page)
			setTotalPages(data.totalPages)
		} catch (err) {
			setError(err instanceof Error ? err.message : String(err))
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		void (async () => {
			await loadPosts(1)
			try {
				const res = await fetch('/api/auth/session', { method: 'GET' })
				const data = await res.json().catch(() => null)
				if (data?.user) {
					setCurrentUser(data.user)
				}
			} catch {
				// ignore
			}
		})()
	}, [])

	// 헤더 등 다른 컴포넌트에서 로그인/로그아웃 했을 때 세션 동기화
	useEffect(() => {
		const handler = async () => {
			try {
				const res = await fetch('/api/auth/session', { method: 'GET' })
				const data = await res.json().catch(() => null)
				if (data?.user) {
					setCurrentUser(data.user)
				} else {
					setCurrentUser(null)
				}
			} catch {
				setCurrentUser(null)
			}
		}

		if (typeof window !== 'undefined') {
			window.addEventListener('auth-changed', handler)
		}

		return () => {
			if (typeof window !== 'undefined') {
				window.removeEventListener('auth-changed', handler)
			}
		}
	}, [])

	function openCreateForm() {
		setEditingPost(null)
		setFormTitle('')
		setFormContent('')
		setImageUrls([])
		setPreviewUrls([])
		setPendingFiles([])
		setIsFormOpen(true)
	}

	function handleClickWrite() {
		if (!currentUser) {
			setOpenWriteAfterLogin(true)
			setIsLoginOpen(true)
			return
		}
		openCreateForm()
	}

	function openEditForm(post: QAPost) {
		setEditingPost(post)
		setFormTitle(post.title)
		setFormContent(post.content)
		setImageUrls(post.image_urls ?? []) // 기존 서버 이미지 유지
		setPreviewUrls([])
		setPendingFiles([])
		setIsFormOpen(true)
	}

	function closeForm() {
		setIsFormOpen(false)
		setEditingPost(null)
		setImageUrls([])
		previewUrls.forEach((url) => URL.revokeObjectURL(url))
		setPreviewUrls([])
		setPendingFiles([])
	}

	async function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
		const files = e.target.files
		if (!files || files.length === 0) return

		const MAX_IMAGES = 5
		const currentCount = imageUrls.length + pendingFiles.length
		if (currentCount >= MAX_IMAGES) {
			setUploadError(`이미지는 최대 ${MAX_IMAGES}장까지 첨부할 수 있습니다.`)
			e.target.value = ''
			return
		}

		setUploadError(null)
		setUploadingImages(true)

		try {
			const remainingSlots = MAX_IMAGES - currentCount
			const newFiles: File[] = []
			const newPreviews: string[] = []

			for (let i = 0; i < files.length && i < remainingSlots; i++) {
				const file = files[i]
				if (!file.type.startsWith('image/')) continue
				newFiles.push(file)
				newPreviews.push(URL.createObjectURL(file))
			}

			if (newFiles.length > 0) {
				setPendingFiles((prev) => [...prev, ...newFiles])
				setPreviewUrls((prev) => [...prev, ...newPreviews])
			}
		} catch (err) {
			setUploadError(err instanceof Error ? err.message : String(err))
		} finally {
			setUploadingImages(false)
			// 같은 파일 다시 선택 가능하도록 초기화
			e.target.value = ''
		}
	}

	async function handleSubmitForm(e: React.FormEvent) {
		e.preventDefault()
		if (!formTitle.trim() || !formContent.trim()) {
			setError('제목과 내용을 모두 입력해주세요.')
			return
		}

		setFormSubmitting(true)
		setError(null)

		try {
			let finalImageUrls: string[] | undefined

			// 새로 추가된 파일이 있다면 모두 업로드 후, 기존 이미지 URL과 합쳐서 저장
			if (pendingFiles.length > 0) {
				setUploadingImages(true)
				const uploaded: string[] = []

				for (const file of pendingFiles) {
					const ext = file.name.split('.').pop() ?? 'jpg'
					const filePath = `qna/${Date.now()}_${Math.random().toString(36).slice(2, 10)}.${ext}`

					// Supabase Storage 업로드 및 공개 URL 생성은 공용 헬퍼를 통해 처리
					const publicUrl = await uploadQaAttachment(filePath, file)
					uploaded.push(publicUrl)
				}

				if (uploaded.length > 0 || imageUrls.length > 0) {
					finalImageUrls = [...imageUrls, ...uploaded]
				}
			} else if (imageUrls.length > 0) {
				// 새로 추가한 파일은 없고, 기존 이미지들만 유지하는 경우
				finalImageUrls = imageUrls
			}

			const payload = {
				title: formTitle.trim(),
				content: formContent.trim(),
				imageUrls: finalImageUrls,
			}

			let res: Response
			let newPost: QAPost | null = null

			if (editingPost) {
				res = await fetch(`/api/qa/${editingPost.id}`, {
					method: 'PATCH',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(payload),
				})
			} else {
				res = await fetch('/api/qa', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(payload),
				})
			}

			const data = await res.json().catch(() => null)

			if (!res.ok) {
				throw new Error(data?.message ?? '저장 중 오류가 발생했습니다.')
			}

			if (data?.item) {
				newPost = data.item as QAPost
			}

			closeForm()
			// 저장 후 상세 페이지로 이동 (새 글/수정 모두 동일하게 처리)
			if (newPost) {
				router.push(`/pages/QnA/${newPost.id}`)
			} else {
				// 이 경우는 거의 없지만 방어적으로 목록 새로고침
				await loadPosts(editingPost ? page : 1)
			}
			setImageUrls([])
			previewUrls.forEach((url) => URL.revokeObjectURL(url))
			setPreviewUrls([])
			setPendingFiles([])
		} catch (err) {
			setError(err instanceof Error ? err.message : String(err))
		} finally {
			setFormSubmitting(false)
		}
	}

	async function handleDelete(post: QAPost) {
		// eslint-disable-next-line no-alert
		const confirmed = window.confirm('정말로 이 게시글을 삭제하시겠습니까?')
		if (!confirmed) return

		try {
			setError(null)
			const res = await fetch(`/api/qa/${post.id}`, {
				method: 'DELETE',
			})

			const data = await res.json().catch(() => null)
			if (!res.ok) {
				throw new Error(data?.message ?? '삭제 중 오류가 발생했습니다.')
			}

			// 현재 페이지를 다시 로드
			await loadPosts(page)
		} catch (err) {
			setError(err instanceof Error ? err.message : String(err))
		}
	}

	function formatDate(iso: string | null): string {
		if (!iso) return ''
		const d = new Date(iso)
		if (Number.isNaN(d.getTime())) return iso
		return d.toLocaleString('ko-KR', {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit',
			hour: '2-digit',
			minute: '2-digit',
		})
	}

	function handleChangePage(nextPage: number) {
		if (nextPage < 1 || nextPage > totalPages) return
		void loadPosts(nextPage)
	}

	return (
		<div className="min-h-screen bg-white">
			{/* 고정 헤더(높이 약 132px)와 고정 푸터(높이 약 320px)를 고려한 패딩 */}
			<main className="mx-auto max-w-5xl px-4 pt-[140px] pb-[180px]">
				<h1 className="mt-10 mb-6 text-2xl font-semibold">Q/A 게시판</h1>
				<p className="mb-6 text-sm text-gray-600">
					상품, 매장, 서비스에 대해 궁금한 점을 남겨주세요. 운영 시간이 아닌 경우 답변이
					다소 늦어질 수 있습니다.
				</p>

				<div className="mb-4 flex items-center justify-between gap-3">
					<div className="text-sm text-gray-500">
						{loading
							? '불러오는 중...'
							: ``}
					</div>
					<button
						type="button"
						onClick={handleClickWrite}
						className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
					>
						글쓰기
					</button>
				</div>

				<div className="overflow-hidden rounded-md border border-gray-200">
					<table className="min-w-full table-fixed text-sm">
						<thead className="bg-gray-50">
							<tr>
								<th className="w-16 px-3 py-2 text-center text-xs font-medium text-gray-500">
									번호
								</th>
								<th className="w-16 px-3 py-2 text-center text-xs font-medium text-gray-500">
									답변
								</th>
								<th className="px-3 py-2 text-left text-xs font-medium text-gray-500">
									제목
								</th>
								<th className="w-32 px-3 py-2 text-left text-xs font-medium text-gray-500">
									작성자
								</th>
								<th className="w-40 px-3 py-2 text-center text-xs font-medium text-gray-500">
									작성일
								</th>
							</tr>
						</thead>
						<tbody>
							{posts.length === 0 && !loading && (
								<tr>
									<td
										colSpan={4}
										className="px-3 py-6 text-center text-sm text-gray-500"
									>
										등록된 게시글이 없습니다. 첫 번째 질문을 남겨보세요.
									</td>
								</tr>
							)}
							{posts.map((post, index) => (
								<tr
									key={post.id}
									className="cursor-pointer border-t border-gray-100 hover:bg-gray-50"
									onClick={() => router.push(`/pages/QnA/${post.id}`)}
								>
									<td className="px-3 py-2 text-center text-xs text-gray-500">
										{(page - 1) * PAGE_SIZE + index + 1}
									</td>
									<td className="px-3 py-2 text-center text-xs">
										{post.answer_content ? (
											<span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
										) : (
											<span className="inline-block h-2 w-2 rounded-full bg-gray-300" />
										)}
									</td>
									<td className="truncate px-3 py-2 text-sm text-gray-900">
										<span className="truncate">{post.title}</span>
									</td>
									<td className="px-3 py-2 text-sm text-gray-700">
										{post.author_name || '익명'}
									</td>
									<td className="px-3 py-2 text-center text-xs text-gray-500">
										{formatDate(post.created_at)}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>

				<div className="mt-4 flex items-center justify-center gap-2 text-sm">
					<button
						type="button"
						onClick={() => handleChangePage(page - 1)}
						disabled={page <= 1 || loading}
						className="rounded border border-gray-300 px-3 py-1 text-xs text-gray-700 disabled:cursor-not-allowed disabled:opacity-40"
					>
						이전
					</button>
					<span className="text-gray-700">
						{page} / {totalPages}
					</span>
					<button
						type="button"
						onClick={() => handleChangePage(page + 1)}
						disabled={page >= totalPages || loading}
						className="rounded border border-gray-300 px-3 py-1 text-xs text-gray-700 disabled:cursor-not-allowed disabled:opacity-40"
					>
						다음
					</button>
				</div>

				{error && (
					<div className="mt-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
						{error}
					</div>
				)}

				{isFormOpen && (
					<div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40">
						<div className="w-full max-w-lg rounded-md bg-white p-5 shadow-xl">
							<h2 className="mb-4 text-lg font-semibold">
								{editingPost ? '게시글 수정' : '새 게시글 작성'}
							</h2>
							<form onSubmit={handleSubmitForm} className="space-y-4">
								<div>
									<label className="mb-1 block text-xs font-medium text-gray-700">
										제목
									</label>
									<input
										type="text"
										value={formTitle}
										onChange={(e) => setFormTitle(e.target.value)}
										className="w-full rounded border border-gray-300 px-3 py-2 text-sm outline-none focus:border-black"
										placeholder="질문 제목을 입력해주세요."
										required
									/>
								</div>
								<div>
									<label className="mb-1 block text-xs font-medium text-gray-700">
										내용
									</label>
									<textarea
										value={formContent}
										onChange={(e) => setFormContent(e.target.value)}
										className="h-40 w-full resize-none rounded border border-gray-300 px-3 py-2 text-sm outline-none focus:border-black"
										placeholder="질문 내용을 자세히 입력해주세요."
										required
									/>
								</div>
								{!editingPost && (
								<div>
									<label className="mb-1 block text-xs font-medium text-gray-700">
										이미지 첨부
									</label>
									<input
										type="file"
										accept="image/*"
										multiple
										onChange={handleImageChange}
										className="block w-full max-w-[120px] cursor-pointer text-xs text-transparent file:mr-0 file:rounded-full file:border-0 file:bg-black file:px-4 file:py-1.5 file:text-xs file:font-medium file:text-white hover:file:bg-gray-800"
									/>
									{uploadError && (
										<p className="mt-1 text-[11px] text-red-600">{uploadError}</p>
									)}

									{/* 기존에 저장된 이미지 (수정 시) */}
									{imageUrls.length > 0 && (
										<div className="mt-2 flex flex-wrap gap-3">
											{imageUrls.map((url, idx) => (
												<div
													key={`${url}-${idx}`}
													className="relative h-32 w-32 overflow-hidden rounded border border-gray-200"
												>
													<img
														src={url}
														alt="기존 첨부 이미지"
														className="h-full w-full object-cover"
													/>
													<button
														type="button"
														onClick={(ev) => {
															ev.preventDefault()
															setImageUrls((prev) =>
																prev.filter((_, i) => i !== idx),
															)
														}}
														className="absolute right-0 top-0 rounded-bl bg-black/60 px-1 text-[10px] text-white"
													>
														×
													</button>
												</div>
											))}
										</div>
									)}

									{/* 새로 선택한 이미지 미리보기 */}
										{previewUrls.length > 0 && (
											<div className="mt-2 flex gap-2 overflow-x-auto">
												{previewUrls.map((url, idx) => (
													<div
														key={`${url}-${idx}`}
														className="relative h-20 w-20 overflow-hidden rounded border border-gray-200"
													>
														<img
															src={url}
															alt="첨부 이미지"
															className="h-full w-full object-cover"
														/>
														<button
															type="button"
															onClick={(ev) => {
																ev.preventDefault()
																setPreviewUrls((prev) => {
																	const next = [...prev]
																	const [removed] = next.splice(idx, 1)
																	if (removed) {
																		URL.revokeObjectURL(removed)
																	}
																	return next
																})
																setPendingFiles((prev) =>
																	prev.filter((_, i) => i !== idx),
																)
															}}
															className="absolute right-0 top-0 rounded-bl bg-black/60 px-1 text-[10px] text-white"
														>
															×
														</button>
													</div>
												))}
											</div>
										)}
								</div>
							)}
								<div className="mt-4 flex justify-end gap-2 text-sm">
									<button
										type="button"
										onClick={closeForm}
										className="rounded border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
									>
										취소
									</button>
									<button
										type="submit"
										disabled={formSubmitting}
										className="rounded bg-black px-4 py-2 text-white hover:bg-gray-800 disabled:opacity-60"
									>
										{formSubmitting
											? '저장 중...'
											: editingPost
												? '수정하기'
												: '등록하기'}
									</button>
								</div>
							</form>
						</div>
					</div>
				)}

				{isLoginOpen && (
					<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
						<div className="w-full max-w-sm rounded-md bg-white p-5 shadow-xl">
							<h2 className="mb-4 text-lg font-semibold">로그인</h2>
							{loginError && (
								<div className="mb-3 rounded border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
									{loginError}
								</div>
							)}
							<form
								onSubmit={async (e) => {
									e.preventDefault()
									setLoginError(null)
									setLoginLoading(true)
									try {
										const res = await fetch('/api/auth/login', {
											method: 'POST',
											headers: { 'Content-Type': 'application/json' },
											body: JSON.stringify({
												userid: loginUserid,
												password: loginPassword,
											}),
										})
										const data = await res.json().catch(() => null)
										if (!res.ok) {
											throw new Error(data?.message ?? '로그인에 실패했습니다.')
										}
										if (data?.user) {
											setCurrentUser(data.user)
											if (typeof window !== 'undefined') {
												window.dispatchEvent(new Event('auth-changed'))
											}
										}
										setIsLoginOpen(false)
										setLoginUserid('')
										setLoginPassword('')
										if (openWriteAfterLogin) {
											setOpenWriteAfterLogin(false)
											openCreateForm()
										}
									} catch (err) {
										setLoginError(err instanceof Error ? err.message : String(err))
									} finally {
										setLoginLoading(false)
									}
								}}
								className="space-y-4"
							>
								<div>
									<label className="mb-1 block text-xs font-medium text-gray-700">
										아이디
									</label>
									<input
										type="text"
										value={loginUserid}
										onChange={(e) => setLoginUserid(e.target.value)}
										className="w-full rounded border border-gray-300 px-3 py-2 text-sm outline-none focus:border-black"
										placeholder=""
										required
									/>
								</div>
								<div>
									<label className="mb-1 block text-xs font-medium text-gray-700">
										비밀번호
									</label>
									<input
										type="password"
										value={loginPassword}
										onChange={(e) => setLoginPassword(e.target.value)}
										className="w-full rounded border border-gray-300 px-3 py-2 text-sm outline-none focus:border-black"
										required
									/>
								</div>
								<div className="mt-4 flex justify-end gap-2 text-sm">
									<button
										type="button"
										onClick={() => {
											setIsLoginOpen(false)
											setOpenWriteAfterLogin(false)
										}}
										className="rounded border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
									>
										취소
									</button>
									<button
										type="submit"
										disabled={loginLoading}
										className="rounded bg-black px-4 py-2 text-white hover:bg-gray-800 disabled:opacity-60"
									>
										{loginLoading ? '로그인 중...' : '로그인'}
									</button>
								</div>
							</form>
						</div>
					</div>
				)}
			</main>
			{/* Q/A 페이지에서는 푸터를 화면 하단에 고정 */}
			<Footer />
		</div>
	)
}


