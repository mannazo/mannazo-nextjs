'use client'

import { useState, useEffect } from 'react'
import ChatHeader from './ChatHeader'
import ChatBody from './ChatBody'
import InputArea from './InputArea'
import useViewportHeight from '@/hooks/useViewportHeight'
import useChatMessages from '@/hooks/useChatMessages'
import useChatSSE from '@/hooks/useChatSSE'
import { useSession } from 'next-auth/react'

const ChatRoom = ({ chatRoomId }) => {
  const { data: session, status } = useSession()
  const { viewportHeight, containerRef } = useViewportHeight()
  const { messages, sendMessage } = useChatMessages()
  const sseMessages = useChatSSE(chatRoomId)
  const [allMessages, setAllMessages] = useState([])
  const [senderId, setSenderId] = useState(null)

  useEffect(() => {
    if (session?.user?.additionalInfo?.serverUserId) {
      setSenderId(session.user.additionalInfo.serverUserId)
    }
  }, [session])

  useEffect(() => {
    setAllMessages([...messages, ...sseMessages])
  }, [messages, sseMessages])

  if (status === 'unauthenticated') {
    return <div>unauthenticated user!</div>
  } else if (status === 'loading' || !session) {
    return <div>loading...</div>
  }

  const handleSendMessage = async (message) => {
    try {
      await sendMessage(senderId, chatRoomId, message)
    } catch (error) {
      console.error('Error sending message:', error)
    }
  }

  return (
    <div
      ref={containerRef}
      className="mx-auto flex max-w-4xl flex-col rounded-lg bg-gray-100 p-4 shadow-md dark:bg-gray-700"
      style={{ height: `${viewportHeight}px` }}
    >
      {/*chatHeader에 prop으로 대화 상대방 정보를 줘야 하나?*/}
      <ChatHeader className="flex-shrink-0" />
      <div className="flex-grow overflow-y-auto scrollbar-hide">
        <div>
          <ChatBody
            chatRoomId={chatRoomId}
            messages={allMessages}
            currentUserId={senderId}
          />
        </div>
      </div>
      <InputArea className="flex-shrink-0" onSendMessage={handleSendMessage} />
    </div>
  )
}

export default ChatRoom
