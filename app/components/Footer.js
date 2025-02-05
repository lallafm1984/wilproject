'use client'

import { useState, useEffect } from 'react'

const Footer = () => {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <footer 
      className="bg-[#2F2E2B] w-full"
      style={{
        opacity: isLoaded ? 1 : 0,
        transition: 'opacity 0.3s ease-in-out',
        height: 'auto',
        minHeight: '280px'
      }}
    >
      <div className="w-full max-w-[1920px] mx-auto h-full flex flex-col md:flex-row items-start 
        px-4 sm:px-6 md:px-8 lg:px-12 xl:px-[339px] 
        py-8 md:py-12 lg:py-[118px]">
        {/* 로고 영역 */}
        <div className="flex-shrink-0 w-full md:w-auto text-center md:text-left mb-8 md:mb-0">
          <img 
            src="/Images/logo.png" 
            alt="L'AFFAIR LOUNGE" 
            className="w-[150px] md:w-[180px] xl:w-[210px] h-auto inline-block"
          />
        </div>

        {/* 회사 정보 영역 */}
        <div className="flex flex-col md:flex-row text-[#999999] font-extraLight 
          text-[14px] sm:text-[16px] lg:text-[18px] leading-[1.6] md:leading-[30px] 
          md:ml-[50px] lg:ml-[100px] w-full">
          <div className="flex flex-col md:flex-row gap-6 md:gap-[85px] w-full">
            {/* 상호 및 대표이사 정보 */}
            <div className="flex flex-col text-center md:text-left mb-6 md:mb-0">
              <p className="whitespace-nowrap">상호 : 주식회사 라페어라운지</p>
              <p>대표이사 : 조경화</p>
            </div>

            {/* 사업자 등록번호 및 통신판매업신고번호 */}
            <div className="flex flex-col text-center md:text-left mb-6 md:mb-0">
              <p>사업자등록번호 : 209-81-59539</p>
              <p className="whitespace-nowrap">통신판매업신고번호 : 2019-서울금천-1952</p>
              <div className="mt-2 md:mt-[5px]">
                <p>이메일 : HELLO@LAFFAIR.KR</p>
              </div>
            </div>

            {/* 주소 정보 */}
            <div className="text-center md:text-left">
              <p>주소</p>
              <p className="whitespace-nowrap">서울특별시 금천구 벚꽃로 234 (가산동)</p>
              <p>에이스하이엔드타워6차 17층 1703호</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;