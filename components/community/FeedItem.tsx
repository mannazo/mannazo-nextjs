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

const FeedItem = ({ post }) => {
  const { community, user } = post

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
      <CardFooter className="gap-3">
        <Button isIconOnly color="danger" aria-label="Like">
          <HeartIcon className="h-5 w-5" />
        </Button>
        <span>{community.likesCount} likes</span>
        <Button isIconOnly color="primary" aria-label="Comment">
          <ChatBubbleOvalLeftIcon className="h-5 w-5" />
        </Button>
        <span>{community.comments.length} comments</span>
        <Button isIconOnly color="secondary" aria-label="Share">
          <PaperAirplaneIcon className="h-5 w-5" />
        </Button>
      </CardFooter>
    </Card>
  )
}

export default FeedItem
