// pages/travel-posts.tsx
'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import { Pagination, Spinner } from '@nextui-org/react'
import TravelPostCard from '@/components/posts/desktop/TravelPostCard'
import { Button, useDisclosure } from '@nextui-org/react'
import TravelForm from '@/components/posts/TravelForm'

interface TravelPost {
  post: {
    postId: string
    userId: string
    travelNationality: string
    travelCity: string
    travelStartDate: string
    travelEndDate: string
    travelStatus: string
    preferredGender: string
    travelStyle: string
    travelPurpose: string
    createdAt: string
    imageUrls: string[]
  }
  user: {
    userId: string
    email: string
    name: string
    nickname: string
    nationality: string
    language: string
    profileImage: string | null
    introduction: string
    city: string
    authority: string
    gender: string
    mbti: string
    interests: string
    birthday: string
    lastLoginAt: string
  } | null
}

interface PageResponse {
  content: TravelPost[]
  totalPages: number
  totalElements: number
  size: number
  number: number
}

const TravelPostsPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [posts, setPosts] = useState<TravelPost[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    fetchPosts(currentPage)
  }, [currentPage])

  const fetchPosts = async (page: number) => {
    setIsLoading(true)
    try {
      const response = await axios.get<PageResponse>(
        `https://mannazu.diligentp.com/post/findAll?page=${page - 1}&size=9`
      )
      setPosts(response.data.content)
      setTotalPages(response.data.totalPages)
    } catch (error) {
      console.error('Error fetching posts:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <h1 className="my-8 text-3xl font-bold">Travel Posts</h1>
      {isLoading ? (
        <div className="flex h-64 items-center justify-center">
          <Spinner size="lg" />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <TravelPostCard key={post.post.postId} post={post} />
          ))}
        </div>
      )}
      <div className="mt-8 flex justify-center">
        <Pagination
          total={totalPages}
          initialPage={1}
          page={currentPage}
          onChange={handlePageChange}
        />
      </div>

      <Button
        color="primary"
        className="fixed bottom-6 right-6 z-10"
        onPress={onOpen}
      >
        Write a Post! ✏️
      </Button>

      <TravelForm onSubmitSuccess={null} isOpen={isOpen} onClose={onClose} />
    </div>
  )
}
export default TravelPostsPage
