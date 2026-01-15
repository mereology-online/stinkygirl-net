import { getPayload } from 'payload'
import config from '@/payload.config'
import { PostCard } from '@/components/PostCard'

export default async function PostsPage() {
  const payload = await getPayload({ config })

  const posts = await payload.find({
    collection: 'posts',
    depth: 1,
  })

  return (
    <div style={{ 
      background: 'black', 
      color: 'white', 
      minHeight: '100vh', 
      padding: '40px',
      fontFamily: 'monospace' 
    }}>
      <h1 style={{ borderBottom: '2px solid red', paddingBottom: '10px' }}>
        DEBUG_FEED
      </h1>
      
      <div style={{ marginTop: '20px' }}>
        {posts.docs.length > 0 ? (
          posts.docs.map((post) => (
            <PostCard key={post.id} post={post} />
          ))
        ) : (
          <p>NO POSTS FOUND IN DATABASE. GO TO /ADMIN TO CREATE ONE.</p>
        )}
      </div>

      <footer style={{ marginTop: '40px', fontSize: '12px', opacity: 0.5 }}>
        Total Posts Found: {posts.totalDocs}
      </footer>
    </div>
  )
}