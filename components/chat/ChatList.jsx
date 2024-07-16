'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import ChatListItem from '@/components/chat/ChatListItem.jsx'
import { getChatRoomList } from '@/services/api'

const ChatList = () => {
  const { data: session, status } = useSession()
  const [rooms, setRooms] = useState([])

  useEffect(() => {
    const fetchRooms = async () => {
      if (
        status === 'authenticated' &&
        session?.user?.additionalInfo?.serverUserId
      ) {
        const senderId = session.user.additionalInfo.serverUserId
        const chatRooms = await getChatRoomList(senderId)
        setRooms(chatRooms)
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

  console.log(rooms)

  return (
    <div className="mb-4 h-full overflow-y-auto rounded-lg bg-white p-4 shadow-inner scrollbar-hide">
      {rooms && rooms.data && rooms.data.length > 0 ? (
        rooms.data.map((room) => (
          <ChatListItem
            key={room.chatRoomId}
            room={room}
            currentUserId={currentUserId}
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
