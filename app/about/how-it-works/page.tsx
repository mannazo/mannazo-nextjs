import Link from 'next/link';
import * as PATHS from '@/constants/paths';

const StepCard = ({ number, title, description }) => (
  <div className='transform rounded-3xl bg-gradient-to-br from-purple-600 to-indigo-700 p-8 text-white shadow-2xl transition-all duration-300 hover:scale-105'>
    <div className='absolute -left-4 -top-4 text-5xl font-bold opacity-20'>{number}</div>
    <h3 className='relative z-10 mb-4 text-4xl font-extrabold'>{title}</h3>
    <p className='text-xl leading-relaxed'>{description}</p>
  </div>
);

export default function HowItWorksPage() {
  const steps = [
    {
      number: '01',
      title: '문제 인식',
      description:
        '여행객들은 현지에서 진정한 문화 교류의 기회를 놓치고 있습니다. 관광지만 방문하고 돌아오는 여행은 이제 그만!',
    },
    {
      number: '02',
      title: '해결책 제시',
      description:
        'mannazu가 등장합니다! 우리는 여행객과 현지인을 연결하는 혁신적인 플랫폼을 제공합니다.',
    },
    {
      number: '03',
      title: '프로필 생성',
      description:
        '당신의 관심사, 여행 스타일, 문화적 배경을 반영한 독특한 프로필을 만듭니다. 진정한 당신을 보여주세요!',
    },
    {
      number: '04',
      title: '재미있는 사진 준비',
      description:
        '이번 여행에서 친구들을 만나기 위해 재미난 사진을 한 장 준비하세요. 더 많은 사진을 보여주고 싶다면, 프로필에 추가 사진을 올릴 수 있습니다.',
    },
    {
      number: '05',
      title: '여행 스타일 선택',
      description:
        '어떤 여행을 원하는지 태그를 선택해주세요. 맛있는 음식, 현지 푸드에 대한 도전, 문화의 교류, 익스트림 스포츠 등 다양한 태그가 준비되어 있습니다.',
    },
    {
      number: '06',
      title: '친구가 나를 발견',
      description:
        '취향이 비슷한 로컬 친구가 나에게 연락합니다. 친구는 내가 올린 사진, 프로필의 사진과 자기소개를 볼 수 있습니다.',
    },
    {
      number: '07',
      title: '안전한 소통',
      description:
        '내장된 채팅 시스템으로 만남 전에 충분히 대화를 나눠보세요. 서로를 이해하고 기대를 조율할 수 있습니다.',
    },
    {
      number: '08',
      title: '특별한 만남',
      description:
        '드디어 현지에서 만남이 이루어집니다! 현지인과 함께 숨겨진 명소를 방문하고, 현지 문화를 직접 체험해보세요.',
    },
  ];

  return (
    <div className='min-h-screen bg-gray-900 text-white'>
      <div className='container mx-auto px-4 py-20'>
        <h1 className='mb-16 bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-center text-7xl font-black text-transparent'>
          mannazu는 어떻게 작동할까요?
        </h1>

        <div className='grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3'>
          {steps.map((step, index) => (
            <StepCard key={index} {...step} />
          ))}
        </div>

        <div className='mt-20 text-center'>
          <h2 className='mb-8 text-5xl font-bold'>여행의 새로운 차원을 경험하세요</h2>
          <p className='mx-auto mb-12 max-w-4xl text-2xl leading-relaxed'>
            mannazu와 함께라면, 더 이상 단순한 관광객이 아닌 진정한 글로벌 시민이 될 수 있습니다.
            현지인과의 교류를 통해 깊이 있는 문화 이해, 언어 실력 향상, 그리고 평생 간직할 추억을
            만들어보세요.
          </p>
          <Link href={PATHS.TRIP}>
            <button className='transform rounded-full bg-gradient-to-r from-pink-500 to-yellow-500 px-10 py-4 text-2xl font-bold text-white transition-all duration-300 hover:scale-105 hover:from-pink-600 hover:to-yellow-600'>
              지금 바로 시작하기
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}