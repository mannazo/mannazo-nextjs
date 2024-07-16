import React from 'react'
import { parseISO, format } from 'date-fns'

const ChatMessage = ({ message, currentUserId }) => {
  console.log('message:', message)
  console.log('currentUserId:', currentUserId)
  const { id, senderId, roomId, msg, createdAt } = message
  const isUser = senderId === currentUserId

  const date = parseISO(createdAt)
  const formattedTime = format(date, 'HH:mm')

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`max-w-xs ${isUser ? 'bg-blue-500 text-white' : 'bg-gray-300'} rounded-lg p-3`}
      >
        <p className="mb-1">{msg}</p>
        <p className="text-xs text-gray-500">{formattedTime}</p>
      </div>
    </div>
  )
}

export default ChatMessage
