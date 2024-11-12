'use client'

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const Greeting = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-light via-white to-brand-light pt-[100px]">
      <main className="container mx-auto px-4 py-16">
        {/* 헤더 섹션 */}
        <div className="text-center mb-16">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-brand-primary mb-4">
              CEO 인사말
            </h1>
          </motion.div>
          <motion.div
            className="text-lg text-brand-secondary mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-lg text-brand-secondary">
              W.I.L과 함께하는 아름다운 동행
            </p>
          </motion.div>
        </div>
        
        {/* 인사말 내용 */}
        <motion.div 
          className="max-w-5xl mx-auto bg-white/95 rounded-2xl shadow-lg p-8 md:p-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="space-y-8 text-lg leading-relaxed text-brand-primary">
            <p className="whitespace-pre-line">
              {`안녕하세요.
 
라페어를 찾아주신 고객님, 진심으로 감사드립니다. 
 
라페어는 하루의 시작과 끝까지 평범한 일상을 함께 할 수 있는 데일리 라이프웨어 브랜드를 꿈꾸며 시작했습니다. 
피부와 같은 언더웨어부터 우리 삶의 새로운 트렌드가 된 라운지웨어 브랜드로 자리매김하기까지, 가장 중요하게 
생각한 건 제품의 편안함과 실용성 그리고 감각적인 디자인입니다.

인견을 소재로 한 라페어 팬티는 런칭하고 지난 7년 동안 누적 "800만장"을 판매하며 꾸준히 사랑받고 있으며, 
매 시즌 새로운 소재와 디자인을 개발하고 있습니다. 라운지웨어는 "프린트맛집" 이란 별명을 가지고 퀄리티 높은 
프린트원단을 개발하여 홈웨어부터 데일리웨어까지 다양한 스타일의 제품을 선보이고 있습니다. 

이제 라페어는 한 발 더 고객님께 가까워지려고 합니다. 

라페어의 베스트 상품들을 직접 만져보고 쇼핑을 즐길 수 있도록  "L'AFFAIR LOUNGE" 무인매장을 시작합니다. 
파자마 전문 브랜드 선데이라운지와 무인매장만의 새로운 품목들로 쇼핑의 즐거움을 느낄 수 있습니다. 

L'AFFAIR LOUNGE 무인매장은 첨단 기술과 고객의 편의성을 결합하여 언제든지 방문할 수 있고, 
자유롭게 쇼핑할 수 있는 공간이 되기 위해 최선을 다할 것입니다. 

감사합니다.`}
            </p>

            <div className="text-right mt-12">
              <br />
              <p className="font-semibold">
                (주)W.I.L 대표이사 조경화
              </p>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Greeting;