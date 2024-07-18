'use client'

import TripButton from '@/components/about/TripButton'
import AnimatedTitle from '@/components/about/AnimatedTitle'

const ReasonCard = ({ icon, title, description }) => (
  <div className="transform rounded-2xl bg-gradient-to-br from-pink-500 to-orange-400 p-6 text-white shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl dark:text-white">
    <div className="mb-4 text-5xl">{icon}</div>
    <h3 className="mb-3 text-2xl font-bold">{title}</h3>
    <p className="text-lg">{description}</p>
  </div>
)

export default function WhyMannazuPage() {
  const reasons = [
    {
      icon: '🌟',
      title: '편리한 자기소개',
      description:
        '당신만의 독특한 프로필을 쉽고 재미있게 만들어 보세요. 진정한 당신을 표현할 수 있습니다.',
    },
    {
      icon: '💬',
      title: '안전한 사전 채팅',
      description:
        '만나기 전 채팅으로 상대방을 알아가세요. 편안하고 안전한 만남을 준비할 수 있습니다.',
    },
    {
      icon: '👍',
      title: '신뢰할 수 있는 피드백',
      description:
        '다른 사용자들의 리뷰를 통해 신뢰할 수 있는 현지인 친구와의 만남을 가질 수 있습니다.',
    },
    {
      icon: '🗣️',
      title: '언어와 문화 교류',
      description:
        '현지인과의 실제적인 대화로 살아있는 언어와 문화를 경험해보세요.',
    },
    {
      icon: '🍜',
      title: '독특한 로컬 정보',
      description:
        '현지인만이 아는 숨겨진 명소와 맛집을 발견하세요. 특별한 여행 경험을 만들어드립니다.',
    },
    {
      icon: '🌈',
      title: '새로운 친구, 새로운 모험',
      description:
        '전 세계의 새로운 친구들을 만나 잊지 못할 추억을 만들어보세요!',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 dark:text-white">
      <div className="container mx-auto px-4 py-16">
        <AnimatedTitle titleText="WHY MANNAZU?" />

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason, index) => (
            <ReasonCard key={index} {...reason} />
          ))}
        </div>

        <div className="mt-16 text-center">
          <h2 className="mb-6 text-4xl font-bold">
            새로운 여행의 시작, mannazu와 함께
          </h2>
          <p className="mx-auto mb-8 max-w-3xl text-xl leading-relaxed">
            mannazu는 단순한 여행 앱이 아닙니다. 우리는 전 세계 사람들을
            연결하고, 문화를 공유하며, 평생 간직할 추억을 만들 수 있는 혁신적인
            플랫폼입니다. 진정한 글로벌 시민으로서의 여행을 경험해보세요.
          </p>
          <TripButton buttonText="지금 바로 만나주!" />
        </div>
      </div>
    </div>
  )
}
