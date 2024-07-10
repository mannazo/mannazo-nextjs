'use client'

import { useState } from 'react'

export default function SearchBar() {
  const [query, setQuery] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // 검색 로직 구현
    console.log('Searching for:', query)
  }

  return (
    <form onSubmit={handleSearch} className="relative">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
        className="flex w-32 rounded-full border border-gray-300 px-3 py-1 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="absolute right-2 top-1/2 -translate-y-1/2 transform"
      >
        🔍
      </button>
    </form>
  )
}
