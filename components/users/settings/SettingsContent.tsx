'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import LoadingSpinner from '@/components/commons/LoadingSpinner'
import axios from 'axios'
import {
  Card,
  CardHeader,
  CardBody,
  Image,
  Divider,
  Chip,
  User,
  Button,
} from '@nextui-org/react'

export default function SettingsContent() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true)

  const handleEditClick = () => {
    router.push('/users/settings/edit')
  }

  useEffect(() => {
    const fetchUserData = async () => {
      if (status === 'authenticated') {
        const isFirstUser = session.user.additionalInfo.firstTimeUser

        if (isFirstUser) {
          router.push('/users/sign-up')
          return
        }

        try {
          const response = await axios.get(
            `https://mannazu.diligentp.com/user/${session.user.additionalInfo.serverUserId}`
          )
          setUserData(response.data)
        } catch (error) {
          console.error('Error fetching user data:', error)
        } finally {
          setLoading(false)
        }
      }
    }

    fetchUserData()
  }, [status, router, session])

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <>
      {userData && (
        <Card className="mx-auto max-w-[400px]">
          <CardHeader className="justify-between">
            <User
              name={userData.name}
              description={userData.email}
              avatarProps={{
                src: userData.profileImage,
                // ||
                // 'https://i.pravatar.cc/150?u=a04258114e29026702d',
              }}
            />
            <Chip color="primary" variant="flat">
              {userData.authority}
            </Chip>
          </CardHeader>
          <Divider />
          <CardBody>
            <p>
              <strong>Nickname:</strong> {userData.nickname}
            </p>
            <p>
              <strong>Nationality:</strong> {userData.nationality}
            </p>
            <p>
              <strong>Language:</strong> {userData.language}
            </p>
            <p>
              <strong>Gender:</strong> {userData.gender}
            </p>
            <p>
              <strong>MBTI:</strong> {userData.mbti}
            </p>
            <p>
              <strong>Birthday:</strong>{' '}
              {new Date(userData.birthday).toLocaleDateString()}
            </p>
            <p>
              <strong>City:</strong> {userData.city || 'Not specified'}
            </p>
            <Divider className="my-2" />
            <p>
              <strong>Introduction:</strong> {userData.introduction}
            </p>
            <Divider className="my-2" />
            <p>
              <strong>Interests:</strong>
            </p>
            {userData.interests.split(',').map((interest, index) => (
              <Chip key={index} className="mb-1 mr-1">
                {interest.trim()}
              </Chip>
            ))}
            <Button onClick={handleEditClick} color="primary">
              Edit Profile
            </Button>
          </CardBody>
        </Card>
      )}
    </>
  )
}
