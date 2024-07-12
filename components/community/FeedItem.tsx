// components/FeedItem.jsx
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
  return (
    <Card className="mx-auto my-4 max-w-[600px]">
      <CardHeader className="justify-between">
        <div className="flex gap-5">
          <Avatar isBordered radius="full" size="md" src={post.authorImage} />
          <div className="flex flex-col items-start justify-center gap-1">
            <h4 className="text-small font-semibold leading-none text-default-600">
              {post.authorName}
            </h4>
            <h5 className="text-small tracking-tight text-default-400">
              {post.location}
            </h5>
          </div>
        </div>
        <Button
          className={`bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg`}
          radius="full"
          size="sm"
        >
          팔로우
        </Button>
      </CardHeader>
      <CardBody className="px-3 py-0">
        <p className="text-small text-default-400">{post.content}</p>
        {post.image && (
          <Image
            alt="Post image"
            className="mt-3 rounded-xl object-cover"
            src={post.image}
            height={300}
          />
        )}
      </CardBody>
      <CardFooter className="gap-3">
        <Button isIconOnly color="danger" aria-label="Like">
          <HeartIcon className="h-5 w-5" />
        </Button>
        <Button isIconOnly color="primary" aria-label="Comment">
          <ChatBubbleOvalLeftIcon className="h-5 w-5" />
        </Button>
        <Button isIconOnly color="secondary" aria-label="Share">
          <PaperAirplaneIcon className="h-5 w-5" />
        </Button>
      </CardFooter>
    </Card>
  )
}

export default FeedItem
