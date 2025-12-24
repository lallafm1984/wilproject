import Footer from '../../components/Footer.js'
import Location from '../../components/Location/index.js'

export const metadata = {
  title: "매장찾기 | 라페어라운지",
  description: "라페어라운지 매장찾기 페이지입니다. 본사 및 매장 위치와 오시는 길을 안내합니다.",
  openGraph: {
    title: "매장찾기 | 라페어라운지",
    description: "라페어라운지 매장찾기 페이지입니다. 본사 및 매장 위치와 오시는 길을 안내합니다.",
    url: "https://www.laffairlounge.com/Location",
    images: [
      {
        url: "https://www.laffairlounge.com/Images/main_img/main.webp",
        width: 1200,
        height: 630,
        alt: "라페어라운지 대표 이미지"
      }
    ],
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "매장찾기 | 라페어라운지",
    description: "라페어라운지 매장찾기 페이지입니다. 본사 및 매장 위치와 오시는 길을 안내합니다.",
    images: ["https://www.laffairlounge.com/Images/main_img/main.webp"]
  }
}

export default function StoreLocatorPage() {
  return (
    <div className='min-h-screen'>
      <Location />
      <Footer />
    </div>
  )
}


