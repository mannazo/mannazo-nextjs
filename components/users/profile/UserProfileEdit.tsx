'use client'

// import { useSession } from 'next-auth/react'
// import { useRouter } from 'next/navigation'
// import { useEffect, useState } from 'react'
// import LoadingSpinner from '@/components/commons/LoadingSpinner'
// import axios from 'axios'
// import {
//   Card,
//   CardHeader,
//   CardBody,
//   Input,
//   Button,
//   Divider,
//   Chip,
//   User,
// } from '@nextui-org/react'

export default function UserProfileEdit() {
  // const { data: session, status } = useSession()
  // const router = useRouter()
  // const [userData, setUserData] = useState(null)
  // const [loading, setLoading] = useState(true)
  // const [formData, setFormData] = useState({})
  //
  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     if (status === 'authenticated') {
  //       const isFirstUser = session.user.additionalInfo.firstTimeUser
  //
  //       if (isFirstUser) {
  //         router.push('/users/sign-up')
  //         return
  //       }
  //
  //       try {
  //         const response = await axios.get(
  //           `https://mannazu.diligentp.com/user/${session.user.additionalInfo.serverUserId}`
  //         )
  //         setUserData(response.data)
  //         setFormData(response.data)
  //       } catch (error) {
  //         console.error('Error fetching user data:', error)
  //       } finally {
  //         setLoading(false)
  //       }
  //     }
  //   }
  //
  //   fetchUserData()
  // }, [status, router, session])
  //
  // const handleChange = (e) => {
  //   const { name, value } = e.target
  //   setFormData({ ...formData, [name]: value })
  // }
  //
  // const handleSubmit = async (e) => {
  //   e.preventDefault()
  //   try {
  //     await axios.put(
  //       `https://mannazu.diligentp.com/user/${session.user.additionalInfo.serverUserId}`,
  //       formData
  //     )
  //     alert('Profile updated successfully')
  //   } catch (error) {
  //     console.error('Error updating user data:', error)
  //   }
  // }
  //
  // if (loading) {
  //   return <LoadingSpinner />
  // }
  //
  // return (
  //   <Card className="mx-auto max-w-[400px]">
  //     <CardHeader className="justify-between">
  //       <User
  //         name={userData.name}
  //         description={userData.email}
  //         avatarProps={{
  //           src:
  //             userData.profileImage ||
  //             'https://i.pravatar.cc/150?u=a04258114e29026702d',
  //         }}
  //       />
  //     </CardHeader>
  //     <Divider />
  //     <CardBody>
  //       <form onSubmit={handleSubmit}>
  //         <Input
  //           fullWidth
  //           name="name"
  //           label="Name"
  //           value={formData.name || ''}
  //           onChange={handleChange}
  //         />
  //         <Input
  //           fullWidth
  //           name="nickname"
  //           label="Nickname"
  //           value={formData.nickname || ''}
  //           onChange={handleChange}
  //         />
  //         <Input
  //           fullWidth
  //           name="nationality"
  //           label="Nationality"
  //           value={formData.nationality || ''}
  //           onChange={handleChange}
  //         />
  //         <Input
  //           fullWidth
  //           name="language"
  //           label="Language"
  //           value={formData.language || ''}
  //           onChange={handleChange}
  //         />
  //         <Input
  //           fullWidth
  //           name="gender"
  //           label="Gender"
  //           value={formData.gender || ''}
  //           onChange={handleChange}
  //         />
  //         <Input
  //           fullWidth
  //           name="mbti"
  //           label="MBTI"
  //           value={formData.mbti || ''}
  //           onChange={handleChange}
  //         />
  //         <Input
  //           fullWidth
  //           name="birthday"
  //           label="Birthday"
  //           type="date"
  //           value={formData.birthday || ''}
  //           onChange={handleChange}
  //         />
  //         <Input
  //           fullWidth
  //           name="city"
  //           label="City"
  //           value={formData.city || ''}
  //           onChange={handleChange}
  //         />
  //         <Input
  //           fullWidth
  //           name="introduction"
  //           label="Introduction"
  //           value={formData.introduction || ''}
  //           onChange={handleChange}
  //         />
  //         <Button type="submit" className="mt-4">
  //           Update Profile
  //         </Button>
  //       </form>
  //     </CardBody>
  //   </Card>
  return <></>
}
