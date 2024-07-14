import ChatListItem from '@/components/chat/ChatListItem.jsx';

const ChatList = () => {
  return (
    <div className='h-96 overflow-y-auto rounded-lg bg-white p-4 shadow-inner'>
      <ChatListItem />
      <ChatListItem />
      <ChatListItem />
      <ChatListItem />
      <ChatListItem />
      <ChatListItem />
      <ChatListItem />
      {/* Add more ChatListItem components as needed */}
    </div>
  );
};

export default ChatList;
