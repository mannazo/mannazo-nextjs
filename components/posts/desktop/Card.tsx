import React from 'react'
import { Card, CardBody, Avatar, Chip, Button } from '@nextui-org/react'
import {
  FaStar,
  FaLanguage,
  FaMapMarkerAlt,
  FaUserFriends,
} from 'react-icons/fa'

const TravelerCard = ({ traveler }) => {
  return (
    <Card className="w-full max-w-md bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardBody className="p-4">
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-1">
            <Avatar
              src={`https://i.pravatar.cc/150?u=${traveler.id}`}
              className="w-full h-auto aspect-square"
            />
          </div>
          <div className="col-span-2 flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-bold truncate">{traveler.name}</h2>
              <p className="text-sm text-gray-500 truncate">
                {traveler.nationality} | {traveler.gender}
              </p>
            </div>
            <div className="flex items-center mt-2">
              <FaStar className="text-yellow-400 mr-1" />
              <span className="font-bold mr-1">
                {traveler.averageRating.toFixed(1)}
              </span>
              <span className="text-sm text-gray-500">
                ({traveler.feedbackCount})
              </span>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <p className="flex items-center text-sm text-gray-600 mb-2">
            <FaMapMarkerAlt className="mr-2" />
            <span className="truncate">
              {traveler.destinationCountry} - {traveler.destinationCity}
            </span>
          </p>
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
            {traveler.introduction}
          </p>
        </div>

        <div className="mb-4">
          <h4 className="font-semibold mb-2 text-sm flex items-center">
            <FaUserFriends className="mr-2" /> Interests:
          </h4>
          <div className="flex flex-wrap gap-1">
            {traveler.preferredTags.slice(0, 4).map((tag, index) => (
              <Chip key={index} size="sm" className="bg-blue-100 text-blue-800">
                {tag}
              </Chip>
            ))}
            {traveler.preferredTags.length > 4 && (
              <Chip size="sm" className="bg-gray-100 text-gray-800">
                +{traveler.preferredTags.length - 4}
              </Chip>
            )}
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-2 text-sm flex items-center">
            <FaLanguage className="mr-2" /> Languages:
          </h4>
          <div className="flex flex-wrap gap-1">
            {traveler.languages.slice(0, 3).map((lang, index) => (
              <Chip
                key={index}
                size="sm"
                className="bg-green-100 text-green-800"
              >
                {lang}
              </Chip>
            ))}
            {traveler.languages.length > 3 && (
              <Chip size="sm" className="bg-gray-100 text-gray-800">
                +{traveler.languages.length - 3}
              </Chip>
            )}
          </div>
        </div>
      </CardBody>

      <div className="px-4 pb-4">
        <Button className="w-full bg-purple-600 text-white font-bold hover:bg-purple-700">
          Connect
        </Button>
      </div>
    </Card>
  )
}

export default TravelerCard
