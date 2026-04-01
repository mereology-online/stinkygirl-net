import { getPayload } from 'payload'
import config from '@/payload.config'
import { headers as getHeaders } from 'next/headers'
import Link from 'next/link'
import { DeletePost } from '@/components/DeletePost'

export default async function DashboardPage() {
  const headers = await getHeaders()
  const payload = await getPayload({ config })
  const { user } = await payload.auth({ headers })

  if (!user) {
    return (
      <div className="main-wrapper" style={{ textAlign: 'center', paddingTop: '100px' }}>
        <h1>ACCESS_DENIED</h1>
        <Link href="/login" style={{ color: 'red' }}>
          PLEASE LOGIN TO CONTINUE
        </Link>
      </div>
    )
  }

  const myPosts = await payload.find({
    collection: 'posts',
    where: { author: { equals: user.id } },
  })

  const isAdmin = (user as any).role === 'admin'

  return (
    /* We use the wrapper classes from our CSS instead of inline max-widths */
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1 className="dashboard-title">DASHBOARD // {user.displayName}</h1>
        {isAdmin && (
          <Link href="/admin" className="admin-link">
            [SYSTEM_ADMIN_PANEL]
          </Link>
        )}
      </header>

      <section className="dashboard-section">
        <div className="section-controls">
          <h2>YOUR_POSTS</h2>
          <div className="button-group">
            <Link href="/dashboard/create" className="btn-primary">
              + CREATE_NEW_POST
            </Link>
            <Link href="/dashboard/profile" className="btn-outline">
              EDIT_PROFILE
            </Link>
          </div>
        </div>

        <div className="posts-list">
          {myPosts.docs.map((post) => (
            <div key={post.id} className="post-item">
              <div className="post-info">
                <strong className="post-item-title">{post.title}</strong>
                <div className="post-item-id">ID: {post.id}</div>
              </div>

              <div className="post-actions">
                <Link href={`/dashboard/edit/${post.id}`} className="btn-edit">
                  EDIT
                </Link>
                <DeletePost id={String(post.id)} />
              </div>
            </div>
          ))}
          {myPosts.docs.length === 0 && (
            <p className="empty-state">No active transmissions found.</p>
          )}
        </div>
      </section>
    </div>
  )
}
