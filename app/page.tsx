import Image from 'next/image'
import Link from 'next/link'
const FeatureCard = ({ icon, title, description }) => (
  <div className="transform rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 p-6 text-white shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl">
    <div className="mb-4 text-5xl">{icon}</div>
    <h3 className="mb-3 text-2xl font-bold">{title}</h3>
    <p className="text-lg">{description}</p>
  </div>
)

export default function Home() {
  const features = [
    {
      icon: '🌍',
      title: '현지 문화 체험',
      description:
        '현지인과 함께 진정한 문화를 경험해보세요. 관광객으로는 알 수 없는 숨겨진 매력을 발견할 수 있습니다.',
    },
    {
      icon: '💬',
      title: '언어 교환',
      description:
        '실제 대화를 통해 언어 실력을 향상시키세요. 현지인과의 대화로 살아있는 언어를 배울 수 있습니다.',
    },
    {
      icon: '🧭',
      title: '맞춤형 여행',
      description:
        '현지인의 추천으로 특별한 여행을 즐겨보세요. 가이드북에 없는 독특한 경험을 할 수 있습니다.',
    },
    {
      icon: '🤝',
      title: '글로벌 네트워크',
      description:
        '전 세계 친구들과 연결되어 시야를 넓혀보세요. 다양한 문화와 관점을 접할 수 있는 기회입니다.',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <h1 className="mb-12 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-center text-6xl font-black text-transparent">
          mannazu: 여행의 새로운 차원
        </h1>

        <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-2">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>

        <div className="text-center">
          <h2 className="mb-6 text-4xl font-bold">우리의 미션</h2>
          <p className="mx-auto mb-8 max-w-3xl text-xl leading-relaxed">
            mannazu는 전 세계 사람들이 서로 만나고, 배우며, 성장할 수 있는
            기회를 제공합니다. 우리는 문화의 장벽을 넘어 진정한 글로벌
            커뮤니티를 만들어갑니다. 여행은 단순한 관광이 아닌, 세계를 이해하고
            자신을 발견하는 여정이 되어야 한다고 믿습니다.
          </p>
          <Link href="/">
            <button className="transform rounded-full bg-gradient-to-r from-blue-400 to-purple-600 px-8 py-3 text-xl font-bold text-white transition-all duration-300 hover:scale-105 hover:from-blue-500 hover:to-purple-700">
              mannazu와 함께 여행하기
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
