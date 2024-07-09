'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, Avatar, Button } from '@nextui-org/react'
import {
  FaStar,
  FaLanguage,
  FaMapMarkerAlt,
  FaUserFriends,
} from 'react-icons/fa'

const ShortFormMobileCard = ({ traveler }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <motion.div
      className="w-full h-screen bg-gradient-to-b from-purple-400 to-indigo-600 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(https://source.unsplash.com/random/800x600?travel)`,
        }}
        initial={{ scale: 1.2 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      />

      <motion.div
        className="absolute inset-0 bg-black bg-opacity-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: isExpanded ? 0.5 : 0 }}
        transition={{ duration: 0.3 }}
      />

      <motion.div
        className="absolute top-0 left-0 right-0 bg-white rounded-t-3xl p-6"
        initial={{ y: '100%' }}
        animate={{ y: isExpanded ? '0%' : '70%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
      >
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <Avatar
              src={`https://i.pravatar.cc/150?u=${traveler.id}`}
              size="lg"
            />
            <div className="ml-3">
              <h2 className="text-xl font-bold">{traveler.name}</h2>
              <p className="text-sm text-gray-500">{traveler.nationality}</p>
            </div>
          </div>
          <div className="flex items-center">
            <FaStar className="text-yellow-400 mr-1" />
            <span className="font-bold">
              {traveler.averageRating.toFixed(1)}
            </span>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{
            opacity: isExpanded ? 1 : 0,
            height: isExpanded ? 'auto' : 0,
          }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-gray-700 mb-4">{traveler.introduction}</p>

          <div className="mb-4">
            <h4 className="font-semibold mb-2 flex items-center">
              <FaMapMarkerAlt className="mr-2" /> Destination
            </h4>
            <p className="text-gray-600">
              {traveler.destinationCountry} - {traveler.destinationCity}
            </p>
          </div>

          <div className="mb-4">
            <h4 className="font-semibold mb-2 flex items-center">
              <FaUserFriends className="mr-2" /> Interests
            </h4>
            <div className="flex flex-wrap gap-2">
              {traveler.preferredTags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <h4 className="font-semibold mb-2 flex items-center">
              <FaLanguage className="mr-2" /> Languages
            </h4>
            <div className="flex flex-wrap gap-2">
              {traveler.languages.map((lang, index) => (
                <span
                  key={index}
                  className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full"
                >
                  {lang}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div className="flex justify-center" whileTap={{ scale: 0.95 }}>
          <Button
            color="primary"
            auto
            ghost
            onClick={toggleExpand}
            className="mt-2"
          >
            {isExpanded ? 'Show Less' : 'Show More'}
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default ShortFormMobileCard
