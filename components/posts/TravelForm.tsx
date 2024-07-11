'use client'

import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { createPost } from '@/services/api'
import {
  Input,
  Button,
  Textarea,
  Radio,
  RadioGroup,
  Modal,
  ModalContent,
  ModalBody,
  useDisclosure,
  DateRangePicker,
  ModalHeader,
  ModalFooter,
} from '@nextui-org/react'
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector'
import LoadingSpinner from '@/components/commons/LoadingSpinner'
import { format } from 'date-fns'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

interface TravelPlanFormProps {
  onSubmitSuccess: () => void
  isOpen: boolean
  onClose: () => void
}

const TravelPlanForm: React.FC<TravelPlanFormProps> = ({
  onSubmitSuccess,
  onClose,
  isOpen,
}) => {
  const { data: session, status } = useSession()

  const [formData, setFormData] = useState({
    userId: null,
    travelNationality: null,
    travelCity: null,
    travelStartDate: null,
    travelEndDate: null,
    travelStatus: '등록',
    travelStyle: '',
    travelPurpose: '',
    preferredGender: '',
    imageUrls: [],
  })

  //모달 상태
  const { onOpen, onOpenChange } = useDisclosure()

  //세션 로딩
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (session?.user?.additionalInfo.serverUserId) {
      setFormData((prevData) => ({
        ...prevData,
        userId: session.user.additionalInfo.serverUserId,
      }))

      setIsLoading(false)
    }
  }, [session])

  const handleInputChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleDateChange = (dates) => {
    setFormData((prev) => ({
      ...prev,
      travelStartDate: dates?.start
        ? format(new Date(dates.start), 'yyyy-MM-dd')
        : null,
      travelEndDate: dates?.end
        ? format(new Date(dates.end), 'yyyy-MM-dd')
        : null,
    }))
  }

  const handleStyleChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      travelStyle: value,
    }))
  }

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files)
    const urls = files.map((file) => URL.createObjectURL(file))
    setFormData((prev) => ({
      ...prev,
      imageUrls: [...prev.imageUrls, ...urls],
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    // await new Promise((resolve) => setTimeout(resolve, 3000))

    const submissionData = {
      ...formData,
      travelStyle: formData.travelStyle
        .split(',')
        .map((item) => item.trim())
        .join(','),
    }

    console.log(submissionData)
    try {
      const response = await createPost(submissionData)
      console.log('Form submitted successfully:', response.data)
      notifySuccess()
      onClose()
    } catch (error) {
      notifyFailure()
      console.error('Error submitting form:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const notifySuccess = () => toast('SUCCESS ✅')
  const notifyFailure = () => toast('FAILURE 🚨')

  return (
    <>
      <ToastContainer
        position="top-right" // 알람 위치 지정
        autoClose={2000} // 자동 off 시간
        hideProgressBar={false} // 진행시간바 숨김
        closeOnClick // 클릭으로 알람 닫기
        rtl={false} // 알림 좌우 반전
        pauseOnFocusLoss // 화면을 벗어나면 알람 정지
        draggable // 드래그 가능
        pauseOnHover // 마우스를 올리면 알람 정지
        theme="light"
        // limit={1} // 알람 개수 제한
      />
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <form onSubmit={handleSubmit} className="mx-auto max-w-md space-y-4">
            <ModalHeader className="flex flex-col gap-1">
              새 글 작성
            </ModalHeader>
            <ModalBody>
              <CountryDropdown
                value={formData.travelNationality}
                onChange={(val) => handleInputChange('travelNationality', val)}
                className="w-full rounded border p-2"
              />

              <RegionDropdown
                country={formData.travelNationality}
                value={formData.travelCity}
                onChange={(val) => handleInputChange('travelCity', val)}
                className="w-full rounded border p-2"
              />

              <DateRangePicker
                label="Travel Dates"
                onChange={handleDateChange}
              />

              <Input
                label="Travel Style Tags"
                value={formData.travelStyle}
                onChange={(e) => handleStyleChange(e.target.value)}
                placeholder="Enter tags separated by commas"
              />

              <Textarea
                label="Travel Purpose and Description"
                value={formData.travelPurpose}
                onChange={(e) =>
                  handleInputChange('travelPurpose', e.target.value)
                }
                placeholder="Describe yourself and what you're looking for"
              />

              <RadioGroup
                label="Preferred Gender"
                value={formData.preferredGender}
                onValueChange={(val) =>
                  handleInputChange('preferredGender', val)
                }
              >
                <Radio value="남자">Male</Radio>
                <Radio value="여자">Female</Radio>
                <Radio value="상관없음">Any</Radio>
              </RadioGroup>

              <input
                type="file"
                multiple
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />
              <label
                htmlFor="image-upload"
                className="cursor-pointer rounded bg-blue-500 p-2 text-white"
              >
                Upload Images
              </label>

              <div className="flex flex-wrap gap-2">
                {formData.imageUrls.map((url, index) => (
                  <img
                    key={index}
                    src={url}
                    alt={`Uploaded ${index}`}
                    className="h-20 w-20 rounded object-cover"
                  />
                ))}
              </div>

              {isLoading && (
                <div className="loading-spinner">
                  <LoadingSpinner />
                </div>
              )}
            </ModalBody>
            <ModalFooter className="absolute bottom-2 right-2">
              <Button type="submit" color="primary" disabled={isLoading}>
                {isLoading ? 'Submitting...' : 'Submit Travel Plan'}
              </Button>
              <Button color="danger" variant="light" onPress={onClose}>
                Cancel
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  )
}

export default TravelPlanForm
