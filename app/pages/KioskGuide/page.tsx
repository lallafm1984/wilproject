import Footer from '../../components/Footer';
import Image from 'next/image';

export const metadata = {
  title: '라페어라운지 키오스크 사용 가이드',
  description:
    '라페어라운지 매장 키오스크에서 QR 로그인부터 상품 선택, 결제까지 한눈에 보는 사용 가이드입니다.',
  openGraph: {
    title: '라페어라운지 키오스크 사용 가이드',
    description:
      '라페어라운지 매장 키오스크에서 QR 로그인, 상품 조회, 주문·결제를 단계별로 안내해 드립니다.',
    url: 'https://www.laffairlounge.com/pages/KioskGuide',
    type: 'website',
  },
};

const kioskGuideSteps = [
  {
    image: '/Images/Kiosk_Guide/Kiosk_Guide_1.webp',
    title: '키오스크에서 상품 보기',
    description:
      '키오스크 첫 화면에서 "상품보기" 버튼을 누르면, 매장에서 판매 중인 다양한 상품들을 화면으로 한눈에 확인할 수 있어요.',
  },
  {
    image: '/Images/Kiosk_Guide/Kiosk_Guide_2.webp',
    title: '마음에 드는 상품 선택',
    description:
      '마음에 드는 상품을 터치하면 상세 페이지로 이동하여 디자인, 가격, 사이즈 정보를 더 자세히 볼 수 있습니다.',
  },
  {
    image: '/Images/Kiosk_Guide/Kiosk_Guide_3.webp',
    title: '사이즈 선택',
    description:
      '상품 상세 페이지에서 본인에게 맞는 사이즈를 선택한 뒤, 계속 쇼핑을 원하시면 "담기"를 누르고 다른 상품들도 자유롭게 둘러보세요.',
  },
  {
    image: '/Images/Kiosk_Guide/Kiosk_Guide_4.webp',
    title: '선택한 상품 한눈에 보기',
    description:
      '담아둔 상품은 화면 하단의 리스트에 정리되어 한눈에 볼 수 있어요.',
  },
  {
    image: '/Images/Kiosk_Guide/Kiosk_Guide_5.webp',
    title: '카테고리별 상품 탐색',
    description:
      '상의, 하의, 언더웨어 등 카테고리를 선택하면, 각 카테고리별로 다양한 상품들을 쉽게 찾아볼 수 있습니다.',
  },
  {
    image: '/Images/Kiosk_Guide/Kiosk_Guide_6.webp',
    title: '상품 추가 선택',
    description:
      '카테고리별 상품 목록에서 마음에 드는 상품들을 계속해서 선택해 보세요. 원하는 만큼 여러 상품을 담을 수 있습니다.',
  },
  {
    image: '/Images/Kiosk_Guide/Kiosk_Guide_7.webp',
    title: '상품 추가 담기',
    description:
      '추가로 선택한 상품도 사이즈를 고른 뒤 "담기"를 누르면, 기존에 담아둔 상품들과 함께 장바구니에 쌓입니다.',
  },
  {
    image: '/Images/Kiosk_Guide/Kiosk_Guide_8.webp',
    title: '선택 상품 위치 출력',
    description:
      '쇼핑이 끝나면 키오스크에서 "위치 출력"을 실행해 주세요. 선택한 상품들이 매장 어디에 진열되어 있는지 위치표로 출력됩니다.',
  },
  {
    image: '/Images/Kiosk_Guide/Kiosk_Guide_9.webp',
    title: '상품위치표 확인',
    description:
      '출력된 상품위치표에 적힌 번호와 정보를 확인하고, 해당 번호에 해당하는 지함을 찾아가면 상품을 쉽게 찾을 수 있습니다.',
  },
  {
    image: '/Images/Kiosk_Guide/Kiosk_Guide_10.webp',
    title: '지함번호 안내 (1)',
    description:
      '매장 곳곳의 지함에는 번호가 표시되어 있습니다. 상품위치표에 적힌 번호와 매장 지함번호를 비교해 보세요.',
  },
  {
    image: '/Images/Kiosk_Guide/Kiosk_Guide_11.webp',
    title: '지함번호 안내 (2)',
    description:
      '지함번호는 보통 앞면에 크게 표시되어 있어 멀리서도 확인이 가능합니다. 번호를 따라 이동하면 원하는 상품을 금방 찾을 수 있어요.',
  },
  {
    image: '/Images/Kiosk_Guide/Kiosk_Guide_12.webp',
    title: '키오스크 바구니에 담기',
    description:
      '위치표를 보고 찾은 상품들은 다시 키오스크 앞 바구니에 담아 주세요.',
  },
  {
    image: '/Images/Kiosk_Guide/Kiosk_Guide_13.webp',
    title: '결제하기 버튼 선택',
    description:
      '모든 상품을 바구니에 담았다면, 키오스크 화면에서 "결제하기" 버튼을 누르고 결제 단계로 이동합니다.',
  },
  {
    image: '/Images/Kiosk_Guide/Kiosk_Guide_14.webp',
    title: '상품 스캔 및 주문확인',
    description:
      '키오스크 바구니에 담긴 상품들이 하나씩 스캔되어 화면에 표시됩니다. 상품과 금액을 확인한 뒤 "주문하기" 버튼을 눌러 다음 단계로 진행해 주세요.',
  },
  {
    image: '/Images/Kiosk_Guide/Kiosk_Guide_15.webp',
    title: '쇼핑백 선택',
    description:
      '쇼핑백이 필요하시면 이 단계에서 함께 결제할 수 있습니다. 필요하지 않다면 건너뛰어도 괜찮아요.',
  },
  {
    image: '/Images/Kiosk_Guide/Kiosk_Guide_16.webp',
    title: '전체 주문 결제',
    description:
      '"결제하기"를 누르면, 선택한 쇼핑백을 포함해 장바구니에 담긴 모든 상품이 한 번에 결제됩니다. 최종 금액을 다시 한 번 확인해 주세요.',
  },
  {
    image: '/Images/Kiosk_Guide/Kiosk_Guide_17.webp',
    title: '로그인 및 적립 안내',
    description:
      '멤버십 적립과 포인트 사용을 위해 결제 전 로그인을 진행해 주세요. 라페어라운지 모바일 앱의 QR 로그인 기능을 이용하면 더욱 빠르게 로그인할 수 있습니다.',
  },
  {
    image: '/Images/Kiosk_Guide/Kiosk_Guide_18.webp',
    title: '포인트 적립 및 사용',
    description:
      '회원가입만 해도 1만 포인트가 자동 적립되며, 회원으로 구매하실 경우 결제 금액의 5%가 포인트로 적립됩니다. 적립된 포인트는 3만원 이상 구매 시 사용하실 수 있어요.',
  },
  {
    image: '/Images/Kiosk_Guide/Kiosk_Guide_19.webp',
    title: '결제 화면에서 카드 삽입',
    description:
      '결제 화면이 나타나면 안내에 따라 카드를 삽입해 주세요.',
  },
  {
    image: '/Images/Kiosk_Guide/Kiosk_Guide_20.webp',
    title: '결제 완료 및 영수증 확인',
    description:
      '결제가 정상적으로 완료되면 영수증을 출력하거나 전자영수증을 선택할 수 있습니다. 영수증으로 결제 내역을 확인하고, 쇼핑을 기분 좋게 마무리해 보세요.',
  },
] as const;

