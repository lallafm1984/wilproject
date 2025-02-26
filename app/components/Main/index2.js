"use client";
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCreative, Navigation, Pagination } from 'swiper/modules';
import { default as NextImage } from 'next/image';
import { ReactLenis } from '@studio-freight/react-lenis';
import mainBgImage from '../../../public/Images/main1.png';

// Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-creative';


export default function Main() {
  // 모든 state 선언을 먼저 합니다
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [windowWidth, setWindowWidth] = useState(undefined);
  const [textGap, setTextGap] = useState(0);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  // 모든 ref 선언
  const heroSectionRef = useRef(null);
  const lastScrollTime = useRef(Date.now());
  const scrollCount = useRef(0);
  const maxScrollCount = 10;
  const isEventComplete = useRef(false);
  const isScrollingDown = useRef(false);
  const swiperRef = useRef(null);
  const initialPositionSet = useRef(false);
  const isFirstScroll = useRef(true);
  const secondSectionRef = useRef(null);
  const touchStart = useRef(null);
  const isEventListenerAttached = useRef(false);
  const shouldPreventScroll = useRef(true);
  const lenisRef = useRef(null);

  // Lenis 옵션 정의
  const lenisOptions = {
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
  };

  // useScroll 훅 사용
  const { scrollYProgress } = useScroll({
    target: secondSectionRef,
    offset: ["start end", "start center"],
    layoutEffect: false
  });

  // transform 설정
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
   
  // 스크롤 이벤트 핸들러
  const handleScrollEvent = useCallback((deltaY) => {
    const currentTime = Date.now();
    if (currentTime - lastScrollTime.current < 50) return false;
    lastScrollTime.current = currentTime;
    const heroSection = heroSectionRef.current;
    if (!heroSection) return false;
    
    const heroRect = heroSection.getBoundingClientRect();
    isScrollingDown.current = deltaY > 1;

    // Lenis 스크롤 제어
    if (!isEventComplete.current || scrollCount.current < maxScrollCount) {
      if (lenisRef.current?.lenis) {
        lenisRef.current.lenis.stop();
      }
      window.scrollTo(0, window.scrollY);
      
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
        setIsAnimating(true);
      }
      
      if (scrollCount.current >= maxScrollCount && !isEventComplete.current) {
        isEventComplete.current = true;
        setIsAnimating(false);
        if (lenisRef.current?.lenis) {
          lenisRef.current.lenis.start();
        }
      }
      return false;
    }
    
    // 히어로 섹션 애니메이션이 완료되면 일반 스크롤 허용
    if (isEventComplete.current && scrollCount.current >= maxScrollCount) {
      if (lenisRef.current?.lenis) {
        lenisRef.current.lenis.start();
      }
      return true;  // 스크롤 계속 진행
    }

    return false;
  }, []);

  // 이벤트 리스너 설정
  useEffect(() => {
    const handleWheel = (e) => {
      const heroSection = heroSectionRef.current;
      const heroRect = heroSection.getBoundingClientRect();
      
      const topOffset = getTopOffset();

      if(isEventComplete.current && scrollCount.current >= maxScrollCount && e.deltaY < 0 && heroRect.top === topOffset){
        isEventComplete.current = false;
        scrollCount.current = 9;
        setScrollProgress(90);
        setIsAnimating(true);
        if (lenisRef.current?.lenis) {
          lenisRef.current.lenis.stop();
        }
        e.preventDefault();
        return;
      }

      if (isEventComplete.current && scrollCount.current >= maxScrollCount) {
        return;
      }

      e.preventDefault();
      handleScrollEvent(e.deltaY);
    };

    // 터치 이벤트 핸들러 추가
    const handleTouchStart = (e) => {
      touchStart.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      if (!touchStart.current) return;

      const deltaY = touchStart.current - e.touches[0].clientY;
      const heroSection = heroSectionRef.current;
      const heroRect = heroSection.getBoundingClientRect();
      
      const topOffset = getTopOffset();

      if(isEventComplete.current && scrollCount.current >= maxScrollCount && deltaY < 0 && heroRect.top === topOffset){
        isEventComplete.current = false;
        scrollCount.current = 9;
        setScrollProgress(90);
        setIsAnimating(true);
        if (lenisRef.current?.lenis) {
          lenisRef.current.lenis.stop();
        }
        e.preventDefault();
        return;
      }

      if (!isEventComplete.current || scrollCount.current < maxScrollCount) {
        e.preventDefault();
        handleScrollEvent(deltaY);
      }
    };

    const handleTouchEnd = () => {
      touchStart.current = null;
    };

    // 이벤트 리스너 등록
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd);

    // 이벤트 리스너 정리
    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleScrollEvent]);

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

  const getTopOffset = () => {
    
    if (window.innerWidth >= 1280) { // xl breakpoint
      return 132;
    } else if (window.innerWidth >= 768) { // md breakpoint
      return 100;
    }
    return 54; // default
  };

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

  // 초기 로딩 상태 해제
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
    <div className="w-full mx-auto relative [overflow:hidden] z-1">
      {/* <div className="absolute -inset-1 bg-slate-50 rounded-md blur-md  z-30"></div> */}
      <div 
        ref={heroSectionRef}
        className="relative w-full h-[calc(100vh-54px)] md:h-[calc(100vh-100px)] xl:h-[calc(100vh-132px)] bg-[#2F2E2B] overflow-hidden inline-flex mt-[54px] md:mt-[100px] xl:mt-[132px] backdrop-blur-[20px] z-20">
        <div className="absolute w-full h-[2px] bg-gray-500 blur-[5px]"></div>
        <div className="absolute w-full inset-y-full h-[20px] bg-white blur-[20px]"></div>
        <div
          className="relative w-full bt-[54px] md:bt-[100px] xl:bt-[132px]"

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
            quality={100}
            className="object-cover"
            sizes="100vw"
            placeholder="blur"
          />
        </div>

        <div className="absolute w-full h-full flex flex-col items-center justify-center px-4  md:gap-8">
          <div className="text-center">
            <p 
              className="font-semibold text-white ml-[12px] md:ml-[0px]"

              style={{
                fontSize: windowWidth < 768 ? '42px' : getFontSize(),
                transform: `translateX(${leftTransform}px)`,
                transition: 'transform 800ms cubic-bezier(0.23, 1, 0.32, 1)'
              }}
            >
              언제 어디서나
            </p>
          </div>
          <div className="text-center">
            <p 
              className="font-semibold text-white mr-[12px] md:mr-[0px]"
              style={{
                fontSize: windowWidth < 768 ? '42px' : getFontSize(),
                transform: `translateX(${rightTransform}px)`,
                transition: 'transform 800ms cubic-bezier(0.23, 1, 0.32, 1)'
              }}
            >
              골라입는 재미
            </p>
          </div>

        </div>
      </div>
      
      <ReactLenis 
        ref={lenisRef}
        root 
        options={lenisOptions}
      >
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
              <div className="w-[450px] xl:w-[610px] xl:pt-[99px] px-4 xl:px-0 text-center xl:text-left">
                <motion.div variants={itemVariants} className="xl:h-[141px] flex flex-col justify-center">
                  <p className="text-2xl md:text-4xl xl:text-[56px] font-medium text-[#1b1b1b] leading-[1.32] xl:w-[606px]   tracking-[-2.8px]">
                    언더웨어부터 액티브웨어까지
                  </p>
                  <p className="text-2xl md:text-4xl xl:text-[56px] font-medium text-[#92000a] mt-4 xl:mt-10 leading-[1.32] tracking-[-2.8px]">
                    <span className="text-[#92000a] tracking-[-10.76px]">온</span>
                    <span className="text-[#92000a] tracking-[-16.74px] text-2xl md:text-4xl xl:text-[50px] font-medium">ㆍ</span>
                    <span className="text-[#92000a] text-2xl md:text-4xl xl:text-[56px] font-medium">오프라인</span> 동시에 만나요
                  </p>
                  
                </motion.div>
                <motion.div 
                  variants={itemVariants}
                  className="mt-8 xl:mt-[60px]"
                >
                  <p className="text-base md:text-lg xl:text-[22px] font-regular text-[#323232] leading-[1.6] xl:leading-[1.8] px-4 xl:px-0 tracking-[-0.35px]">
                    더블유아이엘은 언더웨어부터 홈웨어,리조트웨어
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
                className="xl:w-[540px] md:w-[400px] w-[300px] xl:h-[540px] md:h-[400px] h-[300px]  bg-[#B4B4B4] mt-8 xl:mt-0 md:ml-[20px] xl:ml-[96px]"
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
            <div className="w-full flex flex-col md:flex-row justify-center items-center xl:items-start gap-8 xl:gap-0 mt-[100px] xl:pl-[100px]">
              {/* 이미지 영역 */}
              <motion.div 
                variants={itemVariants}
                className="xl:w-[402px] md:w-[322px] w-[281px] xl:h-[520px] md:h-[416px] h-[364px] bg-[#B4B4B4] order-2 md:order-1"
              >
                {/* 이미지 영역 */}
              </motion.div>
              
              {/* 텍스트 영역 */}
              <div className="w-[450px] xl:w-[650px] xl:pt-[296px] xl:pl-[68px] order-1 xl:order-2 text-center xl:text-left pt-[30px] md:pt-[0px]">
                <motion.div variants={itemVariants}>
                  <p className="text-2xl md:text-4xl xl:text-[56px] font-medium text-[#1b1b1b] leading-[1.3] tracking-[-2.8px]">
                    똑똑한 <span>AI</span> 키오스크
                  </p>
                  <p className="text-2xl md:text-4xl xl:text-[56px] font-medium text-[#91000a] mt-4 xl:mt-8 leading-[1.3] tracking-[-2.8px] xl:w-[540px]">
                    자유로운 무인 쇼핑 시스템
                  </p>
                </motion.div>
                <motion.div 
                  variants={itemVariants}
                  className="mt-8 xl:mt-[77.5px]"
                >
                  <p className="text-base md:text-lg xl:text-[22px] font-regular text-[#323232] leading-[1.6] xl:leading-[1.8] px-4 xl:px-0 tracking-[-0.35px]">
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
      <div className="w-full bg-[#F8F8F2]">
        <div className="w-full max-w-[1920px] md:h-[1402px] h-[1250px] relative mx-auto px-4 xl:px-0 ">
          <div className="w-full h-[800px] text-center absolute left-1/2 -translate-x-1/2  top-[120px] md:top-[199.5px]">
            <p className="text-2xl md:text-4xl xl:text-[56px] font-medium text-[#1b1b1b] mb-8 tracking-[-2.8px]">
              일상을 더욱 특별하게 
            </p>
            <p className="text-2xl md:text-4xl xl:text-[56px] font-medium text-[#1b1b1b]  tracking-[-2.8px]">
            만들어줄 다양한 상품을 만나보세요
            </p>
            
            {/* 이미지 슬라이드 영역 */}
            <div className="relative w-full h-[900px] mx-auto overflow-hidden select-none ">
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
                        translate: ['-50%', '7%', 0],
                        rotate: [0, 0, -5],
                      },
                      next: {
                        // 다음 슬라이드의 변형
                        translate: ['50%', '7%', 0],
                        rotate: [0, 5, 5],
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
                      1024: {
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
                            className="text-center text-lg transition-opacity tracking-[-0.29px] duration-300"
                            style={{
                              opacity: activeIndex === index ? 1 : 0,
                              transition: 'opacity 0.3s ease',
                              width: '100%',
                              color: '#6a6a6a',
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
                <p className="text-lg xl:text-[22px] font-regular text-[#323232] tracking-[-0.35px]">
                  더블유아이엘은 일상의 모든 순간에 함께합니다.
                </p>
                <p className="text-lg xl:text-[22px] font-regular text-[#323232] mt-2 tracking-[-0.35px]">
                  눈을 뜨는 순간부터 잠자리에 드는 시간까지, 하루를 더 특별하게 만들어줄 편안함과 스타일을
                </p>
                <p className="text-lg xl:text-[22px] font-regular text-[#323232] mt-2 tracking-[-0.35px]">
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
      </ReactLenis>
    </div>
    
  );
}
