import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Image from 'next/image';

export const metadata = {
  title: '라페어라운지 앱 다운로드',
  description:
    '라페어라운지 전용 앱을 다운로드하고, 간편한 회원가입과 포인트 적립, 이벤트 예약까지 한 번에 이용해 보세요.',
  openGraph: {
    title: '라페어라운지 앱 다운로드',
    description:
      '라페어라운지 전용 앱을 다운로드하고, 간편한 회원가입과 포인트 적립, 이벤트 예약까지 한 번에 이용해 보세요.',
    url: 'https://www.laffairlounge.com/pages/AppDownload',
    type: 'website',
  },
};

const mobileGuideSteps = [
  {
    image: '/Images/mobileGuide/step1.webp',
    title: ' 회원가입 시작하기',
    description: '1 - 앱 메뉴 상단에 위치한 "회원가입" 버튼을 눌러 계정 생성 절차를 시작해주세요',
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
      <Header />

      <main className="pt-[54px] md:pt-[100px] lg:pt-[132px] bg-neutral-light">
        {/* 상단: 앱 다운로드 CTA 영역 */}
        <section className="w-full bg-gradient-to-b from-[#92000a] via-[#92000a] to-[#b84548] text-white">
          <div className="mx-auto flex max-w-5xl flex-col items-center gap-10 px-6 py-16 md:flex-row md:items-start md:justify-center md:py-20">
            <div className="max-w-xl space-y-6 text-center md:text-center">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#fbeaec]">
                APP DOWNLOAD
              </p>
              <h1 className="text-3xl font-semibold leading-10 md:leading-snug tracking-[0.08em]  md:text-4xl">
                라페어라운지 앱으로
                <br />
                더욱 편리한 쇼핑과
                <br className="hidden md:block" />
                 멤버십 혜택을 
              
                  만나보세요.
              </h1>
              <p className="mt-3 text-sm leading-relaxed text-[#fbeaec] md:text-base">
                앱으로 상품을 편하게 구매하고, 추가로 포인트 적립 혜택! <br />
                매장 방문 시에는 빠르고 간편한 로그인 기능으로 편리하게 이용해 보세요.
              </p>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-4 md:gap-10 md:justify-center">
                <a
                  href="https://play.google.com/store/apps/details?id=com.tobesmart.laffair"
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="Google Play에서 다운로드"
                  className="inline-flex items-center transition hover:-translate-y-0.5 hover:opacity-90"
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
                  className="inline-flex items-center transition hover:-translate-y-0.5 hover:opacity-90"
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

               
            </div>

           
          </div>
        </section>

        

        {/* 하단: 모바일 회원가입 & 이용 가이드 (mobileGuide 이미지 활용) */}
        <section className="bg-neutral-light">
          <div className="mx-auto max-w-5xl px-6 pb-20 pt-10 md:pb-24 md:pt-12">
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-semibold tracking-[-0.03em] text-neutral-dark md:text-3xl">
                앱 회원가입 & 이용 가이드
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-neutral-600 md:text-base">
                아래 순서를 따라 차근차근 진행하면,
                <br className="hidden md:block" />
                라페어라운지 앱 회원가입과 기본 설정을 어렵지 않게 완료할 수 있어요.
              </p>
            </div>

            <div className="space-y-8">
              {mobileGuideSteps.map((step, index) => (
                <div
                  key={step.title}
                  className="flex flex-col items-center gap-6 rounded-2xl bg-white p-4 shadow-sm md:flex-row md:gap-8 md:p-4"
                >
                  <div className="relative h-[260px] w-full max-w-[220px] overflow-hidden rounded-2xl bg-neutral-light md:h-[360px] md:max-w-[240px]">
                    <Image
                      src={step.image}
                      alt={step.title}
                      fill
                      sizes="(min-width: 768px) 240px, 220px"
                      className="object-contain"
                    />
                  </div>

                  <div className="flex-1 text-left">
                    <p className="text-xl font-semibold uppercase tracking-[0.25em] text-primary-lighter">
                      STEP {index + 1}
                    </p>
                    <h3 className="mt-1 text-lg font-semibold tracking-[-0.02em] text-neutral-dark">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-neutral-700 md:text-base">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-10 text-center text-xs text-neutral-500">
              가입 및 이용 중 어려움이 있다면, 라페어라운지 고객센터 또는 매장
              직원에게 언제든지 문의해주세요.
            </p>
          </div>
        </section>

        {/* QR 로그인 이용 가이드 (step7, step8) */}
        <section className="bg-white">
          <div className="mx-auto max-w-5xl px-6 pb-20 pt-10 md:pb-24 md:pt-12">
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-semibold tracking-[-0.03em] text-neutral-dark md:text-3xl">
                오프라인 매장 QR 로그인  
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-neutral-600 md:text-base">
                쇼핑몰에서 발급된 QR 코드를 활용해 키오스크에서 빠르고 간편하게 로그인할 수 있어요.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              <div className="flex flex-col items-center gap-4">
                <div className="relative w-full max-w-[260px] overflow-hidden rounded-2xl bg-neutral-light">
                  <div className="relative aspect-[9/18] w-full">
                    <Image
                      src="/Images/mobileGuide/step7.webp"
                      alt="쇼핑몰 메인 화면 QR 아이콘 위치 안내"
                      fill
                      sizes="(min-width: 768px) 260px, 220px"
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center gap-4">
                <div className="relative w-full max-w-[260px] overflow-hidden rounded-2xl bg-neutral-light">
                  <div className="relative aspect-[9/18] w-full">
                    <Image
                      src="/Images/mobileGuide/step8.webp"
                      alt="키오스크 스캔용 QR 로그인 화면 안내"
                      fill
                      sizes="(min-width: 768px) 260px, 220px"
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 rounded-2xl bg-neutral-light px-5 py-6 text-sm leading-relaxed text-neutral-700 md:text-base">
              <p className="font-semibold text-neutral-dark">QR 코드 아이콘 안내</p>
              <p className="mt-2">
                쇼핑몰 메인 화면 우측 상단에 있는 QR 아이콘입니다. 
                <br />
                이 버튼을 누르면 키오스크 스캔용 QR 로그인
                화면이 나타나 오프라인 매장에서 간편하게 로그인할 수 있습니다.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}


