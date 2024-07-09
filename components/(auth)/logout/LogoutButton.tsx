'use client'

import { useCustomSignOut } from '@/hooks/useCustomSignOut'

export default function LogoutButton() {
  const signOut = useCustomSignOut()

  return (
    <button
      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
      onClick={() => signOut()}
    >
      Logout
    </button>
  )
}
