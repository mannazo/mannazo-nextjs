'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Avatar } from '@nextui-org/react'
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaUserFriends,
  FaUtensils,
} from 'react-icons/fa'

interface ShortFormMobileCardProps {
  traveler: {
    post: any
    user: any
  }
}

const ShortFormMobileCard: React.FC<ShortFormMobileCardProps> = ({
  traveler,
}) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  const getRandomImage = () => {
    const randomId = Math.floor(Math.random() * 1000)
    return `https://picsum.photos/seed/${randomId}/800/600`
  }

  const backgroundImageUrl =
    traveler.post.imageUrls && traveler.post.imageUrls.length > 0
      ? traveler.post.imageUrls[0]
      : getRandomImage()

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
              {traveler.post.travelCity}
            </h2>
            <p className="text-sm text-gray-200 dark:text-gray-300">
              {traveler.post.travelNationality}
            </p>
          </div>
          <div className="flex items-center rounded-full bg-white/60 px-3 py-1 dark:bg-gray-800/60">
            <FaCalendarAlt className="mr-1 text-yellow-400" />
            <span className="font-bold text-gray-800 dark:text-white">
              {formatDate(traveler.post.travelStartDate)} -{' '}
              {formatDate(traveler.post.travelEndDate)}
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
            <div className="mb-4 flex items-center">
              <Avatar
                src={
                  traveler.user?.profileImage ||
                  'https://cdn3.iconfinder.com/data/icons/random-icon-set/512/user-512.png'
                }
                size="lg"
              />
              <div className="ml-3">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                  {traveler.user?.nickname || 'Anonymous'}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {traveler.user?.nationality || 'Unknown'}
                </p>
              </div>
            </div>

            <div className="mb-4">
              <h4 className="mb-2 flex items-center font-semibold text-gray-800 dark:text-white">
                <FaMapMarkerAlt className="mr-2" /> Destination
              </h4>
              <p className="text-gray-600 dark:text-gray-300">
                {traveler.post.travelNationality} - {traveler.post.travelCity}
              </p>
            </div>

            <div className="mb-4">
              <h4 className="mb-2 flex items-center font-semibold text-gray-800 dark:text-white">
                <FaCalendarAlt className="mr-2" /> Travel Dates
              </h4>
              <p className="text-gray-600 dark:text-gray-300">
                {formatDate(traveler.post.travelStartDate)} -{' '}
                {formatDate(traveler.post.travelEndDate)}
              </p>
            </div>

            <div className="mb-4">
              <h4 className="mb-2 flex items-center font-semibold text-gray-800 dark:text-white">
                <FaUserFriends className="mr-2" /> Travel Style
              </h4>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800 dark:bg-blue-900 dark:text-blue-100">
                  {traveler.post.travelStyle}
                </span>
              </div>
            </div>

            <div className="mb-4">
              <h4 className="mb-2 flex items-center font-semibold text-gray-800 dark:text-white">
                <FaUtensils className="mr-2" /> Travel Purpose
              </h4>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-800 dark:bg-green-900 dark:text-green-100">
                  {traveler.post.travelPurpose}
                </span>
              </div>
            </div>

            <div className="mb-4">
              <h4 className="mb-2 font-semibold text-gray-800 dark:text-white">
                Preferred Gender
              </h4>
              <p className="text-gray-600 dark:text-gray-300">
                {traveler.post.preferredGender}
              </p>
            </div>

            <div className="mb-4">
              <h4 className="mb-2 font-semibold text-gray-800 dark:text-white">
                Travel Status
              </h4>
              <p className="text-gray-600 dark:text-gray-300">
                {traveler.post.travelStatus}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default ShortFormMobileCard
