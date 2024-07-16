'use client'

import ChatMessage from '@/components/chat/ChatMessage'
import useChatSSE from '@/hooks/useChatSSE'
import { useSession } from 'next-auth/react'

function ChatComponent({ chatRoomId }) {
  const messages = useChatSSE(chatRoomId)
  const { data: session } = useSession()

  return (
    <div className="mb-4 h-full overflow-y-auto rounded-lg bg-white p-4 shadow-inner scrollbar-hide">
      {messages.map((message) => (
        <ChatMessage
          message={message}
          currentUserId={'jun'} // currentUserId={session.user.additionalInfo.serverUserId}
        />
      ))}
    </div>
  )
}

export default ChatComponent
