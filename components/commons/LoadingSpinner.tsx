'use client'
import React from 'react'
import { Spinner } from '@nextui-org/react'
import { useState, useEffect } from 'react'

export default function LoadingSpinner() {
  const [dots, setDots] = useState('')

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? '' : prev + '.'))
    }, 500)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="rounded-lg bg-white p-8 shadow-xl">
        <Spinner
          size="lg"
          color="secondary"
          classNames={{
            circle1: 'border-t-purple-500',
            // circle2: 'border-t-pink-500',
          }}
        />
        <p className="mt-4 text-lg font-semibold text-gray-700">
          Loading
          <span className="inline-block w-8 text-left">{dots}</span>
        </p>
      </div>
    </div>
  )
}
