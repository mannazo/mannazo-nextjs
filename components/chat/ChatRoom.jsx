'use client'

import { useState, useEffect } from 'react'
import ChatHeader from './ChatHeader'
import ChatBody from './ChatBody.jsx'
import InputArea from './InputArea.jsx'
import useViewportHeight from '@/hooks/useViewportHeight'
import useChatMessages from '@/hooks/useChatMessages'
import useChatSSE from '@/hooks/useChatSSE'
import { useChatStore } from '@/store/chatStore'

const ChatRoom = ({ chatRoomId }) => {
  const { viewportHeight, containerRef } = useViewportHeight()
  const { messages, sendMessage } = useChatMessages()
  const sseMessages = useChatSSE(chatRoomId)
  const [allMessages, setAllMessages] = useState([])
  const currentChatUsers = useChatStore((state) => state.currentChatUsers) // 추가

  useEffect(() => {
    setAllMessages([...messages, ...sseMessages])
  }, [messages, sseMessages])

  const handleSendMessage = async (message) => {
    try {
      // currentChatUsers가 null이 아니라고 가정
      const [senderId, receiverId] = currentChatUsers || ['', '']
      await sendMessage(senderId, chatRoomId, message)
    } catch (error) {
      console.error('Error sending message:', error)
    }
  }

  // currentChatUsers가 null인 경우 처리...
  if (!currentChatUsers) {
    return <div>Loading...</div>
  }

  const [currentUserId, otherUserId] = currentChatUsers

  return (
    <div
      ref={containerRef}
      className="mx-auto flex max-w-4xl flex-col rounded-lg bg-gray-100 p-4 shadow-md"
      style={{ height: `${viewportHeight}px` }}
    >
      <ChatHeader className="flex-shrink-0" otherUserId={otherUserId} />
      <div className="flex-grow overflow-y-auto scrollbar-hide">
        <div>
          <ChatBody
            chatRoomId={chatRoomId}
            messages={allMessages}
            currentUserId={currentUserId}
          />
        </div>
      </div>
      <InputArea className="flex-shrink-0" onSendMessage={handleSendMessage} />
    </div>
  )
}

export default ChatRoom
