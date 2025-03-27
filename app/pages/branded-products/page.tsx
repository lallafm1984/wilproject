'use client'

import { useSearchParams } from 'next/navigation';
import BrandedProducts from '../../components/BrandedProducts/BrandedProducts';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function BrandedProductsPage() {
  const searchParams = useSearchParams();
  const section = searchParams.get('section') as 'top' | 'category' || 'top';

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-[132px]"> {/* Header 높이만큼 상단 여백 추가 */}
        <BrandedProducts initialSection={section} />
      </main>
      <Footer />
    </div>
  );
} 