'use client'

import React from 'react'
import TravelerCard from '@/components/posts/desktop/Card'
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@nextui-org/react'

export default function ListTraveller() {
  let travelers = exampleTravelers
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  return (
    <div className="relative min-h-screen">
      <div className="grid max-h-screen grid-cols-1 gap-6 overflow-y-auto p-6 md:grid-cols-2 lg:grid-cols-3">
        {travelers.map((traveler) => (
          <TravelerCard key={traveler.id} traveler={traveler} />
        ))}
      </div>

      <Button
        auto
        color="primary"
        className="fixed bottom-6 right-6 z-10"
        onPress={onOpen}
      >
        글 추가
      </Button>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                새 글 작성
              </ModalHeader>
              <ModalBody>
                {/* 여기에 입력 폼을 추가하세요 */}
                <p>입력 폼이 들어갈 자리입니다.</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  취소
                </Button>
                <Button color="primary" onPress={onClose}>
                  저장
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  )
}

const exampleTravelers = [
  {
    id: 1,
    nationality: '대한민국',
    name: '김태희',
    gender: '여성',
    averageRating: 4.8,
    feedbackCount: 25,
    destinationCountry: '프랑스',
    destinationCountryCode: 'FR',
    destinationCity: '파리',
    destinationDetail: '에펠탑 근처',
    introduction:
      '패션과 예술을 사랑하는 여행자입니다. 파리의 문화를 깊이 체험하고 싶어요!',
    preferredTags: ['문화', '예술', '음식', '쇼핑'],
    languages: ['한국어', '영어', '프랑스어'],
  },
  {
    id: 2,
    nationality: '미국',
    name: 'John Smith',
    gender: '남성',
    averageRating: 4.5,
    feedbackCount: 18,
    destinationCountry: '일본',
    destinationCountryCode: 'JP',
    destinationCity: '도쿄',
    destinationDetail: '시부야 지역',
    introduction:
      '테크놀로지와 게임 문화에 관심이 많은 여행자입니다. 일본의 최신 기술을 경험하고 싶어요!',
    preferredTags: ['기술', '게임', '아니메', '전자제품'],
    languages: ['영어', '일본어(기초)'],
  },
  {
    id: 3,
    nationality: '브라질',
    name: 'Maria Santos',
    gender: '여성',
    averageRating: 4.9,
    feedbackCount: 32,
    destinationCountry: '이탈리아',
    destinationCountryCode: 'IT',
    destinationCity: '로마',
    destinationDetail: '콜로세움 인근',
    introduction:
      '역사와 요리에 푹 빠진 여행자입니다. 로마의 유적지를 둘러보고 현지 요리를 배우고 싶어요!',
    preferredTags: ['역사', '요리', '문화유산', '와인'],
    languages: ['포르투갈어', '스페인어', '영어', '이탈리아어(기초)'],
  },
  {
    id: 4,
    nationality: '호주',
    name: 'Emma Wilson',
    gender: '여성',
    averageRating: 4.6,
    feedbackCount: 15,
    destinationCountry: '태국',
    destinationCountryCode: 'TH',
    destinationCity: '방콕',
    destinationDetail: '카오산 로드 근처',
    introduction:
      '배낭여행을 즐기는 모험가입니다. 태국의 활기찬 거리 음식과 야시장을 경험하고 싶어요!',
    preferredTags: ['모험', '음식', '야시장', '템플'],
    languages: ['영어', '태국어(기초)'],
  },
  {
    id: 5,
    nationality: '독일',
    name: 'Lukas Müller',
    gender: '남성',
    averageRating: 4.7,
    feedbackCount: 22,
    destinationCountry: '캐나다',
    destinationCountryCode: 'CA',
    destinationCity: '밴쿠버',
    destinationDetail: '스탠리 파크 인근',
    introduction:
      '자연을 사랑하는 아웃도어 매니아입니다. 록키 산맥을 트레킹하고 캐나다의 대자연을 만끽하고 싶어요!',
    preferredTags: ['자연', '트레킹', '사진', '캠핑'],
    languages: ['독일어', '영어', '프랑스어'],
  },
  {
    id: 6,
    nationality: '프랑스',
    name: 'Sophie Dubois',
    gender: '여성',
    averageRating: 4.8,
    feedbackCount: 28,
    destinationCountry: '대한민국',
    destinationCountryCode: 'KR',
    destinationCity: '서울',
    destinationDetail: '명동 인근',
    introduction:
      '한국 문화와 K-pop에 매료된 여행자입니다. 서울의 현대적인 면과 전통적인 면을 모두 경험하고 싶어요!',
    preferredTags: ['K-pop', '한식', '쇼핑', '템플스테이'],
    languages: ['프랑스어', '영어', '한국어(기초)'],
  },
  {
    id: 7,
    nationality: '인도',
    name: 'Raj Patel',
    gender: '남성',
    averageRating: 4.6,
    feedbackCount: 20,
    destinationCountry: '스페인',
    destinationCountryCode: 'ES',
    destinationCity: '바르셀로나',
    destinationDetail: '사그라다 파밀리아 근처',
    introduction:
      '건축과 디자인을 사랑하는 여행자입니다. 가우디의 작품들을 직접 보고 스페인의 열정적인 문화를 체험하고 싶어요!',
    preferredTags: ['건축', '예술', '타파스', '플라멩코'],
    languages: ['힌디어', '영어', '스페인어(기초)'],
  },
  {
    id: 8,
    nationality: '캐나다',
    name: 'Emily Chen',
    gender: '여성',
    averageRating: 4.9,
    feedbackCount: 35,
    destinationCountry: '뉴질랜드',
    destinationCountryCode: 'NZ',
    destinationCity: '퀸스타운',
    destinationDetail: '와카티푸 호수 주변',
    introduction:
      '아드레날린 junkie이자 자연 애호가입니다. 뉴질랜드의 극한 스포츠와 숨막히는 풍경을 경험하고 싶어요!',
    preferredTags: ['번지점프', '스카이다이빙', '하이킹', '로드트립'],
    languages: ['영어', '프랑스어', '중국어'],
  },
  {
    id: 9,
    nationality: '남아프리카공화국',
    name: 'Thabo Nkosi',
    gender: '남성',
    averageRating: 4.7,
    feedbackCount: 23,
    destinationCountry: '브라질',
    destinationCountryCode: 'BR',
    destinationCity: '리우데자네이루',
    destinationDetail: '코파카바나 해변 근처',
    introduction:
      '음악과 춤을 사랑하는 여행자입니다. 삼바의 리듬을 배우고 브라질의 축제 문화를 즐기고 싶어요!',
    preferredTags: ['삼바', '축구', '카니발', '해변'],
    languages: ['줄루어', '영어', '포르투갈어(기초)'],
  },
  {
    id: 10,
    nationality: '일본',
    name: 'Yuki Tanaka',
    gender: '여성',
    averageRating: 4.8,
    feedbackCount: 30,
    destinationCountry: '이집트',
    destinationCountryCode: 'EG',
    destinationCity: '카이로',
    destinationDetail: '기자 지역',
    introduction:
      '고대 문명에 관심이 많은 역사 buff입니다. 피라미드를 직접 보고 나일 강 크루즈를 즐기고 싶어요!',
    preferredTags: ['고고학', '피라미드', '박물관', '사막투어'],
    languages: ['일본어', '영어', '아랍어(기초)'],
  },
]