export default function KioskGuidePage() {
  return (
    <div className="min-h-screen bg-neutral-light">
      <main className="bg-neutral-light pt-[54px] md:pt-[100px] lg:pt-[132px]">
        {/* 상단: 키오스크 가이드 히어로 (AppDownload와 동일 톤) */}
        <section className="relative w-full overflow-hidden bg-gradient-to-b from-[#111827] via-[#111827] to-[#374151] text-white">
          {/* 은은한 그라디언트 오버레이 & 빛 번짐 */}
          <div className="pointer-events-none absolute inset-0 opacity-40 mix-blend-soft-light">
            <div className="absolute -left-32 -top-20 h-64 w-64 rounded-full bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.24),_transparent_70%)] blur-3xl" />
            <div className="absolute -bottom-32 -right-10 h-80 w-80 rounded-full bg-[radial-gradient(circle_at_center,_rgba(209,213,219,0.4),_transparent_70%)] blur-3xl" />
          </div>

          <div className="relative mx-auto flex max-w-5xl flex-col items-center gap-12 px-6 py-16 md:flex-row md:items-center md:justify-between md:gap-10 md:py-20">
            {/* 좌측: 카피 + 키 메시지 */}
            <div className="max-w-xl space-y-6 text-center md:text-left">
              <h1 className="text-[28px] font-semibold leading-snug tracking-[-0.01em] md:text-[36px] md:leading-snug lg:text-[40px]">
                매장 키오스크로
                <br />
                더 빠르고 간편하게
                <br />
                <span className="relative inline-block text-[1.05em] text-[#facc15]">
                  주문 · 결제
                  <span className="absolute -bottom-1 left-0 h-[2px] w-full bg-gradient-to-r from-[#fde68a] to-transparent opacity-70" />
                </span>
                를 이용해 보세요.
              </h1>

              

              {/* 키오스크 특징 하이라이트 */}
              <ul className="mt-8 grid w-full gap-4 text-left text-[13px] text-gray-100/90 md:grid-cols-2 md:text-[20px]">
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-[12px] font-semibold">
                    01
                  </span>
                  <div>
                    <p className="font-semibold text-[#facc15]">앱과 연동되는 멤버십</p>
                    <p className="mt-1 leading-relaxed text-[18px]">
                      라페어라운지 앱에서 발급된 QR 코드를 한 번만 스캔하면,
                      매장 키오스크에서도 동일한 계정으로 로그인되어
                      적립·사용 포인트까지 자동으로 연동됩니다.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-[12px] font-semibold">
                    02
                  </span>
                  <div>
                    <p className="font-semibold text-[#facc15]">AI 설문 기반 추천 상품</p>
                    <p className="mt-1 leading-relaxed text-[18px]">
                      앱에서 미리 진행한 설문을 바탕으로,
                      키오스크 화면에서도 나에게 어울리는 추천 상품을
                      먼저 만나볼 수 있어요.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-[12px] font-semibold">
                    03
                  </span>
                  <div>
                    <p className="font-semibold text-[#facc15]">키오스크 연동 매장 위치 안내</p>
                    <p className="mt-1 leading-relaxed text-[18px]">
                      키오스크에서 먼저 마음에 드는 상품을 선택하면,
                       매장 진열 위치를 안내 받아 쉽게 찾을 수 있습니다.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-[12px] font-semibold">
                    04
                  </span>
                  <div>
                    <p className="font-semibold text-[#facc15]">여러 상품을 한 번에 스캔 결제</p>
                    <p className="mt-1 leading-relaxed text-[18px]">
                      구매할 상품들을 하나씩 따로 찍을 필요 없이,
                      키오스크에서 한 번에 스캔하고
                      결제까지 빠르게 마무리할 수 있어요.
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            {/* 우측: 키오스크 화면 미리보기 카드 */}
            <div className="relative mt-4 flex w-full justify-center md:mt-0 md:w-auto">
              <div className="relative h-[420px] w-[300px]  overflow-hidden rounded-[32px] border border-white/25 bg-gradient-to-b from-white/20 to-white/5 p-2 shadow-[0_22px_60px_rgba(0,0,0,0.6)] backdrop-blur-sm">
                <div className="relative h-full w-full overflow-hidden rounded-[26px] bg-neutral-light">
                  <Image
                    src="/Images/Kiosk_Guide/kiosk_1.webp"
                    alt="라페어라운지 키오스크 메인 화면 예시"
                    fill
                    sizes="200px"
                    className="object-cover"
                  />
                </div>
              </div>

              {/* <div className="pointer-events-none absolute -right-6 top-10 hidden h-[280px] w-[160px] -rotate-[6deg] overflow-hidden rounded-[26px] border border-white/15 bg-white/5 shadow-[0_18px_45px_rgba(0,0,0,0.55)] md:block">
                <Image
                  src="/Images/Kiosk_Guide/kiosk_1.webp"
                  alt="키오스크 로그인 선택 화면 예시"
                  fill
                  sizes="160px"
                  className="object-cover opacity-90"
                />
              </div> */}
            </div>
          </div>
        </section>

        {/* 하단: 키오스크 단계별 이용 가이드 (AppDownload와 동일 레이아웃) */}
        <section className="bg-neutral-light">
          <div className="mx-auto max-w-6xl px-6 pb-20 pt-12 md:pb-28">
            <div className="mb-10 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-neutral-500 md:text-[13px]">
                KIOSK ONBOARDING
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-neutral-900 md:text-4xl">
                매장 키오스크 사용 가이드
              </h2>
              <p className="mt-3 text-base leading-relaxed text-neutral-600 md:text-[22px]">
                아래 화면을 순서대로 따라오면,
                <br className="hidden md:block" />
                매장 키오스크에서 로그인부터 결제까지 어렵지 않게 이용하실 수 있어요.
              </p>
            </div>

            <div className="space-y-8 md:space-y-10">
              {kioskGuideSteps.map((step, index) => {
                const isReversed = index % 2 === 1;

                return (
                  <div
                    key={step.title}
                    className={`group relative flex flex-col items-start gap-6 overflow-hidden rounded-3xl bg-white/80 p-4 shadow-[0_18px_40px_rgba(15,23,42,0.08)] ring-1 ring-neutral-200/70 backdrop-blur-sm md:gap-10 md:p-6 ${
                      isReversed ? 'md:flex-row-reverse md:items-start' : 'md:flex-row md:items-start'
                    }`}
                  >
                    {/* 라이트 그래디언트 장식 */}
                    <div className="pointer-events-none absolute -left-24 top-[-80px] h-40 w-40 rounded-full bg-[radial-gradient(circle_at_center,_rgba(96,165,250,0.16),_transparent_70%)] blur-2xl" />
                    <div className="pointer-events-none absolute -bottom-24 right-[-40px] h-44 w-44 rounded-full bg-[radial-gradient(circle_at_center,_rgba(148,163,184,0.18),_transparent_70%)] blur-2xl" />

                    {/* 키오스크 스크린 이미지 */}
                    <div className="relative z-[1] h-[260px] w-full max-w-[220px] overflow-hidden rounded-[26px] border border-neutral-200/70 bg-neutral-50/90 p-2 shadow-[0_16px_40px_rgba(15,23,42,0.12)] md:h-[340px] md:max-w-[240px] mx-auto md:mx-0">
                      <div className="relative h-full w-full overflow-hidden rounded-[22px] bg-neutral-100">
                        <Image
                          src={step.image}
                          alt={step.title}
                          fill
                          sizes="(min-width: 768px) 240px, 220px"
                          className="object-contain"
                        />
                      </div>
                    </div>

                    {/* 설명 텍스트 */}
                    <div className="relative z-[1] flex-1 text-left">
                      <div className="inline-flex items-center gap-2 rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium tracking-[0.18em] text-neutral-500 md:text-[13px]">
                        <span className="h-1 w-1 rounded-full bg-neutral-500" />
                        STEP {index + 1}
                      </div>
                      <h3 className="mt-3 text-lg font-semibold tracking-[-0.02em] text-neutral-900 md:text-[28px]">
                        {step.title}
                      </h3>
                      <div className="mt-3">
                        <div className="rounded-2xl bg-white/95 px-4 py-3 text-[15px] leading-relaxed text-neutral-800 shadow-[0_10px_25px_rgba(15,23,42,0.18)] ring-1 ring-neutral-200/80 md:text-[20px]">
                          {step.description}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}


