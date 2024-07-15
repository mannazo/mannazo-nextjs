'use client'

import { useState, useEffect, useRef } from 'react'
import ChatHeader from './ChatHeader'
import ChatBody from './ChatBody.jsx'
import InputArea from './InputArea.jsx'
import useViewportHeight from '@/hooks/useViewportHeight'
import useScrollToBottom from '@/hooks/useScrollToBottom'
import useChatMessages from '@/hooks/useChatMessages'
import useChatSSE from '@/hooks/useChatSSE'

const ChatRoom = ({ chatRoomId }) => {
  chatRoomId = '1' // 리스트에서 선택한 챗룸으로 보냄
  const { viewportHeight, containerRef } = useViewportHeight()
  const { messages, sendMessage } = useChatMessages()
  const sseMessages = useChatSSE(chatRoomId)

  const [allMessages, setAllMessages] = useState([])
  const [isInitialLoad, setIsInitialLoad] = useState(true)
  const [chatBodyContainerRef, chatBodyContentRef, scrollToBottom] =
    useScrollToBottom({ duration: 1000 })

  const prevMessagesLengthRef = useRef(0)

  useEffect(() => {
    setAllMessages([...messages, ...sseMessages])
  }, [messages, sseMessages])

  useEffect(() => {
    if (isInitialLoad && allMessages.length > 0) {
      scrollToBottom()
      setIsInitialLoad(false)
    } else if (allMessages.length > prevMessagesLengthRef.current) {
      const containerElement = chatBodyContainerRef.current
      const isNearBottom =
        containerElement &&
        containerElement.scrollHeight -
          containerElement.scrollTop -
          containerElement.clientHeight <
          100

      if (isNearBottom) {
        scrollToBottom()
      }
    }
    prevMessagesLengthRef.current = allMessages.length
  }, [allMessages, isInitialLoad, scrollToBottom])

  const handleSendMessage = async (message) => {
    try {
      await sendMessage('jun', '1', message)
      scrollToBottom()
    } catch (error) {
      // TODO: 에러 처리
    }
  }

  return (
    <div
      ref={containerRef}
      className="mx-auto flex max-w-4xl flex-col rounded-lg bg-gray-100 p-4 shadow-md"
      style={{ height: `${viewportHeight}px` }}
    >
      <ChatHeader className="flex-shrink-0" />
      <div
        className="flex-grow overflow-y-auto scrollbar-hide"
        ref={chatBodyContainerRef}
      >
        <div ref={chatBodyContentRef}>
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
