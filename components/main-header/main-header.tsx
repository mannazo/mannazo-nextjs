import Link from 'next/link'
import Image from 'next/image'
import {
  QuestionMarkCircleIcon,
  XMarkIcon,
  MagnifyingGlassIcon,
  AdjustmentsHorizontalIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  UserCircleIcon,
  ArrowRightEndOnRectangleIcon,
} from '@heroicons/react/24/outline'

export default function Header() {
  return (
    <div className="flex w-full justify-center">
      <header className="fixed top-0 z-50 flex items-center justify-center bg-white shadow-md w-full">
        <div className="flex w-full items-center justify-between px-4">
          <div className="flex items-center">
            <Link href="/">
              <Image
                src="/logo.png"
                alt="Logo"
                width={24}
                height={24}
                className="mr-2"
              />
            </Link>
          </div>

          <div className="mx-4 flex flex-grow items-center">
            <div className="relative mr-2">
              <QuestionMarkCircleIcon className="h-6 w-6 cursor-pointer text-gray-600" />
            </div>
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Search..."
                className="w-full rounded-md border px-2 py-1 pl-8 text-gray-400 placeholder-gray-400"
              />
              <MagnifyingGlassIcon className="absolute left-2 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
            </div>
            <AdjustmentsHorizontalIcon className="ml-2 h-6 w-6 cursor-pointer text-gray-600" />
          </div>

          <div>
            <div className="flex items-center">
              <Link href="/chatlist">
                <ChatBubbleOvalLeftEllipsisIcon className="mr-2 h-6 w-6 cursor-pointer text-gray-600" />
              </Link>
              <div className="relative">
                <UserCircleIcon className="h-6 w-6 cursor-pointer text-gray-600" />
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  )
}
