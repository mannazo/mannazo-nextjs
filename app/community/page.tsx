import React from 'react'
import Feed from '@/components/community/Feed'

const dummyPosts = [
  {
    id: 1,
    authorName: '여행자 김철수',
    authorImage: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
    location: '파리, 프랑스',
    content:
      '에펠탑에서 본 파리의 야경은 정말 환상적이에요! 여러분도 꼭 한 번 보세요.',
    image: 'https://picsum.photos/seed/paris/800/600',
  },
  {
    id: 2,
    authorName: '모험가 이영희',
    authorImage: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
    location: '방콕, 태국',
    content: '방콕의 길거리 음식은 정말 맛있어요. 특히 팟타이는 꼭 드셔보세요!',
    image: 'https://picsum.photos/seed/bangkok/800/600',
  },
  // 더 많은 더미 데이터를 추가할 수 있습니다.
]

export default function Home() {
  return (
    <main className="container mx-auto py-8">
      <h1 className="mb-8 text-center text-3xl font-bold">Mannazo 여행 피드</h1>
      <Feed posts={dummyPosts} />
    </main>
  )
}
