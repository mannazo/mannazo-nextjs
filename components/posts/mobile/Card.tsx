'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Avatar, Button, Chip } from '@nextui-org/react'
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaUserFriends,
  FaUtensils,
} from 'react-icons/fa'
import { MessageCircle } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useCreateChatRoom } from '@/hooks/useCreateChatRoom'

interface ShortFormMobileCardProps {
  data: {
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
      profileImage: string
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
}

const ShortFormMobileCard: React.FC<ShortFormMobileCardProps> = ({ data }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const { data: session } = useSession()
  const router = useRouter()
  const { mutate } = useCreateChatRoom()

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  const handleChatClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (session) {
      const senderId = session.user.additionalInfo.serverUserId
      const postUserId = data.user.userId

      mutate({ senderId, postUserId })
    } else {
      router.push('/login')
    }
  }

  const backgroundImageUrl =
    data.post.imageUrls && data.post.imageUrls.length > 0
      ? data.post.imageUrls[0]
      : '/test.jpg'

  return (
    <motion.div
      className="relative h-screen w-full overflow-hidden"
      onClick={toggleExpand}
    >
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${backgroundImageUrl})`,
        }}
        animate={{
          scale: isExpanded ? 0.2 : 1,
          top: isExpanded ? '5%' : '0%',
          left: isExpanded ? '5%' : '0%',
          right: isExpanded ? 'auto' : '0%',
          bottom: isExpanded ? 'auto' : '0%',
          width: isExpanded ? '60px' : '100%',
          height: isExpanded ? '60px' : '100%',
          borderRadius: isExpanded ? '50%' : '0%',
        }}
        transition={{ duration: 0.5 }}
      />

      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-transparent to-black"
        animate={{ opacity: isExpanded ? 0 : 0.6 }}
        transition={{ duration: 0.3 }}
      />

      <motion.div
        className="absolute bottom-0 left-0 right-0 bg-white/30 p-6 backdrop-blur-md dark:bg-black/30"
        animate={{
          y: isExpanded ? '100%' : 0,
          opacity: isExpanded ? 0 : 1,
        }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white dark:text-white">
              {data.post.travelCity}
            </h2>
            <p className="text-sm text-gray-200 dark:text-gray-300">
              {data.post.travelNationality}
            </p>
          </div>
          <div className="flex items-center rounded-full bg-white/60 px-3 py-1 dark:bg-gray-800/60">
            <FaCalendarAlt className="mr-1 text-yellow-400" />
            <span className="font-bold text-gray-800 dark:text-white">
              {formatDate(data.post.travelStartDate)} -{' '}
              {formatDate(data.post.travelEndDate)}
            </span>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="absolute inset-0 overflow-y-auto bg-white p-6 dark:bg-gray-900"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          >
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center">
                <Avatar
                  src={data.user?.profileImage || undefined}
                  name={data.user?.nickname}
                  size="lg"
                />
                <div className="ml-3">
                  <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                    {data.user?.nickname || 'Anonymous'}
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {data.user?.nationality || 'Unknown'}
                  </p>
                </div>
              </div>
              <Chip size="sm" color="primary">
                {data.post.travelStatus}
              </Chip>
            </div>

            <div className="mb-4">
              <h4 className="mb-2 flex items-center font-semibold text-gray-800 dark:text-white">
                <FaMapMarkerAlt className="mr-2" /> Destination
              </h4>
              <p className="text-gray-600 dark:text-gray-300">
                {data.post.travelNationality} - {data.post.travelCity}
              </p>
            </div>

            <div className="mb-4">
              <h4 className="mb-2 flex items-center font-semibold text-gray-800 dark:text-white">
                <FaCalendarAlt className="mr-2" /> Travel Dates
              </h4>
              <p className="text-gray-600 dark:text-gray-300">
                {formatDate(data.post.travelStartDate)} -{' '}
                {formatDate(data.post.travelEndDate)}
              </p>
            </div>

            <div className="mb-4">
              <h4 className="mb-2 flex items-center font-semibold text-gray-800 dark:text-white">
                <FaUserFriends className="mr-2" /> Travel Style
              </h4>
              <div className="flex flex-wrap gap-2">
                {data.post.travelStyle.split(',').map((style, index) => (
                  <Chip key={index} size="sm" color="secondary">
                    {style.trim()}
                  </Chip>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <h4 className="mb-2 flex items-center font-semibold text-gray-800 dark:text-white">
                <FaUtensils className="mr-2" /> Travel Purpose
              </h4>
              <p className="text-gray-600 dark:text-gray-300">
                {data.post.travelPurpose}
              </p>
            </div>

            <div className="mb-4">
              <h4 className="mb-2 font-semibold text-gray-800 dark:text-white">
                Preferred Gender
              </h4>
              <p className="text-gray-600 dark:text-gray-300">
                {data.post.preferredGender}
              </p>
            </div>

            <Button
              size="lg"
              color="primary"
              variant="shadow"
              startContent={<MessageCircle size={20} />}
              className="mt-4 w-full"
              onClick={handleChatClick}
            >
              Chat
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default ShortFormMobileCard
