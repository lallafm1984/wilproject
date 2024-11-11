'use client'

import { useState , useEffect} from 'react'
 
import {
  ArrowPathIcon,
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'

import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'

 
const laffair = "L\'AFFAIR";

const menuItems = [
  {
    title: 'W.I.L',
    subMenu: [
      { name: '인사말', path: '/pages/Greeting' },
      { name: '회사 소개', path: '/pages/About' },
      { name: '연혁', path: '/pages/CompanyHistory' },
      { name: '조직도', path: '/pages/OrganizationChart' },
      { name: '오시는 길', path: '/pages/Location' }
    ]
  },
  {
    title: `${laffair}`,
    subMenu: [
      { name: `${laffair} 소개`, path: '/laffair/intro' },
      { name: `${laffair} 컨셉`, path: '/laffair/concept' },
      { name: `${laffair} 기획/생산`, path: '/laffair/production' },
      { name: `${laffair} 생산처 현황`, path: '/laffair/status' },
      { name: '커머스 사업현황', path: '/laffair/commerce' }
    ]
  },
  {
    title: '쇼핑몰',
    subMenu: [
      { name: `${laffair}`, path: '/shop' }
    ]
  },
  {
    title: '창업 정보',
    subMenu: [
      { name: '가맹점 혜택', path: '/franchise/benefits' },
      { name: '창업 절차', path: '/franchise/process' },
      { name: '창업 비용', path: '/franchise/cost' },
      { name: '창업 상담', path: '/franchise/consulting' }
    ]
  }
];

// 모바일 메뉴가 열렸을 때 스크롤 방지




function Header(){
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (!isMenuOpen) {
      setActiveMenu(null);
    }
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setActiveMenu(null);
  };
  
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);
  

  return(
    <header className="fixed w-full top-0 z-50">
      <div className="relative bg-gradient-to-r from-rose-100/95 via-white/95 to-rose-100/95 backdrop-blur-lg border-b border-rose-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-6">
            <Link href="/">
              <h1 className="text-4xl font-serif text-rose-800 hover:text-rose-600 transition-all duration-300 cursor-pointer">
                W.I.L
              </h1>
            </Link>
            
            {/* 모바일 메뉴 버튼 */}
            <button 
              className="block lg:hidden p-2 text-rose-800 hover:text-rose-600 transition-colors duration-300"
              onClick={toggleMenu}
              aria-label="메뉴 열기/닫기"
            >
              {isMenuOpen ? 
                <XMarkIcon className="h-7 w-7" /> : 
                <Bars3Icon className="h-7 w-7" />
              }
            </button>

            {/* 데스크톱 메뉴 - 이전 코드 유지 */}
            <nav className="hidden lg:block">
              <ul className="flex space-x-12">
                {menuItems.map((item, idx) => (
                  <li 
                    key={idx}
                    className="relative group"
                    onMouseEnter={() => setActiveMenu(idx)}
                    onMouseLeave={() => setActiveMenu(null)}
                  >
                    <button className="flex items-center space-x-1 py-2 px-4 text-base font-medium text-rose-800 
                      hover:text-rose-600 rounded-full hover:bg-rose-100/50 transition-all duration-300
                      group-hover:shadow-md">
                      <span className="relative overflow-hidden">
                        {item.title}
                        <span className="absolute bottom-0 left-0 w-full h-[2px] bg-rose-400 
                          transform translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300"/>
                      </span>
                      <ChevronDownIcon className="h-5 w-5 ml-1 group-hover:rotate-180 transition-transform duration-300" />
                    </button>
                    
                    {/* 서브메뉴 스타일도 개선 */}
                    <div 
                      className={`absolute left-1/2 -translate-x-1/2 mt-2 w-56 bg-white/95 backdrop-blur-lg 
                        border border-rose-100 rounded-xl overflow-hidden transition-all duration-300 transform 
                        shadow-lg ${activeMenu === idx ? 'opacity-100 visible translate-y-0' : 
                        'opacity-0 invisible -translate-y-4'}`}
                    >
                      <ul className="py-2">
                        {item.subMenu.map((subItem, subIdx) => (
                          <li key={subIdx}>
                            <Link 
                              href={subItem.path}
                              className="block px-6 py-3 text-rose-700 hover:text-rose-600 
                                hover:bg-rose-50/80 transition-all duration-200 font-medium"
                            >
                              {subItem.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        {/* 모바일 메뉴 */}
        <div 
          className={`fixed inset-0 z-40 lg:hidden transition-opacity duration-300 ${
            isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
          }`}
          style={{ top: '76px' }}
        >
          {/* 배경 오버레이 */}
          <div 
            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            onClick={closeMenu}
          />
          
          {/* 메뉴 컨텐츠 */}
          <div
            className={`absolute top-0 left-0 w-full sm:w-80 h-[calc(100vh-76px)] bg-white/95 shadow-lg 
              transform transition-transform duration-300 ease-out ${
              isMenuOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
          >
            <nav className="h-full overflow-y-auto">
              <ul className="p-4 space-y-2">
                {menuItems.map((item, idx) => (
                  <li key={idx} className="border-b border-rose-100 last:border-0">
                    <button
                      className="flex items-center justify-between w-full py-4 px-2 text-base font-medium text-rose-800
                        hover:text-rose-600 transition-colors duration-200"
                      onClick={() => setActiveMenu(activeMenu === idx ? null : idx)}
                    >
                      <span>{item.title}</span>
                      <ChevronDownIcon 
                        className={`h-5 w-5 transition-transform duration-200 
                          ${activeMenu === idx ? 'rotate-180 text-rose-600' : 'text-rose-800'}`}
                      />
                    </button>
                    
                    <div 
                      className={`overflow-hidden transition-all duration-300 ease-in-out
                        ${activeMenu === idx ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'}`}
                    >
                      <ul className="bg-rose-50/50 rounded-lg my-1">
                        {item.subMenu.map((subItem, subIdx) => (
                          <li key={subIdx}>
                            <Link
                              href={subItem.path}
                              className="block py-3 px-8 text-sm text-rose-700 hover:text-rose-900 
                                hover:bg-rose-100/50 transition-colors duration-200"
                              onClick={closeMenu}
                            >
                              {subItem.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
