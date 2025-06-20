'use client'

import Image from 'next/image';
import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter, usePathname } from 'next/navigation';
import { useVirtualizer } from '@tanstack/react-virtual';


// 스크롤 함수를 외부로 내보내기
export let scrollToSection: ((section: 'top' | 'category') => void) | null = null;

interface BrandedProductsProps {
  initialSection?: 'top' | 'category';
}

const BrandedProducts = ({ initialSection = 'top' }: BrandedProductsProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isCategoryDragging, setIsCategoryDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [categoryStartX, setCategoryStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [categoryScrollLeft, setCategoryScrollLeft] = useState(0);
  const [isCategoryScrollable, setIsCategoryScrollable] = useState(false);

  const categories = [
    { id: 'underwear', name: '언더웨어' },
    { id: 'pajama', name: '파자마' },
    { id: 'loungewear', name: '라운지웨어' },
    { id: 'etc', name: 'ETC' },
  ];

  const [selectedCategory, setSelectedCategory] = useState(categories[0].name);
  const [selectedNav, setSelectedNav] = useState('Branded Products');
  const [showButton, setShowButton] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const navigation = [
    {
      title: 'Branded Products',
      image: '/Images/rounge/1.webp',
      heading: '여러 브랜드 상품을 직접 확인하세요',
      description:
        '라페어의 베스트 셀러와, 라페어가 직접 엄선한 라이프 웨어 브랜드 제품들을 만나보세요',
    },
    {
      title: 'Kiosk',
      image: '/Images/rounge/2.webp',
      heading: '키오스크로 편리하게 주문하세요',
      description:
        '누구의 시선도 없이, 나만의 속도로\n 편안하게 고르고, 키오스크로 간편하게 주문하세요',
    },
    {
      title: 'Necessary thing',
      image: '/Images/rounge/3.webp',
      heading: '필요한 모든 것이 준비되어 있습니다',
      description:
        '편안한 하루를 만드는 데 필요한 것들이 준비되어 있습니다.\n지금, 가장 기본부터 제대로 갖춰보세요',
    },
    {
      title: 'Special event',
      image: '/Images/rounge/4.webp',
      heading: '특별한 이벤트와 함께하세요',
      description:
        '라페어 라운지에서만 경험할 수 있는 이벤트.\n특별한 혜택을 만나보세요',
    },
  ];

  const products = [
    {
      id: 1,
      title: '숲 속의 산책\n나염 인견 팬티',
      image: '/Images/rounge/product_underwear/1.webp',
      category: 'underwear',
    },
    {
      id: 2,
      title: '별 헤는 밤\n나염 인견 팬티',
      image: '/Images/rounge/product_underwear/2.webp',
      category: 'underwear',
    },
    {
      id: 3,
      title: '바로크\n나염 팬티',
      image: '/Images/rounge/product_underwear/3.webp',
      category: 'underwear',
    },
    {
      id: 4,
      title: '바로크\n솔리드 팬티',
      image: '/Images/rounge/product_underwear/4.webp',
      category: 'underwear',
    },
    {
      id: 5,
      title: '레트로레이디 팜므\n나염 인견 팬티',
      image: '/Images/rounge/product_underwear/5.webp',
      category: 'underwear',
    },
    {
      id: 6,
      title: '집 앞에 그린\n인견 나염 팬티',
      image: '/Images/rounge/product_underwear/6.webp',
      category: 'underwear',
    },
    {
      id: 7,
      title: '레트로레이디 무드\n솔리드 인견 팬티',
      image: '/Images/rounge/product_underwear/7.webp',
      category: 'underwear',
    },
    {
      id: 8,
      title: '알사탕\n인견 솔리드 팬티',
      image: '/Images/rounge/product_underwear/8.webp',
      category: 'underwear',
    },
    {
      id: 9,
      title: '여우의 꿈 나염\n인견 팬티',
      image: '/Images/rounge/product_underwear/9.webp',
      category: 'underwear',
    },
    {
      id: 10,
      title: '지붕 위의 와인\n인견 나염 팬티',
      image: '/Images/rounge/product_underwear/10.webp',
      category: 'underwear',
    },
    {
      id: 11,
      title: '집주인 취향 블루\n인견 나염 팬티',
      image: '/Images/rounge/product_underwear/11.webp',
      category: 'underwear',
    },
    {
      id: 12,
      title: '마카롱 인견\n솔리드 팬티',
      image: '/Images/rounge/product_underwear/12.webp',
      category: 'underwear',
    },
    {
      id: 13,
      title: '포피레드 미모사\n민소매 프릴 파자마 셋업',
      image: '/Images/rounge/product_pajama/1.webp',
      category: 'pajama',
    },
    {
      id: 14,
      title: '스노우블루 모히토\n파자마 셋업',
      image: '/Images/rounge/product_pajama/2.webp',
      category: 'pajama',
    },
    {
      id: 15,
      title: '리치블랙 레이디콕\n파자마 셋업',
      image: '/Images/rounge/product_pajama/3.webp',
      category: 'pajama',
    },
    {
      id: 16,
      title: '베이비 블루\n인견 파자마 라운지 웨어',
      image: '/Images/rounge/product_pajama/4.webp',
      category: 'pajama',
    },
    {
      id: 17,
      title: '블러썸 핑크\n인견 파자마 라운지 웨어',
      image: '/Images/rounge/product_pajama/5.webp',
      category: 'pajama',
    },
    {
      id: 18,
      title: '가든 그린\n인견 파마자 라운지 웨어',
      image: '/Images/rounge/product_pajama/6.webp',
      category: 'pajama',
    },
    {
      id: 19,
      title: '블룸 로즈 그린 플라워\n인견 파자마 세트',
      image: '/Images/rounge/product_pajama/7.webp',
      category: 'pajama',
    },
    {
      id: 20,
      title: '라임오렌지 플라워\n인견 파자마 세트',
      image: '/Images/rounge/product_pajama/8.webp',
      category: 'pajama',
    },
    {
      id: 21,
      title: '아르페지오 블랙핑크\n민소매 파자마 셋업',
      image: '/Images/rounge/product_pajama/9.webp',
      category: 'pajama',
    },
    {
      id: 22,
      title: '칸타빌레 핑크블루\n민소매 파자마 셋업',
      image: '/Images/rounge/product_pajama/10.webp',
      category: 'pajama',
    },
    {
      id: 23,
      title: '앙상블 옐로우피치\n돌먼 파자마 셋업',
      image: '/Images/rounge/product_pajama/11.webp',
      category: 'pajama',
    },
    {
      id: 24,
      title: '팜므 네이비\n파자마 세트',
      image: '/Images/rounge/product_pajama/12.webp',
      category: 'pajama',
    },
    {
      id: 25,
      title: '클래식 볼드 블랙\n핀턱 셋업',
      image: '/Images/rounge/product_loungewear/1.webp',
      category: 'loungewear',
    },
    {
      id: 26,
      title: '빈티지 스트라이프\n핀턱 셋업',
      image: '/Images/rounge/product_loungewear/2.webp',
      category: 'loungewear',
    },
    {
      id: 27,
      title: '디아나 핑크네이비\n아사면 셋업',
      image: '/Images/rounge/product_loungewear/3.webp',
      category: 'loungewear',
    },
    {
      id: 28,
      title: '아이리스 블루\n인견 썸머 라운지웨어',
      image: '/Images/rounge/product_loungewear/4.webp',
      category: 'loungewear',
    },
    {
      id: 29,
      title: '레나 로즈\n인견 썸머 라운지웨어',
      image: '/Images/rounge/product_loungewear/5.webp',
      category: 'loungewear',
    },
    {
      id: 30,
      title: '플로럴 블랙\n인견 라운지웨어',
      image: '/Images/rounge/product_loungewear/6.webp',
      category: 'loungewear',
    },
    {
      id: 31,
      title: '카라멜 블랙\n민소매 핀턱 셋업',
      image: '/Images/rounge/product_loungewear/7.webp',
      category: 'loungewear',
    },
    {
      id: 32,
      title: '샤르망 블랙\n인견 썸머 라운지웨어',
      image: '/Images/rounge/product_loungewear/8.webp',
      category: 'loungewear',
    },
    {
      id: 33,
      title: '버건디 홀릭\n썸머팬츠',
      image: '/Images/rounge/product_loungewear/9.webp',
      category: 'loungewear',
    },
    {
      id: 34,
      title: '블룸 블루\n썸머팬츠',
      image: '/Images/rounge/product_loungewear/10.webp',
      category: 'loungewear',
    },
    {
      id: 35,
      title: '크루셜 퍼플\n썸머팬츠',
      image: '/Images/rounge/product_loungewear/11.webp',
      category: 'loungewear',
    },
    {
      id: 36,
      title: '남여공용 베이지\n5부 썸머 팬츠',
      image: '/Images/rounge/product_loungewear/12.webp',
      category: 'loungewear',
    },
    {
      id: 37,
      title: '에메랄드 웨이브\n남성 홈슈즈',
      image: '/Images/rounge/product_etc/1.webp',
      category: 'etc',
    },
    {
      id: 38,
      title: '블랙와인\n홈슈즈',
      image: '/Images/rounge/product_etc/2.webp',
      category: 'etc',
    },
    {
      id: 39,
      title: '그린\n홈슈즈',
      image: '/Images/rounge/product_etc/3.webp',
      category: 'etc',
    },
    {
      id: 40,
      title: '베이비 핑크\n홈슈즈',
      image: '/Images/rounge/product_etc/4.webp',
      category: 'etc',
    },
    {
      id: 41,
      title: '베이직 양말\n화이트 롱',
      image: '/Images/rounge/product_etc/5.webp',
      category: 'etc',
    },
    {
      id: 42,
      title: '베이직 양말\n화이트',
      image: '/Images/rounge/product_etc/6.webp',
      category: 'etc',
    },
    {
      id: 43,
      title: '패턴 양말',
      image: '/Images/rounge/product_etc/7.webp',
      category: 'etc',
    },
    {
      id: 44,
      title: '베이직 양말\n베이지',
      image: '/Images/rounge/product_etc/8.webp',
      category: 'etc',
    },
    {
      id: 45,
      title: '듀이 네이비\n홈슈즈',
      image: '/Images/rounge/product_etc/9.webp',
      category: 'etc',
    },
    {
      id: 46,
      title: '베이비 핑크\n홈슈즈',
      image: '/Images/rounge/product_etc/10.webp',
      category: 'etc',
    },
    {
      id: 47,
      title: '캬라멜 블랙\n홈슈즈',
      image: '/Images/rounge/product_etc/11.webp',
      category: 'etc',
    },
    {
      id: 48,
      title: '에메랄드 웨이브\n홈슈즈',
      image: '/Images/rounge/product_etc/12.webp',
      category: 'etc',
    },
  ];

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const categoryScrollRef = useRef<HTMLDivElement>(null);
  const productGridParentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

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
    if (isClient && initialSection === 'category') {
      const element = document.getElementById('product-category');
      if (element) {
        const yOffset = window.innerWidth < 768 ? -120 : -200;
        const y =
          element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'auto' });
      }
    }
  }, [initialSection, isClient]);

  useEffect(() => {
    setImageLoaded(false);
    const img = new window.Image();
    img.src = navigation.find((item) => item.title === selectedNav)?.image || '';
    img.onload = () => setImageLoaded(true);
  }, [selectedNav, navigation]);

  useEffect(() => {
    // 다음 이미지 프리로딩
    const nextIndex =
      (navigation.findIndex((item) => item.title === selectedNav) + 1) %
      navigation.length;
    const nextImage = new window.Image();
    nextImage.src = navigation[nextIndex].image;
  }, [selectedNav, navigation]);


  // 페이지 최상단으로 스크롤하는 함수
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'auto' });
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
  }, []);

  // 페이지 내 이동 처리 함수
  const handleNavigation = (path: string, section: 'top' | 'category') => {
    if (pathname === path) {
      if (section === 'category') {
        scrollToTop();
      } else {
        scrollToTop();
      }
    } else {
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

  // 카테고리명과 products의 category 필드 매핑
  const categoryMap: Record<string, string> = {
    언더웨어: 'underwear',
    파자마: 'pajama',
    라운지웨어: 'loungewear',
    ETC: 'etc',
  };

  const filteredProducts = useMemo(() => products.filter(
    (product) => product.category === categoryMap[selectedCategory]
  ), [selectedCategory]);

  useEffect(() => {
    const checkScrollable = () => {
      if (categoryScrollRef.current) {
        setIsCategoryScrollable(
          categoryScrollRef.current.scrollWidth >
            categoryScrollRef.current.clientWidth
        );
      }
    };
    checkScrollable();
    window.addEventListener('resize', checkScrollable);
    return () => window.removeEventListener('resize', checkScrollable);
  }, [categories, selectedCategory]);

  // --- Virtualization Logic ---

  const getNumColumns = () => {
    if (typeof window === 'undefined') return 4;
    if (window.innerWidth >= 1280) return 4;
    if (window.innerWidth >= 768) return 3;
    return 2;
  };

  const [numColumns, setNumColumns] = useState(getNumColumns());

  useEffect(() => {
    const handleResize = () => setNumColumns(getNumColumns());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const itemsToVirtualize = useMemo(() => isExpanded ? filteredProducts : filteredProducts.slice(0, 8), [isExpanded, filteredProducts]);

  const productRows = useMemo(() => {
      const rows = [];
      for (let i = 0; i < itemsToVirtualize.length; i += numColumns) {
          rows.push(itemsToVirtualize.slice(i, i + numColumns));
      }
      return rows;
  }, [itemsToVirtualize, numColumns]);

  const getRowHeight = () => {
    if (typeof window === 'undefined') return 523;
    if (window.innerWidth >= 1280) return 503 + 20;
    if (window.innerWidth >= 768) return 280 + 12 + 46 + 11 + 21;
    return 200 + 12 + 11 + 46 + 21;
  };

  const rowVirtualizer = useVirtualizer({
    count: productRows.length,
    getScrollElement: () => productGridParentRef.current,
    estimateSize: getRowHeight,
    overscan: 2,
  });

  const handleShowMore = () => {
    const firstNewRowIndex = Math.floor(8 / numColumns);
    const firstNewRow = rowVirtualizer.getVirtualItems().find(item => item.index === firstNewRowIndex);

    setIsExpanded(true);

    setTimeout(() => {
        const gridTop = productGridParentRef.current?.getBoundingClientRect().top ?? 0;
        const targetElement = document.querySelector(`[data-index="${firstNewRowIndex}"]`);
        if (targetElement) {
            const mobileOffset = window.innerWidth < 768 ? 100 : 0;
            const targetTop = targetElement.getBoundingClientRect().top;
            const targetScroll = targetTop + window.pageYOffset - (window.innerHeight / 2) + (getRowHeight() / 2) + mobileOffset;

            window.scrollTo({
                top: targetScroll,
                behavior: 'smooth'
            });
        }
    }, 0);
  };

  const handleCollapse = () => {
    const categoryElement = document.getElementById('product-category');
    if (categoryElement) {
      const offset = window.innerWidth >= 1280 ? 170 : 120;
      const targetScroll =
        categoryElement.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth',
      });
      setTimeout(() => {
        setIsExpanded(false);
      }, 500);
    } else {
      setIsExpanded(false);
    }
  };

  if (!isClient) {
    return null;
  }

  return (
    <div className="w-full relative">
      <div className="flex flex-col">
        {/* 상단 이미지 섹션 */}
        <div
          id="lafair-lounge"
          className="relative flex flex-col-reverse xl:flex-row justify-between bg-[#f8f8f2] w-full  xl:px-[calc((100%-1504px)/2)] max-w-[1920px] mx-auto"
        >
          {/* 좌측 네비게이션 */}
          <div className="hidden xl:block px-6 mb-10 xl:mb-0  xl:mt-[336px]">
            <ul className="space-y-4">
              {navigation.map((item) => (
                <li
                  key={item.title}
                  className={`font-poppins font-medium text-[20px] lg:text-[30px] leading-[24px] lg:leading-[58px] cursor-pointer transition-colors duration-300  ${
                    selectedNav === item.title
                      ? 'text-[#92000a]'
                      : 'text-[#323232] hover:text-[#92000a]'
                  }`}
                  onMouseOver={() => setSelectedNav(item.title)}
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
                animate={
                  imageLoaded
                    ? { clipPath: 'inset(0 0% 0 0)', opacity: 1 }
                    : { clipPath: 'inset(0 100% 0 0)', opacity: 0 }
                }
                exit={{ opacity: 0 }}
                transition={{
                  clipPath: { duration: 0.7, ease: 'easeInOut' },
                  opacity: { duration: 0.2 },
                }}
                className="w-full h-[300px] md:h-[400px] lg:w-[996px] lg:h-[540px] relative"
              >
                <Image
                  src={
                    navigation.find((item) => item.title === selectedNav)
                      ?.image || ''
                  }
                  alt={selectedNav}
                  layout="fill"
                  objectFit="cover"
                  className=""
                  priority
                  onLoadingComplete={() => setImageLoaded(true)}
                />
                <div
                  className="pointer-events-none absolute left-0 bottom-0 w-full h-[181px] z-10"
                  style={{
                    background:
                      'linear-gradient(to bottom, rgba(255,255,255,0) 7%, #fff 100%)',
                  }}
                />
              </motion.div>
            </AnimatePresence>
            <motion.div
              key={selectedNav + '-text'}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.2,
              }}
              className="relative top-[-45px] lg:top-[-40px] px-4 lg:pl-[105px] mt-8 lg:mt-0 xl:mb-[160px]"
            >
              <h2 className="text-[24px] lg:text-[56px] leading-[32px] lg:leading-[74px] tracking-[-1.8px] lg:tracking-[-2.8px] text-start text-[#1b1b1b] break-keep">
                {
                  navigation.find((item) => item.title === selectedNav)
                    ?.heading
                }
              </h2>
              <p className="text-[16px] lg:text-[22px] leading-[24px] lg:leading-[36px] tracking-[-0.28px] lg:tracking-[-0.35px] text-start mt-[20px] lg:mt-[32px] text-gray-600 whitespace-pre-line break-keep">
                {
                  navigation.find((item) => item.title === selectedNav)
                    ?.description
                }
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
          className={`flex overflow-x-auto scrollbar-hide xl:flex-wrap gap-[15px] xl:gap-[30px] mt-[91px] xl:mt-[200px] mb-[22px] xl:mb-[60px]  xl:px-0 cursor-grab active:cursor-grabbing
              ${
                isCategoryScrollable ? 'justify-start' : 'justify-center'
              } xl:justify-center`}
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
              onClick={() => {
                if (!isCategoryDragging) {
                  setSelectedCategory(category.name);
                  setIsExpanded(false);
                }
              }}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* 상품 그리드 */}
        <div
          ref={productGridParentRef}
          className="relative w-full"
          style={{ height: `${rowVirtualizer.getTotalSize()}px` }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualRow) => {
            const row = productRows[virtualRow.index];
            return (
              <div
                key={virtualRow.key}
                data-index={virtualRow.index}
                className="absolute top-0 left-0 w-full"
                style={{
                  height: `${virtualRow.size}px`,
                  transform: `translateY(${virtualRow.start}px)`,
                }}
              >
                <div className="flex flex-wrap justify-center overflow-x-auto max-w-[1524px] mx-auto gap-[21px] xl:gap-[20px] px-4 xl:px-0">
                    {row.map(product => (
                        <div
                        key={product.id}
                        className="group relative overflow-hidden flex-shrink-0"
                        >
                        <div
                            className={`min-w-[120px] w-[140px] h-[200px] md:w-[200px] md:h-[280px] xl:w-[361px] xl:h-[503px] relative rounded-2xl xl:rounded-[40px] overflow-hidden ${
                            [37, 38, 43, 44].includes(product.id) ? 'border-[1px]' : ''
                            }`}
                        >
                            <Image
                            src={product.image}
                            alt={product.title}
                            layout="fill"
                            objectFit="cover"
                            className="xl:transition-all xl:duration-300 xl:group-hover:blur-sm "
                            />
                            {/* 데스크톱 호버 시 나타나는 텍스트 */}
                            <div className="hidden xl:flex absolute inset-0 items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            {/* 딤드 배경 */}
                            <div className="absolute inset-0 bg-[#ffffff26] z-0" />
                            <p className="relative z-10 text-center text-[#1b1b1b] font-normal text-[22px] leading-[34px] whitespace-pre-wrap px-4 break-keep">
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
              </div>
            );
          })}
        </div>


        {/* 더보기 버튼 */}
        {filteredProducts.length > 8 && (
          <div className="text-center mt-[70px] lg:mt-[100px] mb-[100px] lg:mb-[200px]">
            <button
              className="bg-[#323232] w-[148px] lg:w-[310px] h-[43px] lg:h-[72px] text-white rounded-full text-[18px] lg:text-[30px] leading-[18px] lg:leading-[36px] tracking-[-0.47px] lg:tracking-[-0.78px]"
              onClick={isExpanded ? handleCollapse : handleShowMore}
            >
              {isExpanded ? '간단히 보기' : '더보기'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BrandedProducts; 