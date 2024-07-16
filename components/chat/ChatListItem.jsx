import Link from 'next/link'
import Image from 'next/image'

const ChatListItem = ({ room, currentUserId }) => {
  // 현재 사용자가 아닌 상대방의 정보를 가져옵니다
  const otherUser =
    room.user1.userId === currentUserId ? room.user2 : room.user1

  return (
    <Link href={`/chat/room/${room.chatRoomId}`}>
      <div className="flex cursor-pointer items-center border-b border-gray-200 p-3 hover:bg-gray-100">
        <div className="mr-3 h-12 w-12 overflow-hidden rounded-full bg-gray-300">
          {otherUser.profileImage ? (
            <Image
              src={otherUser.profileImage}
              alt={otherUser.name}
              width={48}
              height={48}
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-white">
              {otherUser.name[0]}
            </div>
          )}
        </div>
        <div className="flex-grow">
          <h3 className="text-lg font-semibold">{otherUser.nickname}</h3>
          <p>{otherUser.nationality}</p>
          <p>{otherUser.city}</p>
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
          {/* 여기에 읽지 않은 메시지 수를 표시할 수 있습니다. 현재 데이터에는 이 정보가 없으므로 주석 처리합니다. */}
          {/* <div className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-white">
            1
          </div> */}
        </div>
      </div>
    </Link>
  )
}

export default ChatListItem
