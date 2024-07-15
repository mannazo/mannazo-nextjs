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

interface TravelPostCardProps {
  post: {
    post: {
      postId: string
      travelNationality: string
      travelCity: string
      travelStartDate: string
      travelEndDate: string
      travelStatus: string
      preferredGender: string
      travelStyle: string
      travelPurpose: string
      imageUrls: string[]
    }
    user: {
      nickname: string
      profileImage: string | null
    } | null
  }
}

const TravelPostCard: React.FC<TravelPostCardProps> = ({ post }) => {
  const { post: postData, user } = post

  return (
    <Card className="h-[800px] overflow-hidden" isPressable isFooterBlurred>
      <CardHeader className="absolute top-1 z-10 flex-col items-start">
        <div className="flex w-full items-center justify-between">
          {user && (
            <div className="flex items-center rounded-full bg-background/40 p-1 backdrop-blur-md">
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
        <div className="mt-4 rounded-r-full bg-gradient-to-r from-primary to-secondary p-2 text-white">
          <h4 className="text-xl font-bold">
            {postData.travelCity}, {postData.travelNationality}
          </h4>
        </div>
        <p className="mt-2 rounded-full bg-background/40 p-1 text-tiny text-white backdrop-blur-md">
          {postData.travelPurpose}
        </p>
      </CardHeader>
      <CardBody className="p-0">
        <Image
          removeWrapper
          alt={`Travel to ${postData.travelCity}`}
          className="z-0 h-full w-full object-cover"
          src={postData.imageUrls[0] || '/test.jpg'}
        />
      </CardBody>
      <CardFooter className="absolute bottom-1 z-10 ml-1 w-[calc(100%_-_8px)] justify-between overflow-hidden rounded-large border-1 border-white/20 py-1 shadow-small before:rounded-xl before:bg-white/10">
        <div className="flex flex-col">
          <h4 className="text-large font-bold text-white">
            {postData.travelStartDate} - {postData.travelEndDate}
          </h4>
          <div className="mt-2 flex flex-wrap gap-1">
            <Chip size="sm" color="primary">
              {postData.travelStatus}
            </Chip>
            <Chip size="sm" color="secondary">
              {postData.travelStyle}
            </Chip>
          </div>
        </div>
        <Button
          size="md"
          color="primary"
          variant="flat"
          startContent={<MessageCircle size={24} />}
        ></Button>
      </CardFooter>
    </Card>
  )
}

export default TravelPostCard
