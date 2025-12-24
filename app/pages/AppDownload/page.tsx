import Footer from '../../components/Footer';
import Image from 'next/image';

export const metadata = {
  title: '라페어라운지 앱 사용 가이드',
  description:
    '라페어라운지 전용 앱 가입부터 포인트 적립, QR 로그인까지 한눈에 보는 앱 사용 가이드입니다.',
  openGraph: {
    title: '라페어라운지 앱 사용 가이드',
    description:
      '라페어라운지 전용 앱 회원가입과 기본 설정, 오프라인 매장 QR 로그인까지 단계별로 안내해 드립니다.',
    url: 'https://www.laffairlounge.com/pages/AppDownload',
    type: 'website',
  },
};

const mobileGuideSteps = [
  {
    image: '/Images/mobileGuide/step1.webp',
    title: ' 회원가입 시작하기',
    description: '① 앱 메뉴 상단에 위치한 "회원가입" 버튼을 눌러 계정 생성 절차를 시작해주세요',
  },
  {
    image: '/Images/mobileGuide/step2.webp',
    title: '필수 정보 입력',
    description: (
      <>
        1 - 인증번호 전송: 휴대폰 번호를 입력한 후 우측의 &apos;인증번호 전송&apos; 버튼을 눌러주세요.
        <br />
        <br />
        2 - 인증번호 입력: 휴대폰 문자로 수신된 인증번호를 이 칸에 정확히 입력해주세요.
        <br />
        <br />
        3 - 비밀번호 확인: 설정할 비밀번호를 재입력하여 오타가 없는지 확인하는 단계입니다.
        <br />
        <br />
        4 - 서비스 이용을 위한 약관에 동의하는 체크박스입니다.
        <br />
        <br />
        5 - 필수 정보를 모두 입력했다면 하단의 주황색 &apos;다음&apos; 버튼을 눌러 진행해주세요.
      </>
    ),
  },
  {
    image: '/Images/mobileGuide/step3.webp',
    title: '추가 정보 입력 안내',
    description: (
      <>
        1 -기본 정보 입력이 완료되었다는 안내입니다.
        <br />
        <br />
         &apos;네&apos;를 선택하면 AI 추천 상품을 받기 위한 추가 정보를 입력할 수 있습니다
        
      </>
    ),
  },
  {
    image: '/Images/mobileGuide/step4.webp',
    title: '추가 정보 입력',
    description: (
      <>
        1 - 성별: 본인의 성별(남성/여성)을 선택해주세요.
        <br />
        <br />
        2 - 기념일: 생일이나 기념일 등 날짜 정보를 입력해주세요.
        <br />
        <br />
        3 - 사이즈: 평소 착용하는 의류 사이즈를 목록에서 선택해주세요.
        <br />
        <br />
        4 - 설문조사: AI 맞춤 상품 추천을 위해 설문조사를 시작하는 버튼입니다.
        <br />
        <br />
        5 - 가입: 모든 정보를 확인했다면 하단의 &apos;가입&apos; 버튼을 눌러 회원가입을 최종 완료해주세요
      </>
    ),
  } 
] as const;

