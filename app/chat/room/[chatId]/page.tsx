import ChatRoomList from '@/components/chat/ChatRoomList'
import ChatRoom from '@/components/chat/ChatRoom'

export default function ChatRoomPage({
  params,
}: {
  params: { chatId: string }
}) {
  return (
    <>
      <ChatRoom />
    </>
  )
}
