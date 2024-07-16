// hooks/useSSE.js
import { useState, useEffect } from 'react'

function useChatSSE(chatRoomId) {
  const [messages, setMessages] = useState([])

  useEffect(() => {
    const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL
    const eventSource = new EventSource(
      `${serverUrl}/chat/roomId/${chatRoomId}`
    )

    eventSource.onmessage = (event) => {
      const newMessage = JSON.parse(event.data)
      setMessages((prevMessages) => [...prevMessages, newMessage])
    }

    eventSource.onerror = (error) => {
      console.error('EventSource failed:', error)
      eventSource.close()
    }

    return () => {
      eventSource.close()
    }
  }, [chatRoomId])

  return messages
}

export default useChatSSE
