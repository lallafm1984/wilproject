'use client'

import { Fragment, useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Footer from '../../../components/Footer'
import { uploadQaAttachment } from '../../../lib/supabaseBrowserClient'

interface QAPost {
	id: number
	title: string
	content: string
	author_name: string | null
	author_user_uid: string | null
	image_urls: string[] | null
	answer_content: string | null
	answer_author_name: string | null
	answered_at: string | null
	created_at: string
	updated_at: string | null
	is_notice?: boolean | null
}

type DetailApiResponse = {
	item?: QAPost
	message?: string
}

interface SessionUser {
	userUid: string
	loginId: string
	name: string | null
	isAdmin: boolean
}

interface QnADetailPageClientProps {
	id: string
}

function renderTextWithLinks(text: string): React.ReactNode {
	// 단순 URL 감지(공백/개행 기준) - HTML을 주입하지 않고 React 노드로만 렌더링
	const urlRegex = /(https?:\/\/[^\s<]+)|(www\.[^\s<]+)/gi
	const parts = text.split(urlRegex)

	return parts
		.filter((part) => part !== undefined && part !== '')
		.map((part, index) => {
			const raw = String(part)
			const isUrl = /^(https?:\/\/[^\s<]+|www\.[^\s<]+)$/i.test(raw)
			if (!isUrl) {
				return <Fragment key={`t-${index}`}>{raw}</Fragment>
			}

			const href = raw.startsWith('http') ? raw : `https://${raw}`
			return (
				<a
					// eslint-disable-next-line react/no-array-index-key
					key={`u-${index}`}
					href={href}
					target="_blank"
					rel="noreferrer noopener"
					className="break-all text-blue-600 underline underline-offset-2 hover:text-blue-800"
				>
					{raw}
				</a>
			)
		})
}

export default function QnADetailPageClient({ id }: QnADetailPageClientProps) {
	const router = useRouter()
	const [post, setPost] = useState<QAPost | null>(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)
	const [currentUser, setCurrentUser] = useState<SessionUser | null>(null)
	const [answerText, setAnswerText] = useState('')
	const [savingAnswer, setSavingAnswer] = useState(false)
	const [answerError, setAnswerError] = useState<string | null>(null)
	const [isEditOpen, setIsEditOpen] = useState(false)
	const [editTitle, setEditTitle] = useState('')
	const [editContent, setEditContent] = useState('')
	const [editIsNotice, setEditIsNotice] = useState(false)
	const [editSubmitting, setEditSubmitting] = useState(false)
	const [editError, setEditError] = useState<string | null>(null)
	const [editImageUrls, setEditImageUrls] = useState<string[]>([])
	const [editPreviewUrls, setEditPreviewUrls] = useState<string[]>([])
	const [editPendingFiles, setEditPendingFiles] = useState<File[]>([])
	const [editUploadError, setEditUploadError] = useState<string | null>(null)
	const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null)

	useEffect(() => {
		async function loadDetail() {
			try {
				setLoading(true)
				setError(null)

				const res = await fetch(`/api/qa/${id}`, {
					method: 'GET',
				})

				const data = (await res.json().catch(() => null)) as DetailApiResponse | null

				if (!res.ok) {
					throw new Error(data?.message ?? '게시글을 불러오는 중 오류가 발생했습니다.')
				}

				if (!data || !data.item) {
					throw new Error('게시글 정보를 찾을 수 없습니다.')
				}

				setPost(data.item)
			} catch (err) {
				setError(err instanceof Error ? err.message : String(err))
			} finally {
				setLoading(false)
			}
		}

		void loadDetail()
	}, [id])

	useEffect(() => {
		void (async () => {
			try {
				const res = await fetch('/api/auth/session', { method: 'GET' })
				const data = await res.json().catch(() => null)
				if (data?.user) {
					setCurrentUser(data.user as SessionUser)
				}
			} catch {
				// ignore
			}
		})()
	}, [])

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

	const canEditOrDelete =
		!!currentUser &&
		!!post &&
		// 관리자는 모든 글 수정/삭제 가능, 일반 사용자는 본인 글만 가능
		(currentUser.isAdmin ||
			(!!post.author_user_uid && currentUser.userUid === post.author_user_uid))

	function handleCloseEditModal() {
		setIsEditOpen(false)
		setEditError(null)
		setEditSubmitting(false)
		setEditIsNotice(false)
		editPreviewUrls.forEach((url) => URL.revokeObjectURL(url))
		setEditPreviewUrls([])
		setEditPendingFiles([])
		setEditUploadError(null)
	}

	function handleEditImageChange(e: React.ChangeEvent<HTMLInputElement>) {
		const files = e.target.files
		if (!files || files.length === 0) return

		const MAX_IMAGES = 5
		const currentCount = editImageUrls.length + editPendingFiles.length
		if (currentCount >= MAX_IMAGES) {
			setEditUploadError(`이미지는 최대 ${MAX_IMAGES}장까지 첨부할 수 있습니다.`)
			e.target.value = ''
			return
		}

		setEditUploadError(null)

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
			setEditPendingFiles((prev) => [...prev, ...newFiles])
			setEditPreviewUrls((prev) => [...prev, ...newPreviews])
		}

		// 같은 파일 다시 선택 가능하도록 초기화
		e.target.value = ''
	}

	return (
		<div className="min-h-screen bg-white">
			<main className="mx-auto max-w-3xl px-4 pt-[220px] pb-20">
				{/* <h1 className="mb-6 text-2xl font-semibold">Q/A 게시글 상세</h1> */}

				{loading && (
					<div className="rounded-md border border-gray-200 bg-gray-50 px-4 py-6 text-sm text-gray-700">
						게시글을 불러오는 중입니다...
					</div>
				)}

				{!loading && error && (
					<div className="rounded-md border border-red-200 bg-red-50 px-4 py-6 text-sm text-red-700">
						{error}
					</div>
				)}

				{!loading && !error && post && (
					<section className="rounded-md border border-gray-200 bg-white">
						<header className="border-b border-gray-100 px-4 py-3">
							<div className="flex items-center justify-between gap-3">
								<div>
									<div className="flex items-center gap-2">
										<h2 className="text-lg font-semibold text-gray-900">{post.title}</h2>
										{post.answer_content && (
											<span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700">
												관리자 답변
											</span>
										)}
									</div>
									<div className="mt-2 text-xs text-gray-500">
										<span>{post.author_name || '익명'}</span>
										<span className="mx-2">·</span>
										<span>{formatDate(post.created_at)}</span>
									</div>
								</div>
								{canEditOrDelete && (
									<div className="flex items-center gap-2 text-xs">
										<button
											type="button"
											onClick={() => {
												if (!post) return
												setEditTitle(post.title)
												setEditContent(post.content)
												setEditIsNotice(Boolean(post.is_notice))
											setEditImageUrls(post.image_urls ?? [])
											setEditPreviewUrls([])
											setEditPendingFiles([])
											setEditUploadError(null)
												setEditError(null)
												setIsEditOpen(true)
											}}
											className="rounded border border-gray-300 px-3 py-1 text-gray-800 hover:bg-gray-50"
										>
											수정
										</button>
										<button
											type="button"
											onClick={async () => {
												if (!post) return
												// eslint-disable-next-line no-alert
												const confirmed = window.confirm('정말로 이 게시글을 삭제하시겠습니까?')
												if (!confirmed) return
												try {
													const res = await fetch(`/api/qa/${post.id}`, {
														method: 'DELETE',
													})
													const data = (await res.json().catch(() => null)) as DetailApiResponse | null
													if (!res.ok) {
														throw new Error(data?.message ?? '삭제 중 오류가 발생했습니다.')
													}
													router.push('/pages/QnA')
												} catch (err) {
													setError(err instanceof Error ? err.message : String(err))
												}
											}}
											className="rounded border border-red-300 px-3 py-1 text-red-700 hover:bg-red-50"
										>
											삭제
										</button>
									</div>
								)}
							</div>
						</header>
						<div className="px-4 py-5 space-y-4">
							<div className="whitespace-pre-wrap text-sm text-gray-800">
								{renderTextWithLinks(post.content)}
							</div>
							{post.image_urls && post.image_urls.length > 0 && (
								<div className="mt-3 flex flex-wrap gap-3">
									{post.image_urls.map((url) => (
										<button
											type="button"
											key={url}
											onClick={() => setPreviewImageUrl(url)}
											className="group relative h-32 w-32 overflow-hidden rounded-md border border-gray-200 focus:outline-none"
										>
											<img
												src={url}
												alt="첨부 이미지"
												className="h-full w-full object-cover transition-transform group-hover:scale-105"
											/>
										</button>
									))}
								</div>
							)}
						</div>

						{/* 관리자 답변 영역 (일반 사용자는 답변이 있을 때만 표시, 관리자는 항상 편집 가능) */}
						{(post.answer_content || currentUser?.isAdmin) && (
							<div className="border-t border-gray-100 px-4 py-4">
							<h3 className="mb-2 text-sm font-semibold text-gray-900">관리자 답변</h3>

								{post.answer_content && (
									<div className="rounded-md border border-gray-200 bg-gray-50 px-3 py-3 text-sm text-gray-800">
										<div className="mb-1 text-xs text-gray-500">
											<span>{post.answer_author_name ?? '관리자'}</span>
											{post.answered_at && (
												<>
													<span className="mx-2">·</span>
													<span>{formatDate(post.answered_at)}</span>
												</>
											)}
										</div>
										<div className="whitespace-pre-wrap">
											{renderTextWithLinks(post.answer_content)}
										</div>
									</div>
								)}

								{currentUser?.isAdmin && (
								<div className="mt-4 space-y-2">
									{answerError && (
										<div className="rounded border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
											{answerError}
										</div>
									)}
									<textarea
										value={answerText}
										onChange={(e) => setAnswerText(e.target.value)}
										className="h-28 w-full resize-none rounded border border-gray-300 px-3 py-2 text-sm outline-none focus:border-black"
										placeholder="관리자 답변을 입력하세요."
									/>
									<div className="flex justify-end gap-2 text-sm">
										<button
											type="button"
											disabled={savingAnswer || !answerText.trim()}
											onClick={async () => {
												if (!answerText.trim()) return
												if (!post) return
												setSavingAnswer(true)
												setAnswerError(null)
												try {
													const res = await fetch(`/api/qa/${post.id}`, {
														method: 'PATCH',
														headers: { 'Content-Type': 'application/json' },
														body: JSON.stringify({ answerContent: answerText.trim() }),
													})
													const data = (await res.json().catch(() => null)) as DetailApiResponse | null
													if (!res.ok) {
														throw new Error(data?.message ?? '답변 저장 중 오류가 발생했습니다.')
													}
													if (data?.item) {
														setPost(data.item)
														setAnswerText('')
													}
												} catch (err) {
													setAnswerError(err instanceof Error ? err.message : String(err))
												} finally {
													setSavingAnswer(false)
												}
											}}
											className="rounded bg-black px-4 py-2 text-white hover:bg-gray-800 disabled:opacity-60"
										>
											{savingAnswer ? '저장 중...' : '답변 등록 / 수정'}
										</button>
									</div>
								</div>
								)}
							</div>
						)}
					</section>
				)}

				<div className="mt-6 flex justify-end">
					<Link
						href="/pages/QnA"
						className="rounded border border-gray-300 px-4 py-2 text-sm text-gray-800 hover:bg-gray-50"
					>
						목록으로
					</Link>
				</div>
			</main>

			{/* 작성자/관리자용 수정 모달 */}
			{isEditOpen && post && (
				<div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40">
					<div className="w-full max-w-lg rounded-md bg-white p-5 shadow-xl">
						<h2 className="mb-4 text-lg font-semibold">게시글 수정</h2>
						{editError && (
							<div className="mb-3 rounded border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
								{editError}
							</div>
						)}
						<form
							onSubmit={async (e) => {
								e.preventDefault()
								if (!editTitle.trim() || !editContent.trim()) {
									setEditError('제목과 내용을 모두 입력해주세요.')
									return
								}
								setEditSubmitting(true)
								setEditError(null)
								try {
									// 기존 이미지 + 새로 추가된 이미지 모두 포함해서 최종 배열 생성
									const finalImageUrls: string[] = [...editImageUrls]

									if (editPendingFiles.length > 0) {
										const uploaded: string[] = []
										for (const file of editPendingFiles) {
											const ext = file.name.split('.').pop() ?? 'jpg'
											const filePath = `qna/${Date.now()}_${Math.random()
												.toString(36)
												.slice(2, 10)}.${ext}`

											const publicUrl = await uploadQaAttachment(filePath, file)
											uploaded.push(publicUrl)
										}
										if (uploaded.length > 0) {
											finalImageUrls.push(...uploaded)
										}
									}

									const res = await fetch(`/api/qa/${post.id}`, {
										method: 'PATCH',
										headers: { 'Content-Type': 'application/json' },
										body: JSON.stringify({
											title: editTitle.trim(),
											content: editContent.trim(),
											imageUrls: finalImageUrls,
											...(currentUser?.isAdmin ? { isNotice: editIsNotice } : {}),
										}),
									})
									const data = (await res.json().catch(() => null)) as DetailApiResponse | null
									if (!res.ok) {
										throw new Error(data?.message ?? '수정 중 오류가 발생했습니다.')
									}
									if (data?.item) {
										setPost(data.item)
									}
									handleCloseEditModal()
								} catch (err) {
									setEditError(err instanceof Error ? err.message : String(err))
								} finally {
									setEditSubmitting(false)
								}
							}}
							className="space-y-4"
						>
							{currentUser?.isAdmin && (
								<div className="flex items-center gap-2">
									<input
										id="qna-detail-notice"
										type="checkbox"
										checked={editIsNotice}
										onChange={(ev) => setEditIsNotice(ev.target.checked)}
										className="h-4 w-4 accent-black"
									/>
									<label
										htmlFor="qna-detail-notice"
										className="text-sm font-medium text-gray-800"
									>
										공지로 등록(상단 고정)
									</label>
								</div>
							)}
							<div>
								<label className="mb-1 block text-xs font-medium text-gray-700">제목</label>
								<input
									type="text"
									value={editTitle}
									onChange={(e) => setEditTitle(e.target.value)}
									className="w-full rounded border border-gray-300 px-3 py-2 text-sm outline-none focus:border-black"
									required
								/>
							</div>
							<div>
								<label className="mb-1 block text-xs font-medium text-gray-700">내용</label>
								<textarea
									value={editContent}
									onChange={(e) => setEditContent(e.target.value)}
									className="h-40 w-full resize-none rounded border border-gray-300 px-3 py-2 text-sm outline-none focus:border-black"
									required
								/>
							</div>
							<div>
								<label className="mb-1 block text-xs font-medium text-gray-700">
									이미지 첨부
								</label>
								<input
									type="file"
									accept="image/*"
									multiple
									onChange={handleEditImageChange}
									className="block w-full max-w-[120px] cursor-pointer text-xs text-transparent file:mr-0 file:rounded-full file:border-0 file:bg-black file:px-4 file:py-1.5 file:text-xs file:font-medium file:text-white hover:file:bg-gray-800"
								/>
								{editUploadError && (
									<p className="mt-1 text-[11px] text-red-600">{editUploadError}</p>
								)}

								{/* 기존에 저장된 이미지 (수정 시) */}
								{editImageUrls.length > 0 && (
 									<div className="mt-2 flex gap-2 overflow-x-auto">
										{editImageUrls.map((url, idx) => (
											<div
												key={`${url}-${idx}`}
												className="relative h-20 w-20 overflow-hidden rounded border border-gray-200"
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
														setEditImageUrls((prev) => prev.filter((_, i) => i !== idx))
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
								{editPreviewUrls.length > 0 && (
 									<div className="mt-2 flex gap-2 overflow-x-auto">
										{editPreviewUrls.map((url, idx) => (
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
														setEditPreviewUrls((prev) => {
															const next = [...prev]
															const [removed] = next.splice(idx, 1)
															if (removed) {
																URL.revokeObjectURL(removed)
															}
															return next
														})
														setEditPendingFiles((prev) =>
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
							<div className="mt-4 flex justify-end gap-2 text-sm">
								<button
									type="button"
									onClick={handleCloseEditModal}
									className="rounded border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
								>
									취소
								</button>
								<button
									type="submit"
									disabled={editSubmitting}
									className="rounded bg-black px-4 py-2 text-white hover:bg-gray-800 disabled:opacity-60"
								>
									{editSubmitting ? '저장 중...' : '수정하기'}
								</button>
							</div>
						</form>
					</div>
				</div>
			)}

			{/* 이미지 미리보기(큰 사이즈) 모달 */}
			{previewImageUrl && (
				<div
					className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70"
					onClick={() => setPreviewImageUrl(null)}
				>
					<div
						className="relative max-h-[90vh] max-w-[90vw]"
						onClick={(e) => e.stopPropagation()}
					>
						<button
							type="button"
							onClick={() => setPreviewImageUrl(null)}
							className="absolute right-2 top-2 rounded-full bg-black/60 px-2 py-1 text-xs text-white"
						>
							닫기
						</button>
						<img
							src={previewImageUrl}
							alt="첨부 이미지 크게 보기"
							className="max-h-[90vh] max-w-[90vw] rounded-md object-contain"
						/>
					</div>
				</div>
			)}
		</div>
	)
}


