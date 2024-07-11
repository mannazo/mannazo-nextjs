'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Spinner } from '@nextui-org/react'
import { useSession } from 'next-auth/react'
import { uploadImageToS3 } from '@/utils/aws/s3'
import { createUser } from '@/services/api'
import { LANGUAGE, MBTI, NATIONALITY } from '@/constants/input-values'
import InterestsSelection from '@/components/users/sign-up/InterestsSelection'
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector'
import LanguageSelector from '@/utils/selector/LanguageSelector'

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
  })

  const router = useRouter()
  const [selectedFile, setSelectedFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState('')
  const [error, setError] = useState('')
  const [country, setCountry] = useState('')
  const [city, setRegion] = useState('')
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const handleInterestsChange = (selectedInterests) => {
    setUserInfo((prev) => ({ ...prev, interests: selectedInterests }))
  }

  const handleLanguagesChange = (languages: string[]) => {
    setSelectedLanguages(languages)
    // 여기에서 필요한 다른 로직을 수행할 수 있습니다.
    // 예: API 호출, 다른 상태 업데이트 등
    console.log('Selected languages:', languages)
  }

  // 세션 정보 가져온다.
  const { data: session, status } = useSession()

  useEffect(() => {
    if (selectedFile) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewUrl(reader.result)
      }
      reader.readAsDataURL(selectedFile)
    } else {
      setPreviewUrl('')
    }
  }, [selectedFile])

  const handleChange = (event) => {
    const { name, value } = event.target
    setUserInfo((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0])
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsLoading(true) // 로딩 시작

    if (!session || !session.user || !session.user.additionalInfo) {
      setError('세션 정보를 불러올 수 없습니다.')
      return
    }

    try {
      const s3Url = await uploadImageToS3(selectedFile)

      const { socialId, provider, secret } = session.user.additionalInfo

      const loginRequestDTO = {
        socialId: socialId,
        secret: secret,
        provider: provider,
      }

      const userRequestDTO = {
        email: userInfo.email, // 이메일 입력 필드 추가 필요
        name: userInfo.name,
        nickname: userInfo.nickname, // 닉네임 입력 필드 추가 필요
        nationality: userInfo.nationality,
        language: userInfo.language,
        profileImage: s3Url,
        introduction: userInfo.introduction,
        city: userInfo.city, // 도시 입력 필드 추가 필요
        gender: userInfo.gender, // 성별 입력 필드 추가 필요
        mbti: userInfo.mbti,
        interests: userInfo.interests.join(','), // 배열을 문자열로 변환
        birthday: userInfo.birthday,
      }
      console.log(loginRequestDTO, userRequestDTO)
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

  const handleRemoveImage = () => {
    setSelectedFile(null)
    setPreviewUrl('')
  }

  return (
    <div className="flex min-h-screen flex-col justify-center bg-gray-100 py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign up for an account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                value={userInfo.name}
                onChange={handleChange}
              />
            </div>

            <div>
              <label
                htmlFor="nickname"
                className="block text-sm font-medium text-gray-700"
              >
                Nickname
              </label>
              <input
                type="text"
                name="nickname"
                id="nickname"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                onChange={handleChange}
              />
            </div>

            {/* Gender 선택 */}
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
                      checked={userInfo.gender === option.toLowerCase()}
                      onChange={handleChange}
                      className="form-radio h-4 w-4 text-indigo-600"
                    />
                    <span className="ml-2">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label
                htmlFor="birthday"
                className="block text-sm font-medium text-gray-700"
              >
                Birthday
              </label>
              <input
                type="date"
                name="birthday"
                id="birthday"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                onChange={handleChange}
              />
            </div>

            <div>
              <label
                htmlFor="mbti"
                className="block text-sm font-medium text-gray-700"
              >
                MBTI
              </label>
              <select
                name="mbti"
                id="mbti"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                onChange={handleChange}
              >
                {MBTI.map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>

            {/*국가와 지역 선택*/}
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="nationality"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  Nationality
                </label>
                <CountryDropdown
                  name="nationality"
                  value={userInfo.nationality}
                  onChange={(val) =>
                    setUserInfo((prev) => ({ ...prev, nationality: val }))
                  }
                  className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="city"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  Region
                </label>
                <RegionDropdown
                  name="city"
                  country={userInfo.nationality}
                  value={userInfo.city}
                  onChange={(val) =>
                    setUserInfo((prev) => ({ ...prev, city: val }))
                  }
                  className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            {/*언어 선택*/}
            <div>
              <label
                htmlFor="language"
                className="block text-sm font-medium text-gray-700"
              >
                Language
              </label>

              <LanguageSelector
                onChange={handleChange}
                name="language"
                initialValue="English"
              />
            </div>

            {/*관심가는 주제 선택(포스트 올릴 때 보여줄 것)*/}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Interests
              </label>
              <div className="mt-2 space-y-2">
                <InterestsSelection onChange={handleInterestsChange} />
              </div>
            </div>

            {/*소개*/}
            <div>
              <label
                htmlFor="introduction"
                className="block text-sm font-medium text-gray-700"
              >
                Introduction
              </label>
              <textarea
                id="introduction"
                name="introduction"
                rows={3}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                onChange={handleChange}
              ></textarea>
            </div>

            <div>
              <label
                htmlFor="profilePhoto"
                className="block text-sm font-medium text-gray-700"
              >
                Profile Photo
              </label>
              <input
                id="profilePhoto"
                name="profilePhoto"
                type="file"
                accept="image/*"
                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:rounded-full file:border-0 file:bg-indigo-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-indigo-700 hover:file:bg-indigo-100"
                onChange={handleFileChange}
              />
            </div>

            {previewUrl && (
              <div className="relative mt-4">
                <img
                  src={previewUrl}
                  alt="Profile preview"
                  className="h-64 w-full rounded-lg object-cover shadow-md"
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute right-2 top-2 rounded-full bg-red-500 p-2 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            )}

            {error && <p className="text-sm text-red-500">{error}</p>}

            <div>
              <button
                disabled={isLoading}
                type="submit"
                className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                {isLoading ? <Spinner size="sm" /> : 'SIGN UP'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
