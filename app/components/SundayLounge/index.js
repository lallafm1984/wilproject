'use client'

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ReactLenis } from '@studio-freight/react-lenis';

const SundayLounge = () => {
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
    <div className="min-h-screen bg-white mt-[54px] md:mt-[100px] xl:mt-[132px]">
      {/* 히어로 섹션 */}
      <div className="relative w-[100vw] lg:w-full h-[calc(100vh-54px)] md:h-[calc(100vh-100px)] lg:h-[936px] bg-[#979797]">
        <Image
          src="/Images/img1.png"
          alt="Brand Hero"
          fill
          className="object-cover"
        />
      </div>

      {/* 브랜드 소개 섹션 */}
      <div className="mx-auto px-4 pt-[90px] pb-[125px] lg:pt-[200px] lg:pb-[200px] text-center justify-items-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="w-[188px] h-[72px] lg:w-[927px] lg:h-[84px] relative"
        >
          {/* 모바일 로고 */}
          <div className="block lg:hidden relative w-full h-full">
            <Image
              src="/Images/sundaylounge/sm-logo-mo-orange.webp"
              alt="Sunday Lounge Logo Mobile"
              fill
              className="object-contain"
              priority
            />
          </div>
          
          {/* 데스크톱 로고 */}
          <div className="hidden lg:block relative w-full h-full">
            <Image
              src="/Images/sundaylounge/sl-logo-web-orange.webp"
              alt="Sunday Lounge Logo Desktop"
              fill
              className="object-contain"
              priority
            />
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="w-auto mx-auto mt-[70px] lg:mt-[100px] space-y-[12px] lg:space-y-[24px] mb-[36px] lg:mb-[60px]"
        >
          <p className="text-[17px] lg:text-[30px] text-[#92000a] font-semibold">
            난 지금 잠의 세계로 들어갈 준비가 되어 있어. 언제든 찾아와
          </p>
          <p className="text-[15px] lg:text-[22px] text-center font-normal tracking-[-0.39px] lg:tracking-[-0.35px] leading-[23px] lg:leading-[38px] text-[#323232]">
            조금만 예민해져도 불면이 찾아오는 사소하지만 소중한 일상을 함께 하겠습니다.
            <br />
            일요일의 편안함을 담은 선데이라운지입니다.
          </p>
        </motion.div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-[#333] w-[193px] lg:w-[327px] h-[43px] lg:h-[72px] text-[18px] lg:text-[30px] font-nomal text-center tracking-[-0.78px] leading-[36px] text-[#ffffff] rounded-full hover:bg-[#92000a] transition-colors"
        >
          선데이라운지 바로가기
        </motion.button>
      </div>

      {/* 특징 섹션 */}
      <div className="container mx-auto px-[30px] lg:px-4 pb-[90px] lg:pb-[200px]">
        {[
          {
            title: 'Pattern',
            description: '일요일의 편안함을 담기 위해 매 시즌 몸의 변화를 패턴에 반영합니다.',
            image: '/Images/img1.png'
          },
          {
            title: 'Easy',
            description: '특별하지 않을 수 있지만 어디에나 있고, 없으면 찾게 되는 잠옷&라운지웨어 쉽게 스며드는 컬러와 디자인으로 함께 할게요.',
            image: '/Images/img1.png'
          },
          {
            title: 'Fabric',
            description: '일요일은 가장 달콤한 휴일의 대명사이자 아쉬움입니다. 선데이라운지를 입은 순간, 휴식이 될 수 있길 바랍니다.',
            image: '/Images/img1.png'
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
            <div className="hidden lg:flex items-center">
              <h3 className="text-[32px] lg:text-[56px] font-poppins font-bold tracking-[-0.55px] leading-[72px] text-[#323232] group-hover:text-[#92000a] uppercase flex-shrink-0">
                {item.title}
              </h3>
              <p className="text-[15px] lg:text-[22px] ml-[32px] font-normal text-[#323232] group-hover:text-[#92000a] break-keep flex-1 min-w-0">
                {item.description}
              </p>
            </div>
            
            {/* 모바일 버전 */}
            <div className="flex lg:hidden flex-row items-start justify-start">
              <div className="relative w-[96px] h-[105px] flex-shrink-0">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative flex flex-col justify-start w-full md:w-fit ml-[10px]">
                <h3 className="w-full text-[32px] lg:text-[56px] font-poppins font-bold tracking-[-0.55px] leading-[24px] text-[#323232] group-hover:text-[#92000a]">
                  {item.title}
                </h3>
                <p className="w-full text-[15px] lg:text-[22px] mt-[14px] font-normal text-[#323232] group-hover:text-[#92000a] break-before-auto tracking-[-0.49px]">
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
                  w-[193px] h-[290px] lg:w-[365px] lg:h-[580px] relative
                  ${item % 2 === 0 ? 'mt-[60px]' : ''}
                  ${item !== 1 ? 'ml-[40px]' : ''}
                `}
              >
                <Image
                  src={`/Images/img1.png`}
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
                  w-[193px] h-[290px] lg:w-[365px] lg:h-[580px] relative
                  ${item % 2 === 0 ? 'mt-[60px]' : ''}
                  ${item !== 1 ? 'ml-[40px]' : ''}
                `}
              >
                <Image
                  src={`/Images/img1.png`}
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
    </ReactLenis>
  );
};

export default SundayLounge;
