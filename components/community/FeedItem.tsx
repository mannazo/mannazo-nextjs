'use client'

import React from 'react'
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Avatar,
  Button,
  Image,
} from '@nextui-org/react'
import {
  HeartIcon,
  ChatBubbleOvalLeftIcon,
  PaperAirplaneIcon,
} from '@heroicons/react/24/outline'
import { useCreateChatRoom } from '@/hooks/useCreateChatRoom'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const FeedItem = ({ post }) => {
  const router = useRouter()
  const { community, user } = post
  const { mutate } = useCreateChatRoom()
  const { data: session } = useSession()

  // 버튼 클릭에 대한 핸들러
  const handleClick = () => {
    if (session) {
      const senderId = session.user.additionalInfo.serverUserId
      const postUserId = post.user.userId

      // 로그인된 사용자를 위한 로직
      // 1. 글올린사람 + 채팅요청한사람 두개 아이디로 하나의 챗룸을 만든다. : useCreateChatRoom 훅을 만들어두었음.
      // 2. 해당 챗룸으로 사용자를 이동시킨다. (navigation)

      // success/loading/fail/error 에 대한 처리는 mutate에 위임한다. (tanstack-query)
      mutate({ senderId, postUserId })
    } else {
      //로그인 안된 경우 /login 으로 보냄
      router.push('/login')
    }
  }

  return (
    <Card className="mx-auto my-4 w-full max-w-[600px]">
      <CardHeader className="justify-between">
        <div className="flex gap-5">
          <Avatar isBordered radius="full" size="md" src={user?.profileImage} />
          <div className="flex flex-col items-start justify-center gap-1">
            <h4 className="text-small font-semibold leading-none text-default-600">
              {user?.nickname || 'Anonymous'}
            </h4>
            <h5 className="text-small tracking-tight text-default-400">
              {user?.city || 'Unknown Location'}
            </h5>
          </div>
        </div>
        <Button
          className={`bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg`}
          radius="full"
          size="sm"
          onClick={handleClick}
        >
          <ChatBubbleOvalLeftIcon className="h-5 w-5" />
        </Button>
      </CardHeader>
      <CardBody className="px-3 py-0">
        <h3 className="text-lg font-semibold">{community.title}</h3>
        <p className="text-small text-default-400">{community.description}</p>
        {community.images && community.images.length > 0 && (
          <Image
            alt="Post image"
            className="mt-3 rounded-xl object-cover"
            src={community.images[0].filePath}
            height={300}
          />
        )}
      </CardBody>
      {/*  <CardFooter className="gap-3">*/}
      {/*  <Button isIconOnly color="danger" aria-label="Like">*/}
      {/*    <HeartIcon className="h-5 w-5" />*/}
      {/*  </Button>*/}
      {/*  <span>{community.likesCount} likes</span>*/}
      {/*  <Button isIconOnly color="primary" aria-label="Comment">*/}
      {/*    <ChatBubbleOvalLeftIcon className="h-5 w-5" />*/}
      {/*  </Button>*/}
      {/*  <span>{community.comments.length} comments</span>*/}
      {/*  <Button isIconOnly color="secondary" aria-label="Share">*/}
      {/*    <PaperAirplaneIcon className="h-5 w-5" />*/}
      {/*  </Button>*/}
      {/*</CardFooter>*/}
      <CardFooter></CardFooter>
    </Card>
  )
}

export default FeedItem
