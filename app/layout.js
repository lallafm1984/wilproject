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
  title: "LAFFAIR LOUNGE",
  description: "LAFFAIR LOUNGE",
  icons: {
    icon: [
      { url: "/Images/favicon/Favico_16x16.png", sizes: "16x16" },
      { url: "/Images/favicon/Favico_32x32.png", sizes: "32x32" },
      { url: "/Images/favicon/Favico_192x192.png", sizes: "192x192" },
    ],
    apple: [
      { url: "/Images/favicon/Favico_180x180.png" },
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
