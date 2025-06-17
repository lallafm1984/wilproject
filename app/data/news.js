import { cache } from 'react'

export const getNewsItems = cache(() => {
  const newsItems = [
    {
      id: 1,
      image: "/Images/SampleN4.jpg",
      date: "2024.10.30",
      title: "2024 겨울 시즌 컬렉션 출시",
      description: "자연스러운 실루엣과 부드러운 터치감으로 완성된 2024 겨울 시즌 컬렉션을 만나보세요.",
      category: "NEW COLLECTION"
    },
    {
      id: 2,
      image: "/Images/SampleN6.jpg",
      date: "2024.12.01",
      title: "라페어 매장 오픈",
      description: "라페어 새로운 플래그십 스토어에서 특별한 경험을 만나보세요.",
      category: "STORE NEWS"
    },
    {
      id: 3,
      image: "/Images/SampleN5.jpg",
      date: "2024.03.05",
      title: "지속가능한 패션을 위한 에코 라인 출시",
      description: "라페어의 에코 프렌들리 컬렉션을 소개합니다.",
      category: "SUSTAINABILITY"
    }
  ];

  return newsItems;
}) 