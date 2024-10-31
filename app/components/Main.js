'use client'

import React, { useState, useEffect } from 'react';
import { Bars3Icon, XMarkIcon, ChevronDownIcon , CalendarIcon  } from '@heroicons/react/24/outline';
import Image from 'next/image';

const LingerieBrandSite = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState({
    hero: false,
    banner1: false,
    banner2: false
  });
  const [productSlide, setProductSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setIsVisible({ hero: true, banner1: false, banner2: false });
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      
      const banner1 = document.getElementById('banner1');
      const banner2 = document.getElementById('banner2');
      
      if (banner1 && scrollPosition > banner1.offsetTop + 100) {
        setIsVisible(prev => ({ ...prev, banner1: true }));
      }
      
      if (banner2 && scrollPosition > banner2.offsetTop + 100) {
        setIsVisible(prev => ({ ...prev, banner2: true }));
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setProductSlide((prev) => (prev + 1) % products.length);
    }, 3000);
    
    return () => clearInterval(timer);
  }, []);

  const heroSlides = [
    {
      image: "/Images/SampleBg_1.png",
      title: "Elegance Defined",
      subtitle: "당신만의 특별한 순간을 위한 럭셔리 란제리",
    },
    {
      image: "/Images/SampleBg_2.png",
      title: "Summer Collection",
      subtitle: "자연스러운 실루엣을 완성하는 시그니처 라인",
    },
    {
      image: "/Images/SampleBg_3.png",
      title: "Timeless Beauty",
      subtitle: "클래식한 디자인과 현대적 감각의 조화",
    }
  ];

  const newsItems = [
    {
      id: 1,
      image: "/Images/SampleN4.jpg",
      date: "2024.10.30",
      title: "2024 겨울 시즌 컬렉션 출시",
      description: "자연스러운 실루엣과 부드러운 터치감으로 완성된 2024 겨울 시즌 컬렉션을 만나보세요.",
      category: "NEW COLLECTION"
    },
    {
      id: 2,
      image: "/Images/SampleN6.jpg",
      date: "2024.12.01",
      title: "라페어 매장 오픈",
      description: "라페어 새로운 플래그십 스토어에서 특별한 경험을 만나보세요.",
      category: "STORE NEWS"
    },
    {
      id: 3,
      image: "/Images/SampleN5.jpg",
      date: "2024.03.05",
      title: "지속가능한 패션을 위한 에코 라인 출시",
      description: "라페어의 에코 프렌들리 컬렉션을 소개합니다.",
      category: "SUSTAINABILITY"
    }
  ];

  const products = [
    {
      id: 1,
      name: "코랄 수딩웜 맞주름 원피스",
      price: "39,900원",
      image: "/Images/SampleN1.jpg",
      description: "아라베스크 패턴과 레트로한 무드의 컬러"
    },
    {
      id: 2,
      name: "골드가든 네이비 팬츠",
      price: "19,900원",
      image: "/Images/SampleN2.jpg",
      description: "편안한 활동성을 자랑하는 베이직한 팬츠"
    },
    {
      id: 3,
      name: "베이지 핑크 수딩웜 조거팬츠",
      price: "19,900원",
      image: "/Images/SampleN3.jpg",
      description: "가볍고 포근한 데일리 라운지웨어"
    }
  ];

  // 모바일 메뉴 닫기 함수

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-white to-rose-50" >

    {/* 메인 컨텐츠 */}
    <main className="w-full overflow-hidden">
    <section className="h-96 relative overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              currentSlide === index ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img 
              src={slide.image}
              className="w-full h-full object-cover transform scale-110 transition-transform duration-[10000ms] ease-out"
              style={{
                transform: currentSlide === index ? 'scale(1)' : 'scale(1.1)'
              }}
            />
             <div className="absolute inset-0 bg-gradient-to-b from-rose-900/10 via-rose-900/20 to-rose-900/30" />
            
            <div className="absolute inset-0 flex items-center justify-center text-white text-center">
              <div className={`space-y-6 transition-all duration-1000 ${
                currentSlide === index 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-10'
              }`}>
                 <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif drop-shadow-lg">
                  {slide.title}
                </h2>
                <p className="text-xl md:text-2xl drop-shadow">
                  {slide.subtitle}
                </p>
              </div>
            </div>
          </div>
        ))}

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentSlide === index ? 'w-8 bg-white' : 'w-2 bg-white/50'
              }`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </section>
      {/* 뉴스 섹션 */}
      <section className="py-20 relative">
          {/* 럭셔리한 배경 패턴 */}
          <div className="absolute inset-0 opacity-5">
            <div className="w-full h-full" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '30px 30px'
            }}/>
          </div>
          
          <div className="relative bg-gradient-to-b from-rose-50/50 via-white/50 to-rose-50/50 backdrop-blur-sm">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h3 className="text-3xl md:text-4xl font-serif mb-4 text-rose-900">Latest News</h3>
                <p className="text-rose-700">W.I.L의 최신 소식을 만나보세요</p>
              </div>
          
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {newsItems.map((item) => (
                  <article
                    key={item.id} 
                    className="group bg-gradient-to-br from-white/90 to-rose-50/90 backdrop-blur-sm rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-rose-100"
                  >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-rose-900/90 text-white text-xs px-3 py-1 rounded">
                      {item.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center space-x-2 text-rose-700 mb-3">
                    <CalendarIcon className="h-4 w-4" />
                    <time className="text-sm">{item.date}</time>
                  </div>
                  
                  <h4 className="text-xl font-medium mb-3 text-rose-900 group-hover:text-rose-700 transition-colors">
                    {item.title}
                  </h4>
                  
                  <p className="text-rose-700/80 text-sm mb-4">
                    {item.description}
                  </p>
                  
                  <button className="inline-flex items-center text-sm font-medium text-rose-900 group-hover:text-rose-700">
                    자세히 보기
                    <ChevronDownIcon className="h-4 w-4 ml-1 rotate-[-90deg]" />
                  </button>
                </div>
              </article>
            ))}
             </div>
          </div>
        </div>
      </section>
 {/* 배너 섹션 1 */}
 <section 
        id="banner1"
        className="w-full py-20 bg-rose-50"
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            {/* 이미지 */}
            <div className={`
              w-full md:w-1/2
              transition-all duration-1000 ease-out delay-300
              ${isVisible.banner1 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-[50%]'}
            `}>
              <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/Images/SampleN10.jpg"
                  alt="Luxury Interior"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            
            {/* 텍스트 */}
            <div className={`
              w-full md:w-1/2 text-center md:text-left
              transition-all duration-1000 ease-out delay-500
              ${isVisible.banner1 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-[50%]'}
            `}>
              <h2 className="text-4xl md:text-5xl font-extrabold text-rose-900 mb-6">
                가맹점 혜택
              </h2>
              <p className="text-xl text-rose-700 mb-8 leading-relaxed">
              오늘날 경쟁이 치열한 시장에서 야심 찬 기업가는 처음부터 자신의 사업을 시작하거나 기존 프랜차이즈에 합류해야 하는 결정에 직면해 있습니다. 프랜차이즈는 독립성을 더 크고 확고한 회사의 지원과 결합하여 비즈니스 성공과 지속 가능성을 향상시킬 수 있는 다양한 혜택을 제공하는 독특한 모델을 제공합니다.
              </p>
              <button className="bg-rose-900 text-white px-8 py-3 rounded-full hover:bg-rose-800 transition-colors">
              자세히 알아보기
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 배너 섹션 2 (반대 방향) */}
      <section 
        id="banner2"
        className="w-full py-20 bg-white"
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row-reverse items-center gap-12">
            {/* 이미지 */}
            <div className={`
              w-full md:w-1/2
              transition-all duration-1000 ease-out delay-300
              ${isVisible.banner2 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-[50%]'}
            `}>
              <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/Images/SampleN9.jpg"
                  alt="Modern Design"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            
            {/* 텍스트 */}
            <div className={`
              w-full md:w-1/2 text-center md:text-left
              transition-all duration-1000 ease-out delay-500
              ${isVisible.banner2 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-[50%]'}
            `}>
              <h2 className="text-4xl md:text-5xl font-extrabold text-rose-900 mb-6">
                창업 절차
              </h2>
              <p className="text-xl text-rose-700 mb-8 leading-relaxed">
              프랜차이즈의 시작 프로세스에는 새로운 프랜차이즈가 프랜차이즈 시스템 내에서 성공적으로 운영될 수 있도록 준비하는 몇 가지 중요한 단계가 포함됩니다. 다음은 초기 선정부터 오픈까지의 단계에 대한 개요입니다.
              </p>
              <button className="bg-rose-900 text-white px-8 py-3 rounded-full hover:bg-rose-800 transition-colors">
              자세히 알아보기
              </button>
            </div>
          </div>
        </div>
      </section>
      {/* 컬렉션 섹션 */}
      <section className="py-10 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-100/50 via-white/50 to-rose-50/50" />
        
        <div className="relative container mx-auto px-4">
          <h3 className="text-3xl md:text-4xl font-serif text-center mb-12 text-rose-900">Bset Sellers</h3>
          
          <div className="relative h-[500px] md:h-[400px]">
            {products.map((product, index) => (
              <div
                key={product.id}
                className={`absolute inset-0 transition-all duration-1000 ${
                  productSlide === index 
                    ? 'opacity-100 translate-x-0' 
                    : 'opacity-0 translate-x-full'
                }`}
              >
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="w-full md:w-1/2">
                    <div className="relative h-[250px] md:h-[300px] rounded-2xl overflow-hidden shadow-xl">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  
                  <div className="w-full md:w-1/2 text-center md:text-left">
                    <h4 className="text-2xl font-serif text-rose-900 mb-3">{product.name}</h4>
                    <p className="text-lg text-rose-700 mb-4">{product.description}</p>
                    <p className="text-xl font-semibold text-rose-900 mb-6">{product.price}</p>
                    <button className="bg-rose-900 text-white px-6 py-2 rounded-full hover:bg-rose-800 transition-colors">
                      자세히 보기
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 슬라이드 인디케이터 위치 조정 */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-center space-x-3 pb-0 md:relative md:mt-8">
            {products.map((_, index) => (
              <button
                key={index}
                className={`h-2 rounded-full transition-all duration-300 ${
                  productSlide === index ? 'w-8 bg-rose-900' : 'w-2 bg-rose-300'
                }`}
                onClick={() => setProductSlide(index)}
              />
            ))}
          </div>
        </div>
      </section>

     
    </main>

   
  </div>
  );
};

export default LingerieBrandSite;