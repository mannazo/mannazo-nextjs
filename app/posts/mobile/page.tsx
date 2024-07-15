import PostFeed from '@/components/posts/mobile/PostFeed'

export default function Page() {
  return (
    <div className="h-screen snap-y snap-mandatory overflow-y-scroll scrollbar-hide">
      <PostFeed />
    </div>
  )
}