export default function AppDownloadPage() {
  return (
    <div className="min-h-screen bg-neutral-light">
      <main className="bg-neutral-light pt-[54px] md:pt-[100px] lg:pt-[132px]">
        {/* 상단: 앱 다운로드 히어로 (frontend-design 적용) */}
        <section className="relative w-full overflow-hidden bg-gradient-to-b from-[#92000a] via-[#92000a] to-[#c05a5c] text-white">
          {/* 은은한 그라디언트 오버레이 & 빛 번짐 */}
          <div className="pointer-events-none absolute inset-0 opacity-40 mix-blend-soft-light">
            <div className="absolute -left-32 -top-20 h-64 w-64 rounded-full bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.28),_transparent_70%)] blur-3xl" />
            <div className="absolute -bottom-32 -right-10 h-80 w-80 rounded-full bg-[radial-gradient(circle_at_center,_rgba(255,204,186,0.4),_transparent_70%)] blur-3xl" />
          </div>

          <div className="relative mx-auto flex max-w-5xl flex-col items-center gap-12 px-6 py-16 md:flex-row md:items-center md:justify-between md:gap-10 md:py-20">
            {/* 좌측: 카피 + CTA + 기능 하이라이트 */}
            <div className="max-w-xl space-y-6 text-center md:text-left">
 

              <h1 className="text-[28px] font-semibold leading-snug tracking-[-0.01em] md:text-[36px] md:leading-snug lg:text-[40px]">
                라페어라운지 앱으로
                <br />
                더욱 편리한 쇼핑과
                <br/>
                <span className="relative inline-block text-[1.05em] text-[#f0d435]">
                  멤버십 혜택
                  <span className="absolute -bottom-1 left-0 h-[2px] w-full bg-gradient-to-r from-[#ffd3c7] to-transparent opacity-70" />
                </span>{''}
                을 만나보세요.
              </h1>

              <p className="mt-3 text-base leading-relaxed text-[#fbeaec]/90 md:text-[17px]">
                앱으로 상품을 편하게 구매하고, 추가 포인트 적립 혜택까지.
                <br className="hidden md:block" />
                매장 방문 시에는 QR로 빠르게 로그인하고, 라페어의 소식을 가장 먼저 받아보세요.
              </p>

              {/* 스토어 CTA 버튼 */}
              <div className="mt-6 flex flex-wrap items-center justify-center gap-4 md:justify-start md:gap-5">
                <a
                  href="https://play.google.com/store/apps/details?id=com.tobesmart.laffair"
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="Google Play에서 다운로드"
                  className="group inline-flex items-center rounded-xl bg-black/15 px-[6px] py-[6px] shadow-[0_10px_30px_rgba(0,0,0,0.45)] backdrop-blur transition duration-200 hover:-translate-y-0.5 hover:bg-black/25 hover:shadow-[0_16px_40px_rgba(0,0,0,0.55)]"
                >
                  <Image
                    src="/Images/mobileGuide/google.webp"
                    alt="Google Play에서 다운로드"
                    width={180}
                    height={54}
                    className="h-12 w-[180px] object-contain md:h-[54px]"
                  />
                </a>
                <a
                  href="https://apps.apple.com/us/app/%EB%9D%BC%ED%8E%98%EC%96%B4/id6744727173"
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="App Store에서 다운로드"
                  className="group inline-flex items-center rounded-xl bg-black/15 px-[6px] py-[6px] shadow-[0_10px_30px_rgba(0,0,0,0.45)] backdrop-blur transition duration-200 hover:-translate-y-0.5 hover:bg-black/25 hover:shadow-[0_16px_40px_rgba(0,0,0,0.55)]"
                >
                  <Image
                    src="/Images/mobileGuide/appstore.webp"
                    alt="App Store에서 다운로드"
                    width={180}
                    height={54}
                    className="h-12 w-[180px] object-contain md:h-[54px]"
                  />
                </a>
              </div>

              {/* 앱 주요 기능 하이라이트 */}
              <ul className="mt-8 grid w-full gap-4 text-left text-[13px] text-[#fbeaec]/90 md:grid-cols-2 md:text-[20px]">
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-[12px] font-semibold">
                    01
                  </span>
                  <div>
                    <p className="font-semibold text-[#f0d435]">매장 · 온라인 통합 멤버십</p>
                    <p className="mt-1 leading-relaxed text-[18px]">
                      오프라인 매장과 온라인 쇼핑몰을 하나의 계정으로 관리하고, 적립한 포인트를 함께 사용할 수 있어요.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-[12px] font-semibold">
                    02
                  </span>
                  <div>
                    <p className="font-semibold text-[#f0d435]">맞춤 추천 & 이벤트 알림</p>
                    <p className="mt-1 leading-relaxed text-[18px]">
                      취향과 사이즈 정보를 기반으로 한 추천 상품과, 라페어 소식을 푸시 알림으로 받아보세요.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-[12px] font-semibold">
                    03
                  </span>
                  <div>
                    <p className="font-semibold text-[#f0d435]">간편한 QR 로그인</p>
                    <p className="mt-1 leading-relaxed text-[18px]">
                      키오스크에서 앱의 QR 코드만 스캔하면, 별도의 정보 입력 없이 바로 로그인할 수 있습니다.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-[12px] font-semibold">
                    04
                  </span>
                  <div>
                    <p className="font-semibold text-[#f0d435]">언제 어디서든 쇼핑</p>
                    <p className="mt-1 leading-relaxed text-[18px]">
                      매장 방문 전에는 미리 상품을 둘러보고, 방문 후에는 마음에 든 상품을 다시 확인해 보세요.
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            {/* 우측: 앱 화면 미리보기 카드 */}
            <div className="relative mt-4 flex w-full justify-center md:mt-0 md:w-auto">
              <div className="relative h-[360px] w-[200px] rotate-[1.5deg] overflow-hidden rounded-[32px] border border-white/25 bg-gradient-to-b from-white/20 to-white/5 p-2 shadow-[0_22px_60px_rgba(0,0,0,0.6)] backdrop-blur-sm">
                <div className="relative h-full w-full overflow-hidden rounded-[26px] bg-neutral-light">
                  <Image
                    src="/Images/mobileGuide/m10.png"
                    alt="라페어라운지 앱 메인 화면 예시"
                    fill
                    sizes="200px"
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="pointer-events-none absolute -right-6 top-10 hidden h-[280px] w-[160px] -rotate-[6deg] overflow-hidden rounded-[26px] border border-white/15 bg-white/5 shadow-[0_18px_45px_rgba(0,0,0,0.55)] md:block">
                <Image
                  src="/Images/mobileGuide/step_title.webp"
                  alt="회원가입 과정 화면 예시"
                  fill
                  sizes="160px"
                  className="object-cover opacity-90"
                />
              </div>
            </div>
          </div>
        </section>

        

        {/* 하단: 모바일 회원가입 & 이용 가이드 (frontend-design 톤으로 재구성) */}
        <section className="bg-neutral-light">
          <div className="mx-auto max-w-6xl px-6 pb-20 pt-12 md:pb-28">
            <div className="mb-10 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-neutral-500 md:text-[13px]">
                APP ONBOARDING
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-neutral-900 md:text-4xl">
                앱 회원가입 & 이용 가이드
              </h2>
              <p className="mt-3 text-base leading-relaxed text-neutral-600 md:text-[22px]">
                아래 순서를 따라 차근차근 진행하면,
                <br className="hidden md:block" />
                라페어라운지 앱 회원가입과 기본 설정을 어렵지 않게 완료할 수 있어요.
              </p>
            </div>

            <div className="space-y-8 md:space-y-10">
              {mobileGuideSteps.map((step, index) => {
                const isReversed = index % 2 === 1;

                return (
                  <div
                    key={step.title}
                    className={`group relative flex flex-col items-start gap-6 overflow-hidden rounded-3xl bg-white/80 p-4 shadow-[0_18px_40px_rgba(15,23,42,0.08)] ring-1 ring-neutral-200/70 backdrop-blur-sm md:gap-10 md:p-6 ${
                      isReversed ? 'md:flex-row-reverse md:items-start' : 'md:flex-row md:items-start'
                    }`}
                  >
                    {/* 라이트 그래디언트 장식 */}
                    <div className="pointer-events-none absolute -left-24 top-[-80px] h-40 w-40 rounded-full bg-[radial-gradient(circle_at_center,_rgba(249,115,129,0.16),_transparent_70%)] blur-2xl" />
                    <div className="pointer-events-none absolute -bottom-24 right-[-40px] h-44 w-44 rounded-full bg-[radial-gradient(circle_at_center,_rgba(148,163,184,0.18),_transparent_70%)] blur-2xl" />

                    {/* 앱 스크린 이미지 */}
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

                      {/* STEP 1: 한 줄 안내 박스 */}
                      {index === 0 && (
                        <div className="mt-3">
                          <div className="rounded-2xl bg-white/95 px-4 py-3 text-[15px] leading-relaxed text-neutral-800 shadow-[0_10px_25px_rgba(15,23,42,0.18)] ring-1 ring-neutral-200/80 md:text-[20px]">
                            {step.description}
                          </div>
                        </div>
                      )}

                      {/* STEP 2: ①~⑤ 항목 각각 입체 박스로 분리 */}
                      {index === 1 && (
                        <div className="mt-3 space-y-3">
                          <div className="rounded-2xl bg-white/95 px-4 py-3 text-[15px] leading-relaxed text-neutral-800 shadow-[0_10px_25px_rgba(15,23,42,0.18)] ring-1 ring-neutral-200/80 md:text-[20px]">
                            ① 인증번호 전송: 휴대폰 번호를 입력한 후 우측의 &apos;인증번호 전송&apos; 버튼을 눌러주세요.
                          </div>
                          <div className="rounded-2xl bg-white/95 px-4 py-3 text-[15px] leading-relaxed text-neutral-800 shadow-[0_10px_25px_rgba(15,23,42,0.18)] ring-1 ring-neutral-200/80 md:text-[20px]">
                            ② 인증번호 입력: 휴대폰 문자로 수신된 인증번호를 이 칸에 정확히 입력해주세요.
                          </div>
                          <div className="rounded-2xl bg-white/95 px-4 py-3 text-[15px] leading-relaxed text-neutral-800 shadow-[0_10px_25px_rgba(15,23,42,0.18)] ring-1 ring-neutral-200/80 md:text-[20px]">
                            ③ 비밀번호 확인: 설정할 비밀번호를 재입력하여 오타가 없는지 확인하는 단계입니다.
                          </div>
                          <div className="rounded-2xl bg-white/95 px-4 py-3 text-[15px] leading-relaxed text-neutral-800 shadow-[0_10px_25px_rgba(15,23,42,0.18)] ring-1 ring-neutral-200/80 md:text-[20px]">
                            ④ 서비스 이용을 위한 약관에 동의하는 체크박스입니다.
                          </div>
                          <div className="rounded-2xl bg-white/95 px-4 py-3 text-[15px] leading-relaxed text-neutral-800 shadow-[0_10px_25px_rgba(15,23,42,0.18)] ring-1 ring-neutral-200/80 md:text-[20px]">
                            ⑤ 필수 정보를 모두 입력했다면 하단의 주황색 &apos;다음&apos; 버튼을 눌러 진행해주세요.
                          </div>
                        </div>
                      )}

                      {/* STEP 3: 안내 문장을 하나의 박스로 표현 (① 형식) */}
                      {index === 2 && (
                        <div className="mt-3">
                          <div className="rounded-2xl bg-white/95 px-4 py-3 text-[15px] leading-relaxed text-neutral-800 shadow-[0_10px_25px_rgba(15,23,42,0.18)] ring-1 ring-neutral-200/80 md:text-[20px]">
                            ① 기본 정보 입력이 완료되었다는 안내입니다.
                            <br />
                            <br />
                            &apos;네&apos;를 선택하면 AI 추천 상품을 받기 위한 추가 정보를 입력할 수 있습니다
                          </div>
                        </div>
                      )}

                      {/* STEP 4: ①~⑤ 항목 각각 입체 박스로 분리 */}
                      {index === 3 && (
                        <div className="mt-3 space-y-3">
                          <div className="rounded-2xl bg-white/95 px-4 py-3 text-[15px] leading-relaxed text-neutral-800 shadow-[0_10px_25px_rgba(15,23,42,0.18)] ring-1 ring-neutral-200/80 md:text-[20px]">
                            ① 성별: 본인의 성별(남성/여성)을 선택해주세요.
                          </div>
                          <div className="rounded-2xl bg-white/95 px-4 py-3 text-[15px] leading-relaxed text-neutral-800 shadow-[0_10px_25px_rgba(15,23,42,0.18)] ring-1 ring-neutral-200/80 md:text-[20px]">
                            ② 기념일: 생일이나 기념일 등 날짜 정보를 입력해주세요.
                          </div>
                          <div className="rounded-2xl bg-white/95 px-4 py-3 text-[15px] leading-relaxed text-neutral-800 shadow-[0_10px_25px_rgba(15,23,42,0.18)] ring-1 ring-neutral-200/80 md:text-[20px]">
                            ③ 사이즈: 평소 착용하는 의류 사이즈를 목록에서 선택해주세요.
                          </div>
                          <div className="rounded-2xl bg-white/95 px-4 py-3 text-[15px] leading-relaxed text-neutral-800 shadow-[0_10px_25px_rgba(15,23,42,0.18)] ring-1 ring-neutral-200/80 md:text-[20px]">
                            ④ 설문조사: AI 맞춤 상품 추천을 위해 설문조사를 시작하는 버튼입니다.
                          </div>
                          <div className="rounded-2xl bg-white/95 px-4 py-3 text-[15px] leading-relaxed text-neutral-800 shadow-[0_10px_25px_rgba(15,23,42,0.18)] ring-1 ring-neutral-200/80 md:text-[20px]">
                            ⑤ 가입: 모든 정보를 확인했다면 하단의 &apos;가입&apos; 버튼을 눌러 회원가입을 최종 완료해주세요
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            
          </div>
        </section>

        {/* QR 로그인 이용 가이드 (frontend-design 톤으로 재구성) */}
        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-6 pb-20 pt-12 md:pb-28">
            <div className="mb-10 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-neutral-500 md:text-[13px]">
                IN-STORE EXPERIENCE
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-neutral-900 md:text-4xl">
                오프라인 매장 QR 로그인
              </h2>
              <p className="mt-3 text-base leading-relaxed text-neutral-600 md:text-[22px]">
                앱에서 발급된 QR 코드를 활용해 키오스크에서
                <br className="hidden md:block" />
                빠르고 간편하게 로그인할 수 있어요.
              </p>
            </div>

            <div className="grid gap-10 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1.5fr)] md:items-center">
              {/* 좌측: 키오스크/앱 화면 시각적 안내 */}
              <div className="relative flex justify-center gap-6">
                {/* 메인 QR 아이콘 위치 안내 화면 */}
                <div className="relative h-[320px] w-[180px] -rotate-[2deg] overflow-hidden rounded-[28px] border border-neutral-200/80 bg-gradient-to-b from-neutral-50 to-neutral-100 p-2 shadow-[0_18px_50px_rgba(15,23,42,0.2)] md:h-[360px] md:w-[190px]">
                  <div className="relative h-full w-full overflow-hidden rounded-[22px] bg-neutral-100">
                    <Image
                      src="/Images/mobileGuide/step7.webp"
                      alt="쇼핑몰 메인 화면 QR 아이콘 위치 안내"
                      fill
                      sizes="(min-width: 768px) 190px, 180px"
                      className="object-contain"
                    />
                  </div>
                </div>

                {/* 보조: 키오스크 스캔 화면 */}
                <div className="relative hidden h-[260px] w-[150px] rotate-[6deg] overflow-hidden rounded-[26px] border border-neutral-200/70 bg-gradient-to-b from-white to-neutral-100 p-2 shadow-[0_16px_40px_rgba(15,23,42,0.18)] md:block">
                  <div className="relative h-full w-full overflow-hidden rounded-[20px] bg-neutral-50">
                    <Image
                      src="/Images/mobileGuide/step8.webp"
                      alt="키오스크 스캔용 QR 로그인 화면 안내"
                      fill
                      sizes="150px"
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>

              {/* 우측: 텍스트 설명 카드 */}
              <div className="relative overflow-hidden rounded-3xl bg-neutral-50 px-5 py-6 text-[15px] leading-relaxed text-neutral-700 shadow-[0_16px_40px_rgba(15,23,42,0.08)] ring-1 ring-neutral-200/80 md:px-7 md:py-7 md:text-[16px]">
                <div className="pointer-events-none absolute -right-24 -top-16 h-40 w-40 rounded-full bg-[radial-gradient(circle_at_center,_rgba(148,163,184,0.24),_transparent_70%)] blur-2xl" />
                <p className="relative z-[1] text-xs font-semibold uppercase tracking-[0.22em] text-neutral-500">
                  HOW TO USE
                </p>
                <p className="relative z-[1] mt-2 text-base font-semibold text-neutral-900 md:text-[26px]">
                  QR 코드 한 번으로, 매장에서 바로 로그인
                </p>
                <div className="relative z-[1] mt-3 space-y-3">
                  <div className="rounded-2xl bg-white/95 px-4 py-3 text-[15px] leading-relaxed text-neutral-800 shadow-[0_10px_25px_rgba(15,23,42,0.18)] ring-1 ring-neutral-200/80 md:text-[20px]">
                    ① 앱을 메인 화면 우측 상단에 있는{' '}
                    <span className="font-semibold text-neutral-900">QR 아이콘</span>을 눌러주세요.
                  </div>
                  <div className="rounded-2xl bg-white/95 px-4 py-3 text-[15px] leading-relaxed text-neutral-800 shadow-[0_10px_25px_rgba(15,23,42,0.18)] ring-1 ring-neutral-200/80 md:text-[20px]">
                    ② 화면에 나타난 QR 코드를 오프라인 매장 키오스크에 가져다 대면, 별도의 정보 입력 없이 바로 로그인됩니다.
                  </div>
                  <div className="rounded-2xl bg-white/95 px-4 py-3 text-[15px] leading-relaxed text-neutral-800 shadow-[0_10px_25px_rgba(15,23,42,0.18)] ring-1 ring-neutral-200/80 md:text-[20px]">
                    ③ 로그인 후에는 적립/사용 내역 조회, 멤버십 혜택 적용 등 매장 서비스를 더욱 빠르게 이용하실 수 있어요.
                  </div>
                </div>

                 
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}


