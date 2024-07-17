// app/upload-page/page.tsx
'use client'

import React from 'react'
import FileUploader from '@/components/commons/file/FileUploader'
import { useFileList } from '@/hooks/useFileList'
import CategoryImage from '@/components/commons/image/CategoryImage'

const UploadPage = () => {
  const { files, addFile } = useFileList()

  const handleUploadComplete = (
    fileName: string,
    category: 'post' | 'community' | 'profile'
  ) => {
    addFile(fileName, category)
  }

  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold">File Upload Page</h1>

      <div className="mb-8">
        <h2 className="mb-2 text-xl font-semibold">Upload New File</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium">Post</h3>
            <FileUploader
              category="post"
              onUploadComplete={handleUploadComplete}
            />
          </div>
          <div>
            <h3 className="text-lg font-medium">Community</h3>
            <FileUploader
              category="community"
              onUploadComplete={handleUploadComplete}
            />
          </div>
          <div>
            <h3 className="text-lg font-medium">Profile</h3>
            <FileUploader
              category="profile"
              onUploadComplete={handleUploadComplete}
            />
          </div>
        </div>
      </div>

      <div>
        <h2 className="mb-2 text-xl font-semibold">Uploaded Files</h2>
        {files.length === 0 ? (
          <p>No files uploaded yet.</p>
        ) : (
          <ul className="space-y-4">
            {files.map((file, index) => (
              <li key={index} className="rounded-lg border p-4">
                <p className="font-medium">
                  {file.category}: {file.fileName}
                </p>
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
    </div>
  )
}

export default UploadPage
