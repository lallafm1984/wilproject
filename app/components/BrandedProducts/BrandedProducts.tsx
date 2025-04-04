'use client'

import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiChevronUp } from "react-icons/hi2";
import { ReactLenis, useLenis } from '@studio-freight/react-lenis';
import { useRouter, usePathname } from 'next/navigation';

// 스크롤 함수를 외부로 내보내기
export let scrollToSection: ((section: 'top' | 'category') => void) | null = null;

interface BrandedProductsProps {
  initialSection?: 'top' | 'category';
}

const BrandedProducts = ({ initialSection = 'top' }: BrandedProductsProps) => {
  const categoryRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();
  const router = useRouter();
  const pathname = usePathname();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isCategoryDragging, setIsCategoryDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [categoryStartX, setCategoryStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [categoryScrollLeft, setCategoryScrollLeft] = useState(0);
  const categories = [
    { id: 'underwear', name: '언더웨어' },
    { id: 'pajama', name: '파자마' },
    { id: 'loungewear', name: '라운지웨어' },
    { id: 'etc', name: 'ETC' },
  ];

  const [selectedCategory, setSelectedCategory] = useState(categories[0].name);
  const [selectedNav, setSelectedNav] = useState('Branded Products');
  const [showButton, setShowButton] = useState(false);
  
  const navigation = [
    {
      title: 'Branded Products',
      image: '/Images/SampleBg_w_1.webp',
      heading: '여러 브랜드 상품을 직접 확인하세요',
      description: '여러 브래드 상품을 직접 확인하세요 여러 브래드 상품을 직접 확인하세요 여러 브래드 상품을\n 직접 확인하세요 여러 브래드 상품을 직접 확인하세요 여러 브래드 상품을 직접 확인하세요'
    },
    {
      title: 'Kiosk',
      image: '/Images/SampleBg_w_2.webp',
      heading: '키오스크로 편리하게 주문하세요',
      description: '터치 한 번으로 쉽고 빠르게 주문할 수 있는 키오스크 시스템을 도입했습니다.\n대기 시간을 줄이고 효율적인 주문이 가능합니다.'
    },
    {
      title: 'Necessary thing',
      image: '/Images/SampleBg_w_3.webp',
      heading: '필요한 모든 것이 준비되어 있습니다',
      description: '고객님의 편안한 휴식을 위한 모든 필수품이 구비되어 있습니다.\n세심한 서비스로 최상의 경험을 제공합니다.'
    },
    {
      title: 'Special event',
      image: '/Images/SampleBg_w_1.webp',
      heading: '특별한 이벤트와 함께하세요',
      description: '라페어 라운지에서 진행되는 다양한 이벤트에 참여해보세요.\n고객님을 위한 특별한 혜택이 준비되어 있습니다.'
    }
  ];

  const products = [
    {
      id: 1,
      title: '선셋 아일랜드\n그리너리 노카라 블라우스',
      image: '/Images/Sample_1.png',
      category: 'loungewear'
    },
    {
      id: 2,
      title: '선셋 아일랜드\n그리너리 노카라 블라우스',
      image: '/Images/Sample_1.png',
      category: 'loungewear'
    },
    {
      id: 3,
      title: '선셋 아일랜드\n그리너리 노카라 블라우스',
      image: '/Images/Sample_1.png',
      category: 'loungewear'
    },
    {
      id: 4,
      title: '선셋 아일랜드\n그리너리 노카라 블라우스',
      image: '/Images/Sample_1.png',
      category: 'loungewear'
    },
    {
      id: 5,
      title: '선셋 아일랜드\n그리너리 노카라 블라우스',
      image: '/Images/Sample_1.png',
      category: 'loungewear'
    },
    {
      id: 6,
      title: '선셋 아일랜드\n그리너리 노카라 블라우스',
      image: '/Images/Sample_1.png',
      category: 'loungewear'
    },
    {
      id: 7,
      title: '선셋 아일랜드\n그리너리 노카라 블라우스',
      image: '/Images/Sample_1.png',
      category: 'loungewear'
    },
    {
      id: 8,
      title: '선셋 아일랜드\n그리너리 노카라 블라우스',
      image: '/Images/Sample_1.png',
      category: 'loungewear'
    },
    // 추가 상품 데이터...
  ];

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const categoryScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentIndex = navigation.findIndex(item => item.title === selectedNav);
      const nextIndex = (currentIndex + 1) % navigation.length;
      setSelectedNav(navigation[nextIndex].title);
    }, 7000);

    return () => clearInterval(interval);
  }, [selectedNav, navigation]);

  useEffect(() => {
    if (initialSection === 'category' && lenis) {
      const element = document.getElementById('product-category');
      if (element) {
        const yOffset = -200;
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        lenis.scrollTo(y, {
          immediate: true
        });
      }
    }
  }, [initialSection, lenis]);

  useEffect(() => {
    setImageLoaded(false);
    const img = new window.Image();
    img.src = navigation.find(item => item.title === selectedNav)?.image || '';
    img.onload = () => setImageLoaded(true);
  }, [selectedNav, navigation]);

  useEffect(() => {
    // 다음 이미지 프리로딩
    const nextIndex = (navigation.findIndex(item => item.title === selectedNav) + 1) % navigation.length;
    const nextImage = new window.Image();
    nextImage.src = navigation[nextIndex].image;
  }, [selectedNav, navigation]);

  // 페이지 최상단으로 스크롤하는 함수
  const scrollToTop = () => {
    lenis.scrollTo(0, {
      duration: 0,
      immediate: true
    });
  };

  // 스크롤 함수를 전역 변수에 할당
  useEffect(() => {
    scrollToSection = (section: 'top' | 'category') => {
      if (section === 'category') {
        scrollToTop();
      } else {
        scrollToTop();
      }
    };

    return () => {
      scrollToSection = null;
    };
  }, [lenis]);

  // 페이지 내 이동 처리 함수
  const handleNavigation = (path: string, section: 'top' | 'category') => {
    // 현재 경로와 이동하려는 경로가 같은 경우
    if (pathname === path) {
      if (section === 'category') {
        scrollToTop();
      } else {
        scrollToTop();
      }
    } else {
      // 다른 페이지로 이동하는 경우
      router.push(`${path}?section=${section}`);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleCategoryMouseDown = (e: React.MouseEvent) => {
    if (!categoryScrollRef.current) return;
    setIsCategoryDragging(true);
    setCategoryStartX(e.pageX - categoryScrollRef.current.offsetLeft);
    setCategoryScrollLeft(categoryScrollRef.current.scrollLeft);
  };

  const handleCategoryMouseMove = (e: React.MouseEvent) => {
    if (!isCategoryDragging || !categoryScrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - categoryScrollRef.current.offsetLeft;
    const walk = (x - categoryStartX) * 1.5;
    categoryScrollRef.current.scrollLeft = categoryScrollLeft - walk;
  };

  const handleCategoryMouseUp = () => {
    setIsCategoryDragging(false);
  };

  const handleCategoryMouseLeave = () => {
    setIsCategoryDragging(false);
  };

  return (
    <ReactLenis root options={{ 
      lerp: 0.1,
      duration: 1.5,
      smoothWheel: true,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
    }}>
      <div className="w-full relative">
        <div className="flex flex-col">
          {/* 상단 이미지 섹션 */}
          <div id="lafair-lounge" className="relative flex flex-col-reverse xl:flex-row justify-between bg-[#f8f8f2] w-full  xl:px-[calc((100%-1504px)/2)] max-w-[1920px] mx-auto">
            {/* 좌측 네비게이션 */}
            <div className="hidden xl:block px-6 mb-10 xl:mb-0  xl:mt-[336px]">
              <ul className="space-y-4">
                {navigation.map((item) => (
                  <li 
                    key={item.title}
                    className={`font-poppins font-medium text-[20px] lg:text-[30px] leading-[24px] lg:leading-[58px] cursor-pointer transition-colors duration-300  ${
                      selectedNav === item.title ? 'text-[#92000a]' : 'text-[#323232] hover:text-[#92000a]'
                    }`}
                    onClick={() => setSelectedNav(item.title)}
                  >
                    <span className="break-words">{item.title}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="hidden xl:flex flex-col mt-10 px-6 xl:mt-[200px] items-center xl:items-start xl:px-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedNav}
                  initial={{ clipPath: 'inset(0 100% 0 0)', opacity: 0 }}
                  animate={imageLoaded ? { clipPath: 'inset(0 0% 0 0)', opacity: 1 } : { clipPath: 'inset(0 100% 0 0)', opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ 
                    clipPath: { duration: 0.7, ease: 'easeInOut' },
                    opacity: { duration: 0.2 }
                  }}
                  className="w-full h-[300px] md:h-[400px] lg:w-[996px] lg:h-[540px] relative"
                >
                  <Image
                    src={navigation.find(item => item.title === selectedNav)?.image || ''}
                    alt={selectedNav}
                    layout="fill"
                    objectFit="cover"
                    className=""
                    priority
                    onLoadingComplete={() => setImageLoaded(true)}
                  />
                </motion.div>
              </AnimatePresence>
              <motion.div 
                key={selectedNav + "-text"}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ 
                  duration: 0.7,
                  delay: 0.2
                }}
                className="relative top-[-45px] lg:top-[-40px] px-4 lg:pl-[105px] mt-8 lg:mt-0 xl:mb-[160px]"
              >
                <h2 className="text-[24px] lg:text-[56px] leading-[32px] lg:leading-[74px] tracking-[-1.8px] lg:tracking-[-2.8px] text-start text-[#1b1b1b] break-keep">
                  {navigation.find(item => item.title === selectedNav)?.heading}
                </h2>
                <p className="text-[16px] lg:text-[22px] leading-[24px] lg:leading-[36px] tracking-[-0.28px] lg:tracking-[-0.35px] text-start mt-[20px] lg:mt-[32px] text-gray-600 whitespace-pre-line break-keep">
                  {navigation.find(item => item.title === selectedNav)?.description}
                </p>
              </motion.div>
            </div>

            {/* 모바일 네비게이션 */}
            <div className="block xl:hidden w-full">
              <div 
                ref={scrollContainerRef}
                className="overflow-x-auto scrollbar-hide h-[494px] cursor-grab active:cursor-grabbing" 
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseLeave}
              >
                <div className="flex mt-[90px] mx-[30px] min-w-max items-start gap-[15px]">
                  {navigation.map((item) => (
                    <div 
                      key={item.title}
                      className={`flex flex-col h-full items-start justify-start select-none`}
                    >
                      <div className="relative w-[267.5px] h-[162px] overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.title}
                          layout="fill"
                          objectFit="cover"
                          className=""
                          priority
                          draggable="false"
                        />
                      </div>
                      <h3 className="mt-[21px] w-[267.5px] text-[32px] leading-[40px] tracking-[-1.6px] font-medium text-[#1b1b1b] break-keep whitespace-pre-line">
                        {item.heading}
                      </h3>
                      <p className="mt-[12px] w-[267.5px] text-[14px] leading-[20px] text-[#1b1b1b]">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          
          </div>

            




          {/* 카테고리 필터 */}
          <div 
            ref={categoryScrollRef}
            id="product-category" 
            className="flex overflow-x-auto scrollbar-hide xl:flex-wrap justify-start xl:justify-center gap-[15px] xl:gap-[30px] mt-[91px] xl:mt-[200px] mb-[22px] xl:mb-[60px] px-[30px] xl:px-0 cursor-grab active:cursor-grabbing"
            onMouseDown={handleCategoryMouseDown}
            onMouseMove={handleCategoryMouseMove}
            onMouseUp={handleCategoryMouseUp}
            onMouseLeave={handleCategoryMouseLeave}
          >
            {categories.map((category) => (
              <button
                key={category.id}
                className={`pl-[20px] pr-[20px] lg:pl-[28px] lg:pr-[27px] py-[12px] lg:py-[13px] rounded-full text-[12px] lg:text-[24px] leading-[15px] lg:leading-[36px] tracking-[-0.31px] lg:tracking-[-0.62px] transition-colors duration-300 whitespace-nowrap select-none ${
                  selectedCategory === category.name
                    ? 'bg-[#92000a] text-white border border-[#92000a]'
                    : 'bg-white text-[#1b1b1b] border border-[#1b1b1b]'
                }`}
                onClick={() => !isCategoryDragging && setSelectedCategory(category.name)}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* 상품 그리드 */}
          <div className="flex flex-wrap justify-center max-w-[1524px] mx-auto gap-[21px] xl:gap-[20px] px-4 xl:px-0">
            {products.map((product) => (
              <div key={product.id} className="group relative overflow-hidden">
                <div className="w-[140px] h-[200px] md:w-[200px] md:h-[280px] xl:w-[361px] xl:h-[503px] relative rounded-2xl xl:rounded-3xl overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.title}
                    layout="fill"
                    objectFit="cover"
                    className="xl:transition-all xl:duration-300 xl:group-hover:blur-sm"
                  />
                  {/* 데스크톱 호버 시 나타나는 텍스트 */}
                  <div className="hidden xl:flex absolute inset-0 items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-center text-[#1b1b1b] font-normal text-[22px] leading-[34px] whitespace-pre-wrap px-4 break-keep">
                      {product.title}
                    </p>
                  </div>
                </div>
                {/* 모바일 텍스트 */}
                <div className="block xl:hidden mt-[12px] mb-[11px]">
                  <p className="text-[15px] leading-[23px] tracking-[-0.39px] text-[#1b1b1b] break-keep whitespace-pre-line">
                    {product.title}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* 더보기 버튼 */}
          <div className="text-center mt-[70px] lg:mt-[100px] mb-[100px] lg:mb-[200px]">
            <button className="bg-[#323232] w-[148px] lg:w-[310px] h-[43px] lg:h-[72px] text-white rounded-full text-[18px] lg:text-[30px] leading-[18px] lg:leading-[36px] tracking-[-0.47px] lg:tracking-[-0.78px]">
              더보기
            </button>
          </div>
        </div>

        {/* 앱쇼핑몰 바로가기 버튼 */}
        <div className={`fixed bottom-[40px] lg:bottom-[60px] right-[17px] lg:right-[78px] z-50 flex flex-col items-center transition-opacity duration-300 ${showButton ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <button 
            onClick={scrollToTop}
            className="w-[50px] h-[50px] lg:w-[86px] lg:h-[86px] bg-white rounded-full shadow-[0_2px_12px_0_rgba(0,0,0,0.08)] mb-[10px] lg:mb-[14px] flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors duration-300"
          >
            <div className="w-[24px] lg:w-[50px] h-[20px] lg:h-[15px] flex items-center justify-center">
              <HiChevronUp size={40} className="lg:hidden" strokeWidth={0.2} />
              <HiChevronUp size={50} className="hidden lg:block" strokeWidth={0.2} />
            </div>
          </button>
          <button className="w-[50px] h-[50px] lg:w-[86px] lg:h-[86px] bg-[#92000A] rounded-full text-white text-center flex flex-col items-center justify-center">
            <span className="text-[11px] lg:text-[16px] leading-[20px] lg:leading-[24px] font-medium whitespace-pre-wrap">앱쇼핑몰{'\n'}</span><span className="hidden lg:block">바로가기</span>
          </button>
        </div>
      </div>
    </ReactLenis>
  );
};

export default BrandedProducts; 