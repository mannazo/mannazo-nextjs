import ShortFormMobileCard from '@/components/posts/mobile/Card'

export default function Page() {
  let travelers = exampleTravelers

  return (
    <div className="snap-y snap-mandatory h-screen overflow-y-scroll">
      {travelers.map((traveler) => (
        <div key={traveler.id} className="snap-start h-screen w-full">
          <ShortFormMobileCard traveler={traveler} />
        </div>
      ))}
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
]
