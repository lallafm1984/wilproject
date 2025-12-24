import React from 'react';
import Footer from '../../components/Footer';
import SundayLounge from '../../components/SundayLounge';

export const metadata = {
  title: "라페어라운지",
  description: "라페어라운지 선데이라운지 제품을 만나보세요. 라페어라운지에서만 경험할 수 있는 특별한 라페어라운지 라운지웨어.",
  openGraph: {
    title: "라페어라운지",
    description: "라페어라운지 선데이라운지 제품을 만나보세요. 라페어라운지에서만 경험할 수 있는 특별한 라페어라운지 라운지웨어.",
    url: "https://www.laffairlounge.com/SundayLounge",
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
    description: "라페어라운지 선데이라운지 제품을 만나보세요. 라페어라운지에서만 경험할 수 있는 특별한 라페어라운지 라운지웨어.",
    images: ["https://www.laffairlounge.com/Images/main_img/main.webp"]
  }
}

const SundayLoungePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-light via-white to-brand-light">
      <SundayLounge />
      <Footer />
    </div>
  );
};

export default SundayLoungePage; 