'use client'
import React, { ChangeEvent } from 'react'
import { useUpload } from '@/hooks/useUpload'
import { Input, Progress } from '@nextui-org/react'
import { ArrowUpTrayIcon } from '@heroicons/react/24/outline'

interface FileUploaderProps {
  category: 'post' | 'community' | 'profile'
  onUploadComplete: (
    fileName: string,
    category: 'post' | 'community' | 'profile'
  ) => void
  label?: string
}

const FileUploader: React.FC<FileUploaderProps> = ({
  category,
  onUploadComplete,
  label = 'Upload File',
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
      <Input
        type="file"
        label={label}
        onChange={handleFileChange}
        disabled={isUploading}
        className="mb-2"
        startContent={
          <ArrowUpTrayIcon className="pointer-events-none h-5 w-5 flex-shrink-0 text-default-400" />
        }
      />
      {isUploading && (
        <Progress
          size="sm"
          isIndeterminate
          aria-label="Uploading..."
          className="mb-2"
        />
      )}
      {error && <p className="text-sm text-danger">{error}</p>}
    </div>
  )
}

export default FileUploader
