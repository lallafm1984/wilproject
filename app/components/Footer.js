'use client'

import { useState, useEffect } from 'react'

const Footer = () => {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <footer 
      className="bg-[#2F2E2B] h-[320px] w-full"
      style={{
        opacity: isLoaded ? 1 : 0,
        transition: 'opacity 0.3s ease-in-out'
      }}
    >
      <div className="max-w-[1920px] mx-auto h-full flex items-start pl-[339px] pt-[118px]">
        {/* 왼쪽 영역: 로고 */}
        <div className="flex-shrink-0 pt-[6px]">
          <img 
            src="/Images/logo.png" 
            alt="L'AFFAIR LOUNGE" 
            width={210} 
            height={19}
          />
        </div>

        {/* 중앙 영역: 회사 정보 */}
        <div className="flex flex-col text-[#999999] font-extraLight text-[18px] leading-[30px] ml-[100px]">
          <div className="flex gap-[85px]">
            <div className="flex flex-col text-left">
              <p>상호 : 주식회사 라페어라운지</p>
              <p>대표이사 : 조경화</p>
            </div>
            <div className="flex flex-col text-left">
              <p>사업자등록번호 : 209-81-59539</p>
              <p>통신판매업신고번호 : 2019-서울금천-1952</p>
              <div className="text-left mt-[5px]">
                <p>이메일 : HELLO@LAFFAIR.KR</p>
              </div>
            </div>

            <div className="text-[#999999] text-[18px] leading-[30px] text-left">
              <p>주소</p>
              <p>서울특별시 금천구 벚꽃로 234 (가산동)</p>
              <p>에이스하이엔드타워6차 17층 1703호</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;