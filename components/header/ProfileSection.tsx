'use client'

import Link from 'next/link'
import { useSession } from 'next-auth/react'
import LogoutButton from '@/components/(auth)/logout/LogoutButton'
import { Badge } from '@nextui-org/badge'
import {
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
} from '@nextui-org/react'
import { ChatBubbleLeftRightIcon } from '@heroicons/react/16/solid'

export default function ProfileSection() {
  const { data: session, status } = useSession()
  const isLoggedIn = status === 'authenticated'

  function beforeLoginHandler() {
    sessionStorage.setItem('previousPath', window.location.pathname)
  }

  return (
    <div className="flex items-center space-x-2">
      {isLoggedIn ? (
        <>
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                as="button"
                className="transition-transform"
                src={session.user.image}
                fallback="👤"
                size="sm"
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" href="/users/profile" as={Link}>
                Profile
              </DropdownItem>
              <DropdownItem key="settings" href="/users/settings" as={Link}>
                Settings
              </DropdownItem>
              <DropdownItem key="logout">
                <LogoutButton />
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <div>
            <Link href="/chat/list">
              <Button
                radius="full"
                isIconOnly
                aria-label="Chat"
                variant="light"
              >
                <ChatBubbleLeftRightIcon />
              </Button>
            </Link>
          </div>
        </>
      ) : (
        <Link
          href="/login"
          className="text-blue-600 hover:text-blue-800"
          onClick={beforeLoginHandler}
        >
          Login
        </Link>
      )}
    </div>
  )
}
