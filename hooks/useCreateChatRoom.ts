'use client'

import { useMutation } from '@tanstack/react-query'
import { createChatRoom } from '@/services/api'
import { useRouter } from 'next/navigation'
import { AxiosResponse } from 'axios'
import { useSession } from 'next-auth/react'
import useChatStore from '@/store/chatStore'

export const useCreateChatRoom = () => {
  const router = useRouter()
  const { data: session, status } = useSession()
  const { setReceiver, setCurrentUser } = useChatStore()

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
      console.log('response is', response.data)
      if (status === 'unauthenticated') {
        router.push('/login')
      }

      if (
        response.data.user1.userId === session.user.additionalInfo.serverUserId
      ) {
        setReceiver(response.data.user2)
        setCurrentUser(response.data.user1)
      } else {
        setReceiver(response.data.user1)
        setCurrentUser(response.data.user2)
      }

      const chatRoomId = response.data.chatRoomId
      if (chatRoomId) {
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
