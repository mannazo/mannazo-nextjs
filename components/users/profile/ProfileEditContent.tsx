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
//   Select,
//   SelectItem,
//   Textarea,
//   Chip,
// } from '@nextui-org/react'
// import InterestsSelection from '@/components/users/sign-up/InterestsSelection'

export default function ProfileEditContent() {
  // const { data: session, status } = useSession()
  // const router = useRouter()
  // const [userData, setUserData] = useState(null)
  // const [loading, setLoading] = useState(true)
  //
  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     if (status === 'authenticated') {
  //       try {
  //         const response = await axios.get(
  //           `https://mannazu.diligentp.com/user/${session.user.additionalInfo.serverUserId}`
  //         )
  //         setUserData(response.data)
  //       } catch (error) {
  //         console.error('Error fetching user data:', error)
  //       } finally {
  //         setLoading(false)
  //       }
  //     }
  //   }
  //
  //   fetchUserData()
  // }, [status, session])
  //
  // const handleInputChange = (e) => {
  //   const { name, value } = e.target
  //   setUserData({ ...userData, [name]: value })
  // }
  //
  // const handleInterestsChange = (selectedInterests) => {
  //   setUserData({ ...userData, interests: selectedInterests.join(',') })
  // }
  //
  // const handleSubmit = async (e) => {
  //   e.preventDefault()
  //   try {
  //     await axios.put(
  //       `https://mannazu.diligenp.com/user/${session.user.additionalInfo.serverUserId}`,
  //       { ...userData, userId: session.user.additionalInfo.serverUserId }
  //     )
  //     router.push('/users/profile')
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
  //   <form onSubmit={handleSubmit}>
  //     <Card className="mx-auto max-w-[600px]">
  //       <CardHeader>
  //         <h2 className="text-2xl font-bold">Edit Profile</h2>
  //       </CardHeader>
  //       <CardBody className="gap-4">
  //         <Input
  //           label="Name"
  //           name="name"
  //           value={userData.name}
  //           onChange={handleInputChange}
  //         />
  //         <Input
  //           label="Nickname"
  //           name="nickname"
  //           value={userData.nickname}
  //           onChange={handleInputChange}
  //         />
  //         <Select
  //           label="Nationality"
  //           name="nationality"
  //           value={userData.nationality}
  //           onChange={handleInputChange}
  //         >
  //           {/* Add nationality options here */}
  //           <SelectItem value="Afghanistan">Afghanistan</SelectItem>
  //           {/* ... more countries ... */}
  //         </Select>
  //         <Select
  //           label="Language"
  //           name="language"
  //           value={userData.language}
  //           onChange={handleInputChange}
  //         >
  //           {/* Add language options here */}
  //           <SelectItem value="English">English</SelectItem>
  //           <SelectItem value="Japanese">Japanese</SelectItem>
  //           {/* ... more languages ... */}
  //         </Select>
  //         <Input
  //           label="City"
  //           name="city"
  //           value={userData.city}
  //           onChange={handleInputChange}
  //         />
  //         <Select
  //           label="Gender"
  //           name="gender"
  //           value={userData.gender}
  //           onChange={handleInputChange}
  //         >
  //           <SelectItem value="남자">남자</SelectItem>
  //           <SelectItem value="여자">여자</SelectItem>
  //         </Select>
  //         <Select
  //           label="MBTI"
  //           name="mbti"
  //           value={userData.mbti}
  //           onChange={handleInputChange}
  //         >
  //           {/* Add MBTI options here */}
  //           <SelectItem value="ENTJ">ENTJ</SelectItem>
  //           {/* ... more MBTI types ... */}
  //         </Select>
  //         <Input
  //           label="Birthday"
  //           name="birthday"
  //           type="date"
  //           value={userData.birthday}
  //           onChange={handleInputChange}
  //         />
  //         <Textarea
  //           label="Introduction"
  //           name="introduction"
  //           value={userData.introduction}
  //           onChange={handleInputChange}
  //         />
  //         <div>
  //           <p className="mb-2">Interests:</p>
  //           {userData.interests.split(',').map((interest, index) => (
  //             <Chip key={index} className="mb-1 mr-1">
  //               {interest.trim()}
  //             </Chip>
  //           ))}
  //           {/* Add a way to edit interests here */}
  //         </div>
  //         <Button type="submit" color="primary">
  //           Save Changes
  //         </Button>
  //       </CardBody>
  //     </Card>
  //   </form>
  return <></>
}
