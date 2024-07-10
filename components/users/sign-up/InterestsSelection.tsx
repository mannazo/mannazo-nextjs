'use client'

import React, { useState } from 'react'
import { INTERESTS } from '@/constants/input-values'

export default function InterestsSelection() {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    )
  }

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">Select Your Interests</h2>
      <div className="flex flex-wrap gap-2">
        {INTERESTS.map((interest) => (
          <button
            key={interest}
            onClick={() => toggleInterest(interest)}
            className={`px-3 py-1 rounded-full text-sm font-semibold transition-colors duration-200 ${
              selectedInterests.includes(interest)
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {interest}
          </button>
        ))}
      </div>
      <div className="mt-4">
        <p className="font-semibold">Selected Interests:</p>
        <p>{selectedInterests.join(', ')}</p>
      </div>
    </div>
  )
}
