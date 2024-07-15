'use client'

import { useMutation } from '@tanstack/react-query'
import { createChatRoom } from '@/services/api'
import { useRouter } from 'next/navigation'
import { AxiosResponse } from 'axios'
import { useChatStore } from '@/store/chatStore'

export const useCreateChatRoom = () => {
  const router = useRouter()
  const setCurrentChatUsers = useChatStore((state) => state.setCurrentChatUsers)

  return useMutation({
    mutationFn: ({
      senderId,
      postUserId,
    }: {
      senderId: string
      postUserId: string
    }) => {
      const [sortedUserId1, sortedUserId2] = [senderId, postUserId].sort()
      return createChatRoom(sortedUserId1, sortedUserId2)
    },
    onSuccess: (response: AxiosResponse, variables) => {
      const chatRoomId = response.data.chatRoomId
      if (chatRoomId) {
        setCurrentChatUsers([variables.senderId, variables.postUserId])
        router.push(`/chat/room/${chatRoomId}`)
      } else {
        console.error('채팅방 ID를 받지 못했습니다.')
      }
    },
    onError: (error) => {
      console.error('채팅방 생성 중 오류 발생:', error)
    },
  })
}
