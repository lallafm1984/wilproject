'use client';
import React from 'react';
import { motion } from 'framer-motion';

const OrganizationChart = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-light via-white to-brand-light pt-[100px]">
      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-brand-primary mb-4">
              조직도
            </h1>
          </motion.div>
          <motion.div
            className="text-lg text-brand-secondary mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-lg text-brand-secondary">
              W.I.L의 조직 구성을 소개합니다
            </p>
          </motion.div>
        </div>

        <div className="max-w-screen-xl mx-auto">
          {/* 조직도 이미지 섹션 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-20"
          >
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img 
                src="/images/OrganizationChart.jpg" 
                alt="W.I.L 조직도" 
                className="w-full h-auto"
              />
            </div>
          </motion.div>

          {/* 설명 섹션 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="max-w-3xl mx-auto text-center mb-20"
          >
            <p className="text-brand-primary leading-relaxed">
              각 부서는 전문성을 바탕으로 유기적으로 협력하여 최상의 서비스를 제공하고 있습니다.
            </p>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default OrganizationChart;
