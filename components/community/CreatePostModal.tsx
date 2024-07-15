'use client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '@nextui-org/modal'
import { Button } from '@nextui-org/button'
import { Input, Textarea } from '@nextui-org/input'
import { Image } from '@nextui-org/image'
import { createCommunityPost } from '@/services/api'
import { useSession } from 'next-auth/react'
import 'react-toastify/dist/ReactToastify.css'
import { toast } from 'react-toastify'
import axios from 'axios'

export default function CreatePostModal({ isOpen, onClose }) {
  const router = useRouter()
  const [postData, setPostData] = useState({
    title: '',
    content: '',
    images: [],
    userId: null,
  })
  const { data: session, status } = useSession()
  const [isLoading, setIsLoading] = useState(true)

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
              <div>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                  <Button as="span">Upload Images</Button>
                </label>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {postData.images.map((image, index) => (
                  <div key={index} className="relative">
                    <Image
                      src={image.preview}
                      alt={`Preview ${index}`}
                      width={100}
                      height={100}
                      className="rounded object-cover"
                    />
                    <Button
                      isIconOnly
                      color="danger"
                      size="sm"
                      className="absolute -right-2 -top-2 z-10 opacity-30 shadow-md transition-transform hover:scale-110"
                      onClick={() => removeImage(index)}
                    >
                      ×
                    </Button>
                  </div>
                ))}
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
