import { create } from 'zustand'

type ChatStore = {
  currentChatUsers: [string, string] | null
  setCurrentChatUsers: (users: [string, string]) => void
}

export const useChatStore = create<ChatStore>((set) => ({
  currentChatUsers: null,
  setCurrentChatUsers: (users) => set({ currentChatUsers: users }),
}))
