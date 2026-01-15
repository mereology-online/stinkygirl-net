import React from 'react'
import Link from 'next/link'

export const PostCard = ({ post }: { post: any }) => {
  return (
    <div style={{ borderBottom: '1px solid white', padding: '20px 0' }}>
      <h2 style={{ margin: 0 }}>{post.title}</h2>
      <p style={{ fontSize: '14px', color: '#888' }}>
        By: {post.author?.displayName || 'Anonymous'} | ID: {post.id}
      </p>
      <Link href={`/posts/${post.id}`} style={{ color: 'red', fontWeight: 'bold' }}>
        OPEN POST
      </Link>
    </div>
  )
}