'use client'

import { Suspense } from 'react'
import BrandedProducts from '../../components/BrandedProducts/BrandedProducts'
import { useSearchParams } from 'next/navigation'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

function BrandedProductsContent() {
  const searchParams = useSearchParams()
  const section = searchParams.get('section') as 'top' | 'category' || 'top'
  
  return <BrandedProducts initialSection={section} />
}

export default function BrandedProductsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-[54px] md:pt-[100px] lg:pt-[132px] "> {/* Header 높이만큼 상단 여백 추가 */}
        <Suspense fallback={<div>Loading...</div>}>
          <BrandedProductsContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
} 