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
  metadataBase: new URL('https://laffairlounge.com'),
  title: {
    default: "라페어라운지"
  },
  description: '라페어 공식 쇼핑몰. 편안하면서도 스타일리시한 속옷, 파자마, 라운지웨어를 만나보세요. 전국 라페어 무인매장에서도 24시간 구매 가능합니다.',
  keywords: ['라페어라운지', '라페어', '언더웨어', '속옷', '라운지웨어', '파자마', '홈웨어', '쇼핑몰', '무인매장', '프리미엄 언더웨어', 'W.I.L', '더블유아이엘', '선데이라운지', '라이프웨어', '패션'],
  creator: '더블유아이엘(W.I.L)',
  publisher: '더블유아이엘(W.I.L)',
  openGraph: {
    title: "라페어라운지",
    description: '프리미엄 언더웨어 브랜드 라페어 공식 쇼핑몰. 전국 무인매장 운영.',
    url: 'https://laffairlounge.com',
    siteName: "라페어라운지",
    images: [
      {
        url: '/Images/main_img/main_1.webp',
        width: 1200,
        height: 630,
        alt: '라페어 대표 상품 이미지',
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "라페어라운지",
    description: '프리미엄 언더웨어 브랜드 라페어 공식 쇼핑몰. 전국 무인매장 운영.',
    images: ['/Images/main_img/main_1.webp'],
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: '16gUgN4y1RZzlNIRypybiDeL8MlHelKVPtM6w_miryk',
    naver: '796d4d3dae6fe3405e3131fce4ce8185e292eb75',
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
      <head>
        <title>라페어라운지 | 프리미엄 언더웨어, 파자마, 라운지웨어</title>
        <meta name="description" content="라페어 공식 쇼핑몰. 편안하면서도 스타일리시한 속옷, 파자마, 라운지웨어를 만나보세요. 전국 라페어 무인매장에서도 24시간 구매 가능합니다." />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="라페어라운지 | 프리미엄 언더웨어, 파자마, 라운지웨어" />
        <meta property="og:description" content="라페어 공식 쇼핑몰. 편안하면서도 스타일리시한 속옷, 파자마, 라운지웨어를 만나보세요." />
        <meta property="og:image" content="https://laffairlounge.com/Images/main_img/title.webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url" content="https://laffairlounge.com" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="라페어라운지 | 프리미엄 언더웨어, 파자마, 라운지웨어" />
        <meta name="twitter:description" content="라페어 공식 쇼핑몰. 편안하면서도 스타일리시한 속옷, 파자마, 라운지웨어를 만나보세요." />
        <meta name="twitter:image" content="https://laffairlounge.com/Images/main_img/title.webp" />
        <meta name="twitter:domain" content="laffairlounge.com" />
        <link rel="icon" href="/Images/favicon/Favico_32x32.png" sizes="32x32" type="image/png" />
        <link rel="icon" href="/Images/favicon/Favico_192x192.png" sizes="192x192" type="image/png" />
        <link rel="apple-touch-icon" href="/Images/favicon/Favico_180x180.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "라페어라운지",
              "url": "https://laffairlounge.com",
              "logo": "https://laffairlounge.com/Images/logo.png",
              "image": [
                "https://laffairlounge.com/Images/main_img/title.webp"
              ],
              "description": "라페어 공식 쇼핑몰. 편안하면서도 스타일리시한 속옷, 파자마, 라운지웨어를 만나보세요.",
              "sameAs": [
                "https://www.youtube.com/channel/UCGkepkUGvItbvlqd95gxO6w",
                "https://www.instagram.com/laffair_official/",
                "https://www.facebook.com/laffairKOREA"
              ]
            })
          }}
        />
      </head>
      <body>{children}
        <Analytics />
      </body>
    </html>
  )
}
