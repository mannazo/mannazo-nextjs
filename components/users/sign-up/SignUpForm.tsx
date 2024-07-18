'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { createUser } from '@/services/api'
import { MBTI } from '@/constants/input-values'
import InterestsSelection from '@/components/users/sign-up/InterestsSelection'
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector'
import LanguageSelector from '@/utils/selector/LanguageSelector'
import FileUploader from '@/components/commons/file/FileUploader'
import CategoryImage from '@/components/commons/image/CategoryImage'
import { useFileList } from '@/hooks/useFileList'
import { getImageUrl } from '@/utils/aws/imageUtils'
import {
  Button,
  Card,
  CardBody,
  Chip,
  Divider,
  Input,
  Progress,
  Radio,
  RadioGroup,
  Select,
  SelectItem,
  Textarea,
} from '@nextui-org/react'

interface SignUpFormProps {
  initialEmail: string
  initialName: string
}

export default function SignUpForm({
  initialEmail,
  initialName,
}: SignUpFormProps) {
  const [userInfo, setUserInfo] = useState({
    email: initialEmail,
    name: initialName,
    nickname: '',
    nationality: '',
    city: '',
    language: '',
    introduction: '',
    gender: '',
    mbti: '',
    interests: [],
    birthday: '',
    profileImage: null,
  })

  //Progressbar
  const [step, setStep] = useState(1)
  const totalSteps = 5
  const nextStep = () => setStep((prev) => Math.min(prev + 1, totalSteps))
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1))

  //UploadedFile(Image)
  const { files, addFile } = useFileList()

  const router = useRouter()
  const [error, setError] = useState('')
  const [country, setCountry] = useState('')
  const [city, setRegion] = useState('')
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const handleUploadComplete = (
    fileName: string,
    category: 'post' | 'community' | 'profile'
  ) => {
    addFile(fileName, category)
    const imageUrl = getImageUrl(fileName, category)
    setUserInfo((prevState) => ({
      ...prevState,
      profileImage: imageUrl,
    }))
  }

  const handleInterestsChange = (selectedInterests) => {
    setUserInfo((prev) => ({ ...prev, interests: selectedInterests }))
  }

  // 세션 정보 가져온다.
  const { data: session, status } = useSession()

  const handleChange = (event) => {
    const { name, value } = event.target
    setUserInfo((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsLoading(true) // 로딩 시작

    if (!session || !session.user || !session.user.additionalInfo) {
      setError('세션 정보를 불러올 수 없습니다.')
      return
    }

    try {
      const { socialId, provider, secret } = session.user.additionalInfo

      const loginRequestDTO = {
        socialId: socialId,
        secret: secret,
        provider: provider,
      }

      const userRequestDTO = {
        email: userInfo.email,
        name: userInfo.name,
        nickname: userInfo.nickname,
        nationality: userInfo.nationality,
        language: userInfo.language,
        profileImage: userInfo.profileImage,
        introduction: userInfo.introduction,
        city: userInfo.city,
        gender: userInfo.gender,
        mbti: userInfo.mbti,
        interests: userInfo.interests.join(','),
        birthday: userInfo.birthday,
      }
      console.log(loginRequestDTO, userRequestDTO)
      if (
        userRequestDTO.profileImage === '' ||
        userRequestDTO.profileImage === undefined ||
        userRequestDTO.profileImage === null ||
        session.user.image != null
      ) {
        userRequestDTO.profileImage = session.user.image
      }
      let payload = {
        loginRequestDTO: loginRequestDTO,
        userRequestDTO: userRequestDTO,
      }
      const response = await createUser(payload)

      console.log(response.data)

      // 회원가입 성공 후 라우팅
      const previousPath = sessionStorage.getItem('previousPath')
      if (previousPath && previousPath !== '/login') {
        router.push(previousPath)
      } else {
        router.push('/')
      }

      // 회원가입 성공 처리 (예: 로그인 페이지로 리다이렉트)
    } catch (error) {
      console.error('회원가입 중 오류 발생:', error)
      setError('회원가입 중 오류가 발생했습니다. 다시 시도해 주세요.')
    } finally {
      setIsLoading(false) // 로딩 종료
    }
  }

  //다단계 폼으로 변경
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <Input
              label="Name"
              name="name"
              value={userInfo.name}
              onChange={handleChange}
              required
            />
            <Input
              label="Nickname"
              name="nickname"
              onChange={handleChange}
              required
            />
            <RadioGroup
              label="Gender"
              name="gender"
              value={userInfo.gender}
              onChange={handleChange}
            >
              <Radio value="남자">Male</Radio>
              <Radio value="여자">Female</Radio>
            </RadioGroup>
            <Input
              label="Birthday"
              name="birthday"
              type="date"
              onChange={handleChange}
              required
            />
          </>
        )
      case 2:
        return (
          <>
            <Select label="MBTI" name="mbti" onChange={handleChange}>
              {MBTI.map((value) => (
                <SelectItem key={value} value={value}>
                  {value}
                </SelectItem>
              ))}
            </Select>
            <CountryDropdown
              name="nationality"
              value={userInfo.nationality}
              onChange={(val) =>
                setUserInfo((prev) => ({ ...prev, nationality: val }))
              }
              className="w-full rounded border p-2"
              {...({ className: 'w-full rounded border p-2' } as any)}
            />
            <RegionDropdown
              name="city"
              country={userInfo.nationality}
              value={userInfo.city}
              onChange={(val) =>
                setUserInfo((prev) => ({ ...prev, city: val }))
              }
              className="w-full rounded border p-2"
              {...({ className: 'w-full rounded border p-2' } as any)}
            />
          </>
        )
      case 3:
        return (
          <>
            <LanguageSelector
              onChange={handleChange}
              name="language"
              initialValue="English"
            />
            <div>
              <label className="block text-sm font-medium">Interests</label>
              <InterestsSelection onChange={handleInterestsChange} />
            </div>
          </>
        )
      case 4:
        return (
          <>
            <Textarea
              label="Introduction"
              name="introduction"
              onChange={handleChange}
            />
            <FileUploader
              label="Upload Profile Image"
              category="community"
              onUploadComplete={handleUploadComplete}
            />
            <div className="mt-4">
              <h2 className="mb-2 text-xl font-semibold">Uploaded Files</h2>
              {files.length === 0 ? (
                <p>No files uploaded yet.</p>
              ) : (
                <ul className="space-y-4">
                  {files.map((file, index) => (
                    <li key={index} className="rounded-lg border p-4">
                      <CategoryImage
                        fileName={file.fileName}
                        category={file.category}
                        width={200}
                        height={200}
                        objectFit="cover"
                      />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </>
        )
      case 5:
        return (
          <Card className="w-full">
            <CardBody className="gap-4">
              <h2 className="text-2xl font-bold">Review Your Information</h2>
              <Divider />
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Card>
                  <CardBody>
                    <h3 className="mb-2 text-lg font-semibold">
                      Personal Information
                    </h3>
                    <ul className="space-y-2">
                      <li>
                        <span className="font-medium">Name:</span>{' '}
                        {userInfo.name}
                      </li>
                      <li>
                        <span className="font-medium">Nickname:</span>{' '}
                        {userInfo.nickname}
                      </li>
                      <li>
                        <span className="font-medium">Gender:</span>{' '}
                        {userInfo.gender === '남자' ? 'Male' : 'Female'}
                      </li>
                      <li>
                        <span className="font-medium">Birthday:</span>{' '}
                        {userInfo.birthday}
                      </li>
                      <li>
                        <span className="font-medium">MBTI:</span>{' '}
                        {userInfo.mbti}
                      </li>
                    </ul>
                  </CardBody>
                </Card>
                <Card>
                  <CardBody>
                    <h3 className="mb-2 text-lg font-semibold">
                      Location & Language
                    </h3>
                    <ul className="space-y-2">
                      <li>
                        <span className="font-medium">Nationality:</span>{' '}
                        {userInfo.nationality}
                      </li>
                      <li>
                        <span className="font-medium">City:</span>{' '}
                        {userInfo.city}
                      </li>
                      <li>
                        <span className="font-medium">Language:</span>{' '}
                        {userInfo.language}
                      </li>
                    </ul>
                  </CardBody>
                </Card>
              </div>
              <Card>
                <CardBody>
                  <h3 className="mb-2 text-lg font-semibold">Interests</h3>
                  <div className="flex flex-wrap gap-2">
                    {userInfo.interests.map((interest, index) => (
                      <Chip key={index} color="primary" variant="flat">
                        {interest}
                      </Chip>
                    ))}
                  </div>
                </CardBody>
              </Card>
              <Card>
                <CardBody>
                  <h3 className="mb-2 text-lg font-semibold">Introduction</h3>
                  <p>{userInfo.introduction}</p>
                </CardBody>
              </Card>
              {userInfo.profileImage && (
                <Card>
                  <CardBody>
                    <div className="mt-4">
                      <h2 className="mb-2 text-xl font-semibold">
                        Uploaded Image
                      </h2>
                      {files.length === 0 ? (
                        <p>No files uploaded yet.</p>
                      ) : (
                        <ul className="space-y-4">
                          {files.map((file, index) => (
                            <li key={index} className="rounded-lg border p-4">
                              <CategoryImage
                                fileName={file.fileName}
                                category={file.category}
                                width={200}
                                height={200}
                                objectFit="cover"
                              />
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </CardBody>
                </Card>
              )}
              <p className="mt-4 text-sm text-default-500">
                Please review your information carefully. You can go back to
                previous steps to make any changes if needed.
              </p>
            </CardBody>
          </Card>
        )
    }
  }

  return (
    <div className="flex min-h-screen flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold">
          Sign up for an account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="border px-4 py-8 shadow sm:rounded-lg sm:px-10">
          <Progress value={(step / totalSteps) * 100} className="mb-4" />
          <form className="space-y-6" onSubmit={handleSubmit}>
            {renderStep()}

            {error && <p className="text-sm text-red-500">{error}</p>}

            <div className="flex justify-between">
              {step > 1 && (
                <Button onClick={prevStep} color="default">
                  Previous
                </Button>
              )}
              {step < totalSteps ? (
                <Button onClick={nextStep} color="primary">
                  Next
                </Button>
              ) : (
                <Button type="submit" color="success" disabled={isLoading}>
                  {isLoading ? 'Signing Up...' : 'Complete Sign Up'}
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
