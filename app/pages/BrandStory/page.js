import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import BrandStory from '../../components/BrandStory';

export const metadata = {
  title: '브랜드 스토리 | WIL',
  description: 'WIL의 브랜드 스토리를 소개합니다.',
};

export default function BrandStoryPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-light via-white to-brand-light">
      <Header />
      <BrandStory />
      <Footer />
    </div>
  );
} 