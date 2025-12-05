"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface AdPopupProps {
  showCloseButton?: boolean;
  autoHide?: boolean;
  autoHideDelay?: number;
}

/**
 * 회원가입 프로모션 팝업
 *
 * - 메인 화면 진입 시 중앙에 노출
 * - "오늘 하루 보지 않기" 선택 시 당일 재노출 방지
 * - `public/Images/popup1.png` 이미지를 선물 아이콘으로 사용
 */
export default function AdPopup({
  showCloseButton = true,
  autoHide = false,
  autoHideDelay = 8000,
}: AdPopupProps) {
  const [isVisible, setIsVisible] = useState<boolean>(true);

  // 오늘 하루 보지 않기 처리
  useEffect(() => {
    try {
      const hideDate = window.localStorage.getItem("signupPopupHideDate");
      const today = new Date().toISOString().slice(0, 10);

      if (hideDate === today) {
        setIsVisible(false);
        return;
      }
    } catch {
      // localStorage 접근 실패 시 무시
    }
  }, []);

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

  const handleHideToday = () => {
    try {
      const today = new Date().toISOString().slice(0, 10);
      window.localStorage.setItem("signupPopupHideDate", today);
    } catch {
      // ignore
    }
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="signup-popup-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40"
          aria-modal="true"
          role="dialog"
        >
          <motion.div
            key="signup-popup-card"
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative w-[90%] max-w-[480px] overflow-hidden rounded-[32px] bg-black shadow-[0_24px_80px_rgba(0,0,0,0.3)]"
          >
            {/* 닫기 버튼 */}
            {showCloseButton && (
              <button
                type="button"
                onClick={handleClose}
                className="absolute right-4 top-4 z-20 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-[#ffd85b] text-black shadow-md transition hover:bg-[#f7c000] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffd85b]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                aria-label="회원가입 팝업 닫기"
              >
                <XMarkIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            )}

            {/* 이미지 전체 영역 */}
            <div className="w-full">
              <img
                src="/Images/wPopup_1.png"
                alt="회원가입 포인트 선물"
                className="block h-full w-full max-h-[80vh] object-contain"
              />
            </div>

            {/* 오늘 하루 보지 않기 */}
            <div className="flex w-full justify-center bg-black/90 pb-3 pt-3">
              <button
                type="button"
                onClick={handleHideToday}
                className="text-[12px] font-medium text-white md:text-sm"
              >
                오늘 하루 보지 않기
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}