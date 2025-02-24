'use client'

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ReactLenis } from '@studio-freight/react-lenis';
import Lenis from '@studio-freight/lenis';

const Company = () => {
  const containerRef = useRef(null);
  const [activeYear, setActiveYear] = useState(null);
  const historyContainerRef = useRef(null);
  const partnersTitleRef = useRef(null);
  const [maps, setMaps] = useState({
    sinsa: null,
    sinnonhyeon: null,
    nonhyeon: null,
    companyMap: null
  });

  // 현재 선택된 탭을 관리하는 state 추가
  const [selectedTab, setSelectedTab] = useState('headquarters');
  
  // 각 위치의 정보를 객체로 관리
  const locations = {
    headquarters: {
      title: '더블유아이엘 본사',
      address: '서울특별시 금천구 벚꽃로 234, 1703호 (가산동, 에이스하이엔드타워6차)',
      phone: '02-6925-0733',
      coordinates: { lat: 37.4784, lng: 126.8821 }
    },
    logistics: {
      title: '더블유아이엘 물류센터',
      address: '경기도 군포시 번영로 82 한국복합물류터미널(유) F동 지하1층',
      phone: '031-460-2200',
      coordinates: { lat: 37.3519, lng: 126.9485 }
    },
    vietnam: {
      title: '더블유아이엘 베트남법인',
      address: '서울특별시 금천구 벚꽃로 234, 1703호 (가산동, 에이스하이엔드타워6차)',
      phone: '+84-28-3559-2293',
      coordinates: { lat: 10.8231, lng: 106.6297 }
    },
    shinsegae: {
      title: '신세계백화점 김해점',
      address: '경상남도 김해시 김해대로 2232',
      phone: '055-272-1234',
      coordinates: { lat: 35.2282, lng: 128.8836 }
    }
  };

  useEffect(() => {
    const updateActiveItems = () => {
      const title = document.querySelector('.sticky-title');
      const historyItems = document.querySelectorAll('.history-item');
      
      if (!title || !historyItems.length) return;
      
      const titleRect = title.getBoundingClientRect();
      const titleCenter = titleRect.top + (titleRect.height / 2); // 타이틀의 중앙점
      
      let closestItem = null;
      let minDistance = Infinity;

      historyItems.forEach(item => {
        const itemRect = item.getBoundingClientRect();
        const itemCenter = itemRect.top + (itemRect.height / 2); // 각 아이템의 중앙점
        const distance = Math.abs(titleCenter - itemCenter);
        
        // 가장 가까운 아이템 찾기
        if (distance < minDistance) {
          minDistance = distance;
          closestItem = item;
        }

        // 기본적으로 모든 아이템을 회색으로 설정
        item.querySelector('p').style.color = '#979797';
        item.querySelectorAll('.w-auto p').forEach(p => {
          p.style.color = '#979797';
        });
      });

      // 가장 가까운 아이템을 진한 색상으로 변경
      if (closestItem) {
        closestItem.querySelector('p').style.color = '#1b1b1b';
        closestItem.querySelectorAll('.w-auto p').forEach(p => {
          p.style.color = '#1b1b1b';
        });
      }

      // 첫 번째 아이템이 뷰포트 상단에 있을 때 진한 색상으로 설정
      const firstItem = historyItems[0];
      const firstItemRect = firstItem.getBoundingClientRect();
      if (firstItemRect.top > 0 && firstItemRect.top < window.innerHeight / 2) {
        firstItem.querySelector('p').style.color = '#1b1b1b';
        firstItem.querySelectorAll('.w-auto p').forEach(p => {
          p.style.color = '#1b1b1b';
        });
      }
    };

    // 스크롤 이벤트 리스너 등록
    window.addEventListener('scroll', updateActiveItems);
    
    // 초기 실행
    setTimeout(updateActiveItems, 100); // 약간의 지연을 주어 초기 렌더링 후 실행

    // 클린업 함수
    return () => {
      window.removeEventListener('scroll', updateActiveItems);
    };
  }, []);

  useEffect(() => {
    // 타이틀 애니메이션
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.1,
    });

    if (partnersTitleRef.current) {
      observer.observe(partnersTitleRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const lenisOptions = {
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    smoothTouch: false,
    touchMultiplier: 2,
  };

  useEffect(() => {
    let kakaoMapScript = null;

    const loadKakaoMap = () => {
      kakaoMapScript = document.createElement('script');
      kakaoMapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=b17a7dbb6f34a703cfdfce78a318870a&autoload=false`;
      kakaoMapScript.async = true;

      kakaoMapScript.onload = () => {
        window.kakao.maps.load(() => {
          initializeAllMaps();
        });
      };

      document.head.appendChild(kakaoMapScript);
    };

    const initializeAllMaps = () => {
      const mapConfigs = {
        'sinsa-map': { lat: 37.5276, lng: 127.0388 },
        'sinnonhyeon-map': { lat: 37.5044, lng: 127.0252 },
        'nonhyeon-map': { lat: 37.5073, lng: 127.0228 },
        'company-map': locations[selectedTab].coordinates
      };

      Object.entries(mapConfigs).forEach(([mapId, coords]) => {
        const container = document.getElementById(mapId);
        if (!container) return;

        const options = {
          center: new window.kakao.maps.LatLng(coords.lat, coords.lng),
          level: 3,
          draggable: false,
          scrollwheel: false,
          disableDoubleClick: true,
          disableDoubleClickZoom: true
        };

        const newMap = new window.kakao.maps.Map(container, options);
        newMap.setZoomable(false);

        const markerPosition = new window.kakao.maps.LatLng(coords.lat, coords.lng);
        const marker = new window.kakao.maps.Marker({
          position: markerPosition
        });
        marker.setMap(newMap);

        setMaps(prev => ({
          ...prev,
          [mapId]: newMap
        }));
      });
    };

    if (window.kakao && window.kakao.maps) {
      initializeAllMaps();
    } else {
      loadKakaoMap();
    }

    return () => {
      if (kakaoMapScript) {
        document.head.removeChild(kakaoMapScript);
      }
    };
  }, [selectedTab, locations]);

  // 탭 변경 핸들러
  const handleTabChange = (tab) => {
    setSelectedTab(tab);
    
    // 탭 변경 시 해당 지도 업데이트
    if (window.kakao && window.kakao.maps) {
      const container = document.getElementById('company-map');
      if (!container) return;

      const { coordinates } = locations[tab];
      const newCenter = new window.kakao.maps.LatLng(coordinates.lat, coordinates.lng);
      
      if (maps.companyMap) {
        maps.companyMap.setCenter(newCenter);
        maps.companyMap.getLevel(3);
      }
    }
  };

  return (
    <ReactLenis root options={lenisOptions}>
      <div data-scroll-container ref={containerRef}>
        <div className="mx-auto z-1 mt-[80px] md:mt-[100px] xl:mt-[132px] bg-white min-h-screen">
          <div className="w-full mx-auto">
            <main className="relative w-full">
              <div className="relative h-fit flex flex-col items-center justify-start">
               
                {/* 회사 소개 */}
                <div id="about" className="w-full pt-[100px] md:pt-[150px] xl:pt-[200px] bg-[#f8f8f2] flex flex-col items-center justify-start">
                  <div className="sticky top-[100px] w-full max-w-[335px] md:max-w-[700px] xl:max-w-[1257px] px-5 md:px-8 xl:px-0 flex flex-col items-start justify-start">
                    <motion.p 
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                      viewport={{ once: true }}
                      className="text-[24px] md:text-[26px] xl:text-[30px] font-poppins font-semibold text-left text-[#1b1b1b]"
                    > About us</motion.p>
                    <motion.p 
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      viewport={{ once: true }}
                      className="mt-[16px] md:mt-[20px] xl:mt-[24px] text-[36px] md:text-[46px] xl:text-[56px] font-medium text-left text-[#92000a] tracking-[-1.8px] md:tracking-[-2.3px] xl:tracking-[-2.8px] leading-[48px] md:leading-[62px] xl:leading-[74px]"
                    > 언제 어디서나<br/>함께하는 더블유아이엘</motion.p>
                    <motion.p 
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      viewport={{ once: true }}
                      className="mt-[60px] md:mt-[80px] xl:mt-[100px] text-[16px] md:text-[18px] xl:text-[22px] font-normal text-left tracking-[-0.25px] md:tracking-[-0.3px] xl:tracking-[-0.35px] leading-[28px] md:leading-[32px] xl:leading-[38px] text-[#323232]"
                    > &nbsp;안녕하세요.<br/>
                    &nbsp;더블유아이엘을 찾아주신 고객여러분, 진심으로 감사드립니다.<br/> 
                      <br/> &nbsp;더블유아이엘은 하루의 시작과 끝, 평범한 일상을 함께 할 수 있는 데일리 라이프웨어 브랜드를 꿈꾸며 시작했습니다. 라페어는 더블유아이엘의
                      <br className="hidden xl:block"/>
                    언더웨어&라운지웨어 대표 브랜드입니다. 언더웨어에서 인견 팬티를 런칭하고 지난 7년 동안 누적 &quot;800만장&quot; 이상을 판매하며 꾸준히 사랑받고<br className="hidden xl:block"/>
                    있으며, 매 시즌 새로운 소재와 디자인을 개발하고 있습니다. 라운지웨어는 &quot;프린트맛집&quot; 이란 별명을 가지고 퀄리티 높은 프린트원단을 개발하여<br className="hidden xl:block"/>
                    홈웨어부터 데일리웨어까지 다양한 스타일의 제품을 선보이고 있습니다. <br/>
                    <br/>
                    &nbsp;라페어는 대표 슬로건 &quot;언제, 어디서나&quot; &quot;아침부터 저녁까지&quot; 함께 할 수 있는 브랜드로 한번 더 성장하려 합니다. 온라인 시장을 넘어 라페어<br className="hidden xl:block"/>
                    상품을 직접 만져보고 쇼핑을 즐길 수 있도록  &quot;라페어라운지&quot; 무인매장을 시작합니다. 라페어라운지 무인매장은 첨단 기술과 고객의 편의성을 결합<br className="hidden xl:block"/>
                    하여 언제든지 방문할 수 있고, 자유롭게 쇼핑할 수 있는 공간이 되기 위해 최선을 다할 것입니다. <br/>
                    <br/>
                    &nbsp;&nbsp;감사합니다.</motion.p>
                    <motion.div 
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.6 }}
                      viewport={{ once: true }}
                      className="w-full flex justify-end items-end"
                    >
                      <p className="mt-[24px] md:mt-[28px] xl:mt-[32px] mr-[24px] md:mr-[36px] xl:mr-[48px] mb-[100px] md:mb-[150px] xl:mb-[200px] text-[16px] md:text-[18px] xl:text-[22px] font-normal text-right text-[#323232]">
                      (주)W.I.L 대표이사 조경화
                      </p>
                    </motion.div>
                  </div>
                </div>

                {/* 핵심 가치 */}
                <div id="core-value" className="relative w-full md:w-full xl:w-[1504px] pt-[100px] md:pt-[150px] xl:pt-[200px] bg-white px-5 md:px-8 xl:px-0">
                  <motion.p 
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-[24px] md:text-[26px] xl:text-[30px] font-poppins font-semibold text-center text-[#323232]"
                  >
                    Core value
                  </motion.p>
                  <motion.p 
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="pt-[16px] md:pt-[20px] xl:pt-[24px] text-[36px] md:text-[46px] xl:text-[56px] font-medium text-center text-[#92000a] tracking-[-1.8px] md:tracking-[-2.3px] xl:tracking-[-2.8px] leading-[48px] md:leading-[62px] xl:leading-[74px]"
                  >
                    핵심 가치
                  </motion.p>
                  <div className="w-full mt-[60px] md:mt-[80px] xl:mt-[100px] flex flex-col md:flex-row justify-center items-center gap-[20px] md:gap-[20px]">
                    <motion.div 
                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                      viewport={{ once: true }}
                      className='w-full md:w-[320px] xl:w-[488px] h-auto md:h-[482px]'
                    >
                      <div className="w-full md:w-[320px] xl:w-[488px] h-[200px] md:h-[250px] xl:h-[324px] bg-[#92000a] flex justify-center items-center">
                        <img src="/images/company/icon/icon_1.webp" className="w-auto h-[120px] md:h-[150px] xl:h-auto"/>
                      </div>
                      <div className="w-full md:w-[320px] xl:w-[488px] h-[120px] md:h-[140px] xl:h-[158px] bg-[#f8f8f2]">
                        <p className="pt-[24px] md:pt-[28px] xl:pt-[32px] text-[24px] md:text-[26px] xl:text-[30px] h-[45px] md:h-[55px] xl:h-[75px] font-poppins font-bold text-center text-[#1b1b1b]">
                          <span className='text-[#92000a]'>W</span>ORTH
                        </p>
                        <p className="pt-[8px] md:pt-[10px] xl:pt-[12px] text-[16px] md:text-[18px] xl:text-[22px] font-normal text-center text-[#1b1b1b] tracking-[-0.35px] md:tracking-[-0.45px] xl:tracking-[-0.55px]">
                          가치를 찾아가는 도전정신
                        </p>
                      </div>
                    </motion.div>

                    <motion.div 
                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.4 }}
                      viewport={{ once: true }}
                      className='w-full md:w-[320px] xl:w-[488px] h-auto md:h-[482px]'
                    >
                      <div className="w-full md:w-[320px] xl:w-[488px] h-[200px] md:h-[250px] xl:h-[324px] bg-[#92000a] flex justify-center items-center">
                        <img src="/images/company/icon/icon_2.webp" className="w-auto h-[120px] md:h-[150px] xl:h-auto"/>
                      </div>
                      <div className="w-full md:w-[320px] xl:w-[488px] h-[120px] md:h-[140px] xl:h-[158px] bg-[#f8f8f2]">
                        <p className="pt-[24px] md:pt-[28px] xl:pt-[32px] text-[24px] md:text-[26px] xl:text-[30px] h-[45px] md:h-[55px] xl:h-[75px] font-poppins font-bold text-center text-[#1b1b1b]">
                          <span className='text-[#92000a]'>I</span>DENTITY
                        </p>
                        <p className="pt-[8px] md:pt-[10px] xl:pt-[12px] text-[16px] md:text-[18px] xl:text-[22px] font-normal text-center text-[#1b1b1b] tracking-[-0.35px] md:tracking-[-0.45px] xl:tracking-[-0.55px]">
                          정체성을 잃지 않는 개발의지
                        </p>
                      </div>
                    </motion.div>

                    <motion.div 
                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.8 }}
                      viewport={{ once: true }}
                      className='w-full md:w-[320px] xl:w-[488px] h-auto md:h-[482px]'
                    >
                      <div className="w-full md:w-[320px] xl:w-[488px] h-[200px] md:h-[250px] xl:h-[324px] bg-[#92000a] flex justify-center items-center">
                        <img src="/images/company/icon/icon_1.webp" className="w-auto h-[120px] md:h-[150px] xl:h-auto"/>
                      </div>
                      <div className="w-full md:w-[320px] xl:w-[488px] h-[120px] md:h-[140px] xl:h-[158px] bg-[#f8f8f2]">
                        <p className="pt-[24px] md:pt-[28px] xl:pt-[32px] text-[24px] md:text-[26px] xl:text-[30px] h-[45px] md:h-[55px] xl:h-[75px] font-poppins font-bold text-center text-[#1b1b1b]">
                          <span className='text-[#92000a]'>L</span>IFE STYLE
                        </p>
                        <p className="pt-[8px] md:pt-[10px] xl:pt-[12px] text-[16px] md:text-[18px] xl:text-[22px] font-normal text-center text-[#1b1b1b] tracking-[-0.35px] md:tracking-[-0.45px] xl:tracking-[-0.55px]">
                          생의 주기를 함께 하는 회사
                        </p>
                      </div>
                    </motion.div>
                  </div>
                </div>
                


                {/* 조직도 */}
                <div id="organization" className="relative w-full max-w-[1920px] mx-auto pt-[100px] md:pt-[150px] lg:pt-[180px] xl:pt-[200px] bg-white" >
                  <div className="relative w-full aspect-[1920/1254]"> {/* 1920:1594 비율 유지 */}
                    <motion.p 
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                      viewport={{ once: true }}
                      className="text-[24px] md:text-[26px] lg:text-[28px] xl:text-[30px] font-poppins font-semibold text-center text-[#1b1b1b]"
                    >
                      Organizational chart
                    </motion.p>
                    <motion.p 
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      viewport={{ once: true }}
                      className="pt-[16px] md:pt-[20px] lg:pt-[22px] xl:pt-[24px] text-[36px] md:text-[46px] lg:text-[50px] xl:text-[56px] font-medium text-center text-[#92000a] tracking-[-2.8px] leading-[74px]"
                    >
                      조직도
                    </motion.p>
                    
                    {/* 조직도 컨테이너 */}
                    <div className="relative w-full aspect-[1920/1254] mt-[185px]">
                      {/* 중앙 W.I.L 로고 */}
                      <motion.div 
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="absolute top-[22.5%] left-[38.2%] w-[23.125%] aspect-square bg-[#92000a] rounded-full flex items-center justify-center"
                      >
                        <p className="text-[5.208vw] font-poppins font-semibold text-white">W.I.L</p>
                      </motion.div>

                      {/* 왼쪽 그룹 */}
                      <motion.div 
                        initial={{ opacity: 0, scale: 0, x: 100, y: 100 }}
                        whileInView={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        viewport={{ once: true }}
                        className="absolute top-[-2.9%] left-[24.3%] w-[9.375%] aspect-square bg-[#FFD7D7] rounded-full flex items-center justify-center"
                      >
                        <p className="text-[1.146vw] text-normal text-center tracking-[-0.35px]">텍스타일<br/>디자인팀</p>
                      </motion.div>
                      <motion.div 
                        initial={{ opacity: 0, scale: 0, x: 100, y: 100 }}
                        whileInView={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        viewport={{ once: true }}
                        className="absolute top-[9.4%] left-[17%] w-[9.375%] aspect-square bg-[#FFD7D7] rounded-full flex items-center justify-center"
                      >
                        <p className="text-[1.146vw] text-normal text-center tracking-[-0.35px]">라운지웨어<br/>디자인팀</p>
                      </motion.div>
                      <motion.div 
                        initial={{ opacity: 0, scale: 0, x: 100, y: 100 }}
                        whileInView={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        viewport={{ once: true }}
                        className="absolute top-[12.9%] left-[27.8%] w-[9.375%] aspect-square bg-[#FFD7D7] rounded-full flex items-center justify-center"
                      >
                        <p className="text-[1.146vw] text-normal text-center tracking-[-0.35px]">언더웨어<br/>디자인팀</p>
                      </motion.div>

                      {/* 오른쪽 그룹 */}
                      <motion.div 
                        initial={{ opacity: 0, scale: 0, x: -100, y: 100 }}
                        whileInView={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="absolute top-[-8.4%] right-[23.9%] w-[13.021%] aspect-square bg-[#E15B5B] rounded-full flex items-center justify-center"
                      >
                        <p className="text-[1.521vw] text-normal text-center tracking-[-0.51px] text-[#ffffff]">물류센터</p>
                      </motion.div>
                      <motion.div 
                        initial={{ opacity: 0, scale: 0, x: -100, y: 100 }}
                        whileInView={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        viewport={{ once: true }}
                        className="absolute top-[4.5%] right-[40.2%] w-[7.292vw] aspect-square bg-[#f2999f] rounded-full flex items-center justify-center"
                      >
                        <p className="text-[0.833vw] text-normal text-center tracking-[-0.32px] text-[#ffffff]">경영지원팀</p>
                      </motion.div>
                      <motion.div 
                        initial={{ opacity: 0, scale: 0, x: -100, y: 100 }}
                        whileInView={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.7 }}
                        viewport={{ once: true }}
                        className="absolute top-[15.5%] right-[30.1%] w-[7.292vw] aspect-square bg-[#df9398] rounded-full flex items-center justify-center"
                      >
                        <p className="text-[0.833vw] text-normal text-center tracking-[-0.32px] text-[#ffffff]">기획생산팀</p>
                      </motion.div>
                      <motion.div 
                        initial={{ opacity: 0, scale: 0, x: -100, y: 100 }}
                        whileInView={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        viewport={{ once: true }}
                        className="absolute top-[11%] right-[14%] w-[13.021%] aspect-square bg-[#ce5f66] rounded-full flex items-center justify-center"
                      >
                        <p className="text-[1.521vw] text-normal text-center tracking-[-0.51px] text-[#ffffff]">베트남<br/>제조법인</p>
                      </motion.div>
                      
                      {/* 왼쪽 아래 그룹 */}
                      <motion.div 
                        initial={{ opacity: 0, scale: 0, x: 100, y: -100 }}
                        whileInView={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        viewport={{ once: true }}
                        className="absolute top-[51.5%] left-[26.5%] w-[9.375%] aspect-square bg-[#f2bbbf] rounded-full flex items-center justify-center"
                      >
                        <p className="text-[1.146vw] text-normal text-center tracking-[-0.35px] text-[#1b1b1b]">홈쇼핑<br/>커머스팀</p>
                      </motion.div>
                      <motion.div 
                        initial={{ opacity: 0, scale: 0, x: 100, y: -100 }}
                        whileInView={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                        viewport={{ once: true }}
                        className="absolute top-[64%] left-[19.3%] w-[9.375%] aspect-square bg-[#f2bbbf] rounded-full flex items-center justify-center"
                      >
                        <p className="text-[1.146vw] text-normal text-center tracking-[-0.35px] text-[#1b1b1b]">온라인<br/>커머스팀</p>
                      </motion.div>
                      <motion.div 
                        initial={{ opacity: 0, scale: 0, x: 100, y: -100 }}
                        whileInView={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.7 }}
                        viewport={{ once: true }}
                        className="absolute top-[67%] left-[30%] w-[9.375%] aspect-square bg-[#f2bbbf] rounded-full flex items-center justify-center"
                      >
                        <p className="text-[1.146vw] text-normal text-center tracking-[-0.35px] text-[#1b1b1b]">오프라인<br/>커머스팀</p>
                      </motion.div>

                      {/* 오른쪽 아래 그룹 */}
                      <motion.div 
                        initial={{ opacity: 0, scale: 0, x: -100, y: -100 }}
                        whileInView={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        viewport={{ once: true }}
                        className="absolute top-[50%] right-[24.7%] w-[13.021%] aspect-square bg-[#e6646c] rounded-full flex items-center justify-center"
                      >
                        <p className="text-[1.521vw] text-normal text-center tracking-[-0.51px] text-[#ffffff]">신규사업본부</p>
                      </motion.div>
                      <motion.div 
                        initial={{ opacity: 0, scale: 0, x: -100, y: -100 }}
                        whileInView={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        viewport={{ once: true }}
                        className="absolute top-[56%] right-[17.2%] w-[6.25%] aspect-square bg-[#e6646c] rounded-full flex items-center justify-center"
                      >
                        <p className="text-[0.833vw] text-normal text-center tracking-[-0.26px] text-[#ffffff]">라페어라운지<br/>(신논현)</p>
                      </motion.div>
                      <motion.div 
                        initial={{ opacity: 0, scale: 0, x: -100, y: -100 }}
                        whileInView={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                        viewport={{ once: true }}
                        className="absolute top-[67%] right-[18.7%] w-[6.25%] aspect-square bg-[#e6646c] rounded-full flex items-center justify-center"
                      >
                        <p className="text-[0.833vw] text-normal text-center tracking-[-0.26px] text-[#ffffff]">라페어라운지<br/>(논현)</p>
                      </motion.div>
                      <motion.div 
                        initial={{ opacity: 0, scale: 0, x: -100, y: -100 }}
                        whileInView={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                        transition={{ duration: 0.6, delay: 1.0 }}
                        viewport={{ once: true }}
                        className="absolute top-[71.5%] right-[25.2%] w-[6.25%] aspect-square bg-[#e6646c] rounded-full flex items-center justify-center"
                      >
                        <p className="text-[0.833vw] text-normal text-center tracking-[-0.26px] text-[#ffffff]">라페어라운지<br/>(신사)</p>
                      </motion.div>
                    </div>
                  </div>
                </div>
                {/* 조직도 컨테이너 끝 */}
                {/* 히스토리 */}
                <div className="relative w-full  h-fit  flex items-start justify-center bg-white overflow-visible">
                  <div className="sticky right-[64%] top-[200px] md:top-[250px] xl:top-[300px] h-fit z-10 sticky-title px-5 md:px-8 xl:px-0">
                    <motion.p 
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                      viewport={{ once: true }}
                      className="text-[24px] md:text-[26px] xl:text-[30px] font-poppins font-semibold text-start text-[#1b1b1b]"
                    >
                      History
                    </motion.p>
                    <motion.p 
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      viewport={{ once: true }}
                      className="pt-[16px] md:pt-[20px] xl:pt-[24px] text-[36px] md:text-[46px] xl:text-[56px] font-medium text-center text-[#92000a] tracking-[-1.8px] md:tracking-[-2.3px] xl:tracking-[-2.8px] leading-[48px] md:leading-[62px] xl:leading-[74px]"
                    >
                      가치를 만들어 온 여정
                    </motion.p>
                  </div>
                  <div ref={historyContainerRef} className="relative w-fit mt-[50px] px-5 md:px-8 xl:px-0">
                    <div className="history-item relative w-auto h-auto pb-[60px] md:pb-[80px] xl:pb-[100px]">
                      <p className="relative text-[56px] md:text-[82px] xl:text-[102px] font-poppins font-semibold flex items-end leading-none h-[60px] md:h-[86px] xl:h-[107px] text-[#979797]">
                        2024
                      </p>
                      <div className="w-auto h-auto mt-[40px] md:mt-[50px] xl:mt-[60px]">
                        <p className="text-[16px] md:text-[18px] xl:text-[22px] font-normal text-left tracking-[-0.25px] md:tracking-[-0.3px] xl:tracking-[-0.35px] text-[#979797]">
                          라페어 인견팬티 &quot;800만장&quot;돌파
                        </p>
                        <p className="text-[16px] md:text-[18px] xl:text-[22px] font-normal text-left tracking-[-0.25px] md:tracking-[-0.3px] xl:tracking-[-0.35px] text-[#979797]">
                          코스트코 판매채널 확장
                        </p>
                        <p className="text-[16px] md:text-[18px] xl:text-[22px] font-normal text-left tracking-[-0.25px] md:tracking-[-0.3px] xl:tracking-[-0.35px] text-[#979797]">
                          이마트입점
                        </p>
                        <p className="text-[16px] md:text-[18px] xl:text-[22px] font-normal text-left tracking-[-0.25px] md:tracking-[-0.3px] xl:tracking-[-0.35px] text-[#979797]">
                          몽골 이마트 라페어 언더웨어 제품 수출
                        </p>
                      </div>
                    </div>
                    
                    <div className="history-item relative w-auto h-auto pb-[60px] md:pb-[80px] xl:pb-[100px]">
                      <p className="relative text-[56px] md:text-[82px] xl:text-[102px] font-poppins font-semibold flex items-end leading-none h-[60px] md:h-[86px] xl:h-[107px] text-[#979797]">
                        2023
                      </p>
                      <div className="w-auto h-auto mt-[40px] md:mt-[50px] xl:mt-[60px]">
                        <p className="text-[16px] md:text-[18px] xl:text-[22px] font-normal text-left tracking-[-0.25px] md:tracking-[-0.3px] xl:tracking-[-0.35px] text-[#979797]">
                          GS홈쇼핑 L&apos;AFFAIR 채널 확장
                        </p>
                        <p className="text-[16px] md:text-[18px] xl:text-[22px] font-normal text-left tracking-[-0.25px] md:tracking-[-0.3px] xl:tracking-[-0.35px] text-[#979797]">
                          마켓컬리 입점
                        </p>
                      </div>
                    </div>

                    <div className="history-item relative w-auto h-auto">
                      <p className="relative text-[56px] md:text-[82px] xl:text-[102px] font-poppins font-semibold flex items-end leading-none h-[60px] md:h-[86px] xl:h-[107px] text-[#979797]">
                        2023
                      </p>
                      <div className="w-auto h-auto mt-[40px] md:mt-[50px] xl:mt-[60px]">
                        <p className="text-[16px] md:text-[18px] xl:text-[22px] font-normal text-left tracking-[-0.25px] md:tracking-[-0.3px] xl:tracking-[-0.35px] text-[#979797]">
                          브라런닝 자체 개발 
                        </p>
                        <p className="text-[16px] md:text-[18px] xl:text-[22px] font-normal text-left tracking-[-0.25px] md:tracking-[-0.3px] xl:tracking-[-0.35px] text-[#979797]">
                          선데이라운지 카카오메이커스 런칭
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* 히스토리 끝 */}

                {/* 함께 하는 협력사 */}
                <div className="relative w-full  h-[fit] bg-white" >
                  <div className="relative w-auto h-[fit] mt-[100px] md:mt-[150px] xl:mt-[200px] left-1/2 translate-x-[-50%] flex flex-col items-center justify-center" >
                    <motion.p 
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                      viewport={{ once: true }}
                      className="text-[24px] md:text-[26px] xl:text-[30px] font-poppins font-semibold text-center text-[#1b1b1b]"
                    >
                      Partners
                    </motion.p>
                    <motion.p 
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      viewport={{ once: true }}
                      className="pt-[16px] md:pt-[20px] xl:pt-[24px] text-[36px] md:text-[46px] xl:text-[56px] font-medium text-center text-[#92000a] tracking-[-1.8px] md:tracking-[-2.3px] xl:tracking-[-2.8px] leading-[48px] md:leading-[62px] xl:leading-[74px]"
                    >
                      함께 하는 협력사
                    </motion.p>
                  </div>
                  <div className="relative w-full   h-[200px] md:h-[240px] xl:h-[280.8px] mt-[60px] md:mt-[80px] xl:mt-[100px] overflow-hidden">
                    {/* 첫 번째 줄 - 왼쪽으로 이동 */}
                    <div className="relative w-auto h-auto flex items-start">
                      <motion.div 
                        initial={{ x: 0 }}
                        animate={{ x: "-100%" }}
                        transition={{
                          duration: 25,
                          repeat: Infinity,
                          repeatType: "loop",
                          ease: "linear"
                        }}
                        className="flex items-center justify-center h-[40px] md:h-[56px] xl:h-[73px] shrink-0"
                      >
                        <div className="flex items-center gap-[40px] md:gap-[70px] xl:gap-[100px] pr-[40px] md:pr-[70px] xl:pr-[100px]">
                          <img src="/images/company/etc/m.webp" className="h-[20px] md:h-[28px] xl:h-auto w-auto"/>
                          <img src="/images/company/etc/29-cm.webp" className="h-[20px] md:h-[28px] xl:h-auto w-auto"/>
                          <img src="/images/company/etc/w.webp" className="h-[20px] md:h-[28px] xl:h-auto w-auto"/>
                          <img src="/images/company/etc/ssg.webp" className="h-[20px] md:h-[28px] xl:h-auto w-auto"/>
                          <img src="/images/company/etc/h.webp" className="h-[20px] md:h-[28px] xl:h-auto w-auto"/>
                          <img src="/images/company/etc/s.webp" className="h-[20px] md:h-[28px] xl:h-auto w-auto"/>
                          <img src="/images/company/etc/ss.webp" className="h-[20px] md:h-[28px] xl:h-auto w-auto"/>
                        </div>
                      </motion.div>
                      <motion.div 
                        initial={{ x: 0 }}
                        animate={{ x: "-100%" }}
                        transition={{
                          duration: 25,
                          repeat: Infinity,
                          repeatType: "loop",
                          ease: "linear"
                        }}
                        className="flex items-center justify-center h-[40px] md:h-[56px] xl:h-[73px] shrink-0"
                      >
                        <div className="flex items-center gap-[40px] md:gap-[70px] xl:gap-[100px] pr-[40px] md:pr-[70px] xl:pr-[100px]">
                          <img src="/images/company/etc/m.webp" className="h-[20px] md:h-[28px] xl:h-auto w-auto"/>
                          <img src="/images/company/etc/29-cm.webp" className="h-[20px] md:h-[28px] xl:h-auto w-auto"/>
                          <img src="/images/company/etc/w.webp" className="h-[20px] md:h-[28px] xl:h-auto w-auto"/>
                          <img src="/images/company/etc/ssg.webp" className="h-[20px] md:h-[28px] xl:h-auto w-auto"/>
                          <img src="/images/company/etc/h.webp" className="h-[20px] md:h-[28px] xl:h-auto w-auto"/>
                          <img src="/images/company/etc/s.webp" className="h-[20px] md:h-[28px] xl:h-auto w-auto"/>
                          <img src="/images/company/etc/ss.webp" className="h-[20px] md:h-[28px] xl:h-auto w-auto"/>
                        </div>
                      </motion.div>
                    </div>

                    {/* 두 번째 줄 - 오른쪽으로 이동 */}
                    <div className="relative w-auto h-auto mt-[60px] md:mt-[80px] xl:mt-[100px] flex items-start">
                      <motion.div 
                        initial={{ x: "-100%" }}
                        animate={{ x: 0 }}
                        transition={{
                          duration: 25,
                          repeat: Infinity,
                          repeatType: "loop",
                          ease: "linear"
                        }}
                        className="flex items-center justify-center h-[50px] md:h-[70px] xl:h-[90px] shrink-0"
                      >
                        <div className="flex items-center justify-center gap-[40px] md:gap-[70px] xl:gap-[100px] pr-[40px] md:pr-[70px] xl:pr-[100px]">
                          <img src="/images/company/etc/sk.webp" className="h-[25px] md:h-[35px] xl:h-auto w-auto"/>
                          <img src="/images/company/etc/l.webp" className="h-[25px] md:h-[35px] xl:h-auto w-auto"/>
                          <img src="/images/company/etc/ns.webp" className="h-[25px] md:h-[35px] xl:h-auto w-auto"/>
                          <img src="/images/company/etc/kt.webp" className="h-[25px] md:h-[35px] xl:h-auto w-auto"/>
                          <img src="/images/company/etc/gs.webp" className="h-[25px] md:h-[35px] xl:h-auto w-auto"/>
                          <img src="/images/company/etc/hs.webp" className="h-[25px] md:h-[35px] xl:h-auto w-auto"/>
                          <img src="/images/company/etc/hh.webp" className="h-[25px] md:h-[35px] xl:h-auto w-auto"/>
                        </div>
                      </motion.div>
                      <motion.div 
                        initial={{ x: "-100%" }}
                        animate={{ x: 0 }}
                        transition={{
                          duration: 25,
                          repeat: Infinity,
                          repeatType: "loop",
                          ease: "linear"
                        }}
                        className="flex items-center justify-center h-[50px] md:h-[70px] xl:h-[90px] shrink-0"
                      >
                        <div className="flex items-center justify-center gap-[40px] md:gap-[70px] xl:gap-[100px] pr-[40px] md:pr-[70px] xl:pr-[100px]">
                          <img src="/images/company/etc/sk.webp" className="h-[25px] md:h-[35px] xl:h-auto w-auto"/>
                          <img src="/images/company/etc/l.webp" className="h-[25px] md:h-[35px] xl:h-auto w-auto"/>
                          <img src="/images/company/etc/ns.webp" className="h-[25px] md:h-[35px] xl:h-auto w-auto"/>
                          <img src="/images/company/etc/kt.webp" className="h-[25px] md:h-[35px] xl:h-auto w-auto"/>
                          <img src="/images/company/etc/gs.webp" className="h-[25px] md:h-[35px] xl:h-auto w-auto"/>
                          <img src="/images/company/etc/hs.webp" className="h-[25px] md:h-[35px] xl:h-auto w-auto"/>
                          <img src="/images/company/etc/hh.webp" className="h-[25px] md:h-[35px] xl:h-auto w-auto"/>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>
                {/* 함께 하는 협력사 끝 */}

                {/* 오시는 길 */}
                <div id="location" className="relative w-full  h-auto bg-white">
                  <div className="relative w-auto h-auto mt-[100px] md:mt-[150px] lg:mt-[180px] xl:mt-[200px] px-5 md:px-8 lg:px-[60px] xl:px-0 flex flex-col items-center justify-center">
                    <motion.p 
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                      viewport={{ once: true }}
                      className="text-[24px] md:text-[26px] lg:text-[28px] xl:text-[30px] font-poppins font-semibold text-center text-[#1b1b1b]"
                    >
                      Address
                    </motion.p>
                    <motion.p 
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      viewport={{ once: true }}
                      className="pt-[16px] md:pt-[20px] lg:pt-[22px] xl:pt-[24px] text-[36px] md:text-[46px] lg:text-[50px] xl:text-[56px] font-medium text-center text-[#92000a] tracking-[-1.8px] md:tracking-[-2.3px] lg:tracking-[-2.5px] xl:tracking-[-2.8px] leading-[48px] md:leading-[62px] lg:leading-[68px] xl:leading-[74px]"
                    >
                      무인매장 오시는 길
                    </motion.p>
                  </div>

                  {/* 매장 위치 정보 컨테이너 */}
                  <div className="relative w-full h-auto mt-[60px] md:mt-[80px] lg:mt-[90px] xl:mt-[100px] flex flex-col items-center justify-center gap-[40px] md:gap-[60px] lg:gap-[60px] xl:gap-[60px] px-5 md:px-8 lg:px-[60px] xl:px-[117px]">
                    {/* 신사역점 */}
                    <div className="relative w-full flex flex-col lg:flex-row xl:flex-row items-center justify-center gap-[20px] lg:gap-[40px] xl:gap-[54px]">
                      <div className="relative w-full md:w-[700px] lg:w-[320px] xl:w-[380px] h-[180px] md:h-[220px] lg:h-[380px] xl:h-[446px] flex items-center justify-center bg-[#323232] rounded-[20px] md:rounded-[30px] lg:rounded-[35px] xl:rounded-[40px]">
                        <div className="relative w-auto h-auto flex-col items-start justify-start px-[20px] md:px-[30px] lg:px-[35px] xl:px-[40px]">
                          <p className="text-[24px] md:text-[26px] lg:text-[28px] xl:text-[30px] font-semibold text-left text-[#ffffff]">신사역점</p>
                          <p className="mt-[12px] md:mt-[16px] lg:mt-[19px] xl:mt-[22px] text-[16px] md:text-[18px] lg:text-[20px] xl:text-[22px] font-normal text-left text-[#ffffff] tracking-[-0.4px] leading-[24px] md:leading-[28px] lg:leading-[32px] xl:leading-[36px]">
                            서울 강남구 압구정로 165<br/>압구정역 라페어라운지
                          </p>
                        </div>
                      </div>
                      <div id="sinsa-map" className="relative w-full md:w-[700px] lg:w-[644px] xl:w-[1069px] h-[280px] md:h-[400px] lg:h-[380px] xl:h-[446px] rounded-[20px] md:rounded-[30px] lg:rounded-[35px] xl:rounded-[40px] overflow-hidden"></div>
                    </div>

                    {/* 신논현역점 */}
                    <div className="relative w-full flex flex-col-reverse lg:flex-row xl:flex-row items-center justify-center gap-[20px] lg:gap-[40px] xl:gap-[54px]">
                      <div id="sinnonhyeon-map" className="relative w-full md:w-[700px] lg:w-[644px] xl:w-[1069px] h-[280px] md:h-[400px] lg:h-[380px] xl:h-[446px] rounded-[20px] md:rounded-[30px] lg:rounded-[35px] xl:rounded-[40px] overflow-hidden"></div>
                      <div className="relative w-full md:w-[700px] lg:w-[320px] xl:w-[380px] h-[180px] md:h-[220px] lg:h-[380px] xl:h-[446px] flex items-center justify-center bg-[#323232] rounded-[20px] md:rounded-[30px] lg:rounded-[35px] xl:rounded-[40px]">
                        <div className="relative w-auto h-auto flex-col items-start justify-start px-[20px] md:px-[30px] lg:px-[35px] xl:px-[40px]">
                          <p className="text-[24px] md:text-[26px] lg:text-[28px] xl:text-[30px] font-semibold text-left text-[#ffffff]">신논현역점</p>
                          <p className="mt-[12px] md:mt-[16px] lg:mt-[19px] xl:mt-[22px] text-[16px] md:text-[18px] lg:text-[20px] xl:text-[22px] font-normal text-left text-[#ffffff] tracking-[-0.4px] leading-[24px] md:leading-[28px] lg:leading-[32px] xl:leading-[36px]">
                            서울 강남구 압구정로 165<br/>압구정역 라페어라운지
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* 논현역점 */}
                    <div className="relative w-full flex flex-col lg:flex-row xl:flex-row items-center justify-center gap-[20px] lg:gap-[40px] xl:gap-[54px]">
                      <div className="relative w-full md:w-[700px] lg:w-[320px] xl:w-[380px] h-[180px] md:h-[220px] lg:h-[380px] xl:h-[446px] flex items-center justify-center bg-[#323232] rounded-[20px] md:rounded-[30px] lg:rounded-[35px] xl:rounded-[40px]">
                        <div className="relative w-auto h-auto flex-col items-start justify-start px-[20px] md:px-[30px] lg:px-[35px] xl:px-[40px]">
                          <p className="text-[24px] md:text-[26px] lg:text-[28px] xl:text-[30px] font-semibold text-left text-[#ffffff]">논현역점</p>
                          <p className="mt-[12px] md:mt-[16px] lg:mt-[19px] xl:mt-[22px] text-[16px] md:text-[18px] lg:text-[20px] xl:text-[22px] font-normal text-left text-[#ffffff] tracking-[-0.4px] leading-[24px] md:leading-[28px] lg:leading-[32px] xl:leading-[36px]">
                            서울 강남구 압구정로 165<br/>압구정역 라페어라운지
                          </p>
                        </div>
                      </div>
                      <div id="nonhyeon-map" className="relative w-full md:w-[700px] lg:w-[644px] xl:w-[1069px] h-[280px] md:h-[400px] lg:h-[380px] xl:h-[446px] rounded-[20px] md:rounded-[30px] lg:rounded-[35px] xl:rounded-[40px] overflow-hidden"></div>
                    </div>
                  </div>
                </div>

                {/* 본사 위치 */}
                <div className="relative w-full mt-[200px] mb-[200px] h-fit  bg-[#ffffff] flex flex-col items-center justify-start">
                  <motion.p 
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-[24px] md:text-[26px] xl:text-[30px] font-poppins font-semibold text-center text-[#1b1b1b]"
                  >
                    Address
                  </motion.p>
                  <motion.p 
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="pt-[16px] md:pt-[20px] xl:pt-[24px] text-[36px] md:text-[46px] xl:text-[56px] font-medium text-center text-[#92000a] tracking-[-1.8px] md:tracking-[-2.3px] xl:tracking-[-2.8px] leading-[48px] md:leading-[62px] xl:leading-[74px]"
                  >
                    더블유아이엘 오시는 길
                  </motion.p>
                  <div className="relative w-full md:w-[700px] xl:w-[1251px] h-auto xl:h-[701px] mt-[60px] md:mt-[80px] xl:mt-[100px] flex-col items-start justify-start px-5 md:px-0">
                    <div className="relative w-auto h-auto flex flex-wrap md:flex-nowrap items-center justify-center gap-[20px] md:gap-[30px] xl:gap-[50px]">
                      <button 
                        onClick={() => handleTabChange('headquarters')}
                        className={`text-[18px] md:text-[20px] xl:text-[24px] text-center tracking-[-0.45px] md:tracking-[-0.5px] xl:tracking-[-0.62px] ${selectedTab === 'headquarters' ? 'text-[#2f2e2c] font-bold' : 'text-[#999999] font-normal'}`}
                      >
                        본사
                      </button>
                      <button 
                        onClick={() => handleTabChange('logistics')}
                        className={`text-[18px] md:text-[20px] xl:text-[24px] text-center tracking-[-0.45px] md:tracking-[-0.5px] xl:tracking-[-0.62px] ${selectedTab === 'logistics' ? 'text-[#2f2e2c] font-bold' : 'text-[#999999] font-normal'}`}
                      >
                        물류센터
                      </button>
                      <button 
                        onClick={() => handleTabChange('vietnam')}
                        className={`text-[18px] md:text-[20px] xl:text-[24px] text-center tracking-[-0.45px] md:tracking-[-0.5px] xl:tracking-[-0.62px] ${selectedTab === 'vietnam' ?  'text-[#2f2e2c] font-bold' : 'text-[#999999] font-normal'}`}
                      >
                        베트남법인
                      </button>
                      <button 
                        onClick={() => handleTabChange('shinsegae')}
                        className={`text-[18px] md:text-[20px] xl:text-[24px] text-center tracking-[-0.45px] md:tracking-[-0.5px] xl:tracking-[-0.62px] ${selectedTab === 'shinsegae' ?  'text-[#2f2e2c] font-bold' : 'text-[#999999] font-normal'}`}
                      >
                        신세계백화점 김해점
                      </button>
                    </div>
                    <div id="company-map" className="relative mt-[20px] md:mt-[24px] xl:mt-[32px] w-full md:w-[700px] xl:w-[1250px] h-[300px] md:h-[400px] xl:h-[516px]"></div>

                    <div className="relative mt-[40px] md:mt-[50px] xl:mt-[60px] w-full md:w-[700px] xl:w-[1250px] h-auto flex flex-col md:flex-row items-start md:items-center justify-between">
                      <p className="text-[28px] md:text-[32px] xl:text-[40px] font-bold text-left text-[#2f2e2c] tracking-[-0.7px] md:tracking-[-0.8px] xl:tracking-[-1.04px]">
                        {locations[selectedTab].title}
                      </p>
                      <div className="flex-col items-start justify-start mt-[20px] md:mt-0 md:mr-[40px] xl:mr-[67px]">
                        <div className="flex items-start justify-start">
                          <p className="text-[16px] md:text-[18px] xl:text-[22px] font-bold text-left text-[#2f2e2c] tracking-[-0.4px] md:tracking-[-0.45px] xl:tracking-[-0.57px] w-[50px] md:w-[55px] xl:w-[60px]">주소</p>
                          <p className="ml-[12px] md:ml-[15px] xl:ml-[17px] text-[16px] md:text-[18px] xl:text-[22px] font-normal text-left text-[#2f2e2c] tracking-[-0.4px] md:tracking-[-0.45px] xl:tracking-[-0.57px] break-keep">
                            {locations[selectedTab].address}
                          </p>
                        </div>
                        <div className="flex items-start justify-start mt-[8px] md:mt-[10px] xl:mt-[12px]">
                          <p className="text-[16px] md:text-[18px] xl:text-[22px] font-bold text-left text-[#2f2e2c] tracking-[-0.4px] md:tracking-[-0.45px] xl:tracking-[-0.57px] w-[50px] md:w-[55px] xl:w-[60px]">전화</p>
                          <p className="ml-[12px] md:ml-[15px] xl:ml-[17px] text-[16px] md:text-[18px] xl:text-[22px] font-normal text-left text-[#2f2e2c] tracking-[-0.4px] md:tracking-[-0.45px] xl:tracking-[-0.57px]">
                            {locations[selectedTab].phone}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </ReactLenis>
  );
}

export default Company;
