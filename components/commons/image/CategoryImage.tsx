// components/CategoryImage.tsx
'use client'

import Image from 'next/image'
import { getImageUrl } from '@/utils/aws/imageUtils'
import { useState, useEffect } from 'react'

interface CategoryImageProps {
  fileName: string
  category: 'post' | 'community' | 'profile'
  width?: number
  height?: number
  layout?: 'fixed' | 'intrinsic' | 'responsive' | 'fill'
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down'
  priority?: boolean
  className?: string
}

const CategoryImage = ({
  fileName,
  category,
  width = 500,
  height = 300,
  priority = false,
  className = '',
}: CategoryImageProps) => {
  const [imageUrl, setImageUrl] = useState<string>('')

  useEffect(() => {
    const url = getImageUrl(fileName, category)
    console.log(url)
    setImageUrl(url)
    console.log('Image URL:', url)
  }, [fileName, category])

  if (!imageUrl) {
    return null // or a loading placeholder
  }
  // TODO optimized를 사용할 수 있는 방법 찾아보기
  return (
    <div className={className}>
      <Image
        src={imageUrl}
        alt={`${category} image`}
        width={width}
        height={height}
        priority={priority}
        unoptimized
      />
    </div>
  )
}

export default CategoryImage
