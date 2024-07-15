'use client'

import { useState, useEffect } from 'react'
import ChatHeader from './ChatHeader'
import ChatBody from './ChatBody.jsx'
import InputArea from './InputArea.jsx'
import useViewportHeight from '@/hooks/useViewportHeight'
import useChatMessages from '@/hooks/useChatMessages'
import useChatSSE from '@/hooks/useChatSSE'

//센더 아이디도 받아서 보내주자
const ChatRoom = ({ chatRoomId, senderId }) => {
  const { viewportHeight, containerRef } = useViewportHeight()
  const { messages, sendMessage } = useChatMessages()
  const sseMessages = useChatSSE(chatRoomId)
  const [allMessages, setAllMessages] = useState([])

  useEffect(() => {
    setAllMessages([...messages, ...sseMessages])
  }, [messages, sseMessages])

  const handleSendMessage = async (message) => {
    try {
      await sendMessage('jun', '1', message)
    } catch (error) {
      console.error('Error sending message:', error)
    }
  }

  return (
    <div
      ref={containerRef}
      className="mx-auto flex max-w-4xl flex-col rounded-lg bg-gray-100 p-4 shadow-md"
      style={{ height: `${viewportHeight}px` }}
    >
      <ChatHeader className="flex-shrink-0" />
      <div className="flex-grow overflow-y-auto scrollbar-hide">
        <div>
          <ChatBody
            chatRoomId={'1'}
            messages={allMessages}
            currentUserId="jun"
          />
        </div>
      </div>
      <InputArea className="flex-shrink-0" onSendMessage={handleSendMessage} />
    </div>
  )
}

export default ChatRoom
