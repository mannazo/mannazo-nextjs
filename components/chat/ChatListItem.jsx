import Link from 'next/link'

const ChatListItem = () => {
  return (
    <Link href="/chat/room/1">
      <div className="flex cursor-pointer items-center border-b border-gray-200 p-3 hover:bg-gray-100">
        <div className="mr-3 h-12 w-12 rounded-full bg-gray-300"></div>
        <div className="flex-grow">
          <h3 className="text-lg font-semibold">채팅방 이름</h3>
          <p className="text-sm text-gray-600">마지막 메시지 내용...</p>
        </div>
        <div className="text-xs text-gray-500">
          <p>오후 2:30</p>
          <div className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-white">
            3
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ChatListItem
