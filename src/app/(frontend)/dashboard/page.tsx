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
      <div style={{ padding: '100px', textAlign: 'center' }}>
        <h1>ACCESS_DENIED</h1>
        <Link href="/login" style={{ color: 'red' }}>PLEASE LOGIN TO CONTINUE</Link>
      </div>
    )
  }

  const myPosts = await payload.find({
    collection: 'posts',
    where: { author: { equals: user.id } },
  })

  const isAdmin = (user as any).role === 'admin'

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px', fontFamily: 'monospace' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #333', paddingBottom: '20px' }}>
        <h1>DASHBOARD // {user.email}</h1>
        {isAdmin && (
          <Link href="/admin" style={{ color: 'yellow', textDecoration: 'none', border: '1px solid yellow', padding: '2px 5px' }}>
            [SYSTEM_ADMIN_PANEL]
          </Link>
        )}
      </header>

      <section style={{ marginTop: '40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2>YOUR_POSTS</h2>
          {/* LINK TO OUR NEW CUSTOM PAGE */}
          <Link href="/dashboard/create" style={{ background: 'white', color: 'black', padding: '10px', fontWeight: 'bold', textDecoration: 'none' }}>
            + CREATE_NEW_POST
          </Link>
        </div>

        <div style={{ marginTop: '20px' }}>
          {myPosts.docs.map((post) => (
            <div key={post.id} style={{ border: '1px solid #222', padding: '20px', marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <strong style={{ fontSize: '18px' }}>{post.title}</strong>
                <div style={{ fontSize: '10px', opacity: 0.5, marginTop: '5px' }}>ID: {post.id}</div>
              </div>
              
              <div style={{ display: 'flex', gap: '10px' }}>
                
                <Link 
                   href={`/dashboard/edit/${post.id}`} 
                   style={{ border: '1px solid #444', padding: '5px 10px', color: 'white', textDecoration: 'none' }}
                >
                  EDIT
                </Link>
                <DeletePost id={String(post.id)} />
                
              </div>
            </div>
          ))}
          {myPosts.docs.length === 0 && <p style={{ opacity: 0.5 }}>No active transmissions found.</p>}
        </div>
      </section>
    </div>
  )
}