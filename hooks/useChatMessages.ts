// hooks/useChatMessages.js
import { useState, useCallback } from 'react'
import { sendChatMessage } from '@/services/api'

const useChatMessages = (initialMessages = []) => {
  const [messages, setMessages] = useState(initialMessages)

  const sendMessage = useCallback(async (senderId, roomId, message) => {
    try {
      const response = await sendChatMessage(senderId, roomId, message)

      setMessages((prevMessages) => [...prevMessages, response.data])
      return response.data
    } catch (error) {
      console.error('Error sending message:', error)
      throw error
    }
  }, [])

  return { messages, sendMessage }
}

export default useChatMessages
