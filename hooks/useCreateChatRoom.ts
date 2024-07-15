'use client'

import { useMutation } from '@tanstack/react-query'
import { createChatRoom } from '@/services/api'
import { useRouter } from 'next/navigation'
import { AxiosResponse } from 'axios'

export const useCreateChatRoom = () => {
  const router = useRouter()

  return useMutation({
    mutationFn: ({
      userId1,
      userId2,
    }: {
      userId1: string
      userId2: string
    }) => {
      const [sortedUserId1, sortedUserId2] = [userId1, userId2].sort()
      return createChatRoom(sortedUserId1, sortedUserId2)
    },
    onSuccess: (response: AxiosResponse) => {
      const chatRoomId = response.data.chatRoomId
      if (chatRoomId) {
        router.push(`/chat/room/${chatRoomId}`)
      } else {
        console.error('채팅방 ID를 받지 못했습니다.')
      }
    },
    onError: (error) => {
      console.error('채팅방 생성 중 오류 발생:', error)
      // 여기에 에러 메시지를 표시하는 로직을 추가할 수 있습니다
    },
  })
}
