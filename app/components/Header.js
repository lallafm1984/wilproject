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

  return (
    <header className="fixed w-full top-0 z-50 bg-[#91000A]">
      <div className="max-w-[1920px]  h-[132px] flex items-center">
        {/* 로고 영역 수정 */}
        <Link 
          href="/" 
          className="relative pl-[204px] mt-[51px] mb-[50px] pr-[180px]"
        >
          <Image
            src="/images/logo.png"
            alt="L'AFFAIR LOUNGE"
            width={327}
            height={31}


            className="object-contain"
          />
        </Link>

        <div className="w-[1004px] h-[63px] bg-white rounded-full mt-[28px] mb-[41px] flex items-center justify-between px-2">
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
                    <ul className="">
                      {item.subMenu.map((subItem, subIdx) => (
                        <li key={subIdx}>
                          <Link 
                            href={subItem.path} 
                            className="block px-4 py-0.5 font-regular text-[14px] text-left pl-[30px] hover:font-medium hover:text-[#92000A] "
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
            <button className="">
               <img src="/Images/icon_S.png" alt="검색" width="50px" height="50px" />
             
            </button>
            <button className="ml-[20px]">
              <img src="/Images/icon_L.png" alt="로그인" width="50px" height="50px" />
            </button>


            <button className="bg-[#2F2E2B] font-regular text-white text-[15px] w-[177px] h-[50px]   py-2 rounded-full hover:bg-[#92000A]">
              지금 상담신청 하세요!
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header 