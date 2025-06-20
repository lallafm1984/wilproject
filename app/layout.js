import "./globals.css";
import { Poppins } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react';

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins'
})

export const metadata = {
  metadataBase: new URL('https://laffair.kr'),
  title: {
    default: 'W.I.L - 일상을 특별하게 만드는 프리미엄 라운지웨어',
    template: '%s | W.I.L',
  },
  description: '더블유아이엘(W.I.L)이 제안하는 프리미엄 라이프웨어 브랜드, 라페어와 선데이라운지를 만나보세요. 언더웨어, 파자마, 라운지웨어 등 당신의 일상을 더욱 편안하고 스타일리시하게 만들어 줄 아이템을 선보입니다.',
  keywords: ['라운지웨어', '파자마', '언더웨어', '홈웨어', '라이프웨어', 'W.I.L', '더블유아이엘', '라페어', '라페어 라운지', '선데이라운지', '프리미엄', '패션'],
  creator: '더블유아이엘(W.I.L)',
  publisher: '더블유아이엘(W.I.L)',
  openGraph: {
    title: 'W.I.L - 일상을 특별하게 만드는 프리미엄 라운지웨어',
    description: '프리미엄 라이프웨어 브랜드, 라페어와 선데이라운지의 다양한 제품을 만나보세요.',
    url: 'https://laffair.kr',
    siteName: '라페어 라운지',
    images: [
      {
        url: '/Images/main_img/main_1.webp',
        width: 1200,
        height: 630,
        alt: '라페어 라운지 대표 상품 이미지',
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'W.I.L - 일상을 특별하게 만드는 프리미엄 라운지웨어',
    description: '프리미엄 라이프웨어 브랜드, 라페어와 선데이라운지의 다양한 제품을 만나보세요.',
    images: ['/Images/main_img/main_1.webp'],
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    // google: '여기에 구글 소유권 확인 코드를 입력하세요',
    // naver: '여기에 네이버 소유권 확인 코드를 입력하세요',
  },
  icons: {
    icon: [
      { url: "/Images/favicon/Favico_16x16.png", sizes: "16x16", type: 'image/png' },
      { url: "/Images/favicon/Favico_32x32.png", sizes: "32x32", type: 'image/png' },
      { url: "/Images/favicon/Favico_192x192.png", sizes: "192x192", type: 'image/png' },
    ],
    apple: [
      { url: "/Images/favicon/Favico_180x180.png", type: 'image/png' },
    ],
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko" className={poppins.variable}>
      <body>{children}
        <Analytics />
      </body>
    </html>
  )
}
