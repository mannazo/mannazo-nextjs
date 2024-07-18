'use client'

import PostFeed from '@/components/posts/mobile/PostFeed'
import { Button, useDisclosure } from '@nextui-org/react'
import TravelForm from '@/components/posts/TravelForm'

export default function Page() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Button
        color="primary"
        className="top-(--header-height) fixed right-6 z-50"
        onPress={onOpen}
      >
        ✏️
      </Button>
      <div className="h-screen snap-y snap-mandatory overflow-y-scroll scrollbar-hide">
        <PostFeed />
      </div>

      <TravelForm onSubmitSuccess={null} isOpen={isOpen} onClose={onClose} />
    </>
  )
}
