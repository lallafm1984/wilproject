import React from 'react';
import Footer from '../../components/Footer';
import MuinStore from '../../components/MuinStore/index';

export const metadata = {
  title: '무인매장 | 라페어라운지',
  description: '라페어라운지 무인매장 안내 및 매장찾기 페이지입니다.',
  openGraph: {
    title: '무인매장 | 라페어라운지',
    description: '라페어라운지 무인매장 안내 및 매장찾기 페이지입니다.',
    url: 'https://www.laffairlounge.com/MuinStore',
    images: [
      {
        url: 'https://www.laffairlounge.com/Images/main_img/main.webp',
        width: 1200,
        height: 630,
        alt: '라페어라운지 무인매장 대표 이미지',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '무인매장 | 라페어라운지',
    description: '라페어라운지 무인매장 안내 및 매장찾기 페이지입니다.',
    images: ['https://www.laffairlounge.com/Images/main_img/main.webp'],
  },
};

const MuinStorePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-light via-white to-brand-light">
      <MuinStore />
      <Footer />
    </div>
  );
};

export default MuinStorePage; 