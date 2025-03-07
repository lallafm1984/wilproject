'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

const menuItems = [
  {
    title: '라페어 라운지',
    subMenu: [
      { name: '라페어라운지', path: '' },
      { name: '입점상품소개', path: '' },
    ]
  },
  {
    title: '입점브랜드',
    subMenu: [
      { name: '라페어', path: '/pages/BrandStory' },
      { name: '선데이라운지', path: '/pages/SundayLounge' },
    ]
  },
  {
    title: '더블유아이엘',
    subMenu: [
      { name: 'CEO 인사말', path: '/pages/Company#about' },
      { name: '핵심 가치', path: '/pages/Company#core-value' },
      { name: '조직도', path: '/pages/Company#organization' },
      { name: '오시는 길', path: '/pages/Company#location' }
    ]
  },
  {
    title: '창업정보',
    subMenu: [
      { name: '가맹점혜택', path: '' },
      { name: '창업절차', path: '' },
      { name: '창업비용', path: '' },
      { name: '창업문의', path: '' },
      { name: 'F&A', path: '' },
      { name: '매장찾기', path: '' },
      { name: '라페어라운지소식', path: '' }
    ]
  }
]

const Header = () => {
  const [activeMenu, setActiveMenu] = useState(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeMobileMenu, setActiveMobileMenu] = useState(null)
  const [clickedItemIndex, setClickedItemIndex] = useState(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('header')) {
        setActiveMenu(null);
      }
    };

    document.addEventListener('mouseover', handleClickOutside);
    return () => {
      document.removeEventListener('mouseover', handleClickOutside);
    };
  }, []);

  const handleSmoothScroll = (e, path) => {
    if (!path) return;

    if (path.includes('#')) {
      e.preventDefault();
      const [pagePath, sectionId] = path.split('#');
      
      if (window.location.pathname === pagePath) {
        const element = document.getElementById(sectionId);
        if (element) {
          // PC에서는 바로 해당 섹션으로 이동
          element.scrollIntoView();
        }
      } else {
        const targetUrl = path;
        window.location.href = pagePath;
        
        sessionStorage.setItem('scrollToSection', sectionId);
      }
    } else {
      window.location.href = path;
    }
  };

  useEffect(() => {
    const sectionId = sessionStorage.getItem('scrollToSection');
    if (sectionId) {
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          const headerHeight = 0;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        }
        sessionStorage.removeItem('scrollToSection');
      }, 0);
    }
  }, []);

  const toggleMobileSubmenu = (idx) => {
    setActiveMobileMenu(activeMobileMenu === idx ? null : idx);
  };

  const handleMobileItemClick = (e, path, subIdx) => {
    e.preventDefault();
    setClickedItemIndex(subIdx);
    
    setTimeout(() => {
      if (path) {
        if (path.includes('#')) {
          const [pagePath, sectionId] = path.split('#');
          
          if (window.location.pathname === pagePath) {
            // 같은 페이지 내 이동
            const element = document.getElementById(sectionId);
            if (element) {
              const headerHeight = 0;
              const elementPosition = element.getBoundingClientRect().top;
              const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

              window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
              });
            }
          } else {
            // 다른 페이지로 이동
            window.location.href = pagePath;
            sessionStorage.setItem('scrollToSection', sectionId);
          }
        } else {
          // 일반 페이지 이동
          window.location.href = path;
        }
      }
    }, 400);

    setTimeout(() => {
      setIsMobileMenuOpen(false);
    }, 400);
  };

  // 모바일 메뉴 토글 시 body 스크롤 제어
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    } else {
      document.body.style.overflow = 'unset';
      document.body.style.touchAction = 'auto';
    }

    // 컴포넌트 언마운트 시 스타일 초기화
    return () => {
      document.body.style.overflow = 'unset';
      document.body.style.touchAction = 'auto';
    };
  }, [isMobileMenuOpen]);

  return (
    <header className="fixed w-full max-w-full  top-0 z-50 bg-[#91000A]"
      onMouseLeave={() => setActiveMenu(null)}
    >
      <div className="w-full flex justify-center">
        <div className="w-full max-w-[1920px] h-[54px] md:h-[100px] lg:h-[132px] flex items-center justify-between  lg:justify-evenly ">
          {/* 로고 영역 */}
          <Link 
            href="/pages/Main2" 
            className="relative flex items-center"
          >
            <img 
              src="/Images/logo.png" 
              alt="L&apos;AFFAIR LOUNGE" 
              className="w-[180px] md:w-[250px] xl:w-[338px] h-auto object-contain ml-[30px]"
            />
          </Link>

          {/* 모바일 메뉴 버튼 */}
          <button 
            className="lg:hidden mr-[26px]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* 데스크톱 네비게이션 */}
          <div className="hidden lg:flex xl:w-[700px] 2xl:w-[1005px] h-[64px] bg-white rounded-full items-center justify-between ml-[8px]">
            <nav className="flex items-center ml-[32px]">
              <ul className="flex space-x-[30px] 2xl:space-x-[58px]">
                {menuItems.map((item, idx) => (
                  <li 
                    key={idx}
                    className="relative group"
                    onMouseEnter={() => setActiveMenu(idx)}
                  >
                    <button className="text-[16px] 2xl:text-[18px] font-regular ">
                      <span className="h-[21px] tracking-[-0.47px]">{item.title}</span>
                    </button>
                    
                    <div className={`absolute left-1/2 -translate-x-1/2 mt-7 bg-white shadow-lg rounded-2xl overflow-hidden z-50 ${idx === 3 ? 'w-[148px]' : 'w-[116px]'} pt-[24px] pb-[24px]
                      ${activeMenu === idx ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
                      onMouseLeave={() => setActiveMenu(null)}
                    >
                      <ul>
                        {item.subMenu.map((subItem, subIdx) => (
                          <li key={subIdx}>
                            <Link 
                              href={subItem.path} 
                              onClick={(e) => handleSmoothScroll(e, subItem.path)}
                              className="block px-4 py-0.25 tracking-[-0.36px] text-left pl-[23px]"
                            >
                               <span className="font-regular text-[14px] h-[23px] tracking-[-0.36px] hover:font-medium hover:text-[#92000A]">
                                {subItem.name}</span>
                              
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex items-center space-x-1  mr-[10px] ">
              <button className="ml-[20px] mr-[9px]">
                <img src="/Images/icon_L.png" alt="로그인" className="w-[40px] h-[40px] lg:w-[50px] lg:h-[50px]" />
              </button>
              <button className="bg-[#2F2E2B] font-regular text-white text-[13px] lg:text-[16px] tracking-[-0.47px] w-[140px] lg:w-[177px] h-[40px] lg:h-[50px] rounded-full hover:bg-[#92000A] ">
                지금 상담신청 하세요!
              </button>
            </div>
          </div>

          {/* 모바일 메뉴 수정 */}
 
            <div className={`fixed top-0 left-0 w-full h-full bg-[#91000A] transform transition-transform duration-300 z-50 ${isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
            <div className="absolute right-[calc(29/360*100vw)] top-[30px] ">
                <button onClick={() => setIsMobileMenuOpen(false)} className="text-white ">
                  <img src="/Images/m_menu\icon.webp" alt="닫기" className="w-[38px] h-[38px]" />
                </button>
              </div>

              <nav className="absolute left-[calc(29/360*100vw)] w-full top-[93px] flex flex-col align-top gap-[18px]">
              

                {menuItems.map((item, idx) => (
                  <div key={idx} className="mb-[0px]">
                    <button 
                      className={`w-fit mb-[0px] text-[24px] tracking-[-2.4px] text-left flex justify-start items-center transition-colors
                        ${activeMobileMenu === idx ? 'text-[#ffa1a7]' : 'text-white'}`}
                      onClick={() => toggleMobileSubmenu(idx)}
                      onMouseEnter={() => setActiveMobileMenu(idx)}
                    >
                      <span>{item.title}</span>
                      <ChevronDownIcon 
                        className={`w-5 h-5 ml-[12px] transition-transform ${activeMobileMenu === idx ? 'rotate-180' : ''}`} 
                      />
                    </button>
                    <div className={`overflow-hidden transition-all duration-300 ${activeMobileMenu === idx ? 'max-h-96' : 'max-h-0'}`}>
                      <ul className="py-2">
                        {item.subMenu.map((subItem, subIdx) => (
                          <li key={subIdx} className="">
                            <Link 
                              href={subItem.path} 
                              onClick={(e) => handleMobileItemClick(e, subItem.path, subIdx)}
                              className={`block w-fit py-[3px] text-[#ffa1a7] hover:text-[#ffffff] transition-colors duration-300
                                ${clickedItemIndex === subIdx ? 'text-[#ffffff]' : ''}`}
                            >
                              {subItem.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
                <div className="border-t-[1px] w-[calc(100vw-58/360*100vw)] mt-[60px] border-[#ffffff]">
                <div className="flex justify-between mt-[15px]">
                  <img src="/Images/m_menu/icon2.webp" alt="로그인" className="w-[39px] h-[39px]" />
                  <div className=" bg-[#2f2e2b] w-[140px] h-[38px] rounded-full flex items-center justify-center">
                  <p className="text-white text-[12px]   tracking-[-0.62px]">지금 상담신청 하세요!</p>
                  </div>
                </div>


                </div>
              </nav>
            </div>
          </div>
        </div>
 
    </header>
  )
}

export default Header 