"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface AppDownloadPopupProps {
  imageUrl?: string;
  playStoreUrl?: string;
  appStoreUrl?: string;
  title?: string;
  description?: string;
  showCloseButton?: boolean;
  autoHide?: boolean;
  autoHideDelay?: number;
}

/**
 * 라페어라운지 앱 다운로드 팝업
 *
 * - 기존에 사용하던
 *   `<div class="absolute inset-0 flex flex-col justify-between p-2 text-white">...`
 *   구조를 그대로 재현
 * - 회원가입 팝업(`AdPopup`)과는 별도의 전용 컴포넌트
 */
export default function AppDownloadPopup({
  imageUrl = "/Images/main_img/item3.webp",
  playStoreUrl = "https://play.google.com/store/apps/details?id=com.tobesmart.laffair",
  appStoreUrl = "https://apps.apple.com/us/app/%EB%9D%BC%ED%8E%98%EC%96%B4/id6744727173",
  title = "라페어라운지 앱",
  description = "더 편리한 쇼핑을 위해 앱을 다운로드하세요!",
  showCloseButton = true,
  autoHide = false,
  autoHideDelay = 8000,
}: AppDownloadPopupProps) {
  const [isVisible, setIsVisible] = useState<boolean>(true);

  // 자동 닫기 (옵션)
  useEffect(() => {
    if (!autoHide || !isVisible) {
      return;
    }

    const timer = window.setTimeout(() => {
      setIsVisible(false);
    }, autoHideDelay);

    return () => {
      window.clearTimeout(timer);
    };
  }, [autoHide, autoHideDelay, isVisible]);

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="app-download-popup-card"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="fixed bottom-4 right-4 z-[9999] w-[84vw] max-w-[260px]"
          aria-modal="true"
          role="dialog"
        >
          <div className="relative overflow-hidden rounded-[18px] bg-white text-[#323232] shadow-[0_12px_32px_rgba(15,23,42,0.18)] ring-2 ring-[#e9c5cb]">
            {/* 텍스트 / 버튼 컨텐츠 (팝업 실제 사이즈) */}
            <div className="relative flex flex-col justify-between gap-2 p-3">
              {/* 닫기 버튼 */}
              {showCloseButton && (
                <button
                  type="button"
                  onClick={handleClose}
                  className="absolute right-2 top-2 z-20 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-white/90 text-[#92000a] shadow-sm ring-1 ring-[#f4d9dd] backdrop-blur-sm transition hover:bg-[#fff5f6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#92000a]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                  aria-label="앱 다운로드 팝업 닫기"
                >
                  <XMarkIcon className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              )}

              {/* 정보 영역: 브랜드 컬러 적용 */}
              <div className="pr-6 text-[12px] leading-snug md:text-[13px]">
                <div className="font-semibold text-[#92000a]">
                  {title}
                </div>
                <div className="mt-0.5 text-[11px] text-[#323232] md:text-[12px]">
                  {description}
                </div>
              </div>

              {/* 버튼 영역: 중앙 정렬 & 동일 좌우 여백 */}
              <div className="mt-3 flex w-full flex-wrap items-center justify-center gap-2 text-[11px] md:text-xs">
                {playStoreUrl && (
                  <a
                    href={playStoreUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex min-w-[110px] items-center justify-center rounded-full border border-[#92000a] bg-[#fbeaec] px-3 py-1.5 font-semibold text-[#92000a] shadow-sm transition hover:bg-[#f6d3d8]"
                  >
                    Google Play
                  </a>
                )}
                {appStoreUrl && (
                  <a
                    href={appStoreUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex min-w-[110px] items-center justify-center rounded-full border border-[#92000a] bg-[#fbeaec] px-3 py-1.5 font-semibold text-[#92000a] shadow-sm transition hover:bg-[#f6d3d8]"
                  >
                    App Store
                  </a>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}


