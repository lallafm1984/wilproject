'use client'

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ReactLenis } from '@studio-freight/react-lenis';
import mainHeroImg from '../../../public/Images/brandstory/main.webp';

const BrandStory = () => {
 
  const lenisOptions = {
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    smoothTouch: false,
    touchMultiplier: 2,
  };

  return (
    <ReactLenis root options={lenisOptions}>
    <div className="min-h-screen bg-white  mt-[54px] md:mt-[100px] xl:mt-[132px]">
      {/* 히어로 섹션 */}
      <div className="relative w-[100%] lg:w-full h-[calc(100vh-54px)] md:h-[calc(100vh-100px)] lg:h-[936px] bg-[#979797]">
        <Image
          src={mainHeroImg}
          alt="Brand Hero"
          fill
          className="object-cover"
          priority
          quality={100}
          placeholder="blur"
        />
      </div>
      
      {/* 브랜드 소개 섹션 */}
      <div className="mx-auto px-4 pt-[90px] pb-[90px] lg:pt-[200px] lg:pb-[200px] text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex justify-center items-center"
        >
           <div className="w-[200px] h-[44px] lg:w-[384px] lg:h-[84px]">
            <img
              src="/Images/brandstory/logo-l-affair-wh.webp"
              alt="L'AFFAIR Logo"
              className="w-full h-full"
            />
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 , delay: 0.5  }}
          className="w-auto mx-auto mt-[70px] lg:mt-[100px] space-y-[12px] lg:space-y-[24px] mb-[36px] lg:mb-[60px]"
        >
          <p className="text-[17px] lg:text-[30px] text-[#92000a]  font-semibold">
            편안함을 그리다
          </p>
          <p className="text-[15px] lg:text-[22px] text-center font-normal tracking-[-0.39px] lg:tracking-[-0.35px] leading-[23px] lg:leading-[38px] text-[#323232] ">
            매일 입는 것, 매일 닿는 것부터 시작되는 특별함
            <br />
            라페어는 일상을 아름답게 만드는 편안함을 섬세하게 그려갑니다.
          </p>
        </motion.div>
        
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-[#333] w-[193px] lg:w-[327px] h-[43px] lg:h-[72px] text-[18px] lg:text-[30px] font-nomal text-center tracking-[-0.78px] leading-[36px] text-[#ffffff] rounded-full hover:bg-[#92000a] transition-colors"
          href="https://laffair.kr/"
          target="_blank"
          rel="noopener noreferrer"
        >
           <a
                  href="https://laffair.kr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full h-full flex items-center justify-center"
          >
          라페어 바로가기
          </a>
        </motion.button>
      </div>

      {/* 특징 섹션 */}
      <div className="container mx-auto px-[30px] lg:px-4  pb-[89.45px] lg:pb-[200px]">
        {[
          {
            title: 'Story Art',
            description: '기분좋은 스토리의 라페어만의 아트웍을 담아 디자인합니다.',
            image: '/Images/brandstory/1.webp'
          },
          {
            title: 'Skin Flow',
            description: '입지 않는 듯,피부를 자연스럽게 감싸는 촉감을 위해 원료에서 가공까지 직접 연구하고 생산합니다.',
            image: '/Images/brandstory/2.webp'
          },
          {
            title: 'Flex Fit',
            description: '자유로운 활동성을 위해 패턴, 봉제, 사이즈까지 철저한 테스트로 완성합니다.',
            image: '/Images/brandstory/3.webp'
          }
        ].map((item, index) => (
          <div 
            key={index} 
            className={`group relative flex items-center h-[177px] lg:h-[140px] 
              ${index === 0 ? 'border-t-[2px]' : ''} 
              ${index === 1 ? 'border-t-[2px] border-b-[2px]' : ''} 
              ${index === 2 ? 'border-b-[2px]' : ''} 
              border-[#97979740]`}
          >
            {/* pc 버전 */}
            <div className="hidden lg:flex items-center ">
              <h3 className="text-[32px] lg:text-[56px] font-poppins font-bold tracking-[-0.55px] leading-[72px] text-[#323232] group-hover:text-[#92000a] uppercase flex-shrink-0">
                {item.title}
              </h3>
              <p className="text-[15px] lg:text-[22px] ml-[32px] font-normal text-[#323232] group-hover:text-[#92000a] break-keep flex-1 min-w-0">
                {item.description}
              </p>
            </div>
            
            {/* 모바일 버전 */}
            <div className="flex lg:hidden flex-row items-center justify-start">
              <div className="relative w-[96px] h-[105px]  flex-shrink-0">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                  quality={100}
                />
              </div>
              <div className="relative flex flex-col items-start justify-start w-full md:w-fit ml-[10px]">
                <h3 className="w-full text-[32px] lg:text-[56px] font-poppins font-bold tracking-[-0.55px] leading-[40px] text-[#323232] group-hover:text-[#92000a] flex-shrink-0 ">
                  {item.title}
                </h3>
                <p className="w-full text-[15px] lg:text-[22px] mt-[8px] font-normal text-[#323232] group-hover:text-[#92000a] tracking-[-0.49px] leading-[24px]  flex-1 min-h-0 ">
                  {item.description}
                </p>
              </div>
              
            </div>

            <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-[280px] h-[280px] opacity-0 group-hover:opacity-100 transition-opacity z-10">
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
      <div className="w-auto px-4 pb-[90px] lg:pb-[200px] overflow-hidden">
        <motion.div 
          className="flex"
          animate={{
            x: [0, -3240], // (365px * 8 + 40px * 7) = 3240px
          }}
          transition={{
            x: {
              duration: 50,
              repeat: Infinity,
              ease: "linear",
            },
          }}
        >
          {/* 첫 번째 세트 */}
          <div className="flex">
            {[...Array(20)].map((_, idx) => (
              <div
                key={idx + 1}
                className={`
                  w-[193px] h-[290px] lg:w-[365px] lg:h-[580px] relative
                  ${(idx + 1) % 2 === 0 ? 'mt-[60px]' : ''}
                  ${idx !== 0 ? 'ml-[40px]' : ''}
                `}
              >
                <Image
                  src={`/Images/brandstory/itemlist/${idx + 1}.webp`}
                  alt={`Gallery image ${idx + 1}`}
                  fill
                  className="object-cover"
                  quality={100}
                />
              </div>
            ))}
          </div>
          
          {/* 두 번째 세트 (무한 스크롤을 위한 복제) */}
          <div className="flex ml-[40px]">
            {[...Array(20)].map((_, idx) => (
              <div
                key={`clone-${idx + 1}`}
                className={`
                  w-[193px] h-[290px] lg:w-[365px] lg:h-[580px] relative
                  ${(idx + 1) % 2 === 0 ? 'mt-[60px]' : ''}
                  ${idx !== 0 ? 'ml-[40px]' : ''}
                `}
              >
                <Image
                  src={`/Images/brandstory/itemlist/${idx + 1}.webp`}
                  alt={`Gallery image ${idx + 1}`}
                  fill
                  className="object-cover"
                  quality={100}
                />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
    </ReactLenis>
  );
};

export default BrandStory;
