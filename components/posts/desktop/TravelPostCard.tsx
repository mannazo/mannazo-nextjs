'use client'

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Chip,
  Avatar,
  Button,
} from '@nextui-org/react'
import { MessageCircle } from 'lucide-react'
import Marquee from 'react-fast-marquee'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useCreateChatRoom } from '@/hooks/useCreateChatRoom'
import useChatStore from '@/store/chatStore'

interface TravelPostCardProps {
  post: {
    post: {
      postId: string
      userId: string
      travelNationality: string
      travelCity: string
      travelStartDate: string
      travelEndDate: string
      travelStatus: string
      preferredGender: string
      travelStyle: string
      travelPurpose: string
      createdAt: string
      imageUrls: string[]
    }
    user: {
      userId: string
      email: string
      name: string
      nickname: string
      nationality: string
      language: string
      profileImage: string
      introduction: string
      city: string
      authority: string
      gender: string
      mbti: string
      interests: string
      birthday: string
      lastLoginAt: string
    } | null
  }
}

const TravelPostCard: React.FC<TravelPostCardProps> = ({ post }) => {
  const { post: postData, user } = post
  const { data: session } = useSession()
  const router = useRouter()
  const { mutate } = useCreateChatRoom()

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
    <Card className="h-[600px] overflow-hidden" isPressable isFooterBlurred>
      <CardHeader className="absolute top-1 z-10 flex-col items-start">
        <div className="flex w-full items-center justify-between rounded-2xl bg-background/40 p-2 backdrop-blur-md">
          {user && (
            <div className="flex items-center rounded-full p-1">
              <Avatar
                src={user.profileImage || undefined}
                name={user.nickname}
                size="sm"
                className="mr-2"
              />
              <span className="font-medium text-white">{user.nickname}</span>
            </div>
          )}
          <Chip size="sm" color="primary" className="ml-auto">
            {postData.travelStatus}
          </Chip>
        </div>
        <div className="mt-4 rounded-r-xl bg-gradient-to-r from-red-500/60 to-secondary/60 p-2 text-white">
          <h4 className="text-xl font-bold">
            TO: {postData.travelCity}, <br />
            REGION: {postData.travelNationality}
          </h4>
        </div>
      </CardHeader>
      <CardBody className="p-0">
        <Image
          removeWrapper
          alt={`Travel to ${postData.travelCity}`}
          className="z-0 h-full w-full object-cover"
          src={postData.imageUrls[0] || '/test.jpg'}
        />
      </CardBody>
      <CardFooter className="absolute bottom-1 z-10 ml-1 flex w-[calc(100%_-_8px)] flex-col items-center justify-center overflow-hidden rounded-large border-1 border-white/20 py-3 shadow-small before:rounded-xl before:bg-white/10">
        <div className="ute bottom-0 left-0 right-0 z-20 mb-[calc(1rem+1px)] flex items-center justify-center">
          <p className="w-full cursor-context-menu rounded-2xl bg-background/40 p-4 backdrop-blur-md">
            {postData.travelPurpose}
          </p>
        </div>
        <div className="flex w-full flex-col items-center px-1 text-center">
          <h4 className="mb-2 text-xl font-bold">
            {postData.travelStartDate} - {postData.travelEndDate}
          </h4>
          <div className="mb-3 flex w-full flex-col gap-2">
            <div className="w-full overflow-hidden">
              <Marquee gradientWidth={50} speed={30} pauseOnHover={true}>
                <div className="flex gap-2">
                  {user.interests.split(',').map((style, index) => (
                    <Chip key={index} size="sm" color="default">
                      {style.trim()}
                    </Chip>
                  ))}
                </div>
              </Marquee>
            </div>
          </div>
          <div className="mb-3 flex w-full flex-col gap-2">
            <div className="w-full overflow-hidden">
              <Marquee gradientWidth={50} speed={30} pauseOnHover={true}>
                <div className="flex gap-2">
                  {postData.travelStyle.split(',').map((style, index) => (
                    <Chip key={index} size="sm" color="secondary">
                      {style.trim()}
                    </Chip>
                  ))}
                </div>
              </Marquee>
            </div>
          </div>
          <div className="my-2 h-px w-full bg-white/20"></div>
          <Button
            size="md"
            color="default"
            variant="shadow"
            startContent={<MessageCircle size={20} />}
            className="mt-2 w-full"
            onClick={handleClick}
          />
        </div>
      </CardFooter>
    </Card>
  )
}

export default TravelPostCard
