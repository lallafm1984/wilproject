"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

/**
 * 모바일 전용 회원가입 프로모션 팝업
 *
 * - 테스트용: 전용 페이지에서만 사용
 * - 닫기 버튼 / "오늘 하루 보지 않기" 기능 없음
 * - 전체 화면 오버레이로 중앙에 노출
 * - `public/Images/popupbg-1.png` 이미지를 백그라운드로 사용
 */
export default function AdPopupMobile() {
  const router = useRouter();

  const handleNavigateToAppDownload = () => {
    router.push("/pages/AppDownload");
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/55"
      aria-modal="true"
      role="dialog"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="relative flex h-[80vw] max-h-[420px] w-[88vw] max-w-[380px] items-center justify-center overflow-hidden rounded-[30px] bg-[url('/Images/popupbg-1.png')] bg-contain bg-no-repeat bg-center text-center shadow-[0_24px_80px_rgba(0,0,0,0.35)]"
      >
        {/* 배경 어둡게 보정용 그라데이션 레이어 */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to-top,rgba(0,0,0,0.75)_0%,rgba(0,0,0,0.35)_45%,rgba(0,0,0,0.1)_75%,transparent_100%)]" />

        {/* 텍스트 영역: 상단 타이틀 + 하단 보조 문구 분리, 중앙 정렬 */}
        <button
          type="button"
          onClick={handleNavigateToAppDownload}
          className="relative z-10 flex h-full w-full flex-col items-center justify-between px-5 py-6"
          aria-label="앱 다운로드 페이지로 이동"
        >
          {/* 상단 타이틀 */}
          <div className="mt-20 text-center">
            <h2
              className="text-[1.6rem] font-extrabold leading-snug tracking-tight text-white"
              style={{
                textShadow:
                  "0 0 3px rgba(0,0,0,0.9), 0 0 6px rgba(0,0,0,0.9), 0 0 9px rgba(0,0,0,0.9)",
              }}
            >
              지금 회원{" "}
              <span className="text-[#ffe68a]">가입하면</span>
              <br />
              1만 포인트{" "}
              <span className="text-[#2cff99]">즉시 지급!</span>
            </h2>
          </div>

          {/* 하단 작은 안내 문구 */}
          <p
            className="mb-1 text-center text-[12px] font-semibold leading-relaxed text-[#fffb25]"
            style={{
              textShadow:
                "0 0 3px rgba(0,0,0,0.9), 0 0 6px rgba(0,0,0,0.9), 0 0 9px rgba(0,0,0,0.9)",
            }}
          >
            (3만원 이상 결제 시 사용 가능 · 5% 적립 혜택)
          </p>
        </button>
      </motion.div>
    </div>
  );
}
