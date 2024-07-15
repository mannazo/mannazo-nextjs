import { useEffect, useRef } from 'react'
import ChatMessage from '@/components/chat/ChatMessage'

const ChatBody = ({ messages, currentUserId }) => {
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  return (
    <div className="mb-4 h-full overflow-y-auto rounded-lg bg-white p-4 shadow-inner scrollbar-hide">
      {messages.map((message) => (
        <ChatMessage
          key={message.id}
          message={message}
          currentUserId={currentUserId}
        />
      ))}
      <div ref={messagesEndRef} />
    </div>
  )
}

export default ChatBody
