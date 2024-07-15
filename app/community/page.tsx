import React from 'react'
import Feed from '@/components/community/Feed'
import CreatePostButton from '@/components/community/CreatePostButton'
import { getCommunityPosts } from '@/services/api'

async function getPosts() {
  try {
    const response = await getCommunityPosts()
    return response.data.content
  } catch (e) {
    console.error('Error getPosts:', e)
    return []
  }
}

export default async function Home() {
  const posts = await getPosts()

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-center text-3xl font-bold">SHARE YOUR STORY</h1>
      <CreatePostButton />
      <Feed posts={posts} />
    </main>
  )
}
