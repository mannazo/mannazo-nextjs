'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import ChatListItem from '@/components/chat/ChatListItem'
import { getChatRoomList } from '@/services/api'

const ChatList = () => {
  const { data: session, status } = useSession()
  const [rooms, setRooms] = useState([])
  const [senderId, setSenderId] = useState(null)

  useEffect(() => {
    console.log('Session status:', status)
    console.log('Session data:', session)

    const fetchRooms = async (retryCount = 0) => {
      if (
        status === 'authenticated' &&
        session?.user?.additionalInfo?.serverUserId
      ) {
        const userId = session.user.additionalInfo.serverUserId
        setSenderId(userId)
        try {
          const response = await getChatRoomList(userId)
          const chatRooms = response.data
          setRooms(chatRooms)
        } catch (error) {
          console.error('Failed to fetch chat rooms:', error)
          if (retryCount < 3) {
            // 최대 3번 재시도
            setTimeout(() => fetchRooms(retryCount + 1), 1000) // 1초 후 재시도
          } else {
            console.log('Failed to load chat rooms after multiple attempts.')
            return <div className="error-message">{error}</div>
          }
        }
      }
    }
    fetchRooms()
  }, [session, status])

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (status === 'unauthenticated') {
    return <div>Access denied</div>
  }

  return (
    <div className="mb-4 h-full overflow-y-auto rounded-lg bg-white p-4 shadow-inner scrollbar-hide">
      {rooms && rooms && rooms.length > 0 ? (
        rooms.map((room) => (
          <ChatListItem
            key={room.chatRoomId}
            room={room}
            currentUserId={senderId}
          />
        ))
      ) : (
        <div className="py-4 text-center text-gray-500">
          No chat rooms available
        </div>
      )}
    </div>
  )
}

export default ChatList
