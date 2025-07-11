import Main from '../../components/Main/index.js'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

export const metadata = {
  title: "라페어라운지",
  description: "라페어라운지 메인 페이지입니다. 라페어라운지에서 다양한 라페어라운지 제품을 만나보세요.",
  openGraph: {
    title: "라페어라운지",
    description: "라페어라운지 메인 페이지입니다. 라페어라운지에서 다양한 라페어라운지 제품을 만나보세요.",
    url: "https://www.laffairlounge.com/Main",
    images: [
      {
        url: "https://www.laffairlounge.com/Images/main_img/title.webp",
        width: 1200,
        height: 630,
        alt: "라페어라운지 대표 이미지"
      }
    ],
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "라페어라운지",
    description: "라페어라운지 메인 페이지입니다. 라페어라운지에서 다양한 라페어라운지 제품을 만나보세요.",
    images: ["https://www.laffairlounge.com/Images/main_img/title.webp"]
  }
}

export default function Home() {
  return (
    <div className='min-h-screen'>
      <Header />
      <Main />
      <Footer />
    </div>
  )
}