'use client'

import { useState, useEffect } from 'react'

const Footer = () => {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <footer 
      className="relative bg-[#2F2E2B] w-full"
      style={{
        opacity: isLoaded ? 1 : 0,
        transition: 'opacity 0.3s ease-in-out',
      }}
    >
      <div className="relative w-full mx-auto h-[355px] min-h-[280px] md:min-h-[300px] lg:min-h-[310px] xl:h-[324px]
        flex justify-start sm:justify-center
        
        sm:py-[50px] md:py-[80px] lg:py-[70px] xl:py-[118px] overflow-hidden">
        
        {/* 컨텐츠 래퍼 */}
        <div className="flex flex-col xl:flex-row items-center  md:items-center xl:items-start w-fit pt-[70px] sm:pt-0 pl-[30px] sm:pl-0">
          {/* 로고 영역 */}
          <div className="flex-shrink-0 w-full md:w-auto text-start  md:text-center mb-8 md:mb-[50px] lg:mb-[50px] xl:mb-0">
            <img 
              src="/Images/logo.png" 
              alt="L'AFFAIR LOUNGE" 
              className="w-[140px] sm:w-[130px] md:w-[210px] lg:w-[210px] xl:w-[210px] h-auto inline-block"
            />
          </div>

          {/* 회사 정보 영역 */}
          <div className="flex flex-col md:flex-row text-[#aaa7a0] font-extraLight 
            text-[14px] sm:text-[15px] md:text-[16px] lg:text-[17px] xl:text-[18px] 
            leading-[1.6] md:leading-[1.8] lg:leading-[1.9] xl:leading-[30px] 
            md:ml-[30px] lg:ml-[50px] xl:ml-[80px] 2xl:ml-[100px] w-fit">
            
            <div className="flex flex-col md:flex-row gap-[22px] md:gap-[30px] lg:gap-[40px] xl:gap-[60px] 2xl:gap-[85px] w-fit justify-center md:justify-start">
              {/* 상호 및 대표이사 정보 */}
              <div className="flex flex-col text-[12px] md:text-[14px] lg:text-[18px] font-extralight text-left md:text-left md:mb-0 tracking-[-0.53px] md:tracking-[-0.4px] leading-[1.5] md:leading-[2]  flex-shrink-0">
                <p className="whitespace-nowrap">상호 : 라페어라운지</p>
                <p>대표이사 : 조경화</p>
              </div>

              {/* 사업자 등록번호 및 통신판매업신고번호 */}
              <div className="flex flex-col text-[12px] md:text-[14px] lg:text-[18px] text-left md:text-left font-extralight md:mb-6   tracking-[-0.53px] md:tracking-[-0.4px] leading-[1.5] md:leading-[2] flex-shrink-0">
                <p>사업자등록번호 : 209-81-59539</p>
                <p className="whitespace-nowrap">통신판매업신고번호 : 2019-서울금천-1952</p>
                <div className="sm:mt-2 md:mt-[3px] lg:mt-[4px] xl:mt-[5px] tracking-[-0.4px]">
                  <p>이메일 : hello@laffair.kr</p>
                </div>
              </div>

              {/* 주소 정보 */}
              <div className="text-left font-extralight text-[12px] md:text-[14px] lg:text-[18px] md:text-left tracking-[-0.53px] md:tracking-[-0.4px] leading-[1.5] md:leading-[2] flex-shrink-0">
                <p>주소</p>
                <p className="whitespace-nowrap">서울특별시 금천구 벚꽃로 234 (가산동)</p>
                <p>에이스하이엔드타워6차 17층 1703호</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;