import { getPayload } from 'payload'
import config from '@/payload.config'
import { PostCard } from '@/components/PostCard'

export default async function HomePage() {
  const payload = await getPayload({ config })

  const posts = await payload.find({
    collection: 'posts',
    depth: 1,
  })

  return (
    <div style={{ display: 'flex', width: '100%', height: '100%', flex: 1 }}>
      {/* MSN-style Left Navigation Sidebar */}
      <aside className="post-sidebar">
        <div style={{ padding: '5px' }}>
          <h2 style={{ fontSize: '14px', margin: '0 0 5px 0', fontWeight: 'bold' }}>
            stinkygirl.net
          </h2>
          <p
            style={{
              margin: '0 0 15px 0',
              fontSize: '11px',
              color: 'var(--msn-text-muted)',
              lineHeight: '1.4',
            }}
          >
            A community archive. Browse updates, read logs, and connect.
          </p>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '12px',
              fontWeight: 'bold',
              color: '#003ba1',
            }}
          >
            <span
              style={{
                width: '9px',
                height: '9px',
                backgroundColor: 'var(--msn-status-green)',
                borderRadius: '50%',
                display: 'inline-block',
                boxShadow: 'inset -1px -1px 2px rgba(0,0,0,0.4)',
              }}
            ></span>
            <span>Archive Online</span>
          </div>
        </div>
      </aside>

      {/* Main Clean Feed Area */}
      <div className="reader-view main-content" style={{ overflowY: 'auto' }}>
        <h1
          style={{
            fontSize: '22px',
            borderBottom: '1px solid var(--msn-border-inner)',
            paddingBottom: '8px',
            marginBottom: '20px',
          }}
        >
          Latest Activity
        </h1>

        <div>
          {posts.docs.length > 0 ? (
            posts.docs.map((post) => <PostCard key={post.id} post={post} />)
          ) : (
            <p style={{ color: 'var(--msn-text-muted)', fontStyle: 'italic' }}>
              NO POSTS FOUND IN DATABASE.
            </p>
          )}
        </div>

        <footer
          style={{
            marginTop: '30px',
            padding: '10px 0 0 0',
            borderTop: '1px dashed #ccc',
            background: 'none',
          }}
        >
          Total entries archived: {posts.totalDocs}
        </footer>
      </div>
    </div>
  )
}
