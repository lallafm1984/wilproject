'use client'

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const TypewriterText = ({ text, delay = 0 }) => {
  return (
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay }}
    >
      {text.split('').map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.1,
            delay: delay + index * 0.03
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
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-md overflow-hidden mb-12">
            <div className="relative h-[400px]">
              <Image
                src="/Images/ceo.jpg"
                alt="CEO"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="space-y-8 text-lg leading-relaxed text-rose-900">
            <TypewriterText 
              text="안녕십니까, W.I.L 대표이사 조경화 입니다."
              delay={0.5}
            />

            <TypewriterText 
              text="1998년 설립 이래로 W.I.L은 단순한 아름다움을 넘어 개개인의 개성과 스타일을 존중하며, 고객 한 분 한 분의 자신감 있는 일상을 위해 최선을 다하고 있습니다. 
              엄선된 소재와 장인정신으로 만들어진 제품들은 당신의 일상에 특별한 가치를 더해줄 것입니다."
              delay={2}
            />

            <TypewriterText 
              text="W.I.L은 앞으로도 혁신적인 디자인과 뛰어난 품질은 물론, 환경과 사회적 가치를 생각하는 지속가능한 브랜드로 여러분과 함께 성장해 나가겠습니다. 더 나은 미래를 향한 우리의 도전에 많은 관심과 성원 부탁드립니다."
              delay={7}
            />

            <TypewriterText 
              text="고객 여러분의 아름다운 일상과 함께하는 W.I.L이 되겠습니다. 감사합니다."
              delay={11}
            />

            <div className="text-right mt-12">
              <p className="font-semibold">
                <br />
                대표이사 조경화
              </p>
            </div>
          </div>
        </div>
 
      </main>
    </div>
  );
};

export default Greeting; 