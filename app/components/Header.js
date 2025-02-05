'use client'

import { useState } from 'react'
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
    title: '라페어',
    subMenu: [
      { name: '브랜드스토리', path: '' },
      { name: '라페어공식몰', path: '' },
    ]
  },
  {
    title: '더블유아이엘',
    subMenu: [
      { name: 'CEO 인사말', path: '' },
      { name: '더블유아이엘', path: '' },
      { name: '연혁', path: '' },
      { name: '오시는길', path: '' }
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

  return (
    <header className="fixed w-full top-0 z-50 bg-[#91000A]">
      <div className="max-w-[1920px] mx-auto h-[80px] md:h-[100px] lg:h-[132px] flex items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* 로고 영역 */}
        <Link 
          href="/" 
          className="relative flex items-center"
        >
          <img 
            src="/Images/logo.png" 
            alt="L'AFFAIR LOUNGE" 
            className="w-[180px] md:w-[250px] lg:w-[327px] h-auto object-contain"
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
        <div className="hidden lg:flex w-[1004px] h-[63px] bg-white rounded-full items-center justify-between px-2">
          <nav className="flex items-center ml-5">
            <ul className="flex space-x-14">
              {menuItems.map((item, idx) => (
                <li 
                  key={idx}
                  className="relative group"
                  onMouseEnter={() => setActiveMenu(idx)}
                >
                  <button className="text-[17px] font-regular flex items-center space-x-1 py-2">
                    <span>{item.title}</span>
                  </button>
                  
                  <div className={`absolute left-1/2 -translate-x-1/2 mt-5 bg-white shadow-lg rounded-2xl overflow-hidden ${idx === 3 ? 'w-[148px]' : 'w-[135px]'} pt-[29px] pb-[29px]
                    ${activeMenu === idx ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
                    onMouseLeave={() => setActiveMenu(null)}
                  >
                    <ul>
                      {item.subMenu.map((subItem, subIdx) => (
                        <li key={subIdx}>
                          <Link 
                            href={subItem.path} 
                            className="block px-4 py-0.5 font-regular text-[14px] text-left pl-[30px] hover:font-medium hover:text-[#92000A]"
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

          <div className="flex items-center space-x-1">
            <button>
              <img src="/Images/icon_S.png" alt="검색" className="w-[40px] h-[40px] lg:w-[50px] lg:h-[50px]" />
            </button>
            <button className="ml-[20px]">
              <img src="/Images/icon_L.png" alt="로그인" className="w-[40px] h-[40px] lg:w-[50px] lg:h-[50px]" />
            </button>
            <button className="bg-[#2F2E2B] font-regular text-white text-[13px] lg:text-[15px] w-[140px] lg:w-[177px] h-[40px] lg:h-[50px] rounded-full hover:bg-[#92000A] ml-4">
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
                        <Link href={subItem.path} className="text-gray-600 hover:text-[#92000A]">
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
    </header>
  )
}

export default Header 