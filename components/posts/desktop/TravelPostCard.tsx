// components/TravelPostCard.tsx

import {
  Card,
  CardBody,
  CardFooter,
  Image,
  Chip,
  Avatar,
} from '@nextui-org/react'

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
    <Card shadow="sm" isPressable>
      <CardBody className="p-0">
        {postData.imageUrls.length > 0 && (
          <Image
            src={postData.imageUrls[0]}
            alt={`Travel to ${postData.travelCity}`}
            classNames={{
              img: 'w-full h-[200px] object-cover',
            }}
          />
        )}
      </CardBody>
      <CardFooter className="flex-col items-start">
        <h4 className="text-large font-bold">
          {postData.travelCity}, {postData.travelNationality}
        </h4>
        <p className="text-small text-default-500">
          {postData.travelStartDate} - {postData.travelEndDate}
        </p>
        <div className="mt-2 flex flex-wrap gap-1">
          <Chip size="sm" color="primary">
            {postData.travelStatus}
          </Chip>
          <Chip size="sm" color="secondary">
            {postData.travelStyle}
          </Chip>
          <Chip size="sm" color="success">
            {postData.travelPurpose}
          </Chip>
        </div>
        {user && (
          <div className="mt-4 flex items-center">
            <Avatar
              src={user.profileImage || undefined}
              name={user.nickname}
              size="sm"
              className="mr-2"
            />
            <span className="font-medium">{user.nickname}</span>
          </div>
        )}
      </CardFooter>
    </Card>
  )
}

export default TravelPostCard
