'use client'

import { useEffect, useState } from 'react'
import ShortFormMobileCard from '@/components/posts/mobile/Card'
import { getPosts } from '@/services/api'

export default function PostFeed() {
  const [travelers, setTravelers] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getPosts()
        setTravelers(response.data.content || [])
      } catch (error) {
        console.error('데이터를 가져오는 중 오류 발생:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  if (isLoading) return <div>로딩 중...</div>

  return (
    <div className="h-screen snap-y snap-mandatory overflow-y-scroll">
      {travelers.map((traveler) => (
        <div key={traveler.id} className="h-screen w-full snap-start">
          <ShortFormMobileCard traveler={traveler} />
        </div>
      ))}
    </div>
  )
}
