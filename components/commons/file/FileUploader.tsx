// 이 컴포넌트가 만들어진 이유: 여러 카테고리에서 컴포넌트 폼은 재사용하면서, 파일명 앞에 원하는 카테고리 접두어를 붙이기 위함.
// components/FileUploader.tsx
'use client'
import React, { ChangeEvent } from 'react'
import { useUpload } from '@/hooks/useUpload'
interface FileUploaderProps {
  category: 'post' | 'community' | 'profile'
  onUploadComplete: (
    fileName: string,
    category: 'post' | 'community' | 'profile'
  ) => void
}

const FileUploader: React.FC<FileUploaderProps> = ({
  category,
  onUploadComplete,
}) => {
  const { uploadFile, isUploading, error } = useUpload()

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    try {
      const fileName = await uploadFile(file, category)
      onUploadComplete(fileName, category)
    } catch (err) {
      console.error('Upload failed:', err)
    }
  }

  return (
    <div>
      <input type="file" onChange={handleFileChange} disabled={isUploading} />
      {isUploading && <p>Uploading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  )
}

export default FileUploader
