// 이 훅이 만들어진 이유: 업로드 로직을 분리시킴. 업로드 전, 업로드 중, 업로드 실패, 업로드 성공을 2개 상태로 구분하게 됨.
// hooks/useUpload.ts
import { useState } from 'react'
import { getUploadUrl, uploadToS3 } from '@/utils/aws/uploadUtils'

export const useUpload = () => {
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const uploadFile = async (
    file: File,
    category: 'post' | 'community' | 'profile'
  ) => {
    setIsUploading(true)
    setError(null)

    try {
      const { url, fileName } = await getUploadUrl(
        file.name,
        file.type,
        category
      )
      await uploadToS3(file, url)
      setIsUploading(false)
      return fileName
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred')
      setIsUploading(false)
      throw err
    }
  }

  return { uploadFile, isUploading, error }
}
