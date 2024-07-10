'use client'

import React, { useState } from 'react'
import { INTERESTS } from '@/constants/input-values'

export default function InterestsSelection({ onChange }) {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])
  const toggleInterest = (interest: string) => {
    const newInterests = selectedInterests.includes(interest)
      ? selectedInterests.filter((i) => i !== interest)
      : [...selectedInterests, interest]
    setSelectedInterests(newInterests)
    onChange(newInterests) // 부모 컴포넌트에 변경 사항 전달
  }

  return (
    <div className="mx-auto max-w-md rounded-xl bg-white p-6 shadow-md">
      <h2 className="mb-4 text-2xl font-bold">Select Your Interests</h2>
      <div className="flex flex-wrap gap-2">
        {INTERESTS.map((interest) => (
          <button
            type="button"
            key={interest}
            onClick={() => toggleInterest(interest)}
            className={`rounded-full px-3 py-1 text-sm font-semibold transition-colors duration-200 ${
              selectedInterests.includes(interest)
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {interest}
          </button>
        ))}
      </div>
      {/*<div className="mt-4">*/}
      {/*  <p className="font-semibold">Selected Interests:</p>*/}
      {/*  <p>{selectedInterests.join(', ')}</p>*/}
      {/*</div>*/}
    </div>
  )
}
