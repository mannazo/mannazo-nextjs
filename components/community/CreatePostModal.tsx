'use client'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '@nextui-org/modal'
import { Button } from '@nextui-org/button'
import { Input, Textarea } from '@nextui-org/input'
import { createCommunityPost } from '@/services/api'
import { useSession } from 'next-auth/react'
import 'react-toastify/dist/ReactToastify.css'
import { toast } from 'react-toastify'
import axios from 'axios'
import FileUploader from '@/components/commons/file/FileUploader'
import CategoryImage from '@/components/commons/image/CategoryImage'
import { useFileList } from '@/hooks/useFileList'
import { getImageUrl } from '@/utils/aws/imageUtils'

export default function CreatePostModal({ isOpen, onClose }) {
  const router = useRouter()

  const { files, addFile } = useFileList()
  const [postData, setPostData] = useState({
    title: '',
    content: '',
    images: [],
    userId: null,
  })
  const { data: session, status } = useSession()
  const [isLoading, setIsLoading] = useState(true)

  const handleUploadComplete = (
    fileName: string,
    category: 'post' | 'community' | 'profile'
  ) => {
    addFile(fileName, category)
    const imageUrl = getImageUrl(fileName, category)
    setPostData((prev) => ({
      ...prev,
      imageUrls: [...prev.images, imageUrl],
    }))
  }

  useEffect(() => {
    if (session?.user?.additionalInfo.serverUserId) {
      setPostData((prevData) => ({
        ...prevData,
        userId: session.user.additionalInfo.serverUserId,
      }))
    }
  }, [session])

  const handleSubmit = async () => {
    console.log('Creating post:', postData)
    try {
      const response = await createCommunityPost(postData)
      if (response.status >= 200 && response.status < 300) {
        router.refresh()
        onClose()
        toast.success('Post created successfully!')
      } else {
        toast.error('Failed to create post. Please try again.')
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error creating post:', error.response?.data)
        toast.error(
          error.response?.data?.message ||
            'An error occurred. Please try again.'
        )
      } else {
        console.error('Unexpected error:', error)
        toast.error('An unexpected error occurred. Please try again.')
      }
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setPostData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)
    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file as any),
    }))
    setPostData((prevData) => ({
      ...prevData,
      images: [...prevData.images, ...newImages],
    }))
  }

  const removeImage = (index) => {
    setPostData((prevData) => {
      const updatedImages = prevData.images.filter((_, i) => i !== index)
      URL.revokeObjectURL(prevData.images[index].preview)
      return { ...prevData, images: updatedImages }
    })
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="3xl">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Post to Community ✅
            </ModalHeader>
            <ModalBody>
              <Input
                label="Title"
                placeholder="Title😊"
                name="title"
                value={postData.title}
                onChange={handleInputChange}
              />
              <Textarea
                label="Description"
                placeholder="Description😚"
                name="content"
                value={postData.content}
                onChange={handleInputChange}
              />
              <FileUploader
                label="Upload Profile Image"
                category="community"
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
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Cancel
              </Button>
              <Button color="primary" onPress={handleSubmit}>
                Post
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
