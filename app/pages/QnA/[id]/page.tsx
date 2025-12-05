import QnADetailPageClient from './QnADetailPageClient'

interface QnADetailPageProps {
	params: Promise<{
		id: string
	}>
}

export const metadata = {
	title: 'Q/A 게시글 상세 | 라페어라운지',
	description: '라페어라운지 Q/A 게시판의 게시글 상세 페이지입니다.',
}

export default async function QnADetailPage(props: QnADetailPageProps) {
	const params = await props.params
	return <QnADetailPageClient id={params.id} />
}


