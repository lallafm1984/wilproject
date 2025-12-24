import React from 'react';
import Company from '../../components/Company/index';
import Footer from '../../components/Footer';

export const metadata = {
  title: "라페어라운지",
  description: "라페어라운지 회사소개 페이지입니다. 라페어라운지의 브랜드 스토리와 라페어라운지의 비전을 확인하세요.",
  openGraph: {
    title: "라페어라운지",
    description: "라페어라운지 회사소개 페이지입니다. 라페어라운지의 브랜드 스토리와 라페어라운지의 비전을 확인하세요.",
    url: "https://www.laffairlounge.com/Company",
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
    description: "라페어라운지 회사소개 페이지입니다. 라페어라운지의 브랜드 스토리와 라페어라운지의 비전을 확인하세요.",
    images: ["https://www.laffairlounge.com/Images/main_img/main.webp"]
  }
}

const CompanyPage = () => {
  return (
    <div className='min-h-screen'>
      <Company />
      
      <Footer />
    </div>
  );
};

export default CompanyPage; 