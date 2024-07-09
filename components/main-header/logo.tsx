import Link from 'next/link'
import Image from 'next/image'

export default function Logo() {
  return (
    <Link
      href="/"
      className="text-2xl font-bold text-blue-600 hover:text-blue-800"
    >
      MANNAZU
    </Link>
  )
}
