'use client'

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { detailedHistoryData } from './detailedHistory';

const TimelineItem = ({ year, items, images, isLeft }) => {
  return (
    <div className="relative flex justify-center min-h-[100px]">
      {/* 왼쪽 내용 */}
      <div className="w-1/2 pr-6">
        {isLeft && (
          <motion.div 
            className="bg-white p-3 rounded-xl shadow-md ml-auto"
            style={{ maxWidth: '90%' }}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-lg font-bold text-rose-800 mb-2">{year}</h3>
            <ul className="space-y-1">
              {items.map((item, index) => (
                <li key={index} className="text-gray-700 flex items-start text-sm">
                  <span className="w-1.5 h-1.5 bg-rose-400 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            {images && (
              <div className="mt-2 flex flex-wrap gap-1 justify-end">
                {images.map((image, index) => (
                  <div key={index} className="relative w-20 h-20">
                    <Image
                      src={image}
                      alt={`${year} 이미지 ${index + 1}`}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </div>

      {/* 오른쪽 내용 */}
      <div className="w-1/2 pl-6">
        {!isLeft && (
          <motion.div 
            className="bg-white p-3 rounded-xl shadow-md"
            style={{ maxWidth: '90%' }}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-lg font-bold text-rose-800 mb-2">{year}</h3>
            <ul className="space-y-1">
              {items.map((item, index) => (
                <li key={index} className="text-gray-700 flex items-start text-sm">
                  <span className="w-1.5 h-1.5 bg-rose-400 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            {images && (
              <div className="mt-2 flex flex-wrap gap-1">
                {images.map((image, index) => (
                  <div key={index} className="relative w-20 h-20">
                    <Image
                      src={image}
                      alt={`${year} 이미지 ${index + 1}`}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

const DetailedHistory = () => {
  return (
    <div className="bg-neutral-100 py-16">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold text-rose-900 mb-4">
            상세 연혁
          </h2>
        </motion.div>
        
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <div className="absolute left-[20px] top-0 bottom-0 w-1 bg-rose-300" />
            
            <div className="space-y-8">
              {detailedHistoryData.map((period) => (
                <div key={period.id} className="relative">
                  <div className="absolute left-[16px] top-8 z-10">
                    <div className="w-2.5 h-2.5 bg-rose-500 rounded-full">
                      <div className="absolute w-5 h-5 bg-rose-200 rounded-full -left-[5px] -top-[5px] animate-ping opacity-75"></div>
                    </div>
                  </div>
                  
                  <motion.div
                    className="bg-white p-6 rounded-xl shadow-md ml-12"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    <h3 className="text-xl font-bold text-rose-800 mb-3">{period.year}</h3>
                    <ul className="space-y-2">
                      {period.items.map((item) => (
                        <li key={item.id} className="text-gray-700 flex items-start">
                          <span className="w-1.5 h-1.5 bg-rose-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                          <span>{item.text}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ScrollButton 컴포넌트 추가
const ScrollButton = ({ onClick, children, className }) => (
  <motion.button
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.5 }}
    className={`fixed right-8 z-50 bg-rose-500 text-white rounded-full p-4 shadow-lg hover:bg-rose-600 transition-colors ${className}`}
    onClick={onClick}
  >
    {children}
  </motion.button>
);

const CompanyHistory = () => {
  const [showDetailedButton, setShowDetailedButton] = useState(false);
  const [showTopButton, setShowTopButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // 상세 연혁 섹션의 위치 계산
      const detailedSection = document.getElementById('detailed-history');
      const detailedPosition = detailedSection?.offsetTop || 0;
      
      // 현재 스크롤 위치
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // 상세 연혁 섹션 이전에는 상세 연혁 버튼만 표시
      if (scrollPosition < detailedPosition - (windowHeight / 2)) {
        setShowDetailedButton(true);
        setShowTopButton(false);
      } 
      // 상세 연혁 섹션에 진입했을 때만 맨 위로 버튼 표시
      else if (scrollPosition >= detailedPosition - (windowHeight / 2)) {
        setShowDetailedButton(false);
        setShowTopButton(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToDetailed = () => {
    const detailedSection = document.getElementById('detailed-history');
    const menuHeight = 80; // 메뉴바 높이
    
    if (detailedSection) {
      const targetPosition = detailedSection.offsetTop - menuHeight;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const historyData = [
    {
      year: '2005',
      items: ['UCLA', '월디프리'],
      images: ['/images/history/ucla1.jpg', '/images/history/ucla2.jpg']
    },
    {
      year: '2006',
      items: ['INVU'],
      images: ['/images/history/invu.jpg']
    },
    {
      year: '2007',
      items: ['피델리아','CACHAREL'],
      images: ['/images/history/cacharel.jpg']
    },
    {
      year: '2008',
      items: [
        '&STYLE', 
        '코르커타클래식스',
        'H.only U'
      ],
      images: ['/images/history/honlyu.jpg']
    },
    {
      year: '2009',
      items: ['THE GUY', 'lollipops'],
      images: ['/images/history/theguy.jpg']
    },
    {
      year: '2010-2011',
      items: ['CLARA YOON', 'ROSY', 'lollipops'],
      images: ['/images/history/clara.jpg']
    },
    {
      year: '2012-2013',
      items: ['lollipops', "L'AFFAIR", '시니어 브라/탑 개발'],
      images: ['/images/history/lollipops.jpg']
    },
    {
      year: '2014-2022',
      items: ["L'AFFAIR", '라페어 라운지웨어 런칭'],
      images: ['/images/history/laffair.jpg']
    }
  ];

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-rose-50 via-white to-rose-50 pt-[60px]">
        <div className="container mx-auto px-4 py-20">
          <motion.div 
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-3xl font-bold text-rose-900 mb-2">
              브랜드 히스토리
            </h1>
            <p className="text-base text-rose-700">
              W.I.L의 성장과 발자취
            </p>
          </motion.div>

          <div className="relative max-w-4xl mx-auto">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-rose-300" />
            
            <div className="relative space-y-12">
              {historyData.map((data, index) => (
                <div key={data.year} className="relative">
                  {/* 원형 마커 */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                    <div className="w-4 h-4 bg-rose-500 rounded-full">
                      <div className="absolute w-8 h-8 bg-rose-200 rounded-full -left-2 -top-2 animate-ping opacity-75"></div>
                    </div>
                  </div>
                  
                  <TimelineItem
                    year={data.year}
                    items={data.items}
                    isLeft={index % 2 === 0}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div id="detailed-history" className="pt-[0px]">
        <DetailedHistory />
      </div>

      {/* 네비게이션 버튼들 */}
      <AnimatePresence>
        {showDetailedButton && (
          <ScrollButton 
            onClick={scrollToDetailed}
            className="bottom-8"
          >
            <div className="flex flex-col items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
              <span className="text-sm mt-1">상세 연혁</span>
            </div>
          </ScrollButton>
        )}

        {showTopButton && (
          <ScrollButton 
            onClick={scrollToTop}
            className="bottom-8"
          >
            <div className="flex flex-col items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              <span className="text-sm mt-1">맨 위로</span>
            </div>
          </ScrollButton>
        )}
      </AnimatePresence>
    </>
  );
};

export default CompanyHistory;

