import SearchBar from '@/components/chat/SearchBar.jsx'
import ChatList from '@/components/chat/ChatList.jsx'

const ChatRoomList = () => {
  return (
    <div className="mx-auto max-w-4xl rounded-lg bg-gray-100 p-4 shadow-md">
      <SearchBar />
      <ChatList />
    </div>
  )
}

export default ChatRoomList
