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
  Input,
  Button,
  Select,
  SelectItem,
  Textarea,
  Chip,
} from '@nextui-org/react'
import InterestsSelection from '@/components/users/settings/SettingsInterestsSelection'
import { NATIONALITY, MBTI } from '@/constants/input-values' // Import constants
import LanguageSelector from '@/utils/selector/LanguageSelector'

export default function SettingsEditContent() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [userRequestDTO, setUserRequestDTO] = useState(null)

  useEffect(() => {
    const fetchUserData = async () => {
      if (status === 'authenticated') {
        try {
          const response = await axios.get(
            // `https://mannazu.diligentp.com/user/${session.user.additionalInfo.serverUserId}`
            `${process.env.NEXT_PUBLIC_SERVER_URL}/user/${session.user.additionalInfo.serverUserId}`
            // `https://192.168.0.184/user/${session.user.additionalInfo.serverUserId}`,
          )
          console.log('responsedata:')
          console.log(response.data)
          // setUserData(response.data)
          setUserData({
            ...response.data,
            language: response.data.language.split(','), // 문자열을 배열로 변환
            // interests: response.data.interests.split(','), // 문자열을 배열로 변환
          })
          // setUserRequestDTO({
          //   email: userData.data.email,
          //   name: userData.data.name,
          //   nickname: userData.data.nickname,
          //   nationality: userData.data.nationality,
          //   language: userData.data.language.split(','),
          //   profileImage: userData.data.image,
          //   introduction: userData.data.introduction,
          //   city: userData.data.city,
          //   gender: userData.data.gender,
          //   mbti: userData.data.mbti,
          //   interests: userData.data.interests.join(','),
          //   birthday: userData.data.birthday,
          // })
        } catch (error) {
          console.error('Error fetching user data:', error)
        } finally {
          setLoading(false)
        }
      }
    }

    fetchUserData()
  }, [status, session])

  const handleLanguageChange = (e) => {
    const { name, value } = e.target
    // setUserData({ ...userData, [name]: value.split(',') })
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value.split(','),
    }))
    console.log('line55:', userData)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    // setUserData({ ...userData, [name]: value })
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }))
    console.log('line65', userData)
  }

  const handleInterestsChange = (selectedInterests) => {
    // setUserData({ ...userData, interests: selectedInterests.join(',') })
    setUserData((prevUserData) => ({
      ...prevUserData,
      interests: selectedInterests.join(','),
    }))
    console.log('interest', userData)
  }

  const handleSubmit = async (e) => {
    console.log('submit 1: userdata', userData)

    const processField = (field) => {
      if (typeof field === 'string') {
        return field.includes(',') ? field.split(',') : [field]
      } else if (Array.isArray(field)) {
        return field.join(',')
      }
      return field
    }

    // const userRequestDTO = {
    //   email: userData.email, // 이메일 입력 필드 추가 필요
    //   name: userData.name,
    //   nickname: userData.nickname, // 닉네임 입력 필드 추가 필요
    //   nationality: userData.nationality,
    //   // language: processField(userData.language),
    //   language: userData.language.join(','), // 배열을 문자열로 변환
    //   profileImage: userData.image,
    //   introduction: userData.introduction,
    //   city: userData.city, // 도시 입력 필드 추가 필요
    //   gender: userData.gender, // 성별 입력 필드 추가 필요
    //   mbti: userData.mbti,
    //   // interests: processField(userData.interests),
    //   interests: userData.interests,
    //   // interests: userData.interests.join(','), // 배열을 문자열로 변환
    //   birthday: userData.birthday
    //
    // }

    // "email": "string",
    // "name": "string",
    // "nickname": "string",
    // "nationality": "string",
    // "language": "string",
    // "profileImage": "string",
    // "introduction": "string",
    // "city": "string",
    // "gender": "string",
    // "mbti": "string",
    // "interests": "string",
    // "birthday": "2024-07-15"

    console.log('submitv2', userData)
    e.preventDefault()

    const userRequestDTO = {
      email: userData.email, // 이메일 입력 필드 추가 필요
      name: userData.name,
      nickname: userData.nickname, // 닉네임 입력 필드 추가 필요
      nationality: userData.nationality,
      // language: processField(userData.language),
      language: userData.language.join(','), // 배열을 문자열로 변환
      profileImage: userData.image,
      introduction: userData.introduction,
      city: userData.city, // 도시 입력 필드 추가 필요
      gender: userData.gender, // 성별 입력 필드 추가 필요
      mbti: userData.mbti,
      // interests: processField(userData.interests),
      interests: userData.interests,
      // interests: userData.interests.join(','), // 배열을 문자열로 변환
      birthday: userData.birthday,
    }
    console.log('submit3', userData)
    try {
      console.log('서버로 보낼 데이터')
      console.log(userRequestDTO)
      // await axios.put(
      //   `https://mannazu.diligenp.com/user/${session.user.additionalInfo.serverUserId}`,
      //   { ...userData, userId: session.user.additionalInfo.serverUserId }
      // )
      // router.push('/users/settings')

      const response = await axios.put(
        `https://mannazo.diligentp.com/user/${session.user.additionalInfo.serverUserId}`,
        // `https://192.168.0.184/user/${session.user.additionalInfo.serverUserId}`,
        userRequestDTO
      )
      router.push('/users/settings')
      console.log('Server Response:', response.data) // 서버 응답 로그 출력

      // ).then((response) => {
      //   console.log("서버로 부터 온 데이터");
      //   console.log(response.data.body);
      // })
      console.log('submit4', userData)
    } catch (error) {
      console.log('submiterr', userData)
      console.error('Error updating user data:', error)
    }
  }

  if (loading) {
    return <LoadingSpinner />
  }

  // const languageValue =
  //   userData && userData.language ? userData.language.join(',') : ''
  const languageValue =
    userData && Array.isArray(userData.language)
      ? userData.language.join(',')
      : ''

  return (
    <form onSubmit={handleSubmit}>
      <Card className="mx-auto max-w-[600px]">
        <CardHeader>
          <h2 className="text-2xl font-bold">Edit Profile</h2>
        </CardHeader>
        <CardBody className="gap-4">
          {/*<Input*/}
          {/*  label="Name"*/}
          {/*  name="name"*/}
          {/*  value={userData.name && userData.name ? userData.name : ''}*/}
          {/*  onChange={handleInputChange}*/}
          {/*/>*/}
          <Input
            label="Nickname"
            name="nickname"
            value={
              userData.nickname && userData.nickname ? userData.nickname : ''
            }
            onChange={handleInputChange}
          />
          <Select
            label="Nationality"
            name="nationality"
            value={
              userData.nationality && userData.nationality
                ? userData.nationality
                : ''
            }
            onChange={(e) => handleInputChange(e)}
          >
            {NATIONALITY.map((nation) => (
              <SelectItem key={nation} value={nation}>
                {nation}
              </SelectItem>
            ))}
          </Select>
          {/*<Select*/}
          {/*  label="Language"*/}
          {/*  name="language"*/}
          {/*  value={userData.language}*/}
          {/*  onChange={handleInputChange}*/}
          {/*>*/}
          {/*  /!* Add language options here *!/*/}
          {/*  <SelectItem value="English">English</SelectItem>*/}
          {/*  <SelectItem value="Japanese">Japanese</SelectItem>*/}
          {/*  /!* ... more languages ... *!/*/}
          {/*</Select>*/}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Language
            </label>
            <LanguageSelector
              name="language"
              initialValue={languageValue}
              onChange={handleLanguageChange}
            />
          </div>
          <Input
            label="City"
            name="city"
            value={userData.city && userData.city ? userData.city : ''}
            onChange={handleInputChange}
          />
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Gender
            </label>
            <div className="flex space-x-4">
              {['남자', '여자'].map((option) => (
                <label key={option} className="inline-flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value={option.toLowerCase()}
                    checked={userData.gender === option.toLowerCase()}
                    onChange={handleInputChange}
                    className="form-radio h-4 w-4 text-indigo-600"
                  />
                  <span className="ml-2">{option}</span>
                </label>
              ))}
            </div>
          </div>
          <Select
            label="MBTI"
            name="mbti"
            value={userData.mbti && userData.mbti ? userData.mbti : ''}
            onChange={(e) => handleInputChange(e)}
          >
            {MBTI.map((mbti) => (
              <SelectItem key={mbti} value={mbti}>
                {mbti}
              </SelectItem>
            ))}
          </Select>
          <Input
            label="Birthday"
            name="birthday"
            type="date"
            value={
              userData.birthday && userData.birthday ? userData.birthday : ''
            }
            onChange={handleInputChange}
          />
          <Textarea
            label="Introduction"
            name="introduction"
            value={
              userData.introduction && userData.introduction
                ? userData.introduction
                : ''
            }
            onChange={handleInputChange}
          />
          <div>
            <p className="mb-2">Interests:</p>
            <InterestsSelection
              onChange={handleInterestsChange}
              initialSelectedInterests={
                userData &&
                userData.interests &&
                typeof userData.interests === 'string'
                  ? userData.interests.split(',')
                  : []
              } // 기존 interests를 전달
            />
          </div>
          <Button type="submit" color="primary">
            Save Changes
          </Button>
        </CardBody>
      </Card>
    </form>
  )
}
