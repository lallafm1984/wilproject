"use client";
import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

// Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function Main() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const heroSectionRef = useRef(null);
  const lastScrollTime = useRef(Date.now());
  const scrollCount = useRef(0);
  const maxScrollCount = 10;
  const isEventComplete = useRef(false);
  const isScrollingDown = useRef(false);
  const hasLeftTop = useRef(false);
  const [windowWidth, setWindowWidth] = useState(undefined);
  const [textGap, setTextGap] = useState(0);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(3);
  const [direction, setDirection] = useState(null);
  const [skipTransition, setSkipTransition] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const swiperRef = useRef(null);

  // 초기 위치 계산을 위한 ref
  const initialPositionSet = useRef(false);

  const secondSectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: secondSectionRef,
    offset: ["start end", "start center"]
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

  const positions = [
    { translateX: -800, translateY: 100, rotate: -25, scale: 0.85, zIndex: 1 },
    { translateX: -400, translateY: 50, rotate: -15, scale: 0.9, zIndex: 2 },
    { translateX: 0, translateY: 0, rotate: 0, scale: 1, zIndex: 3 },
    { translateX: 400, translateY: 50, rotate: 15, scale: 0.9, zIndex: 2 },
    { translateX: 800, translateY: 100, rotate: 25, scale: 0.85, zIndex: 1 }
  ];

  // 버튼 클릭 여부를 추적하기 위한 ref 추가
  const isButtonClick = useRef(false);

  useEffect(() => {
    const handleResize = () => {
      setContainerWidth(window.innerWidth);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // 반응형 크기 계산
  const getResponsiveSize = () => {
    const baseWidth = 320; // 기본 이미지 너비
    const baseHeight = 420; // 기본 이미지 높이
    const screenWidth = containerWidth;
    const ratio = Math.min(screenWidth / 1920, 1); // 최대 크기 제한

    // 768px 미만일 때 더 작은 비율 적용
    const mobileRatio = screenWidth < 768 ? 0.7 : 1;
    
    return {
      width: baseWidth * ratio * mobileRatio,
      height: baseHeight * ratio * mobileRatio
    };
  };

  // 반응형 위치 계산
  const getResponsiveX = (baseX) => {
    const screenWidth = containerWidth;
    const ratio = Math.min(screenWidth / 1920, 1);
    const mobileRatio = screenWidth < 768 ? 0.7 : 1;
    return baseX * ratio * mobileRatio;
  };

  const getSlideStyles = (index) => {
    const totalSlides = slides.length;
    const position = (index - currentIndex + totalSlides) % totalSlides;
    const size = getResponsiveSize();
    
    const baseStyle = {
      position: 'absolute',
      left: '50%',
      top: '50%',
      width: `${size.width}px`,
      height: `${size.height}px`,
      transition: 'all 0.5s ease-in-out',
      borderRadius: '30px',
      backgroundColor: '#B4B4B4',
      transform: 'translate(-50%, -50%)',
    };

    const visiblePosition = position - Math.floor(totalSlides / 2);

    // 기본 간격 147px의 배수로 계산
    const gap = 160;
    const firstGap = gap * 3; // 441px
    const secondGap = gap * 6; // 588px
    const thirdGap = gap * 9; // 735px

    switch(visiblePosition) {
      case -3:
        return {
          ...baseStyle,
          transform: `translate(-50%, -50%) translateX(${getResponsiveX(-thirdGap)}px) translateY(${getResponsiveX(150)}px) rotate(-15deg) scale(1)`,
          opacity: 0,
          zIndex: 0,
        };
      case -2:
        return {
          ...baseStyle,
          transform: `translate(-50%, -50%) translateX(${getResponsiveX(-secondGap)}px) translateY(${getResponsiveX(90)}px) rotate(-10deg) scale(1)`,
          opacity: 1,
          zIndex: 1,
        };
      case -1:
        return {
          ...baseStyle,
          transform: `translate(-50%, -50%) translateX(${getResponsiveX(-firstGap)}px) translateY(${getResponsiveX(30)}px) rotate(-5deg) scale(1)`,
          opacity: 1,
          zIndex: 2,
        };
      case 0:
        return {
          ...baseStyle,
          transform: 'translate(-50%, -50%) translateX(0) translateY(0) rotate(0deg) scale(1)',
          opacity: 1,
          zIndex: 3,
        };
      case 1:
        return {
          ...baseStyle,
          transform: `translate(-50%, -50%) translateX(${getResponsiveX(firstGap)}px) translateY(${getResponsiveX(30)}px) rotate(5deg) scale(1)`,
          opacity: 1,
          zIndex: 2,
        };
      case 2:
        return {
          ...baseStyle,
          transform: `translate(-50%, -50%) translateX(${getResponsiveX(secondGap)}px) translateY(${getResponsiveX(90)}px) rotate(10deg) scale(1)`,
          opacity: 1,
          zIndex: 1,
        };
      case 3:
        return {
          ...baseStyle,
          transform: `translate(-50%, -50%) translateX(${getResponsiveX(thirdGap)}px) translateY(${getResponsiveX(150)}px) rotate(15deg) scale(1)`,
          opacity: 0,
          zIndex: 0,
        };
      default:
        return baseStyle;
    }
  };

  useEffect(() => {
    const handleWheel = (e) => {
      const currentTime = Date.now();
      if (currentTime - lastScrollTime.current < 5) return;
      
      const heroSection = heroSectionRef.current;
      if (!heroSection) return;
      
      const heroRect = heroSection.getBoundingClientRect();
      const isAtTop = heroRect.top >= 0 && heroRect.top <= 1;
      isScrollingDown.current = e.deltaY > 0;

      if (isEventComplete.current && isScrollingDown.current) {
        setIsAnimating(false);
        return;
      }

      if ((scrollCount.current <= 0 && !isScrollingDown.current) || 
          (scrollCount.current >= maxScrollCount && isScrollingDown.current)) {
        if (scrollCount.current >= maxScrollCount) {
          isEventComplete.current = true;
          setIsAnimating(false);
        }
        return;
      }
      
      if (!isEventComplete.current) {
        e.preventDefault();
        const delta = isScrollingDown.current ? 1 : -1;
        scrollCount.current = Math.max(0, Math.min(maxScrollCount, scrollCount.current + delta));

        const progress = (scrollCount.current / maxScrollCount) * 100;
        setScrollProgress(progress);
        setIsAnimating(true);
        
        if (scrollCount.current === maxScrollCount) {
          isEventComplete.current = true;
          setIsAnimating(false);
        }
      }
      
      lastScrollTime.current = currentTime;
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    
    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, []);

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

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % slides.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const calculateScale = progress => {
    const p = progress / 100;
    return 0.2+ (0.8 * p);
  };

  const imageScale = calculateScale(scrollProgress);

  // transform 계산
  const leftTransform = windowWidth === undefined ? 0 : -windowWidth/5 + (isInitialLoad ? 0 : textGap);
  const rightTransform = windowWidth === undefined ? 0 : windowWidth/5 - (isInitialLoad ? 0 : textGap);

  const calculatePosition = (index) => {
    const totalSlides = slides.length;
    const position = (index - currentIndex + totalSlides) % totalSlides;
    
    // 정확한 기준값 설정
    const baseX = 202.75; // X축 기본 간격
    const centerX = 231.625; // 중앙 기준점
    const startX = -173.875; // 시작 X 위치
    const baseRotation = 5.8242; // 기본 회전각
    const baseY = 20.5393; // 기본 Y축 상승값
    const farY = 81.7474; // 바깥쪽 Y축 값
    
    let translateX = 0;
    let translateY = 0;
    let rotation = 0;
    let scale = 1;
    let opacity = 1;
    let zIndex = 5;

    // X축 위치 계산
    translateX = startX + (position * baseX) + centerX;

    // 위치별 스타일 계산
    if (position === 0) { // 중앙
      translateY = 0;
      rotation = 0;
      scale = 1;
    } else if (Math.abs(position) === 1) { // 양옆
      translateY = baseY;
      rotation = position * baseRotation;
      scale = 0.95;
      zIndex = 4;
    } else if (Math.abs(position) === 2) { // 두 번째 양옆
      translateY = farY;
      rotation = position * baseRotation * 2;
      scale = 0.9;
      zIndex = 3;
    } else { // 나머지
      translateY = farY;
      rotation = position * baseRotation * 2;
      scale = 0.85;
      opacity = 0;
      zIndex = 2;
    }

    // 드래그 효과
    if (isDragging) {
      const dragInfluence = dragOffset * 0.2;
      translateX += dragInfluence;
      rotation += (dragInfluence / baseX) * baseRotation;
    }

    return {
      transform: `translate3d(${translateX}px, ${translateY}px, 0) rotate(${rotation}deg) scale(${scale})`,
      opacity,
      zIndex,
      transition: isDragging ? 'none' : 'all 0.3s ease-out'
    };
  };

  const handleDragStart = (e) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handleDragMove = (e) => {
    if (!isDragging) return;
    
    const currentX = e.clientX;
    const difference = currentX - startX;
    setDragOffset(difference);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    
    if (Math.abs(dragOffset) > getResponsiveX(50)) {
      if (dragOffset > 0) {
        setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
      } else {
        setCurrentIndex((prev) => (prev + 1) % slides.length);
      }
    }

    setIsDragging(false);
    setDragOffset(0);
  };

  const updateSlidesOnDrag = (swiper, isMoving = false, isButtonClick = false) => {
    if (!swiper || !swiper.slides || !swiper.el || swiper.slides.length === 0) {
      return;
    }

    const slides = swiper.slides;
    const swiperEl = swiper.el;
    
    try {
      const swiperRect = swiperEl.getBoundingClientRect();
      const swiperCenter = swiperRect.left + (swiperRect.width / 2);
      
      slides.forEach((slide) => {
        if (!slide) return;
        
        const rect = slide.getBoundingClientRect();
        const slideCenter = rect.left + (rect.width / 2);
        const distanceFromCenter = slideCenter - swiperCenter;
        
        // 기준값 설정
        const baseY = 50; // 첫 번째 Y축 상승값
        const midY = 420; // 두 번째 Y축 상승값
        const farY = 450; // 세 번째 Y축 상승값
        const baseRotation = 20; // 기본 회전각
        
        // 거리에 따른 단계 구분
        const normalizedDistance = Math.abs(distanceFromCenter / (rect.width * 1));
        let translateY, rotate;
        let opacity = 1;
        if (normalizedDistance <= 1) { // 중앙 및 첫 번째 양옆
          translateY = baseY * normalizedDistance;
          rotate = (distanceFromCenter > 0 ? 1 : -1) * baseRotation * normalizedDistance;
        } else if (normalizedDistance <= 2) { // 두 번째 양옆
          translateY = baseY + ((midY - baseY) * (normalizedDistance - 1));
          rotate = (distanceFromCenter > 0 ? 1 : -1) * (baseRotation + (baseRotation * (normalizedDistance - 1)));
        } else if (normalizedDistance <= 3) { // 세 번째 양옆
          translateY = midY + ((farY - midY) * (normalizedDistance - 2));
          rotate = (distanceFromCenter > 0 ? 1 : -1) * (baseRotation * 2) ;
          opacity = 1 - (normalizedDistance - 2);
        } else { // 나머지
          translateY = farY;
          rotate = (distanceFromCenter > 0 ? 1 : -1) * (baseRotation * 3);
          opacity = 0;
        }
        
        // z-index 계산
        const zIndex = 5 - Math.floor(normalizedDistance);
        
        // 버튼 클릭 시에만 트랜지션 적용
        slide.style.transition = isButtonClick ? 'all 300ms ease' : 'none';
        slide.style.transform = `translateY(${translateY}px) rotate(${rotate}deg)`;
        slide.style.zIndex = Math.max(2, zIndex);
        slide.style.opacity = opacity;
      });
    } catch (error) {
      console.error('슬라이드 업데이트 중 오류 발생:', error);
    }
  };

  const updateSlidesWithRAF = (swiper, isMoving, isButtonClick) => {
    requestAnimationFrame(() => {
      updateSlidesOnDrag(swiper, isMoving, isButtonClick);
    });
  };

  // 가장 가까운 중앙 슬라이드 인덱스 찾기
  const findClosestCenterIndex = (swiper) => {
    const swiperSlides = swiper.slides;
    const swiperRect = swiper.el.getBoundingClientRect();
    const centerX = swiperRect.left + (swiperRect.width / 2);
    
    let closestIndex = 0;
    let minDistance = Infinity;
    
    Array.from(swiperSlides).forEach((slide, index) => {
      const rect = slide.getBoundingClientRect();
      const slideCenter = rect.left + (rect.width / 2);
      const distance = Math.abs(slideCenter - centerX);
      
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });
    
    return closestIndex;
  };

  // 슬라이드 위치에 따른 변형 값 계산
  const calculateSlideTransform = (index, closestIndex) => {
    const distanceFromCenter = Math.abs(index - closestIndex);
    const rotateDirection = index < closestIndex ? -1 : 1;
    
    // calculateSlideTransform에서도 동일한 값 사용
    const baseY = 50;
    const midY = 420;
    const farY = 450;
    const baseRotation = 20;

    let transform = {
      translateY: 0,
      scale: 1,
      rotate: 0
    };
    
    switch(distanceFromCenter) {
      case 0: // 중앙
        transform = { translateY: 0, scale: 1, rotate: 0 };
        break;
      case 1: // 첫 번째 양옆
        transform = { translateY: baseY, scale: 1, rotate: rotateDirection * baseRotation };
        break;
      case 2: // 두 번째 양옆
        transform = { translateY: midY, scale: 1, rotate: rotateDirection * (baseRotation * 1.5) };
        break;
      case 3: // 세 번째 양옆
        transform = { translateY: farY, scale: 1, rotate: rotateDirection * (baseRotation * 2) };
        break;
      default: // 나머지
        transform = { translateY: farY, scale: 1, rotate: rotateDirection * (baseRotation * 2), opacity: 0 };
    }
    
    return transform;
  };

  // 슬라이드 변형 적용
  const applySlideTransforms = (swiper) => {
    setIsDragging(false);
    const closestIndex = findClosestCenterIndex(swiper);
    
    swiper.slides.forEach((slide, index) => {
      const { translateY, scale, rotate } = calculateSlideTransform(index, closestIndex);
      slide.style.transition = 'all 0ms ease';
      slide.style.transform = `translateY(${translateY}px) scale(${1}) rotate(${rotate}deg)`;
      slide.style.zIndex = index === closestIndex ? 5 : 4 - Math.abs(index - closestIndex);
    });
  };

  // 초기 로딩 중에는 텍스트를 숨김
  if (windowWidth === undefined) {
    return null;
  }

  return (
    <div className="w-full mx-auto relative [overflow:hidden] [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <div 
        ref={heroSectionRef}
        className="relative w-full h-screen bg-[#2F2E2B] overflow-hidden"
        style={{ 
          position: 'sticky',
          top: 0,
          zIndex: 50
        }}
      >
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            transform: `scale(${imageScale})`,
            transition: isScrollingDown.current ? 
              'transform 800ms cubic-bezier(0.23, 1, 0.32, 1)' : 
              'transform 800ms cubic-bezier(0.32, 1, 0.23, 1)'
          }}
        >
          <img
            src="/Images/main1.png"
            alt="메인 배경"
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative h-full flex flex-col2 items-center justify-center px-4 mt-0 gap-8">
          <div className="text-center">
            <p 
              className="text-4xl md:text-6xl font-semibold text-white"
              style={{
                fontSize: `clamp(2.25rem, 5vw, 12rem)`,
                transform: `translateX(${leftTransform}px)`,
                transition: 'transform 800ms cubic-bezier(0.23, 1, 0.32, 1)'
              }}
            >
              언제 어디서나
            </p>
          </div>
          <div className="text-center">
            <p 
              className="text-4xl md:text-6xl font-semibold text-white"
              style={{
                fontSize: `clamp(2.25rem, 5vw, 12rem)`,
                transform: `translateX(${rightTransform}px)`,
                transition: 'transform 800ms cubic-bezier(0.23, 1, 0.32, 1)'
              }}
            >
              골라입는 재미
            </p>
          </div>
          <div 
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
            style={{
              opacity: 1 - (scrollProgress / 20),
              transition: 'opacity 800ms cubic-bezier(0.23, 1, 0.32, 1)'
            }}
          >
            <div className="flex flex-col items-center space-y-2">
              <span className="text-white/70 text-sm tracking-wider">SCROLL</span>
              <div className="w-[1px] h-[40px] bg-white/30">
                <div className="w-full h-1/2 bg-white animate-scrollDown" />
              </div>
            </div>
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
            <div className="w-full flex flex-col2 xl:flex-row justify-center items-start">
              <div className="w-full xl:w-[660px] xl:pt-[99px]"
              >
                <motion.div variants={itemVariants}>
                  <p className="text-3xl md:text-4xl xl:text-[56px] font-medium text-[#1b1b1b] leading-[1.3]">
                    언더웨어부터 액티브웨어까지
                  </p>
                  <p className="text-3xl md:text-4xl xl:text-[56px] font-medium text-[#91000a] mt-8 leading-[1.3]">
                    온ㆍ오프라인 동시에 만나요
                  </p>
                </motion.div>
                <motion.div 
                  variants={itemVariants}
                  className="mt-[74.5px]"
                >
                  <p className="text-lg xl:text-[22px] font-regular text-[#323232] leading-[1.8]">
                    라페어라운지는 언더웨어부터 홈웨어,리조트웨어<br />
                    액티브웨어까지 다양한 라이프웨어를 온라인 쇼핑몰과<br />
                    오프라인 매장에서 구매할 수 있는 라이프웨어 브랜드샵입니다.
                  </p>
                </motion.div>
              </div>
              
              <motion.div 
                variants={itemVariants}
                className="w-full xl:w-[540px] h-[480px] xl:h-[540px] bg-[#B4B4B4] mt-8 xl:mt-0 xl:ml-[102px]"
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
            className="w-full px-4"
          >
            <div className="w-full flex flex-col2 xl:flex-row justify-center items-start xl:ml-[64px]">
              <motion.div 
                variants={itemVariants}
                className="w-full xl:w-[402px] h-[480px] xl:h-[520px] bg-[#B4B4B4] mt-8 xl:mt-0"
              >
                {/* 이미지 영역 */}
              </motion.div>
             
              <div className="w-full xl:w-[660px] xl:pt-[309px] pl-[68px]"
              >
                <motion.div variants={itemVariants}>
                  <p className="text-3xl md:text-4xl xl:text-[56px] font-medium text-[#1b1b1b] leading-[1.3]">
                    똑똑한 <span>AI</span> 키오스크
                  </p>
                  <p className="text-3xl md:text-4xl xl:text-[56px] font-medium text-[#91000a] mt-8 leading-[1.3]">
                    자유로운 무인 쇼핑 시스템
                  </p>
                </motion.div>
                <motion.div 
                  variants={itemVariants}
                  className="mt-[77.5px]"
                >
                  <p className="text-lg xl:text-[22px] font-regular text-[#323232] leading-[1.8]">
                    많은 제품들 중에 내 취향 아이템 고르기 힘들어요.<br />
                    혼자 다양하게 살펴보면서 고민해보고 싶은데 눈치도 보이죠.<br />
                    MBTI 유형별 언더웨어 추천까지 해주는 똑똑한 AI 키오스크와 함께<br />
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
        <div className="w-full max-w-[1920px] h-[1372px] relative mx-auto px-4 xl:px-0">
          <div className="w-full h-[800px] text-center absolute left-1/2 -translate-x-1/2 top-[199.5px]">
            <p className="text-3xl md:text-4xl xl:text-[56px] font-medium text-[#1b1b1b] mb-8">
              일상을 더욱 특별하게 만들어줄
            </p>
            <p className="text-3xl md:text-4xl xl:text-[56px] font-medium text-[#1b1b1b] mb-8">
              다양한 라페어 라운지 상품을 만나보세요
            </p>
            
            {/* 이미지 슬라이드 영역 */}
            <div className="relative w-full h-[800px] mx-auto overflow-hidden select-none">
              <div className="absolute w-full h-full flex items-center justify-center">
                <div className="absolute w-[1800px] h-[800px] flex items-center justify-center">
                  {/* 이전 버튼 */}
                  <button 
                    className="absolute left-[calc(50%-300px)] z-10 w-12 h-12 flex items-center justify-center bg-white rounded-full shadow-md cursor-pointer hover:bg-gray-50"
                    onClick={() => swiperRef.current?.slidePrev()}
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
                    modules={[Navigation, Pagination]}
                    navigation={{
                      nextEl: '.swiper-button-next',
                      prevEl: '.swiper-button-prev',
                    }}
                    spaceBetween={250}
                    slidesPerView={5}
                    centeredSlides={true}
                    loop={true}
                    effect="coverflow"
                    shortSwipes={false}
                    longSwipes={true}
                    longSwipesRatio={0.5}
                    resistance={false}
                    resistanceRatio={0}
                    threshold={1}
                    grabCursor={true}
                    watchSlidesProgress={true}
                    preventInteractionOnTransition={true} 
                    touchRatio={0.8}  
                    speed={0}   
                    style={{
                      width: '100%',
                      height: '800px',  // Swiper 높이도 800px로 변경
                      padding: '0px'
                    }}
                    onTouchMove={(swiper) => {
                      updateSlidesWithRAF(swiper, true, false);
                    }}
                    onTouchEnd={(swiper, event) => {
                      console.log('Touch end', swiper.activeIndex);
                      
                      // touchesStart와 touches가 존재하는지 확인
                      if (!swiper.touchesStart?.x || !swiper.touches?.currentX) {
                        return;
                      }
                      
                      // 드래그 거리 계산
                      const touchDiff = swiper.touchesStart.x - swiper.touches.currentX;
                      const threshold = 50; // 최소 드래그 거리 설정 (픽셀)
                      
                      // 드래그 거리가 threshold보다 작으면 업데이트 하지 않음
                      if (Math.abs(touchDiff) < threshold) {
                        return;
                      }
                      
                      updateSlidesWithRAF(swiper, false, false);
                    }}
                    onSlideChange={(swiper) => {
                      console.log('Slide changed', swiper.activeIndex);
                      //updateSlidesWithRAF(swiper, true);
                    }}
                    onAfterInit={(swiper) => {
                    }}
                    onInit={(swiper) => {
                      console.log('Swiper initialized', swiper);
                      applySlideTransforms(swiper);
                      //updateSlidesWithRAF(swiper, false);
                    }}
                    onBeforeDestroy={(swiper) => {
                      console.log('Swiper before destroy', swiper);
                    }}
                    onTransitionStart={(swiper) => {
                      console.log('Transition start', swiper.activeIndex);
                    }}
                    onTransitionEnd={(swiper) => {
                      console.log('Transition end', swiper.activeIndex);
                      
                      // 버튼 클릭으로 인한 트랜지션이면 건너뜀
                      if (isButtonClick.current) {
                        isButtonClick.current = false;
                        return;
                      }
                      
                      updateSlidesWithRAF(swiper, false, false);
                    }}
                    onSlideChangeTransitionStart={(swiper) => {
                      console.log('Slide change transition start', swiper.activeIndex);
                    }}
                    onSlideChangeTransitionEnd={(swiper) => {
                      console.log('Slide change transition end', swiper.activeIndex);
                    }}
                    onTouchStart={(swiper, event) => {
                      console.log('Touch start');
                    }}
                    onReachBeginning={(swiper) => {
                      console.log('Reached beginning', swiper.activeIndex);
                    }}
                    onReachEnd={(swiper) => {
                      console.log('Reached end', swiper.activeIndex);
                    }}
                    onBreakpoint={(swiper, breakpoint) => {
                      console.log('Breakpoint changed', breakpoint);
                    }}
                    onFromEdge={(swiper) => {
                      console.log('Moved from edge', swiper.activeIndex);
                    }}
                    onSetTranslate={(swiper, translate) => {
                      //console.log('Set translate', translate);
                      //updateSlidesWithRAF(swiper, true);
                    }}
                    onSetTransition={(swiper, transition) => {
                      console.log('Set transition', transition);
                      //updateSlidesWithRAF(swiper, false);
                     
                    }}
 
                    onBeforeLoopFix={(swiper) => {
                      console.log('Before loop fix', swiper);
                    }}
                    onLoopFix={(swiper) => {
                      console.log('Loop fix', swiper);
                    }}
                    onSwiper={(swiper) => {
                      console.log('Swiper', swiper);
                      swiperRef.current = swiper;
                    }}
                    onNavigationNext={(swiper) => {
                      isButtonClick.current = true;
                      //updateSlidesWithRAF(swiper, false);;
                    }}
                    onNavigationPrev={(swiper) => {
                      isButtonClick.current = true;
                      //updateSlidesWithRAF(swiper, false);;
                    }}
                  >
                    {slides.map((slide) => (
                      <SwiperSlide 
                        key={slide.id}
                        data-slide-index={slide.id - 1}
                        style={{
                          width: '295px',
                          height: 'auto',
                          display: 'flex',
                          justifyContent: 'center',
                          transition: 'transform 0ms ease'
                        }}
                      >
                        <div 
                          style={{
                            width: '295px',
                            minWidth: '295px',
                            maxWidth: '295px'
                          }}
                        >
                          <img
                            src={slide.image}
                            alt={slide.title}
                            style={{
                              width: '295px',
                              height: '380px',
                              objectFit: 'cover',
                              display: 'block',
                              borderRadius :'40px'
                            }}
                          />
                          <p className="mt-4 text-center text-lg">
                            {slide.title}
                          </p>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>

                  {/* 다음 버튼 */}
                  <button 
                    className="absolute right-[calc(50%-300px)] z-10 w-12 h-12 flex items-center justify-center bg-white rounded-full shadow-md cursor-pointer hover:bg-gray-50"
                    onClick={() => swiperRef.current?.slideNext()}
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
            </div>

            <div className="mt-[120px]">
              <p className="text-lg xl:text-[22px] font-regular text-[#323232]">
                라페어 라운지는 일상의 모든 순간에 함께합니다.
              </p>
              <p className="text-lg xl:text-[22px] font-regular text-[#323232] mt-2">
                눈을 뜨는 순간부터 잠자리에 드는 시간까지, 하루를 더 특별하게 만들어줄 편안함과 스타일을</p>
                <p className="text-lg xl:text-[22px] font-regular text-[#323232] mt-2">
                동시에 갖춘 상품들로 일상을 채워드립니다. 바쁜 일상 속에서도 특별함을 느껴보세요.
              </p>
            </div>
            <button className="mt-8 xl:mt-[80px] bg-[#2F2E2B] text-white w-full xl:w-[326.92px] h-[70.56px] text-[28px] hover:bg-[#1b1b1b] transition-colors rounded-[40px]">
              상품보러가기
            </button>
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
