"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AdPopupProps {
  imageUrl?: string;
  playStoreUrl?: string;
  appStoreUrl?: string;
  title?: string;
  description?: string;
  showCloseButton?: boolean;
  autoHide?: boolean;
  autoHideDelay?: number;
}

export default function AdPopup({
  imageUrl = '/Images/main_img/item1.webp',
  playStoreUrl = 'https://play.google.com/store/apps/details?id=com.tobesmart.laffair',
  appStoreUrl = 'https://apps.apple.com/us/app/%EB%9D%BC%ED%8E%98%EC%96%B4/id6744727173',
  title = '라페어라운지 앱 다운로드',
  description = '더 편리한 쇼핑을 위해 앱을 다운로드하세요!',
  showCloseButton = true,
  autoHide = false,
  autoHideDelay = 5000
}: AdPopupProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // 모바일 체크
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // 로컬 스토리지에서 닫힌 상태 확인
    const isClosed = localStorage.getItem('adPopupClosed');
    if (isClosed === 'true') {
      // setIsVisible(false);
      return;
    }

    if (autoHide) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, autoHideDelay);
      return () => clearTimeout(timer);
    }
  }, [autoHide, autoHideDelay]);

  const handleClose = () => {
    setIsVisible(false);
    // 로컬 스토리지에 닫힌 상태 저장
    localStorage.setItem('adPopupClosed', 'true');
  };

  const handlePlayStoreClick = () => {
    if (playStoreUrl) {
      window.open(playStoreUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handleAppStoreClick = () => {
    if (appStoreUrl) {
      window.open(appStoreUrl, '_blank', 'noopener,noreferrer');
    }
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.8, x: 100 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        exit={{ opacity: 0, scale: 0.8, x: 100 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="fixed bottom-4 right-4 z-50 sm:bottom-6 sm:right-6"
        style={{ zIndex: 9999 }}
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
                  className="relative bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden cursor-pointer"
        style={{
          width: '280px',
          height: isMobile ? '160px' : '320px',
          maxWidth: 'calc(100vw - 2rem)',
          maxHeight: 'calc(100vh - 2rem)',
          minWidth: '250px',
          minHeight: isMobile ? '140px' : '280px'
        }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
            }
          }}
          tabIndex={0}
          role="button"
          aria-label={`${title} - ${description}`}
        >
          {/* 배경 이미지 */}
          <div className="relative w-full h-full">
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover"
            />
            
            {/* 오버레이 */}
            <div className="absolute inset-0 bg-black bg-opacity-40" />
            
            {/* 콘텐츠 */}
            <div className="absolute inset-0 flex flex-col justify-between p-4 text-white">
              <div className="flex-1 flex flex-col justify-center">
                <h3 className={`${isMobile ? 'text-lg' : 'text-xl'} font-bold mb-2 text-center`}>
                  {title}
                </h3>
                <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-center opacity-90`}>
                  {description}
                </p>
              </div>
              
              {/* 스토어 버튼들 */}
              <div className={`flex ${isMobile ? 'flex-row gap-1' : 'flex-col gap-2'}`}>
                {/* Google Play Store 버튼 */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePlayStoreClick();
                  }}
                  className={`bg-white text-black ${isMobile ? 'px-2 py-1' : 'px-3 py-2'} rounded-lg font-semibold ${isMobile ? 'text-xs' : 'text-xs'} hover:bg-gray-100 transition-colors flex items-center justify-center gap-1`}
                >
                  <svg width={isMobile ? "12" : "16"} height={isMobile ? "12" : "16"} viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                  </svg>
                  <span className={isMobile ? 'text-xs' : 'text-xs'}>Google Play</span>
                </motion.button>
                
                {/* App Store 버튼 */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAppStoreClick();
                  }}
                  className={`bg-white text-black ${isMobile ? 'px-2 py-1' : 'px-3 py-2'} rounded-lg font-semibold ${isMobile ? 'text-xs' : 'text-xs'} hover:bg-gray-100 transition-colors flex items-center justify-center gap-1`}
                >
                  <svg width={isMobile ? "12" : "16"} height={isMobile ? "12" : "16"} viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z"/>
                  </svg>
                  <span className={isMobile ? 'text-xs' : 'text-xs'}>App Store</span>
                </motion.button>
              </div>
            </div>
          </div>

          {/* 닫기 버튼 */}
          {showCloseButton && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                handleClose();
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  e.stopPropagation();
                  handleClose();
                }
              }}
              className="absolute top-2 right-2 w-8 h-8 bg-black bg-opacity-50 hover:bg-opacity-70 rounded-full flex items-center justify-center text-white transition-all duration-200"
              tabIndex={0}
              role="button"
              aria-label="광고 팝업 닫기"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </motion.button>
          )}

          {/* 펄스 애니메이션 */}
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.5, 0.8, 0.5]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute inset-0 border-2 border-white border-opacity-30 rounded-2xl pointer-events-none"
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
} 