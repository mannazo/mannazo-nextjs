export default function BlogPage({ params }: { params: { slug?: string[] } }) {
  if (!params.slug) {
    return <div>Blog Home Page</div>
  }

  return <div>Blog Post: {params.slug.join('/')}</div>
}
