'use client'

import { useState, useEffect, useRef } from 'react'
import ChatHeader from './ChatHeader'
import ChatBody from './ChatBody.jsx'
import InputArea from './InputArea.jsx'
import useViewportHeight from '@/hooks/useViewportHeight'

const ChatRoom = () => {
  //뷰포트 변경사항 감지해서 높이 알려주는 훅
  const { viewportHeight, containerRef } = useViewportHeight()

  return (
    <div
      ref={containerRef}
      className="mx-auto flex max-w-4xl flex-col rounded-lg bg-gray-100 p-4 shadow-md"
      style={{ height: `${viewportHeight}px` }}
    >
      <ChatHeader className="flex-shrink-0" />
      <div className="flex-grow overflow-y-auto scrollbar-hide">
        <ChatBody />
      </div>
      <InputArea className="flex-shrink-0" />
    </div>
  )
}

export default ChatRoom
