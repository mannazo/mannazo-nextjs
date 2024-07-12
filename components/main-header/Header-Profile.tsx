'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import LogoutButton from '@/components/(auth)/logout/LogoutButton'

export default function HeaderProfile() {
  const { data: session, status } = useSession()
  const isLoggedIn = status === 'authenticated'

  //프로필 메뉴를 동적으로 보여주기 위한 상태
  const [profileMenu, setProfileMenu] = useState(false)

  function beforeLoginHandler() {
    // 로그인 페이지로 이동하기 전에 세션스토리지에 돌아갈 페이지 저장
    sessionStorage.setItem('previousPath', window.location.pathname)
  }

  return (
    <div>
      {isLoggedIn ? (
        <div className="group relative z-50">
          <button
            className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-300"
            onClick={() => setProfileMenu(!profileMenu)}
          >
            {session.user.image ? (
              <img
                src={session.user.image}
                alt="Profile"
                className="h-8 w-8 rounded-full"
              />
            ) : (
              '👤'
            )}
          </button>
          {profileMenu && (
            <div className="absolute right-0 mt-2 w-48 rounded-md bg-white shadow-lg">
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
