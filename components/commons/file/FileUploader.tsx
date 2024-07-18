'use client'
import React, { ChangeEvent, useRef } from 'react'
import { useUpload } from '@/hooks/useUpload'
import { Button, Progress } from '@nextui-org/react'
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
  const fileInputRef = useRef<HTMLInputElement>(null)

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

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
      <Button
        onClick={handleButtonClick}
        disabled={isUploading}
        startContent={<ArrowUpTrayIcon className="h-5 w-5" />}
      >
        {label}
      </Button>
      {isUploading && (
        <Progress
          size="sm"
          isIndeterminate
          aria-label="Uploading..."
          className="mt-2"
        />
      )}
      {error && <p className="mt-2 text-sm text-danger">{error}</p>}
    </div>
  )
}

export default FileUploader
