import Link from 'next/link'

export default function HeaderProfile() {
  // 사용자 인증 상태를 가정
  const isLoggedIn = false

  return (
    <div>
      {isLoggedIn ? (
        <div className="relative group">
          <button className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
            👤
          </button>
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg hidden group-hover:block">
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
            <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              Logout
            </button>
          </div>
        </div>
      ) : (
        <Link href="/login" className="text-blue-600 hover:text-blue-800">
          Login
        </Link>
      )}
    </div>
  )
}
