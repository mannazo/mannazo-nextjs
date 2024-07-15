import { useEffect, useRef, useState } from 'react'
import ChatMessage from '@/components/chat/ChatMessage'

const ChatBody = ({ messages, currentUserId }) => {
  const containerRef = useRef(null)
  const messagesEndRef = useRef(null)
  const [prevScrollHeight, setPrevScrollHeight] = useState(0)
  const [prevScrollTop, setPrevScrollTop] = useState(0)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    if (containerRef.current) {
      const { scrollHeight, scrollTop, clientHeight } = containerRef.current
      const isScrolledToBottom = scrollTop + clientHeight === scrollHeight

      if (isScrolledToBottom) {
        scrollToBottom()
      } else {
        // 새 메시지가 추가되었을 때 이전 스크롤 위치 유지
        const newScrollHeight = containerRef.current.scrollHeight
        const heightDifference = newScrollHeight - prevScrollHeight
        containerRef.current.scrollTop = prevScrollTop + heightDifference
      }

      // 현재 스크롤 높이와 위치 저장
      setPrevScrollHeight(scrollHeight)
      setPrevScrollTop(scrollTop)
    }
  }, [messages])

  return (
    <div
      ref={containerRef}
      className="mb-4 h-full overflow-y-auto rounded-lg bg-white p-4 shadow-inner scrollbar-hide"
    >
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
