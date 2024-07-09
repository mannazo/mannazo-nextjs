import Link from 'next/link'

export default function AboutMenu() {
  return (
    <div className="relative group">
      <button className="text-gray-600 hover:text-gray-800">About</button>
      <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg hidden group-hover:block">
        <Link
          href="/about/company"
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          Company
        </Link>
        <Link
          href="/about/team"
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          Team
        </Link>
        <Link
          href="/about/contact"
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          Contact
        </Link>
      </div>
    </div>
  )
}
