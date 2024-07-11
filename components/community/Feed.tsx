import FeedItem from './FeedItem'

const Feed = ({ posts }) => {
  return (
    <div className="mx-auto flex w-full max-w-[600px] flex-col items-center">
      {posts.map((post) => (
        <FeedItem key={post.id} post={post} />
      ))}
    </div>
  )
}

export default Feed
