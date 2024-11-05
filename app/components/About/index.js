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
        beginAtZero: true,
        max: 200,
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
    labels: ['2017', '2018', '2019', '2020', '2021'],
    datasets: [
      {
        data: [20, 45, 85, 126, 115],
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
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-white to-rose-50 pt-[100px]">
      <main className="container mx-auto px-4 py-16">
        {/* 헤더 섹션 */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-rose-900 mb-4">
            W.I.L 은...
          </h1>
          <motion.div
            className="text-lg text-rose-700 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <p className="mb-2">대한민국 대표 란제리 & 라운지웨어 업체로 뛰어넘어</p>
            <p>글로벌 란제리 & 라운지웨어 브랜드로 모든 이에게 일상 속 편안함을 선물하겠습니다.</p>
          </motion.div>
        </motion.div>

        {/* 회사 정보 그리드 */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {/* 설립과 사업정보 */}
          <motion.div 
            className="bg-white p-6 rounded-xl shadow-md"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-xl font-bold text-rose-800 mb-4">설립과 사업정보</h2>
            <div className="space-y-2 text-gray-700">
              <p><span className="font-semibold">설립자:</span> 조경화</p>
              <p><span className="font-semibold">설립일:</span> 1998. 5. 15</p>
              <p><span className="font-semibold">본사:</span> 서울 금천구 벚꽃로 234</p>
              <p><span className="font-semibold">주요사업:</span></p>
              <ul className="list-disc list-inside pl-4">
                <li>내외의 라운지웨어 & 럭셔리</li>
                <li>란제리/언더웨어</li>
              </ul>
            </div>
          </motion.div>

          {/* 연도별 매출현황 */}
          <motion.div 
            className="bg-white p-6 rounded-xl shadow-md"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className="text-xl font-bold text-rose-800 mb-4">연도별 매출현황</h2>
            <div className="h-[300px] flex items-center justify-center">
              <SalesChart />
            </div>
            <motion.div 
              className="mt-6 text-center"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 2.5, duration: 0.5 }}
            >
              <div className="inline-block bg-rose-50 px-6 py-3 rounded-lg border-2 border-rose-200">
                <p className="text-lg font-bold text-rose-900">
                  2020년 매출 
                  <span className="text-2xl ml-2 text-rose-600">
                    126억
                  </span> 
                  달성
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* 더블유아이엘 가족 */}
          <motion.div 
            className="bg-white p-6 rounded-xl shadow-md"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
          >
            <h2 className="text-xl font-bold text-rose-800 mb-4">W.I.L 가족</h2>
            <div className="text-center space-y-6">
              <div className="grid grid-cols-2 gap-8">
                {/* 한국법인 */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1, duration: 0.5 }}
                  className="flex flex-col items-center"
                >
                  <FaUserFriends className="text-5xl text-rose-600 mb-3" />
                  <div className="bg-rose-50 px-4 py-2 rounded-lg">
                    <p className="font-bold text-rose-800">한국법인</p>
                    <p className="text-2xl font-bold text-rose-600">40명</p>
                  </div>
                </motion.div>

                {/* 베트남법인 */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.2, duration: 0.5 }}
                  className="flex flex-col items-center"
                >
                  <HiUsers className="text-5xl text-rose-600 mb-3" />
                  <div className="bg-rose-50 px-4 py-2 rounded-lg">
                    <p className="font-bold text-rose-800">베트남법인</p>
                    <p className="text-2xl font-bold text-rose-600">120명</p>
                  </div>
                </motion.div>
              </div>

              <motion.p 
                className="mt-6 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg inline-block"
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
          className="mt-20"
          initial={{ opacity: 0, y: 50 }}
          animate={isVisionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-rose-900 mb-3">회사 미션 & 비전</h2>
            <p className="text-lg text-rose-700">W.I.L 이 추구하는 가치와 방향성</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-20">
            {/* Vision */}
            <motion.div 
              className="bg-white p-8 rounded-xl shadow-md"
              initial={{ opacity: 0, x: -50 }}
              animate={isVisionInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold text-rose-800 mb-6">Vision</h2>
              <div className="bg-rose-50 p-4 rounded-lg">
                <p className="text-lg text-rose-900 font-semibold">
                  Global Top Loungewear & Lingerie Self Shop lunching
                </p>
              </div>
            </motion.div>

            {/* Mission */}
            <motion.div 
              className="bg-white p-8 rounded-xl shadow-md"
              initial={{ opacity: 0, x: 50 }}
              animate={isVisionInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h2 className="text-2xl font-bold text-rose-800 mb-6">Mission</h2>
              <div className="bg-rose-50 p-4 rounded-lg mb-4">
                <p className="text-lg text-rose-900 font-semibold">
                  누구나 입고 싶은 편안한 옷으로, 모든 이의 일상에 존재한다.
                </p>
              </div>
              <div className="bg-rose-50 p-4 rounded-lg">
                <p className="text-lg text-rose-900 font-semibold">
                  발전된 무인매장 시스템으로 소비자의 See, Touch, Feel 을 충족시킨다.
                </p>
              </div>
            </motion.div>
          </div>

          {/* 회사 목표 섹션 */}
          <motion.div 
            ref={goalsRef}
            className="mt-20"
            initial={{ opacity: 0, y: 50 }}
            animate={isGoalsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-rose-900 mb-3">회사 목표</h2>
              <p className="text-lg text-rose-700">W.I.L 의 미래 청사진</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* 2025년 목표 */}
              <motion.div 
                className="bg-white p-8 rounded-xl shadow-md"
                initial={{ opacity: 0, y: 30 }}
                animate={isGoalsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h3 className="text-xl font-bold text-rose-800 mb-4">2025년 회사 목표</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-3 pl-4">
                  <li>매출 300억, 영업이익 35억</li>
                  <li>신규 무인매장 프랜차이즈 사업확장</li>
                </ul>
              </motion.div>

              {/* 향후 5년 목표 */}
              <motion.div 
                className="bg-white p-8 rounded-xl shadow-md"
                initial={{ opacity: 0, y: 30 }}
                animate={isGoalsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <h3 className="text-xl font-bold text-rose-800 mb-4">향후 5년 회사 목표</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-3 pl-4">
                  <li>매출 1000억</li>
                  <li>브랜드 5개 이상으로 확장</li>
                </ul>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>



        
      </main>
    </div>
  );
};

export default About; 