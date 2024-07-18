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
  ModalHeader,
  ModalFooter,
  Progress,
  DateRangePicker,
} from '@nextui-org/react'
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector'
import LoadingSpinner from '@/components/commons/LoadingSpinner'
import { format } from 'date-fns'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useFileList } from '@/hooks/useFileList'
import FileUploader from '@/components/commons/file/FileUploader'
import CategoryImage from '@/components/commons/image/CategoryImage'
import { getImageUrl } from '@/utils/aws/imageUtils'

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
  const { files, addFile } = useFileList()
  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 4

  const [formData, setFormData] = useState({
    userId: null,
    travelNationality: '',
    travelCity: '',
    travelStartDate: null,
    travelEndDate: null,
    travelStatus: '등록',
    travelStyle: '',
    travelPurpose: '',
    preferredGender: '',
    imageUrls: [],
  })

  const { onOpen, onOpenChange } = useDisclosure()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (session?.user?.additionalInfo.serverUserId) {
      setFormData((prevData) => ({
        ...prevData,
        userId: session.user.additionalInfo.serverUserId,
      }))
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

  const handleUploadComplete = (
    fileName: string,
    category: 'post' | 'community' | 'profile'
  ) => {
    addFile(fileName, category)
    const imageUrl = getImageUrl(fileName, category)
    setFormData((prev) => ({
      ...prev,
      imageUrls: [...prev.imageUrls, imageUrl],
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    const submissionData = {
      ...formData,
      travelStyle: formData.travelStyle
        .split(',')
        .map((item) => item.trim())
        .join(','),
    }

    try {
      const response = await createPost(submissionData)
      console.log('Form submitted successfully:', response.data)
      toast.success('Travel plan created successfully!')
      onClose()
      onSubmitSuccess()
    } catch (error) {
      console.error('Error submitting form:', error)
      toast.error('Failed to create travel plan. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const nextStep = () =>
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps))
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1))

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <CountryDropdown
              value={formData.travelNationality}
              onChange={(val) => handleInputChange('travelNationality', val)}
              className="w-full rounded border p-2"
              {...({ className: 'w-full rounded border p-2' } as any)}
            />
            <RegionDropdown
              country={formData.travelNationality}
              value={formData.travelCity}
              onChange={(val) => handleInputChange('travelCity', val)}
              className="w-full rounded border p-2"
              {...({ className: 'w-full rounded border p-2' } as any)}
            />
          </>
        )
      case 2:
        return (
          <>
            <DateRangePicker label="Travel Dates" onChange={handleDateChange} />
          </>
        )
      case 3:
        return (
          <>
            <Input
              label="Travel Style Tags"
              value={formData.travelStyle}
              onChange={(e) => handleInputChange('travelStyle', e.target.value)}
              placeholder="Enter tags separated by commas"
              className="mb-4"
            />
            <Textarea
              label="Travel Purpose and Description"
              value={formData.travelPurpose}
              onChange={(e) =>
                handleInputChange('travelPurpose', e.target.value)
              }
              placeholder="Describe yourself and what you're looking for"
            />
          </>
        )
      case 4:
        return (
          <>
            <RadioGroup
              label="Preferred Gender"
              value={formData.preferredGender}
              onValueChange={(val) => handleInputChange('preferredGender', val)}
              className="mb-4"
            >
              <Radio value="남자">Male</Radio>
              <Radio value="여자">Female</Radio>
              <Radio value="상관없음">Any</Radio>
            </RadioGroup>
            <FileUploader
              label="Upload Profile Image"
              category="post"
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
      default:
        return null
    }
  }

  return (
    <>
      <ToastContainer />
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="xl"
        onClose={onClose}
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            New Travel Plan - Step {currentStep} of {totalSteps}
          </ModalHeader>
          <ModalBody>
            <Progress
              value={(currentStep / totalSteps) * 100}
              className="mb-4"
            />
            <form onSubmit={handleSubmit} className="space-y-4">
              {renderStepContent()}
            </form>
          </ModalBody>
          <ModalFooter>
            {currentStep > 1 && (
              <Button color="default" onClick={prevStep}>
                Previous
              </Button>
            )}
            {currentStep < totalSteps ? (
              <Button color="primary" onClick={nextStep}>
                Next
              </Button>
            ) : (
              <Button
                color="success"
                onClick={handleSubmit}
                disabled={isLoading}
              >
                {isLoading ? <LoadingSpinner /> : 'Submit'}
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default TravelPlanForm
