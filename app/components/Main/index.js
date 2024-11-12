'use client'

import React, { useState, useEffect } from 'react';
import HeroSection from './sections/HeroSection';
import NewsSection from './sections/NewsSection';
import BannerSection from './sections/BannerSection';
import CollectionSection from './sections/CollectionSection';

const Main = () => {
  const [isVisible, setIsVisible] = useState({
    hero: false,
    banner1: false,
    banner2: false
  });

  useEffect(() => {
    setIsVisible({ hero: true, banner1: false, banner2: false });
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      
      const banner1 = document.getElementById('banner1');
      const banner2 = document.getElementById('banner2');
      
      if (banner1 && scrollPosition > banner1.offsetTop + 100) {
        setIsVisible(prev => ({ ...prev, banner1: true }));
      }
      
      if (banner2 && scrollPosition > banner2.offsetTop + 100) {
        setIsVisible(prev => ({ ...prev, banner2: true }));
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-light via-white to-brand-light">
      <main className="w-full overflow-hidden">
        <HeroSection />
        <NewsSection />
        <BannerSection 
          id="banner1"
          isVisible={isVisible.banner1}
          imageUrl="/Images/SampleN10.jpg"
          title="가맹점 혜택"
          description="회사의 지원과 결합하여 비즈니스 성공과 지속 가능성을 향상시킬 수 있는 다양한 혜택을 제공합니다."
        />
        <BannerSection 
          id="banner2"
          isVisible={isVisible.banner2}
          imageUrl="/Images/SampleN9.jpg"
          title="창업 절차"
          description="새로운 프랜차이즈가 시스템 내에서 성공적으로 운영될 수 있도록 준비하는 몇 가지 중요한 단계가 포함됩니다."
          reverse={true}
        />
        <CollectionSection />
      </main>
    </div>
  );
};

export default Main; 