import { create } from 'zustand'

// 사용자 타입 정의
interface User {
  userId: string
  name: string
  nickname: string
  nationality: string
  profileImage: string | null
  city: string
}

// 채팅방 타입 정의
interface ChatRoom {
  chatRoomId: string
  lastMessage: string | null
  lastMessageTime: string | null
  createdAt: string
}

// 전체 채팅방 정보 타입 정의 (API 응답 형태)
interface FullChatRoom extends ChatRoom {
  user1: User
  user2: User
}

// 스토어 상태 타입 정의
interface ChatState {
  rooms: FullChatRoom[]
  currentRoom: ChatRoom | null
  currentUser: User | null
  setCurrentUser: (currentUser: User) => void
  receiver: User | null
  setRooms: (rooms: FullChatRoom[]) => void
  setCurrentRoom: (room: ChatRoom) => void
  setReceiver: (receiver: User) => void
  updateRoom: (updatedRoom: FullChatRoom) => void
}

const useChatStore = create<ChatState>((set) => ({
  rooms: [],
  currentRoom: null,
  receiver: null,
  currentUser: null,
  setRooms: (rooms) => set({ rooms }),
  setCurrentRoom: (room) => set({ currentRoom: room }),
  setCurrentUser: (currentUser) => set({ currentUser }),
  setReceiver: (receiver) => set({ receiver }),
  updateRoom: (updatedRoom) =>
    set((state) => ({
      rooms: state.rooms.map((room) =>
        room.chatRoomId === updatedRoom.chatRoomId ? updatedRoom : room
      ),
      currentRoom:
        state.currentRoom?.chatRoomId === updatedRoom.chatRoomId
          ? {
              chatRoomId: updatedRoom.chatRoomId,
              lastMessage: updatedRoom.lastMessage,
              lastMessageTime: updatedRoom.lastMessageTime,
              createdAt: updatedRoom.createdAt,
            }
          : state.currentRoom,
    })),
}))

export default useChatStore
