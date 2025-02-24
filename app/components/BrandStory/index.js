'use client'

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const BrandStory = () => {
 
  return (
    <div className="min-h-screen bg-white">
      {/* 히어로 섹션 */}
      <div className="relative w-full h-[936px] bg-[#979797]">
        <Image
          src="/images/brand-hero.jpg"
          alt="Brand Hero"
          fill
          className="object-cover"
        />
      </div>

      {/* 브랜드 소개 섹션 */}
      <div className="container mx-auto px-4 py-[200px] text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl text-[63px] font-serif mb-8"
        >
          L'AFFAIR
        </motion.h1>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="w-auto mx-auto mt-[100px] space-y-[100px] mb-[60px]"
        >
          <p className="text-[30px] text-[#92000a]  font-semibold">
            진정한 아름다움은 편안함에서 시작됩니다.
          </p>
          <p className="text-[22px] text-center font-normal tracking-[-0.35px] leading-[38px] text-[#323232] ">
            라페어는 일상의 편안함을 추구하는 라이프웨어 브랜드로 모든 분들의 고객의 아름다움과 개성을 존중하여 만듭니다.
            <br />
            피부에 닿는 부드러움과 하루 종일 함께하는 편안함을 통해, 자신감을 주는 옷을 제공합니다.
          </p>
        </motion.div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-[#333] w-[327px] h-[72px] text-[30px] font-nomal text-center tracking-[-0.78px] leading-[36px] text-[#ffffff] rounded-full hover:bg-[#92000a] transition-colors"
        >
          라페어 바로가기
        </motion.button>
      </div>

      {/* 특징 섹션 */}
      <div className="container mx-auto px-4 pb-[200px]">
        {[
          {
            title: 'STORY ART',
            description: '기본웨어도 스토리있는 라페어만의 아트워크를 담아 디자인합니다.',
            image: '/images/img1.png'
          },
          {
            title: 'SKIN FLOW',
            description: '입지 않은 듯, 피부를 자연스럽게 감싸는 촉감을 위해 원료에서 가공까지 직접 연구하고 생산합니다.',
            image: '/images/img1.png'
          },
          {
            title: 'FLEX FIT',
            description: '자유로운 활동성을 위해 패턴, 봉제, 사이즈까지 철저한 테스트로 완성합니다.',
            image: '/images/img1.png'
          }
        ].map((item, index) => (
          <div 
            key={index} 
            className={`group relative flex items-center h-[140px] hover:bg-[#f8f8f8] transition-colors
              ${index === 0 ? 'border-t-[2px]' : ''} 
              ${index === 1 ? 'border-t-[2px] border-b-[2px]' : ''} 
              ${index === 2 ? 'border-b-[2px]' : ''} 
              border-[#97979740]`}
          >
            <div className="flex items-center">
              <h3 className="text-[56px] font-poppins font-bold leading-[72px] text-[#323232] group-hover:text-[#92000a]">
                {item.title}
              </h3>
              <p className="text-[22px] ml-[32px] font-normal text-[#323232] group-hover:text-[#92000a]">
                {item.description}
              </p>
            </div>
            
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[280px] h-[280px] opacity-0 group-hover:opacity-100 transition-opacity">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
              />
            </div>
          </div>
        ))}
      </div>

      {/* 이미지 갤러리 */}
      <div className="w-auto px-4 pb-[200px] overflow-hidden">
        <motion.div 
          className="flex"
          animate={{
            x: [0, -3240], // (365px * 8 + 40px * 7) = 3240px
          }}
          transition={{
            x: {
              duration: 25,
              repeat: Infinity,
              ease: "linear",
            },
          }}
        >
          {/* 첫 번째 세트 */}
          <div className="flex">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <div
                key={item}
                className={`
                  w-[365px] h-[580px] relative
                  ${item % 2 === 0 ? 'mt-[60px]' : ''}
                  ${item !== 1 ? 'ml-[40px]' : ''}
                `}
              >
                <Image
                  src={`/images/img1.png`}
                  alt={`Gallery image ${item}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
          
          {/* 두 번째 세트 (무한 스크롤을 위한 복제) */}
          <div className="flex ml-[40px]">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <div
                key={`clone-${item}`}
                className={`
                  w-[365px] h-[580px] relative
                  ${item % 2 === 0 ? 'mt-[60px]' : ''}
                  ${item !== 1 ? 'ml-[40px]' : ''}
                `}
              >
                <Image
                  src={`/images/img1.png`}
                  alt={`Gallery image ${item}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BrandStory;
