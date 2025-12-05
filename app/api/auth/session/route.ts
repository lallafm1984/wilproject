import { NextResponse } from 'next/server'
import { getCurrentMemberFromCookie, mapMemberToCurrentUser } from '@/lib/auth'

export async function GET() {
	try {
		const member = await getCurrentMemberFromCookie()
		if (!member) {
			return NextResponse.json({ user: null }, { status: 200 })
		}

		return NextResponse.json(
			{
				user: mapMemberToCurrentUser(member),
			},
			{ status: 200 },
		)
	} catch (error) {
		console.error('GET /api/auth/session unexpected error', error)
		return NextResponse.json(
			{
				user: null,
				message: '세션 정보를 가져오는 중 오류가 발생했습니다.',
			},
			{ status: 500 },
		)
	}
}

