import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'
import React from 'react'
import PostContent from '@/components/PostContent'
import AuthorSidebar from '@/components/AuthorSidebar'

export default async function PostViewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const payload = await getPayload({ config })

  const post = await payload.findByID({
    collection: 'posts',
    id: id,
    depth: 1,
  })

  if (!post) return notFound()

  return (
    /* We use main-wrapper to get the Pretext centering and max-width */
    <div className="main-wrapper">
      <div className="post-layout-grid">
        {/* MAIN CONTENT AREA */}
        <main className="post-main">
          <header className="post-header">
            <h1 className="post-title">{post.title}</h1>
            <div className="post-meta">POST_ID: {id} // STATUS: DEPLOYED</div>
          </header>

          {/* This container now has the TipTap fixes applied via CSS */}
          <div className="tiptap-content">
            <PostContent content={post.content} />
          </div>
        </main>

        {/* SIDEBAR: Will stack on mobile, stay sticky on desktop */}
        <aside className="post-sidebar">
          <AuthorSidebar author={post.author} />
        </aside>
      </div>
    </div>
  )
}
