import { NextResponse } from 'next/server'
import { LOGIN_COOKIE_NAME } from '@/lib/auth'

export async function POST() {
	const response = NextResponse.json({ success: true }, { status: 200 })

	// 쿠키 제거 (만료 처리)
	response.cookies.set(LOGIN_COOKIE_NAME, '', {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		sameSite: 'lax',
		path: '/',
		maxAge: 0,
	})

	return response
}


