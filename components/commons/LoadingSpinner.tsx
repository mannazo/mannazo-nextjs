import React from 'react'
import { Spinner } from '@nextui-org/react'

export default function LoadingSpinner() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="flex flex-col items-center rounded-lg bg-white p-8 shadow-xl">
        <Spinner
          size="lg"
          color="secondary"
          classNames={{
            circle1: 'border-t-purple-500',
            // circle2: 'border-t-pink-500',
          }}
        />
        <p className="mt-4 text-lg font-semibold text-gray-700">Loading</p>
        <p></p>
      </div>
    </div>
  )
}
