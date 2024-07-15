'use client'

import { useState, useEffect, useRef } from 'react'
import ChatHeader from './ChatHeader'
import ChatBody from './ChatBody.jsx'
import InputArea from './InputArea.jsx'

const ChatRoom = () => {
  const [viewportHeight, setViewportHeight] = useState(0)
  const containerRef = useRef(null)

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const windowHeight = window.innerHeight
        const containerTop = containerRef.current.getBoundingClientRect().top
        const newHeight = windowHeight - containerTop
        setViewportHeight(newHeight)
      }
    }

    handleResize() // 초기 높이 설정

    window.addEventListener('resize', handleResize)
    window.addEventListener('scroll', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('scroll', handleResize)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="mx-auto flex max-w-4xl flex-col rounded-lg bg-gray-100 p-4 shadow-md"
      style={{ height: `${viewportHeight}px` }}
    >
      <ChatHeader className="flex-shrink-0" />
      <div className="flex-grow overflow-y-auto">
        <ChatBody />
      </div>
      <InputArea className="flex-shrink-0" />
    </div>
  )
}

export default ChatRoom
