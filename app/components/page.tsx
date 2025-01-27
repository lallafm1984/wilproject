"use client";
import { useState } from 'react';

export default function TestPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalItems = 100;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
      <div >
        <div className="w-[1928px] h-[1554px] absolute left-[-4px] top-[1109px]">
          
          <div className="w-[1242px] h-[540px] absolute left-[343px] top-[200px]">
  
            <div className="w-[600px] h-[275px] absolute left-0 top-[99px]">
              <p className="w-[600px] absolute left-0 top-[9.5px] text-[52px] font-medium text-left">
                <span className="w-[600px] text-[52px] font-medium text-left text-[#1b1b1b]">
                  언더웨어부터 액티브웨어까지
                </span>
                <br />
                <span className="w-[600px] text-[52px] font-medium text-left text-[#91000a]">
                  온ㆍ오프라인 동시에 만나요
                </span>
              </p>
              <p className="w-[526px] absolute left-0 top-[189px] text-xl text-left text-[#323232]">
                <span className="w-[526px] text-xl text-left text-[#323232]">
                  라페어라운지는 언더웨어부터 홈웨어,리조트웨어
                </span>
                <br />
                <span className="w-[526px] text-xl text-left text-[#323232]">
                  액티브웨어까지 다양한 라이프웨어를 온라인 쇼핑몰과
                </span>
                <br />
                <span className="w-[526px] text-xl text-left text-[#323232]">
                  오프라인 매장에서 구매할 수 있는 라이프웨어 브랜드샵입니다.
                </span>
              </p>
            </div>
          </div>
          <div className="w-[1028px] h-[620px] absolute left-[482px] top-[734px]">
            <svg
              width={402}
              height={520}
              viewBox="0 0 402 520"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute left-[-1px] top-[-1px]"
              preserveAspectRatio="none"
            >
              <path fillRule="evenodd" clipRule="evenodd" d="M0 0H402V520H0V0Z" fill="#B4B4B4" />
            </svg>
            <div className="w-[558px] h-[311px] absolute left-[470px] top-[309px]">
              <p className="w-[532px] absolute left-0 top-[10.5px] text-left">
                <span className="w-[532px] text-[50px] font-medium text-left text-[#1b1b1b]">
                  똑똑한{" "}
                </span>
                <span className="w-[532px] text-[51px] text-left text-[#1b1b1b]">AI</span>
                <span className="w-[532px] text-[50px] font-medium text-left text-[#1b1b1b]">
                  {" "}
                  키오스크
                </span>
                <br />
                <span className="w-[532px] text-[50px] font-medium text-left text-[#91000a]">
                  자유로운 무인 쇼핑 시스템
                </span>
              </p>
              <p className="w-[557px] absolute left-px top-[191px] text-xl text-left text-[#323232]">
                <span className="w-[557px] text-xl text-left text-[#323232]">
                  많은 제품들 중에 내 취향 아이템 고르기 힘들어요.
                </span>
                <br />
                <span className="w-[557px] text-xl text-left text-[#323232]">
                  혼자 다양하게 살펴보면서 고민해보고 싶은데 눈치도 보이죠.
                </span>
                <br />
                <span className="w-[557px] text-xl text-left text-[#323232]">
                  MBTI 유형별 언더웨어 추천까지 해주는 똑똑한{" "}
                </span>
                <span className="w-[557px] text-xl font-light text-left text-[#323232]">AI</span>
                <span className="w-[557px] text-xl text-left text-[#323232]"> 키오스크와 함께</span>
                <br />
                <span className="w-[557px] text-xl text-left text-[#323232]">
                  자유롭게 무인 쇼핑 시스템으로 나만의 취향을 고르세요.
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="w-[2182.28px] h-[1372px] absolute left-[-130.64px] top-[2662.5px]">
          <svg
            width={1920}
            height={1373}
            viewBox="0 0 1920 1373"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute left-[124.64px] top-[-1px]"
            preserveAspectRatio="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M-5.00002 0.5H1926V1372.5H-5.00002V0.5Z"
              fill="#F8F8F2"
            />
          </svg>
          <div className="w-[817px] h-[803px] absolute left-[680.64px] top-[199.5px]">
            <p className="w-[817px] absolute left-0 top-[9.5px] text-[52px] font-medium text-center text-[#1b1b1b]">
              <span className="w-[817px] text-[52px] font-medium text-center text-[#1b1b1b]">
                일상을 더욱 특별하게 만들어줄
              </span>
              <br />
              <span className="w-[817px] text-[52px] font-medium text-center text-[#1b1b1b]">
                다양한 라페어 라운지 상품을 만나보세요
              </span>
            </p>
            <p className="w-[772px] absolute left-[23px] top-[717px] text-xl text-center text-[#323232]">
              <span className="w-[772px] text-xl text-center text-[#323232]">
                라페어 라운지는 일상의 모든 순간에 함께합니다.
              </span>
              <br />
              <span className="w-[772px] text-xl text-center text-[#323232]">
                눈을 뜨는 순간부터 잠자리에 드는 시간까지, 하루를 더 특별하게 만들어줄 편안함과 스타일을
              </span>
              <br />
              <span className="w-[772px] text-xl text-center text-[#323232]">
                동시에 갖춘 상품들로 일상을 채워드립니다. 바쁜 일상 속에서도 특별함을 느껴보세요.
              </span>
            </p>
            <p className="w-[214.6px] absolute left-[302.2px] top-[638px] text-base text-center text-[#6a6a6a]">
              릴리 블라썸 벨로아 라운지 셋업
            </p>
          </div>
          <svg
            width={1920}
            height={536}
            viewBox="0 0 1920 536"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-[2182.28px] h-[534.62px] absolute left-0 top-[423px]"
            preserveAspectRatio="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M1068 380.5H853C830.909 380.5 813 362.591 813 340.5V40.5001C813 18.4086 830.909 0.5 853 0.5H1068C1090.09 0.5 1108 18.4086 1108 40.5001V340.5C1108 362.591 1090.09 380.5 1068 380.5Z"
              fill="#B4B4B4"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M625.518 405.01L408.968 423.916C386.717 425.858 367.101 409.434 365.155 387.23L338.719 85.7095C336.772 63.5064 353.232 43.9322 375.482 41.9896L592.032 23.0842C614.283 21.1417 633.899 37.5663 635.845 59.7698L662.281 361.29C664.228 383.493 647.768 403.068 625.518 405.01Z"
              fill="#B4B4B4"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M185.962 496.576L-29.7394 534.493C-51.9028 538.389 -73.0379 523.636 -76.946 501.54L-130.017 201.486C-133.925 179.391 -119.126 158.32 -96.9622 154.424L118.739 116.507C140.903 112.611 162.038 127.365 165.946 149.46L219.017 449.514C222.924 471.61 208.126 492.68 185.962 496.576Z"
              fill="#B4B4B4"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M1512.03 423.916L1295.48 405.01C1273.23 403.068 1256.77 383.493 1258.72 361.29L1285.15 59.7698C1287.1 37.5663 1306.72 21.1417 1328.97 23.0842L1545.52 41.9896C1567.77 43.9322 1584.23 63.5064 1582.28 85.7095L1555.85 387.23C1553.9 409.434 1534.28 425.858 1512.03 423.916Z"
              fill="#B4B4B4"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M1950.74 534.493L1735.04 496.576C1712.87 492.68 1698.08 471.61 1701.98 449.514L1755.05 149.46C1758.96 127.365 1780.1 112.611 1802.26 116.507L2017.96 154.424C2040.13 158.32 2054.92 179.391 2051.02 201.486L1997.95 501.54C1994.04 523.636 1972.9 538.389 1950.74 534.493Z"
              fill="#B4B4B4"
            />
          </svg>
          <svg
            width={461}
            height={24}
            viewBox="0 0 461 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-[457.07px] h-[22.34px] absolute left-[862.57px] top-[602.23px]"
            preserveAspectRatio="none"
          >
            <path
              d="M13.1013 23.0683L1.93158 11.8987L13.1013 0.729004"
              stroke="#2F2E2B"
              stroke-width={2}
              stroke-miterlimit={16}
            />
            <path
              d="M447.993 23.0058L459.006 12.0079L447.993 1.01001"
              stroke="#2F2E2B"
              stroke-width={2}
              stroke-miterlimit={16}
            />
          </svg>
          <div className="w-[326.92px] h-[70.56px] absolute left-[927.68px] top-[1081.72px]">
            <svg
              width={327}
              height={71}
              viewBox="0 0 327 71"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute left-[-1px] top-[-1px]"
              preserveAspectRatio="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M35.32 0.220215H291.68C311.165 0.220215 326.96 16.0155 326.96 35.5002C326.96 54.9848 311.165 70.7802 291.68 70.7802H35.32C15.8354 70.7802 0.039978 54.9848 0.039978 35.5002C0.039978 16.0155 15.8354 0.220215 35.32 0.220215Z"
                fill="#2F2E2B"
              />
            </svg>
            <p className="w-[150.8px] absolute left-[87.56px] top-[25.28px] text-[28px] text-center uppercase text-white">
              상품보러가기{" "}
            </p>
          </div>
        </div>
        <div className="w-[1928px] h-80 absolute left-[-6px] top-[4034.5px]">
          <svg
            width={1920}
            height={320}
            viewBox="0 0 1920 320"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute left-[-1px] top-[-1px]"
            preserveAspectRatio="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M-6 0.5H1922V320.5H-6V0.5Z"
              fill="#2F2E2B"
            />
          </svg>
          <div className="w-[1239px] h-[82px] absolute left-[345px] top-[118.5px]">
            <svg
              width={210}
              height={19}
              viewBox="0 0 210 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              className="w-[210px] h-[19px] absolute left-0 top-[5px]"
              preserveAspectRatio="none"
            >
              <rect width={210} height={19} fill="url(#pattern0_1_105)" />
              <defs>
                <pattern
                  id="pattern0_1_105"
                  patternContentUnits="objectBoundingBox"
                  width={1}
                  height={1}
                >
                  <use xlinkHref="#image0_1_105" transform="scale(0.0047619 0.0526316)" />
                </pattern>
                <image
                  id="image0_1_105"
                  width={210}
                  height={19}
                  xlinkHref="data:image/png"
                />
              </defs>
            </svg>
            <svg
              width={210}
              height={19}
              viewBox="0 0 210 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              className="w-[210px] h-[19px]"
              preserveAspectRatio="none"
            >
              <mask
                id="mask0_1_106"
                style={{ maskType: "alpha" }}
                maskUnits="userSpaceOnUse"
                x={0}
                y={0}
                width={210}
                height={19}
              >
                <rect width={210} height={19} fill="url(#pattern0_1_106)" />
              </mask>
              <g mask="url(#mask0_1_106)">
                <rect width={210} height={19} fill="white" />
              </g>
              <defs>
                <pattern
                  id="pattern0_1_106"
                  patternContentUnits="objectBoundingBox"
                  width={1}
                  height={1}
                >
                  <use xlinkHref="#image0_1_106" transform="scale(0.0047619 0.0526316)" />
                </pattern>
                <image
                  id="image0_1_106"
                  width={210}
                  height={19}
                  xlinkHref="data:image/png"
                />
              </defs>
            </svg>
            <div className="w-[196px] h-12 absolute left-[310px] top-0.5">
              <p className="w-[197.7px] absolute left-[-0.85px] top-[2.5px] text-[17px] font-extralight text-center uppercase text-[#aaa79f]">
                상호 : 주식회사 라페어라운지 
              </p>
              <p className="w-[119.7px] absolute left-[1.15px] top-[33.5px] text-[17px] font-extralight text-center uppercase text-[#aaa79f]">
                대표이사 : 조경화
              </p>
            </div>
            <div className="w-[296px] h-[82px] absolute left-[591px] top-0">
              <p className="w-[241.7px] absolute left-[-0.85px] top-[2.5px] text-[17px] text-center uppercase text-[#aaa79f]">
                <span className="w-[241.7px] text-[17px] font-extralight text-center uppercase text-[#aaa79f]">
                  사업자등록번호 :{" "}
                </span>
                <span className="w-[241.7px] text-[17px] font-light text-center uppercase text-[#aaa79f]">
                  209-81-59539
                </span>
              </p>
              <p className="w-[297.7px] absolute left-[-0.85px] top-[33.5px] text-[17px] text-center uppercase text-[#aaa79f]">
                <span className="w-[297.7px] text-[17px] font-extralight text-center uppercase text-[#aaa79f]">
                  통신판매업신고번호 :{" "}
                </span>
                <span className="w-[297.7px] text-[17px] font-light text-center uppercase text-[#aaa79f]">
                  2019
                </span>
                <span className="w-[297.7px] text-[17px] font-extralight text-center uppercase text-[#aaa79f]">
                  -서울금천-
                </span>
                <span className="w-[297.7px] text-[17px] font-light text-center uppercase text-[#aaa79f]">
                  1952
                </span>
              </p>
              <p className="w-[222.2px] absolute left-[2.4px] top-16 text-xs text-center uppercase text-[#aaa79f]">
                <span className="w-[222.2px] text-xs text-center uppercase text-[#aaa79f]">이메일</span>
                <span className="w-[222.2px] text-xs font-light text-center uppercase text-[#aaa79f]">
                  {" "}
                  : hello@laffair.kr
                </span>
              </p>
            </div>
            <div className="w-[267px] h-[74px] absolute left-[972px] top-0">
              <p className="w-[267px] absolute left-0 top-0 text-[17px] text-left uppercase text-[#aaa79f]">
                <span className="w-[267px] text-[17px] font-extralight text-left uppercase text-[#aaa79f]">
                  주소
                </span>
                <br />
                <span className="w-[267px] text-[17px] font-extralight text-left uppercase text-[#aaa79f]">
                  서울특별시 금천구 벚꽃로{" "}
                </span>
                <span className="w-[267px] text-[17px] font-light text-left uppercase text-[#aaa79f]">
                  234
                </span>
                <span className="w-[267px] text-[17px] font-extralight text-left uppercase text-[#aaa79f]">
                  {" "}
                  (가산동)
                </span>
                <br />
                <span className="w-[267px] text-[17px] font-extralight text-left uppercase text-[#aaa79f]">
                  에이스하이엔드타워
                </span>
                <span className="w-[267px] text-[17px] font-light text-left uppercase text-[#aaa79f]">
                  6
                </span>
                <span className="w-[267px] text-[17px] font-extralight text-left uppercase text-[#aaa79f]">
                  차{" "}
                </span>
                <span className="w-[267px] text-[17px] font-light text-left uppercase text-[#aaa79f]">
                  17
                </span>
                <span className="w-[267px] text-[17px] font-extralight text-left uppercase text-[#aaa79f]">
                  층{" "}
                </span>
                <span className="w-[267px] text-[17px] font-light text-left uppercase text-[#aaa79f]">
                  1703
                </span>
                <span className="w-[267px] text-[17px] font-extralight text-left uppercase text-[#aaa79f]">
                  호
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
  );
}