'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Avatar, Button } from '@nextui-org/react'
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
      className="w-full h-screen relative overflow-hidden"
      onClick={toggleExpand}
    >
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          // backgroundImage: `url(https://source.unsplash.com/random/800x600?travel)`,
          backgroundImage: `url(https://picsum.photos/800/600)`,
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
        className="absolute top-0 left-0 right-0 p-6"
        animate={{
          y: isExpanded ? '100%' : 0,
          opacity: isExpanded ? 0 : 1,
        }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-white">{traveler.name}</h2>
            <p className="text-sm text-white">{traveler.nationality}</p>
          </div>
          <div className="flex items-center bg-white bg-opacity-20 rounded-full px-3 py-1">
            <FaStar className="text-yellow-400 mr-1" />
            <span className="font-bold text-white">
              {traveler.averageRating.toFixed(1)}
            </span>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="absolute inset-0 bg-white p-6 overflow-y-auto"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          >
            <div className="mb-4 flex items-center">
              <Avatar
                src={`https://i.pravatar.cc/150?u=${traveler.id}`}
                size="lg"
              />
              <div className="ml-3">
                <h2 className="text-xl font-bold">{traveler.name}</h2>
                <p className="text-sm text-gray-500">{traveler.nationality}</p>
              </div>
            </div>

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
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default ShortFormMobileCard
