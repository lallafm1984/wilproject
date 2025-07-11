import { Suspense } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import BrandedProductsContent from './BrandedProductsContent'

export const metadata = {
  title: "라페어라운지",
  description: "라페어라운지 브랜드 상품 페이지입니다. 라페어라운지에서 다양한 라페어라운지 브랜드 상품을 확인하세요.",
  openGraph: {
    title: "라페어라운지",
    description: "라페어라운지 브랜드 상품 페이지입니다. 라페어라운지에서 다양한 라페어라운지 브랜드 상품을 확인하세요.",
    url: "https://www.laffairlounge.com/branded-products",
    images: [
      {
        url: "https://www.laffairlounge.com/Images/main_img/main.webp",
        width: 1200,
        height: 630,
        alt: "라페어라운지 대표 이미지"
      }
    ],
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "라페어라운지",
    description: "라페어라운지 브랜드 상품 페이지입니다. 라페어라운지에서 다양한 라페어라운지 브랜드 상품을 확인하세요.",
    images: ["https://www.laffairlounge.com/Images/main_img/main.webp"]
  }
}

export default function BrandedProductsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-[54px] md:pt-[100px] lg:pt-[132px] ">
        <Suspense fallback={<div>Loading...</div>}>
          <BrandedProductsContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
} 