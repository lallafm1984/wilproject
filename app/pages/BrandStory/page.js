import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import BrandStory from '../../components/BrandStory';

export const metadata = {
  title: "라페어라운지",
  description: "라페어라운지 브랜드 스토리 페이지입니다. 라페어라운지의 철학과 라페어라운지의 가치를 소개합니다.",
  openGraph: {
    title: "라페어라운지",
    description: "라페어라운지 브랜드 스토리 페이지입니다. 라페어라운지의 철학과 라페어라운지의 가치를 소개합니다.",
    url: "https://www.laffairlounge.com/BrandStory",
    images: [
      {
        url: "https://www.laffairlounge.com/Images/main_img/title.webp",
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
    description: "라페어라운지 브랜드 스토리 페이지입니다. 라페어라운지의 철학과 라페어라운지의 가치를 소개합니다.",
    images: ["https://www.laffairlounge.com/Images/main_img/title.webp"]
  }
}

export default function BrandStoryPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-light via-white to-brand-light">
      <Header />
      <BrandStory />
      <Footer />
    </div>
  );
} 