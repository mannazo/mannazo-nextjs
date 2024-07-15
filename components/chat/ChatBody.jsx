const ChatBody = () => {
  return (
    <div className="mb-4 h-full overflow-y-auto rounded-lg bg-white p-4 shadow-inner scrollbar-hide">
      <ChatMessage sender="user" />
      <ChatMessage sender="other" />
      <ChatMessage sender="other" />
      <ChatMessage sender="other" />
      <ChatMessage sender="user" />
      <ChatMessage sender="user" />
      <ChatMessage sender="other" />
      <ChatMessage sender="other" />
      <ChatMessage sender="other" />
      <ChatMessage sender="user" />
      <ChatMessage sender="user" />
      <ChatMessage sender="user" />
    </div>
  )
}

const ChatMessage = ({ sender }) => {
  const isUser = sender === 'user'
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`max-w-xs ${isUser ? 'bg-blue-500 text-white' : 'bg-gray-300'} rounded-lg p-3`}
      >
        <p>채팅 메시지 내용입니다.</p>
      </div>
    </div>
  )
}

export default ChatBody
