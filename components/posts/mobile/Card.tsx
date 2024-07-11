'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Avatar, Button } from '@nextui-org/react'
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaUserFriends,
  FaUtensils,
} from 'react-icons/fa'

const ShortFormMobileCard = ({ travelerPost }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  // 랜덤 이미지 URL 생성 함수
  const getRandomImage = () => {
    // 랜덤 ID를 생성하여 매번 다른 이미지가 로드되도록 함
    const randomId = Math.floor(Math.random() * 1000)
    return `https://picsum.photos/seed/${randomId}/800/600`
  }

  const backgroundImageUrl =
    travelerPost.imageUrls && travelerPost.imageUrls.length > 0
      ? travelerPost.imageUrls[0]
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
        className="absolute left-0 right-0 top-0 p-6"
        animate={{
          y: isExpanded ? '100%' : 0,
          opacity: isExpanded ? 0 : 1,
        }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">
              {travelerPost.travelCity}
            </h2>
            <p className="text-sm text-white">
              {travelerPost.travelNationality}
            </p>
          </div>
          <div className="flex items-center rounded-full bg-white bg-opacity-20 px-3 py-1">
            <FaCalendarAlt className="mr-1 text-yellow-400" />
            <span className="font-bold text-white">
              {formatDate(travelerPost.travelStartDate)} -{' '}
              {formatDate(travelerPost.travelEndDate)}
            </span>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="absolute inset-0 overflow-y-auto bg-white p-6"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          >
            <div className="mb-4 flex items-center">
              <Avatar
                // src={
                //   travelerPost.imageUrls[1] ||
                //   `https://i.pravatar.cc/150?u=${travelerPost.userId}`
                // }
                src={
                  'https://cdn3.iconfinder.com/data/icons/random-icon-set/512/user-512.png'
                }
                size="lg"
              />
              <div className="ml-3">
                <h2 className="text-xl font-bold">{travelerPost.travelCity}</h2>
                <p className="text-sm text-gray-500">
                  {travelerPost.travelNationality}
                </p>
              </div>
            </div>

            <div className="mb-4">
              <h4 className="mb-2 flex items-center font-semibold">
                <FaMapMarkerAlt className="mr-2" /> Destination
              </h4>
              <p className="text-gray-600">
                {travelerPost.travelNationality} - {travelerPost.travelCity}
              </p>
            </div>

            <div className="mb-4">
              <h4 className="mb-2 flex items-center font-semibold">
                <FaCalendarAlt className="mr-2" /> Travel Dates
              </h4>
              <p className="text-gray-600">
                {formatDate(travelerPost.travelStartDate)} -{' '}
                {formatDate(travelerPost.travelEndDate)}
              </p>
            </div>

            <div className="mb-4">
              <h4 className="mb-2 flex items-center font-semibold">
                <FaUserFriends className="mr-2" /> Travel Style
              </h4>
              <div className="flex flex-wrap gap-2">
                {travelerPost.travelStyle.split(',').map((style, index) => (
                  <span
                    key={index}
                    className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800"
                  >
                    {style.trim()}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <h4 className="mb-2 flex items-center font-semibold">
                <FaUtensils className="mr-2" /> Travel Purpose
              </h4>
              <div className="flex flex-wrap gap-2">
                {travelerPost.travelPurpose.split(',').map((purpose, index) => (
                  <span
                    key={index}
                    className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-800"
                  >
                    {purpose.trim()}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <h4 className="mb-2 font-semibold">Preferred Gender</h4>
              <p className="text-gray-600">{travelerPost.preferredGender}</p>
            </div>

            <div className="mb-4">
              <h4 className="mb-2 font-semibold">Travel Status</h4>
              <p className="text-gray-600">{travelerPost.travelStatus}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default ShortFormMobileCard
