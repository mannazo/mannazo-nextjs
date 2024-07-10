'use client'

import React, { useState } from 'react'
import { createPost } from '@/services/api'
import {
  Input,
  Button,
  Textarea,
  Radio,
  RadioGroup,
  DateRangePicker,
} from '@nextui-org/react'
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector'
import LoadingSpinner from '@/components/commons/LoadingSpinner'
import { format } from 'date-fns'

interface TravelPlanFormProps {
  onSubmitSuccess: () => void // 부모 컴포넌트에게 성공을 알리는 함수
}

const TravelPlanForm: React.FC<TravelPlanFormProps> = ({ onSubmitSuccess }) => {
  const [formData, setFormData] = useState({
    travelNationality: '',
    travelCity: '',
    travelCityCustom: '',
    travelStartDate: null,
    travelEndDate: null,
    travelStyle: [],
    travelPurpose: '',
    preferredGender: '',
    imageUrls: [],
  })
  const [isLoading, setIsLoading] = useState(false)

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
      travelStyle: value.split(',').map((item) => item.trim()),
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
    await new Promise((resolve) => setTimeout(resolve, 3000)) // 3초 지연
    console.log(formData)
    try {
      const response = await createPost(formData)

      console.log('Form submitted successfully:', response.data)
      onSubmitSuccess() // 부모 컴포넌트에게 성공을 알림
    } catch (error) {
      console.error('Error submitting form:', error)
      // 여기에 에러 처리 로직을 추가
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-md space-y-4">
      <CountryDropdown
        value={formData.travelNationality}
        onChange={(val) => handleInputChange('travelNationality', val)}
        // @ts-ignore
        className="w-full rounded border p-2"
      />

      <RegionDropdown
        country={formData.travelNationality}
        value={formData.travelCity}
        onChange={(val) => handleInputChange('travelCity', val)}
        // @ts-ignore
        className="w-full rounded border p-2"
      />

      <Input
        label="Custom City"
        value={formData.travelCityCustom}
        onChange={(e) => handleInputChange('travelCityCustom', e.target.value)}
        placeholder="Enter custom city if not in the list"
      />

      <DateRangePicker label="Travel Dates" onChange={handleDateChange} />

      <Input
        label="Travel Style Tags"
        value={formData.travelStyle.join(', ')}
        onChange={(e) => handleStyleChange(e.target.value)}
        placeholder="Enter tags separated by commas"
      />

      <Textarea
        label="Travel Purpose and Description"
        value={formData.travelPurpose}
        onChange={(e) => handleInputChange('travelPurpose', e.target.value)}
        placeholder="Describe yourself and what you're looking for"
      />

      <RadioGroup
        label="Preferred Gender"
        value={formData.preferredGender}
        onValueChange={(val) => handleInputChange('preferredGender', val)}
      >
        <Radio value="male">Male</Radio>
        <Radio value="female">Female</Radio>
        <Radio value="any">Any</Radio>
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

      <Button type="submit" color="primary" disabled={isLoading}>
        {isLoading ? 'Submitting...' : 'Submit Travel Plan'}
      </Button>

      {isLoading && (
        <div className="loading-spinner">
          <LoadingSpinner />
        </div>
      )}
    </form>
  )
}

export default TravelPlanForm
