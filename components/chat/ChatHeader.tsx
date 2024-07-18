'use client'

import { useState } from 'react'
import ReactCountryFlag from 'react-country-flag'
import { CountryRegionData } from 'react-country-region-selector'

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
import useChatStore from '@/store/chatStore'

const ChatHeader = () => {
  // 국가명을 입력받아 flag에서 필요로하는 ISO 국가코드를 반환하는 함수
  function getCountryCode(countryName: string): string | undefined {
    const countryEntry = CountryRegionData.find(
      (entry) => entry[0].toLowerCase() === countryName.toLowerCase()
    )

    if (countryEntry && countryEntry.length > 1) {
      return countryEntry[1]
    }

    return ''
  }

  // zustand 로 전역저장한 값들을 꺼내온다. (채팅방 들어올 때마다 전역저장함)
  const {
    currentRoom,
    setCurrentRoom,
    rooms,
    receiver,
    setReceiver,
    currentUser,
    setCurrentUser,
  } = useChatStore()
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false)
  const [isBlockUserOpen, setIsBlockUserOpen] = useState(false)

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
            {/*<Avatar src={receiver.profileImage} size="md" />*/}
            <ReactCountryFlag
              countryCode={getCountryCode(receiver.nationality)}
              style={{
                width: '2em',
                height: '2em',
              }}
              svg
            />
          </NavbarItem>
          <NavbarItem>
            <div className="flex flex-col">
              <div className="flex items-center">
                <span className="mr-2 text-lg font-bold">
                  {receiver.nickname}
                </span>
              </div>
              <span className="text-sm text-default-500">
                {receiver.nationality}
              </span>
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
        userName={receiver.nickname}
      />
    </>
  )
}

export default ChatHeader
