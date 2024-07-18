'use client'

import { useEffect, useState } from 'react'
import ShortFormMobileCard from '@/components/posts/mobile/Card'
import { getPostsByPage } from '@/services/api'

export default function PostFeed() {
  const [travelers, setTravelers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [page, setPage] = useState(0)
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    if (!hasMore) return

    setIsLoading(true)
    try {
      const response = await getPostsByPage(page, 3)
      const newTravelers = response.data.content || []
      setTravelers((prevTravelers) => [...prevTravelers, ...newTravelers])
      setPage((prevPage) => prevPage + 1)
      setHasMore(response.data.number < response.data.totalPages - 1)
    } catch (error) {
      console.error('데이터를 가져오는 중 오류 발생:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleScroll = (e) => {
    const { scrollTop, clientHeight, scrollHeight } = e.currentTarget
    if (scrollHeight - scrollTop <= clientHeight * 1.5 && !isLoading) {
      fetchData()
    }
  }

  if (isLoading && travelers.length === 0) return <div>로딩 중...</div>

  return (
    <div
      className="h-[calc(100vh-var(--header-height))] snap-y snap-mandatory overflow-y-scroll"
      onScroll={handleScroll}
    >
      {travelers.map((data) => (
        <div key={data.post.postId} className="h-full w-full snap-start">
          <ShortFormMobileCard data={data} />
        </div>
      ))}
      {isLoading && <div>Loading Now...</div>}
      {!hasMore && <div>NO MORE POSTS 😂</div>}
    </div>
  )
}
