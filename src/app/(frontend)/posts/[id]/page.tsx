import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'
import React from 'react'

// IMPORT CHECK: Ensure these are "export default"
import PostContent from '@/components/PostContent'
import AuthorSidebar from '@/components/AuthorSidebar'

export default async function PostViewPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  // 1. Resolve the Next.js 15 params promise
  const { id } = await params
  
  const payload = await getPayload({ config })

  // 2. Fetch the post with depth: 1 to get the Author details
  const post = await payload.findByID({
    collection: 'posts',
    id: id,
    depth: 1,
  })

  if (!post) return notFound()

  return (
    <div style={{ 
      maxWidth: '1200px', 
      margin: '60px auto', 
      padding: '0 20px', 
      fontFamily: 'monospace',
      backgroundColor: '#000',
      color: '#ccc'
    }}>
      <div style={{ display: 'flex', gap: '40px', alignItems: 'flex-start' }}>
        
        {/* MAIN CONTENT AREA */}
        <main style={{ flex: 1, minWidth: 0 }}>
          <header style={{ marginBottom: '40px' }}>
            <h1 style={{ 
              color: '#ff0000', 
              fontSize: '42px', 
              marginBottom: '10px',
              textTransform: 'uppercase'
            }}>
              {post.title}
            </h1>
            <div style={{ fontSize: '12px', color: '#444' }}>
              POST_ID: {id} // STATUS: DEPLOYED
            </div>
          </header>

          {/* This component handles the Tiptap/Lexical JSON */}
          <PostContent content={post.content} />
        </main>

        {/* SIDEBAR */}
        <aside style={{ width: '300px', position: 'sticky', top: '40px', flexShrink: 0 }}>
          <AuthorSidebar author={post.author} />
        </aside>

      </div>
    </div>
  )
}