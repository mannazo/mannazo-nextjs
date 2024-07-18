'use client'

import SearchBar from '@/components/chat/SearchBar'
import ChatList from '@/components/chat/ChatList'
import useViewportHeight from '@/hooks/useViewportHeight'

const ChatRoomList = () => {
  //뷰포트 변경사항 감지해서 높이 알려주는 훅
  const { viewportHeight, containerRef } = useViewportHeight()

  return (
    <div
      ref={containerRef}
      className="mx-auto flex h-full max-w-4xl flex-col rounded-lg bg-gray-100 p-4 shadow-md dark:bg-gray-700"
      style={{ height: `${viewportHeight}px` }}
    >
      <SearchBar className="flex-shrink-0" />
      <div className="flex-grow overflow-y-auto">
        <ChatList />
      </div>
    </div>
  )
}

export default ChatRoomList
