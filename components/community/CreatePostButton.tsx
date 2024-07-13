'use client'

import { useState } from 'react'
import { Button } from '@nextui-org/button'
import { PlusIcon } from '@/components/commons/PlusIcon'
import CreatePostModal from '@/components/community/CreatePostModal'

export default function CreatePostButton() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button
        isIconOnly
        color="primary"
        aria-label="Create post"
        className="fixed bottom-6 right-6 z-50"
        size="lg"
        onClick={() => setIsOpen(true)}
      >
        <PlusIcon />
      </Button>
      <CreatePostModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
}
