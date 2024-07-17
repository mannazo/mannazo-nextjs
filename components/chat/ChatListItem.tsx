import Link from 'next/link'
import Image from 'next/image'
import useChatStore from '@/store/chatStore'

const ChatListItem = ({ room, currentUserId }) => {
  // zustand 전역상태 저장 사용
  const { setCurrentRoom, setReceiver } = useChatStore()

  // 상대방 정보를 reciever에 저장
  const receiver = room.user1.userId === currentUserId ? room.user2 : room.user1

  // 링크 들어가면 현재 room, reciever (대화 상대방) 정보를 전역상태로 저장.
  const handleClick = () => {
    setCurrentRoom(room)
    setReceiver(receiver)
  }

  return (
    <Link href={`/chat/room/${room.chatRoomId}`} onClick={handleClick}>
      <div className="flex cursor-pointer items-center border-b border-gray-200 p-3 hover:bg-gray-100">
        <div className="mr-3 h-12 w-12 overflow-hidden rounded-full bg-gray-300">
          {receiver.profileImage ? (
            <Image
              src={receiver.profileImage}
              alt={receiver.name}
              width={48}
              height={48}
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-white">
              {receiver.name[0]}
            </div>
          )}
        </div>
        <div className="flex-grow">
          <h3 className="text-lg font-semibold">{receiver.nickname}</h3>
          <p>{receiver.nationality}</p>
          <p>{receiver.city}</p>
          <p className="text-sm text-gray-600">
            {room.lastMessage || 'No messages yet'}
          </p>
        </div>
        <div className="text-xs text-gray-500">
          <p>
            {room.lastMessageTime
              ? new Date(room.lastMessageTime).toLocaleString()
              : 'No messages'}
          </p>
        </div>
      </div>
    </Link>
  )
}

export default ChatListItem
