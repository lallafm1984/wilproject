"use client";
import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCreative, Navigation, Pagination } from 'swiper/modules';
import { default as NextImage } from 'next/image';

import mainBgImage from '../../../public/Images/main1.png';

// Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-creative';


export default function Main() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const heroSectionRef = useRef(null);
  const lastScrollTime = useRef(Date.now());
  const scrollCount = useRef(0);
  const maxScrollCount = 10;
  const isEventComplete = useRef(false);
  const isScrollingDown = useRef(false);
  const [windowWidth, setWindowWidth] = useState(undefined);
  const [textGap, setTextGap] = useState(0);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const swiperRef = useRef(null);
  // 초기 위치 계산을 위한 ref
  const initialPositionSet = useRef(false);
  const isFirstScroll = useRef(true);  // 첫 스크롤 여부 체크용

  const secondSectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: secondSectionRef,
    offset: ["start end", "start center"],
    layoutEffect: false
  });

  const opacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);
  const y = useTransform(scrollYProgress, [0.1, 0.5], [100, 0]);

  const containerVariants = {
    hidden: { 
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.5
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 50 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.3
      }
    }
  };

  // 7개의 슬라이드
  const slides = [
    { id: 1, image: '/Images/img2.png', title: '코랄 수딩웜 맞주름 원피스', price: '39,900원' },
    { id: 2, image: '/Images/img2.png', title: '골드가든 네이비 팬츠', price: '19,900원' },
    { id: 3, image: '/Images/img2.png', title: '베이지 핑크 수딩웜 조거팬츠', price: '19,900원' },
    { id: 4, image: '/Images/img2.png', title: '블랙 슬림핏 레깅스', price: '29,900원' },
    { id: 5, image: '/Images/img2.png', title: '화이트 캐시미어 니트', price: '49,900원' },
    { id: 6, image: '/Images/img2.png', title: '릴리 블라썸 벨로아 라운지 셋업', price: '45,900원' },
    { id: 7, image: '/Images/img2.png', title: '네이비 울 코트', price: '89,900원' }
  ];
   
  // 현재 활성 슬라이드 인덱스 상태 추가
  const [activeIndex, setActiveIndex] = useState(0);

  // touchStart ref 추가
  const touchStart = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  useEffect(() => {
    const handleScrollEvent = (deltaY) => {
      const currentTime = Date.now();
      if (currentTime - lastScrollTime.current < 5) return false;
      
      const heroSection = heroSectionRef.current;
      if (!heroSection) return false;
      
      const heroRect = heroSection.getBoundingClientRect();
      isScrollingDown.current = deltaY > 1;

      // 애니메이션이 완료되었고 maxScrollCount에 도달한 경우 스크롤 허용
      if (isEventComplete.current && scrollCount.current >= maxScrollCount) {
        setIsAnimating(false);
        return true;  // 스크롤 허용
      }

      if (!isEventComplete.current) {
        const delta = isScrollingDown.current ? 1 : -1;
        const incrementValue = Math.min(Math.abs(deltaY) / 10, 1);
        
        const prevScrollCount = scrollCount.current;
        
        scrollCount.current = Math.max(
          0, 
          Math.min(
            maxScrollCount, 
            scrollCount.current + (delta * incrementValue)
          )
        );

        const progress = (scrollCount.current / maxScrollCount) * 100;
        setScrollProgress(progress);
        
        if (prevScrollCount !== scrollCount.current) {
          if (isFirstScroll.current) {
            isFirstScroll.current = false;
          }
          setIsAnimating(true);
        }
        
        // maxScrollCount에 도달했을 때의 처리 수정
        if (scrollCount.current >= maxScrollCount && !isEventComplete.current) {
          setIsAnimating(true);  // 애니메이션 진행 중 표시
          setTimeout(() => {
            isEventComplete.current = true;
            setIsAnimating(false);
          }, 100);
        }
        return false;
      }
      
      lastScrollTime.current = currentTime;
      return true;
    };

    const handleWheel = (e) => {
      // 애니메이션이 완료되고 maxScrollCount에 도달한 경우에만 스크롤 허용
      if (isEventComplete.current && scrollCount.current >= maxScrollCount) {
        return;  // 기본 스크롤 동작 허용
      }
      
      e.preventDefault();
      handleScrollEvent(e.deltaY);
    };

    const handleTouchStart = (e) => {
      touchStart.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      if (touchStart.current === null) return;
      
      const currentTime = Date.now();
      if(!isEventComplete.current || !scrollCount.current-1 >= maxScrollCount){
        if (currentTime - lastScrollTime.current < 50) return;
      }
      const deltaY = touchStart.current - e.touches[0].clientY;
      const adjustedDeltaY = deltaY / 3;
      
      if (Math.abs(adjustedDeltaY) < 1) return;
      
      // 애니메이션이 완료되고 maxScrollCount에 도달한 경우에만 스크롤 허용
      if (isEventComplete.current && scrollCount.current >= maxScrollCount) {
        return;  // 기본 스크롤 동작 허용
      }
      
      e.preventDefault();
      handleScrollEvent(adjustedDeltaY);
      
      touchStart.current = e.touches[0].clientY;
      lastScrollTime.current = currentTime;
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    
    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isAnimating]);

  // heroSection의 터치 이벤트 리스너 수정
  useEffect(() => {
    const heroSection = heroSectionRef.current;
    if (!heroSection) return;

    const preventScroll = (e) => {
      // 애니메이션이 완료되고 maxScrollCount에 도달한 경우에만 스크롤 허용
      if (!isEventComplete.current || scrollCount.current < maxScrollCount) {
        e.preventDefault();
      }
    };

    heroSection.addEventListener('touchmove', preventScroll, { passive: false });
    
    return () => {
      heroSection.removeEventListener('touchmove', preventScroll);
    };
  }, [isAnimating]);

  useEffect(() => {
    // 초기 윈도우 너비를 한 번만 설정
    if (!initialPositionSet.current) {
      setWindowWidth(window.innerWidth);
      initialPositionSet.current = true;
    }

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (!isInitialLoad) {
        setTextGap(window.innerWidth/550 * scrollProgress);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [scrollProgress, isInitialLoad]);

  // 스크롤 진행도에 따른 textGap 업데이트
  useEffect(() => {
    if (!isInitialLoad && windowWidth) {
      setTextGap(windowWidth/550 * scrollProgress);
    }
  }, [scrollProgress, windowWidth, isInitialLoad]);

  // 초기 로드 상태 해제
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoad(false);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

 
  const calculateScale = progress => {
    const p = progress / 100;
    return 0.2+ (0.8 * p);
  };

  const imageScale = calculateScale(scrollProgress);

  // transform 계산
  const leftTransform = windowWidth === undefined ? 0 : -windowWidth/5 + (isInitialLoad ? 0 : textGap);
  const rightTransform = windowWidth === undefined ? 0 : windowWidth/5 - (isInitialLoad ? 0 : textGap);

  // 반응형 폰트 사이즈 조정
  const getFontSize = () => {
    if (windowWidth < 768) {
      return 'clamp(1rem, 8vw, 2.25rem)';
    }
    return 'clamp(2.25rem, 5vw, 12rem)';
  };

  // 초기 로딩 중에는 텍스트를 숨김
  if (windowWidth === undefined) {
    return null;
  }

  return (
    <div className="w-full mx-auto relative [overflow:hidden] [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <div 
        ref={heroSectionRef}
        className="relative w-full h-screen bg-[#2F2E2B] overflow-hidden "
        style={{ 
          position: 'sticky',
          top: 0,
          zIndex: 50
        }}
      >
        <div
          className="inset-0 w-full h-full absolute"
          style={{
            transform: `scale(${imageScale})`,
            transition: isScrollingDown.current ? 
              'transform 800ms cubic-bezier(0.23, 1, 0.32, 1)' : 
              'transform 800ms cubic-bezier(0.32, 1, 0.23, 1)'
          }}
        >
          <NextImage
            src={mainBgImage}
            alt="메인 배경"
            fill
            priority
            quality={85}
            className="object-cover"
            sizes="100vw"
            placeholder="blur"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative h-full flex flex-col2 items-center justify-center px-4 mt-0 gap-8">
          <div className="text-center">
            <p 
              className="font-semibold text-white"
              style={{
                fontSize: getFontSize(),
                transform: `translateX(${leftTransform}px)`,
                transition: 'transform 800ms cubic-bezier(0.23, 1, 0.32, 1)'
              }}
            >
              언제<br className="block sm:hidden" /> 어디서나
            </p>
          </div>
          <div className="text-center">
            <p 
              className="font-semibold text-white"
              style={{
                fontSize: getFontSize(),
                transform: `translateX(${rightTransform}px)`,
                transition: 'transform 800ms cubic-bezier(0.23, 1, 0.32, 1)'
              }}
            >
              골라입는<br className="block sm:hidden" /> 재미
            </p>
          </div>
          <div 
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
            style={{
              opacity: 1 - (scrollProgress / 20),
              transition: 'opacity 800ms cubic-bezier(0.23, 1, 0.32, 1)'
            }}
          >
         
          </div>
        </div>
      </div>
      <div className="w-full bg-white pt-[200px] pb-[200px]">
      <motion.div 
        ref={secondSectionRef}
        style={{
          opacity,
          y
        }}
      >
        <div className="w-full max-w-[1920px] mx-auto relative ">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="w-full px-4"
          >
            <div className="w-full flex flex-col md:flex-row justify-center items-center xl:items-start">
              {/* 텍스트 영역 */}
              <div className="w-[450px] xl:w-[660px] xl:pt-[99px] px-4 xl:px-0 text-center xl:text-left">
                <motion.div variants={itemVariants}>
                  <p className="text-2xl md:text-4xl xl:text-[56px] font-medium text-[#1b1b1b] leading-[1.3]">
                    언더웨어부터 액티브웨어까지
                  </p>
                  <p className="text-2xl md:text-4xl xl:text-[56px] font-medium text-[#91000a] mt-4 xl:mt-8 leading-[1.3]">
                    온ㆍ오프라인 동시에 만나요
                  </p>
                </motion.div>
                <motion.div 
                  variants={itemVariants}
                  className="mt-8 xl:mt-[74.5px]"
                >
                  <p className="text-base md:text-lg xl:text-[22px] font-regular text-[#323232] leading-[1.6] xl:leading-[1.8] px-4 xl:px-0">
                    라페어라운지는 언더웨어부터 홈웨어,리조트웨어
                    <br/>
                    액티브웨어까지 다양한 라이프웨어를 온라인 쇼핑몰과
                    <br/>
                    오프라인 매장에서 구매할 수 있는 라이프웨어 브랜드샵입니다.
                  </p>
                </motion.div>
              </div>
              
              {/* 이미지 영역 */}
              <motion.div 
                variants={itemVariants}
                className="xl:w-[540px] md:w-[400px] w-[300px] xl:h-[540px] md:h-[400px] h-[300px]  bg-[#B4B4B4] mt-8 xl:mt-0 md:ml-[20px] xl:ml-[102px]"
              >
                {/* 이미지 영역 */}
              </motion.div>
            </div>
          </motion.div>

          {/* AI 키오스크 섹션 */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="w-full px-4 md:px-8 xl:px-0"
          >
            <div className="w-full flex flex-col md:flex-row justify-center items-center xl:items-start gap-8 xl:gap-0">
              {/* 이미지 영역 */}
              <motion.div 
                variants={itemVariants}
                className="xl:w-[402px] md:w-[322px] w-[281px] xl:h-[520px] md:h-[416px] h-[364px] bg-[#B4B4B4] order-2 md:order-1"
              >
                {/* 이미지 영역 */}
              </motion.div>
              
              {/* 텍스트 영역 */}
              <div className="w-[450px] xl:w-[660px] xl:pt-[99px] xl:pl-[68px] order-1 xl:order-2 text-center xl:text-left pt-[30px] md:pt-[0px]">
                <motion.div variants={itemVariants}>
                  <p className="text-2xl md:text-4xl xl:text-[56px] font-medium text-[#1b1b1b] leading-[1.3]">
                    똑똑한 <span>AI</span> 키오스크
                  </p>
                  <p className="text-2xl md:text-4xl xl:text-[56px] font-medium text-[#91000a] mt-4 xl:mt-8 leading-[1.3]">
                    자유로운 무인 쇼핑 시스템
                  </p>
                </motion.div>
                <motion.div 
                  variants={itemVariants}
                  className="mt-8 xl:mt-[77.5px]"
                >
                  <p className="text-base md:text-lg xl:text-[22px] font-regular text-[#323232] leading-[1.6] xl:leading-[1.8] px-4 xl:px-0">
                    많은 제품들 중에 내 취향 아이템 고르기 힘들어요.
                    <br className="hidden md:block" />
                    혼자 다양하게 살펴보면서 고민해보고 싶은데 눈치도 보이죠.
                    <br className="hidden md:block" />
                    MBTI 유형별 언더웨어 추천까지 해주는 똑똑한 AI 키오스크와 함께
                    <br className="hidden md:block" />
                    자유롭게 무인 쇼핑 시스템으로 나만의 취향을 고르세요.
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
      </div>

      {/* 제품 소개 섹션 */}
      <div className="w-full bg-[#F8F8F2]">
        <div className="w-full max-w-[1920px] md:h-[1372px] h-[1250px] relative mx-auto px-4 xl:px-0 ">
          <div className="w-full h-[800px] text-center absolute left-1/2 -translate-x-1/2  top-[120px] md:top-[199.5px]">
            <p className="text-2xl md:text-4xl xl:text-[56px] font-medium text-[#1b1b1b] mb-8">
              일상을 더욱 특별하게 만들어줄
            </p>
            <p className="text-2xl md:text-4xl xl:text-[56px] font-medium text-[#1b1b1b] mb-8">
              다양한 라페어 라운지 상품을 만나보세요
            </p>
            
            {/* 이미지 슬라이드 영역 */}
            <div className="relative w-full h-[900px] mx-auto overflow-hidden select-none mt-[100px]">
              <div className="absolute w-full h-full flex items-center justify-center">
                <div className="absolute w-full h-[800px] flex items-center justify-center">
                  {/* 이전 버튼 */}
                  <button 
                    className="absolute left-[calc(50%-180px)] sm:left-[calc(50%-250px)] z-10 w-12 h-12 flex items-center justify-center  cursor-pointer"
                    style={{
                      top: '30%',
                    }}
                    onClick={() => {
                      if (swiperRef.current) {
                        swiperRef.current.slidePrev();
                      }
                    }}
                  >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      strokeWidth={2} 
                      stroke="currentColor" 
                      className="w-6 h-6 text-gray-700"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                  </button>

                  <Swiper
                    ref={swiperRef}
                    onSwiper={(swiper) => {
                      swiperRef.current = swiper;
                    }}
                    modules={[Navigation, Pagination, EffectCreative]}
                    navigation={{
                      nextEl: '.swiper-button-next',
                      prevEl: '.swiper-button-prev',
                    }}
                    spaceBetween={0}
                    slidesPerView={1}
                    centeredSlides={true}
                    loop={true}
                    effect="creative"
                    
                    creativeEffect={{
                      limitProgress: 5,
                      progressMultiplier:2,
                      perspective: false,
                      shadowPerProgress: false,
 
                      prev: {
                        // 이전 슬라이드의 변형
                        translate: ['-42%', '7%', 0],
                        rotate: [0, 0, -5],
                      },
                      next: {
                        // 다음 슬라이드의 변형
                        translate: ['42%', '7%', 0],
                        rotate: [0, 0, 5],
                      },
                    }}
                    style={{
                      width: '100%',
                      height: '1000px',  // Swiper 높이도 800px로 변경
                      padding: '0px'
                    }}
                    breakpoints={{
                      // 480px 이상일 때
                      300: {
                        slidesPerView: 1,
                      },
                      // 768px 이상일 때
                      768: {
                        slidesPerView: 2,
                      },
                      // 1024px 이상일 때
                      1600: {
                        slidesPerView: 4,
                      }
                    }}
 
                    onSlideChange={(swiper) => {
                      setActiveIndex(swiper.realIndex); // realIndex를 사용하여 실제 활성 슬라이드 인덱스 추적
                    }}
                  >
                    {slides.map((slide, index) => (
                      <SwiperSlide 
                        key={slide.id}
                        style={{
                          width: 'auto',
                          height: '750px',
                          transition: 'all 800ms ease',
                          position: 'relative'
                        }}
                      >
                        <div 
                          style={{
                            width: '100%',
                            maxWidth: '295px',
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '24px'
                          }}
                        >
                          <img
                            src={slide.image}
                            alt={slide.title}
                            className="
                              w-[177px] sm:w-[200px] md:w-[250px] xl:w-[295px]
                              h-[228px] sm:h-[260px] md:h-[320px] xl:h-[380px]
                              object-cover
                              rounded-[30px] sm:rounded-[40px] md:rounded-[40px] xl:rounded-[40px]
                              backface-hidden
                              block
                              transition-all duration-300
                            "
                          />
                          <p 
                            className="text-center text-lg transition-opacity duration-300"
                            style={{
                              opacity: activeIndex === index ? 1 : 0,
                              transition: 'opacity 0.3s ease',
                              width: '100%',
                              color: '#1b1b1b',
                              fontWeight: activeIndex === index ? '500' : '400'
                            }}
                          >
                            {slide.title}
                          </p>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>

                  {/* 다음 버튼 */}
                  <button 
                    className="absolute  right-[calc(50%-180px)] sm:right-[calc(50%-250px)] z-10 w-12 h-12 flex items-center justify-center cursor-pointer"
                    style={{
                      top: '30%',
                    }}
                    onClick={() => {
                      if (swiperRef.current) {
                        swiperRef.current.slideNext();
                      }
                    }}
                  >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      strokeWidth={2} 
                      stroke="currentColor" 
                      className="w-6 h-6 text-gray-700"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  </button>
                </div>
              </div>
              
              {/* 텍스트 섹션과 버튼 위치 조정 */}
              <div className="absolute w-full text-center" style={{ top: 'calc(50% + 190px)' }}>
                <p className="text-lg xl:text-[22px] font-regular text-[#323232]">
                  라페어 라운지는 일상의 모든 순간에 함께합니다.
                </p>
                <p className="text-lg xl:text-[22px] font-regular text-[#323232] mt-2">
                  눈을 뜨는 순간부터 잠자리에 드는 시간까지, 하루를 더 특별하게 만들어줄 편안함과 스타일을
                </p>
                <p className="text-lg xl:text-[22px] font-regular text-[#323232] mt-2">
                  동시에 갖춘 상품들로 일상을 채워드립니다. 바쁜 일상 속에서도 특별함을 느껴보세요.
                </p>
                <button className="mt-8 xl:mt-[80px] bg-[#2F2E2B] text-white w-full xl:w-[326.92px] h-[70.56px] text-[28px] hover:bg-[#92000A] transition-colors rounded-[40px]  relative z-50">
                  상품보러가기
                </button>
              </div>
            </div>
          </div>
          
        </div>
      </div>


      <div style={{ 
        marginTop: isAnimating ? '100vh' : 0,
        transition: 'margin-top 300ms ease-out'
      }}>
        {/* ... existing code ... */}
      </div>
    </div>
  );
}
