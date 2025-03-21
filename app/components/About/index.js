'use client'

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaUsers, FaUserFriends } from 'react-icons/fa';
import { HiUsers } from 'react-icons/hi';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Chart.js 등록
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const SalesChart = () => {
  const options = {
    responsive: true,
    animation: {
      duration: 2000,
      delay: 500
    },
    scales: {
      y: {
        beginAtZero: false,
        max: 150,
        ticks: {
          callback: function(value) {
            return value + '억';
          }
        }
      }
    },
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `매출: ${context.raw}억원`;
          }
        }
      }
    }
  };

  const data = {
    labels: ['2019', '2020', '2021', '2022', '2023'],
    datasets: [
      {
        data: [92, 126, 115, 104, 147],
        backgroundColor: 'rgba(244, 63, 94, 0.6)',
        borderColor: 'rgb(244, 63, 94)',
        borderWidth: 1,
        borderRadius: 8,
        hoverBackgroundColor: 'rgba(244, 63, 94, 0.8)',
      }
    ]
  };

  return <Bar options={options} data={data} />;
};

const About = () => {
  const visionRef = useRef(null);
  const goalsRef = useRef(null);
  
  const isVisionInView = useInView(visionRef, { once: true, margin: "-100px" });
  const isGoalsInView = useInView(goalsRef, { once: true, margin: "-100px" });

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-light via-white to-brand-light pt-[100px]">
      <main className="container mx-auto px-4 py-16">
        {/* 헤더 섹션 */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-brand-primary mb-4">
            W.I.L 은...
          </h1>
          <motion.div
            className="text-lg text-brand-secondary mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <p className="mb-2">대한민국 대표 란제리 & 라운지웨어 업체로 뛰어넘어</p>
            <p>글로벌 란제리 & 라운지웨어 브랜드로 모든 이에게 일상 속 편안함을 선물하겠습니다.</p>
          </motion.div>
        </motion.div>

        
          {/* 회사 정보 통합 섹션 */}
          <div className="grid md:grid-cols-3 gap-4 md:gap-8 mb-8 md:mb-20">
            {/* 설립과 사업정보 */}
            <motion.div 
              className="bg-white p-4 md:p-8 rounded-xl shadow-md w-full overflow-hidden"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-lg md:text-2xl font-bold text-brand-primary mb-3 md:mb-4">설립과 사업정보</h2>
              <div className="space-y-2 md:space-y-4 text-gray-700 text-sm md:text-base">
                <p><span className="font-semibold">설립자:</span> 조경화</p>
                <p><span className="font-semibold">설립일:</span> 1998. 5. 15</p>
                <p><span className="font-semibold">본사:</span> 서울 금천구 벚꽃로 234</p>
                <p><span className="font-semibold">주요사업:</span></p>
                <ul className="list-disc list-inside pl-2 md:pl-4">
                  <li>내외의 라운지웨어 & 럭셔리</li>
                  <li>란제리/언더웨어</li>
                </ul>
              </div>
            </motion.div>

            {/* 연도별 매출현황 */}
            <motion.div 
              className="bg-white p-4 md:p-8 rounded-xl shadow-md w-full overflow-hidden"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h2 className="text-lg md:text-2xl font-bold text-brand-primary mb-3 md:mb-6">연도별 매출현황</h2>
              <div className="h-[180px] md:h-[250px] w-full flex items-center justify-center">
                <SalesChart />
              </div>
              <motion.div 
                className="mt-4 text-center"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 2.5, duration: 0.5 }}
              >
                <div className="bg-brand-light px-3 md:px-4 py-2 rounded-lg border-2 border-brand-tertiary">
                  <p className="font-bold text-brand-primary text-sm md:text-base">
                    2023년 매출 
                    <span className="text-lg md:text-xl ml-2 text-brand-secondary">
                      147억
                    </span> 
                    달성
                  </p>
                </div>
              </motion.div>
            </motion.div>

            {/* W.I.L 가족 */}
            <motion.div 
              className="bg-white p-4 md:p-8 rounded-xl shadow-md w-full overflow-hidden"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
            >
              <h2 className="text-lg md:text-2xl font-bold text-brand-primary mb-3 md:mb-6">W.I.L 가족</h2>
              <div className="space-y-3 md:space-y-6">
                <div className="space-y-3 md:space-y-6">
                  {/* 한국법인 */}
                  <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1, duration: 0.5 }}
                    className="flex flex-col items-center"
                  >
                    <FaUserFriends className="text-3xl md:text-4xl text-brand-secondary mb-2" />
                    <div className="bg-brand-light w-full px-3 md:px-4 py-2 rounded-lg text-center">
                      <p className="font-bold text-brand-primary">한국법인</p>
                      <p className="text-lg md:text-xl font-bold text-brand-secondary">40명</p>
                    </div>
                  </motion.div>

                  {/* 베트남법인 */}
                  <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1.2, duration: 0.5 }}
                    className="flex flex-col items-center"
                  >
                    <HiUsers className="text-3xl md:text-4xl text-brand-secondary mb-2" />
                    <div className="bg-brand-light w-full px-3 md:px-4 py-2 rounded-lg text-center">
                      <p className="font-bold text-brand-primary">베트남법인</p>
                      <p className="text-lg md:text-xl font-bold text-brand-secondary">120명</p>
                    </div>
                  </motion.div>
                </div>

                <motion.p 
                  className="text-xs md:text-sm text-gray-600 bg-gray-50 p-3 rounded-lg text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5 }}
                >
                  약 160명의 사랑들이 W.I.L을 위해서 함께하고 있습니다.
                  <br />(2022.03 기준)
                </motion.p>
              </div>
            </motion.div>
          </div>


        {/* Vision & Mission 섹션 */}
        <motion.div 
          ref={visionRef}
          className="mt-16 md:mt-32 max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-6 md:p-12"
          initial={{ opacity: 0, y: 50 }}
          animate={isVisionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-2xl md:text-4xl font-bold text-brand-primary mb-2 md:mb-4">회사 미션 & 비전</h2>
            <p className="text-xl text-brand-secondary">W.I.L 이 추구하는 가치와 방향성</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Vision */}
            <motion.div 
              className="bg-brand-light/50 p-4 sm:p-6 md:p-10 rounded-xl border border-brand-tertiary"
              initial={{ opacity: 0, x: -50 }}
              animate={isVisionInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold text-brand-secondary mb-8">Vision</h2>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <p className="text-xl text-brand-primary font-semibold leading-relaxed">
                  Global Top Loungewear & Lingerie Self Shop lunching
                </p>
              </div>
            </motion.div>

            {/* Mission */}
            <motion.div 
              className="bg-brand-light/50 p-4 sm:p-6 md:p-10 rounded-xl border border-brand-tertiary"
              initial={{ opacity: 0, x: 50 }}
              animate={isVisionInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h2 className="text-3xl font-bold text-brand-secondary mb-8">Mission</h2>
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <p className="text-xl text-brand-primary font-semibold leading-relaxed">
                    누구나 입고 싶은 편안한 옷으로, 모든 이의 일상에 존재한다.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <p className="text-xl text-brand-primary font-semibold leading-relaxed">
                    발전된 무인매장 시스템으로 소비자의 See, Touch, Feel 을 충족시킨다.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* 회사 목표 섹션 */}
        <motion.div 
          ref={goalsRef}
          className="mt-16 md:mt-32 max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-6 md:p-12"
          initial={{ opacity: 0, y: 50 }}
          animate={isGoalsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-brand-primary mb-4">회사 목표</h2>
            <p className="text-xl text-brand-secondary">W.I.L 의 미래 청사진</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* 2025년 목표 */}
            <motion.div 
              className="bg-brand-light/50 p-10 rounded-xl border border-brand-tertiary"
              initial={{ opacity: 0, y: 30 }}
              animate={isGoalsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h3 className="text-2xl font-bold text-brand-secondary mb-6">2025년 회사 목표</h3>
              <ul className="space-y-4">
                <li className="flex items-center bg-white p-6 rounded-lg shadow-sm">
                  <span className="w-3 h-3 bg-brand-tertiary rounded-full mr-4"></span>
                  <p className="text-xl text-brand-primary">매출 300억, 영업이익 35억</p>
                </li>
                <li className="flex items-center bg-white p-6 rounded-lg shadow-sm">
                  <span className="w-3 h-3 bg-brand-tertiary rounded-full mr-4"></span>
                  <p className="text-xl text-brand-primary">신규 무인매장 프랜차이즈 사업확장</p>
                </li>
              </ul>
            </motion.div>

            {/* 향후 5년 목표 */}
            <motion.div 
              className="bg-brand-light/50 p-10 rounded-xl border border-brand-tertiary"
              initial={{ opacity: 0, y: 30 }}
              animate={isGoalsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h3 className="text-2xl font-bold text-brand-secondary mb-6">향후 5년 사 목표</h3>
              <ul className="space-y-4">
                <li className="flex items-center bg-white p-6 rounded-lg shadow-sm">
                  <span className="w-3 h-3 bg-brand-tertiary rounded-full mr-4"></span>
                  <p className="text-xl text-brand-primary">매출 1000억</p>
                </li>
                <li className="flex items-center bg-white p-6 rounded-lg shadow-sm">
                  <span className="w-3 h-3 bg-brand-tertiary rounded-full mr-4"></span>
                  <p className="text-xl text-brand-primary">브랜드 5개 이상으로 확장</p>
                </li>
              </ul>
            </motion.div>
          </div>
        </motion.div>

        {/* 핵심 가치 섹션 */}
        <motion.div 
          className="mt-16 md:mt-32 max-w-7xl mx-auto bg-white rounded-2xl shadow-lg p-4 sm:p-6 md:p-12 mb-16 md:mb-32"
          initial={{ opacity: 0, y: 50 }}
          animate={isGoalsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-brand-primary mb-4">핵심 가치</h2>
            <p className="text-xl text-brand-secondary">W.I.L 의 3가지 핵심 가치</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            {/* 각 카드 */}
            <motion.div 
              className="bg-brand-light/50 p-4 sm:p-6 md:p-8 rounded-xl border border-brand-tertiary"
              initial={{ opacity: 0, y: 30 }}
              animate={isGoalsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <h3 className="text-xl md:text-2xl font-bold text-brand-secondary mb-4 md:mb-6">내일을 향한 도전</h3>
              <ul className="space-y-4">
                <li className="bg-white p-4 sm:p-5 md:p-6 rounded-lg shadow-sm min-h-[120px] flex items-center">
                  <div className="flex items-start w-full">
                    <span className="w-3 h-3 mt-2 mr-3 bg-brand-tertiary rounded-full flex-shrink-0"></span>
                    <p className="text-base md:text-lg text-brand-primary leading-relaxed flex-1">
                      관례나 기존의 방식에 얽매이지 않는 발전적인 방향으로 업무에 임한다.
                    </p>
                  </div>
                </li>
                <li className="bg-white p-4 sm:p-5 md:p-6 rounded-lg shadow-sm min-h-[120px] flex items-center">
                  <div className="flex items-start w-full">
                    <span className="w-3 h-3 mt-2 mr-3 bg-brand-tertiary rounded-full flex-shrink-0"></span>
                    <p className="text-base md:text-lg text-brand-primary leading-relaxed flex-1">
                      지속적인 자기계발을 통해 전문 역량 및 업무 스킬을 향상한다.
                    </p>
                  </div>
                </li>
              </ul>
            </motion.div>

            {/* 회피하지 않는 정직 */}
            <motion.div 
              className="bg-brand-light/50 p-4 sm:p-6 md:p-8 rounded-xl border border-brand-tertiary"
              initial={{ opacity: 0, y: 30 }}
              animate={isGoalsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 1.0 }}
            >
              <h3 className="text-xl md:text-2xl font-bold text-brand-secondary mb-4 md:mb-6">회피하지 않는 정직</h3>
              <ul className="space-y-4">
                <li className="bg-white p-4 sm:p-5 md:p-6 rounded-lg shadow-sm min-h-[120px] flex items-center">
                  <div className="flex items-start w-full">
                    <span className="w-3 h-3 mt-2 mr-3 bg-brand-tertiary rounded-full flex-shrink-0"></span>
                    <p className="text-base md:text-lg text-brand-primary leading-relaxed flex-1">
                      고객의 니즈를 적극 반영한 소재 및 디자인을 연구하며 개발한다.
                    </p>
                  </div>
                </li>
                <li className="bg-white p-4 sm:p-5 md:p-6 rounded-lg shadow-sm min-h-[120px] flex items-center">
                  <div className="flex items-start w-full">
                    <span className="w-3 h-3 mt-2 mr-3 bg-brand-tertiary rounded-full flex-shrink-0"></span>
                    <p className="text-base md:text-lg text-brand-primary leading-relaxed flex-1">
                      품질을 최우선으로 하는 생산 관리를 통하여 고품질의 제품을 생산한다.
                    </p>
                  </div>
                </li>
              </ul>
            </motion.div>

            {/* 고객만족을 위한 변화 */}
            <motion.div 
              className="bg-brand-light/50 p-4 sm:p-6 md:p-8 rounded-xl border border-brand-tertiary"
              initial={{ opacity: 0, y: 30 }}
              animate={isGoalsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <h3 className="text-xl md:text-2xl font-bold text-brand-secondary mb-4 md:mb-6">고객만족을 위한 변화</h3>
              <ul className="space-y-4">
                <li className="bg-white p-4 sm:p-5 md:p-6 rounded-lg shadow-sm min-h-[120px] flex items-center">
                  <div className="flex items-start w-full">
                    <span className="w-3 h-3 mt-2 mr-3 bg-brand-tertiary rounded-full flex-shrink-0"></span>
                    <p className="text-base md:text-lg text-brand-primary leading-relaxed flex-1">
                      시대와 고객의 변화에 발맞춰 새로운 고객과의 접점을 만든다.
                    </p>
                  </div>
                </li>
                <li className="bg-white p-4 sm:p-5 md:p-6 rounded-lg shadow-sm min-h-[120px] flex items-center">
                  <div className="flex items-start w-full">
                    <span className="w-3 h-3 mt-2 mr-3 bg-brand-tertiary rounded-full flex-shrink-0"></span>
                    <p className="text-base md:text-lg text-brand-primary leading-relaxed flex-1">
                      고객의 요구사항에 신속히 대응하여 고객의 만족과 감동을 이끌어낸다.
                    </p>
                  </div>
                </li>
              </ul>
            </motion.div>
          </div>
        </motion.div>



        
      </main>
    </div>
  );
};

export default About; 