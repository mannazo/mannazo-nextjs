import ChatRoomList from '@/components/chat/ChatRoomList'
import ChatRoom from '@/components/chat/ChatRoom'

export default function ChatRoomPage({
  params,
}: {
  params: { chatRoomId: string }
}) {
  return (
    <>
      <ChatRoom chatRoomId={params.chatRoomId} />
    </>
  )
}
