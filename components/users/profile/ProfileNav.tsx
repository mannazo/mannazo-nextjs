'use client'

import { Button } from '@nextui-org/react'
import { useRouter } from 'next/navigation'

const ProfileNav: React.FC = () => {
  const router = useRouter()

  const handleOverviewClick = () => {
    router.push('/users/profile/overview')
  }

  const handleReviewClick = () => {
    router.push('/users/profile/review')
  }

  return (
    <div className="flex justify-center space-x-4 mt-4">
      <Button
        onClick={handleOverviewClick}
        color="primary"
        className="w-36 py-2" // 버튼의 길이와 여백을 조정합니다
      >
        Overview
      </Button>
      <Button
        onClick={handleReviewClick}
        color="secondary"
        className="w-36 py-2" // 버튼의 길이와 여백을 조정합니다
      >
        Review
      </Button>
    </div>
  )
}

export default ProfileNav