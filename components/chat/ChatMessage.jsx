const ChatMessage = ({ sender }) => {
  const isUser = sender === 'user';
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`max-w-xs ${isUser ? 'bg-blue-500 text-white' : 'bg-gray-300'} rounded-lg p-3`}
      >
        <p>채팅 메시지 내용입니다.</p>
      </div>
    </div>
  );
};

export default ChatMessage;
