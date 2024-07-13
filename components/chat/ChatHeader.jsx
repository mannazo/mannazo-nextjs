'use client'

import { useState } from 'react'
import ReactCountryFlag from 'react-country-flag'
import Link from 'next/link'
import {
  Navbar,
  NavbarContent,
  NavbarItem,
  Avatar,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from '@nextui-org/react'
import { ChevronLeft, MoreVertical } from 'lucide-react'
import FeedbackModal from './FeedbackModal'
import BlockUserModal from './BlockUserModal'

const ChatHeader = () => {
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false)
  const [isBlockUserOpen, setIsBlockUserOpen] = useState(false)
  const userName = 'John Doe' // 예시 사용자 이름

  const handleFeedbackSubmit = (feedbackData) => {
    // 여기에서 피드백 데이터를 처리합니다
    console.log(feedbackData)
  }

  const handleBlockUser = (blockData) => {
    // 여기에서 사용자 차단 로직을 처리합니다
    console.log(blockData)
  }

  return (
    <>
      <Navbar maxWidth="full" className="z-0 mb-4">
        <NavbarContent justify="start">
          <NavbarItem>
            <Link href="/chat/list">
              <Button isIconOnly variant="light" aria-label="Go back">
                <ChevronLeft size={24} />
              </Button>
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Avatar src="https://example.com/avatar.jpg" size="md" />
          </NavbarItem>
          <NavbarItem>
            <div className="flex flex-col">
              <div className="flex items-center">
                <span className="mr-2 text-lg font-bold">{userName}</span>
                <ReactCountryFlag countryCode="US" />
              </div>
              <span className="text-sm text-default-500">Status message</span>
            </div>
          </NavbarItem>
        </NavbarContent>

        <NavbarContent justify="end">
          <NavbarItem>
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly variant="light" aria-label="More options">
                  <MoreVertical size={24} />
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Chat actions">
                <DropdownItem
                  key="feedback"
                  onPress={() => setIsFeedbackOpen(true)}
                >
                  Leave Feedback
                </DropdownItem>
                <DropdownItem
                  key="block"
                  className="text-danger"
                  color="danger"
                  onPress={() => setIsBlockUserOpen(true)}
                >
                  Block User
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
        </NavbarContent>
      </Navbar>

      <FeedbackModal
        isOpen={isFeedbackOpen}
        onClose={() => setIsFeedbackOpen(false)}
        onSubmit={handleFeedbackSubmit}
      />

      <BlockUserModal
        isOpen={isBlockUserOpen}
        onClose={() => setIsBlockUserOpen(false)}
        onSubmit={handleBlockUser}
        userName={userName}
      />
    </>
  )
}

export default ChatHeader
