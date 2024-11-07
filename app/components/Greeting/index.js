'use client'

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const TypewriterText = ({ text, delay = 0 }) => {
  return (
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay }}
      className="whitespace-pre-line"
    >
      {text.split('').map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.1,
            delay: delay + index * 0.02
          }}
        >
          {char}
        </motion.span>
      ))}
    </motion.p>
  );
};

const Greeting = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-white to-rose-50 pt-[100px]">
      <main className="container mx-auto px-4 py-16">
        {/* 헤더 섹션 */}
       
        <div className="text-center mb-16">
          <motion.div 
            className="text-center "
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
          <h1 className="text-4xl md:text-5xl font-bold text-rose-900 mb-4">
            CEO 인사말
          </h1>
          </motion.div>
          <motion.div
            className="text-lg text-rose-700 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-lg text-rose-700">
              W.I.L과 함께하는 아름다운 동행
            </p>
          </motion.div>
        </div>
        

        {/* 인사말 내용 */}
        <div className="max-w-5xl mx-auto">
          

          <div className="space-y-8 text-lg leading-relaxed text-rose-900">
            <TypewriterText 
              text={`안녕하세요.
 
                    라페어를 찾아주신 고객님, 진심으로 감사드립니다. 
                     
                    라페어는 하루의 시작과 끝까지 평범한 일상을 함께 할 수 있는 데일리 라이프웨어 브랜드를 꿈꾸며 시작했습니다. 
                    피부와 같은 언더웨어부터 우리 삶의 새로운 트렌드가 된 라운지웨어 브랜드로 자리매김하기까지, 가장 중요하게 
                    생각한 건 제품의 편안함과 실용성 그리고 감각적인 디자인입니다.
                    
                    인견을 소재로 한 라페어 팬티는 런칭하고 지난 7년 동안 누적 “800만장”을 판매하며 꾸준히 사랑받고 있으며, 
                    매 시즌 새로운 소재와 디자인을 개발하고 있습니다. 라운지웨어는 “프린트맛집” 이란 별명을 가지고 퀄리티 높은 
                    프린트원단을 개발하여 홈웨어부터 데일리웨어까지 다양한 스타일의 제품을 선보이고 있습니다. 

                    이제 라페어는 한 발 더 고객님께 가까워지려고 합니다. 

                    라페어의 베스트 상품들을 직접 만져보고 쇼핑을 즐길 수 있도록  “L’AFFAIR LOUNGE” 무인매장을 시작합니다. 
                    파자마 전문 브랜드 선데이라운지와 무인매장만의 새로운 품목들로 쇼핑의 즐거움을 느낄 수 있습니다. 

                    L’AFFAIR LOUNGE 무인매장은 첨단 기술과 고객의 편의성을 결합하여 언제든지 방문할 수 있고, 
                    자유롭게 쇼핑할 수 있는 공간이 되기 위해 최선을 다할 것입니다. 

감사합니다.
`}
              delay={0.5}
            />

            {/* <TypewriterText 
              text="라페어는 언제나 고객의 편안함을 최우선으로 생각하며, 실용적이면서도 감각적인 디자인을 추구하는 라운지웨어,언더웨어 브랜드로 자리매김하고 있습니다."
              delay={2}
            />

            <TypewriterText 
              text="저희는 고객의 다양한 요구를 반영하여, 스타일과 기능을 겸비한 제품을 선보이고 있으며, 특히 (프리컷 브라와 본딩 소프트 브라 세트와 같은 제품과) 인견을 소재로 한 언더웨어는 탁월한 착용감과 내구성으로 많은 사랑을 받고 있습니다. 이러한 라페어의 제품은 공식 온라인 몰인 RAFFAIR.KR(LAFFAIR.KR)과 홈쇼핑에서 꾸준히 큰 호응과 사랑을 받고 있습니다."
              delay={5}
            />

              <TypewriterText 
              text="저희는 고객 여러분이 어디서든 쉽고 편리하게 쇼핑을 즐길 수 있도록, (새롭게) “LAFFAIR LOUNGE” 무인 매장을 시작하였습니다. 시스템을 도입하여 사업을 시작하게 되었습니다.
              첨단 기술과 고객 편의성을 결합하여 언제든지 언더웨어를 자유롭게 쇼핑할 수 있는 환경을 제공하는 것이 목표입니다.
              "
              delay={12}
            />

            <TypewriterText 
              text="또한 언더웨어부터 라운지웨어까지 폭넓은 제품을 보유한 라페어와 파자마 브랜드 선데이라운지의 제품을 무인매장에서 만나보실 수 있습니다.
              앞으로도 라페어는 차별화된 품질과 더불어 혁신적인 쇼핑 경험을 제공해드리기 위해 최선을 다할 것입니다.
              "
              delay={18}
            />

            <TypewriterText 
              text="감사합니다."
              delay={22}
            /> */}


            <div className="text-right mt-12">
            <br />
            <p className="font-semibold mr-14">

            </p>
              <p className="font-semibold">
              (주)W.I.L 대표이사 조경화

              </p>
            </div>
          </div>
        </div>
 
      </main>
    </div>
  );
};

export default Greeting; 