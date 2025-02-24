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
      { name: '브랜드스토리', path: '/pages/BrandStory' },
      { name: '선데이라운지', path: '' },
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
    if (path.includes('#')) {
      e.preventDefault();
      const [pagePath, sectionId] = path.split('#');
      
      if (window.location.pathname === pagePath) {
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
        window.location.href = path;
      }
    }
  };

  return (
    <header className="fixed w-full top-0 z-50 bg-[#91000A]"
      onMouseLeave={() => setActiveMenu(null)}
    >
      <div className="w-full flex justify-center">
        <div className="w-full max-w-[1920px] h-[80px] md:h-[100px] lg:h-[132px] flex items-center justify-evenly">
          {/* 로고 영역 */}
          <Link 
            href="/pages/Main2" 
            className="relative flex items-center"
          >
            <img 
              src="/Images/logo.png" 
              alt="L&apos;AFFAIR LOUNGE" 
              className="w-[180px] md:w-[250px] lg:w-[338px] h-auto object-contain pl-[18px]"
            />
          </Link>

          {/* 모바일 메뉴 버튼 */}
          <button 
            className="lg:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* 데스크톱 네비게이션 */}
          <div className="hidden lg:flex w-[1005px] h-[64px] bg-white rounded-full items-center justify-between ml-[8px]">
            <nav className="flex items-center ml-[32px]">
              <ul className="flex space-x-[58px]">
                {menuItems.map((item, idx) => (
                  <li 
                    key={idx}
                    className="relative group"
                    onMouseEnter={() => setActiveMenu(idx)}
                  >
                    <button className="text-[18px] font-regular ">
                      <span className="h-[21px] tracking-[-0.47px]">{item.title}</span>
                    </button>
                    
                    <div className={`absolute left-1/2 -translate-x-1/2 mt-7 bg-white shadow-lg rounded-2xl overflow-hidden ${idx === 3 ? 'w-[148px]' : 'w-[116px]'} pt-[24px] pb-[24px]
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
              <button className="ml-[20px]">
                <img src="/Images/icon_L.png" alt="로그인" className="w-[40px] h-[40px] lg:w-[50px] lg:h-[50px]" />
              </button>
              <button className="bg-[#2F2E2B] font-regular text-white text-[13px] lg:text-[16px] tracking-[-0.47px] w-[140px] lg:w-[177px] h-[40px] lg:h-[50px] rounded-full hover:bg-[#92000A] ">
                지금 상담신청 하세요!
              </button>
            </div>
          </div>

          {/* 모바일 메뉴 */}
          <div className={`lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
            <div className={`fixed right-0 top-0 h-full w-[280px] bg-white transform transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
              <div className="p-4 flex justify-between items-center border-b">
                <span className="text-lg font-medium">메뉴</span>
                <button onClick={() => setIsMobileMenuOpen(false)}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <nav className="p-4">
                {menuItems.map((item, idx) => (
                  <div key={idx} className="mb-4">
                    <button className="text-lg font-medium mb-2">{item.title}</button>
                    <ul className="ml-4">
                      {item.subMenu.map((subItem, subIdx) => (
                        <li key={subIdx} className="mb-2">
                          <Link href={subItem.path} onClick={(e) => handleSmoothScroll(e, subItem.path)} className="text-gray-600 hover:text-[#92000A]">
                            {subItem.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header 