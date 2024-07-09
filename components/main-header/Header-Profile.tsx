'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useSession, signOut } from 'next-auth/react'
import LogoutButton from '@/components/(auth)/logout/LogoutButton'

export default function HeaderProfile() {
  const { data: session, status } = useSession()
  const isLoggedIn = status === 'authenticated'

  //프로필 메뉴를 동적으로 보여주기 위한 상태
  const [profileMenu, setProfileMenu] = useState(false)

  return (
    <div>
      {isLoggedIn ? (
        <div className="relative group">
          <button
            className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center"
            onClick={() => setProfileMenu(!profileMenu)}
          >
            {session.user.image ? (
              <img
                src={session.user.image}
                alt="Profile"
                className="w-8 h-8 rounded-full"
              />
            ) : (
              '👤'
            )}
          </button>
          {profileMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg">
              <Link
                href="/profile"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Profile
              </Link>
              <Link
                href="/settings"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Settings
              </Link>
              <LogoutButton />
            </div>
          )}
        </div>
      ) : (
        <Link href="/login" className="text-blue-600 hover:text-blue-800">
          Login
        </Link>
      )}
    </div>
  )
}
