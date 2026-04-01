import React from 'react'
import Link from 'next/link'

export const PostCard = ({ post }: { post: any }) => {
  return (
    <div
      style={{
        borderBottom: '1px solid var(--border-dim)',
        padding: '32px 0',
        fontFamily: 'var(--font-mono)',
      }}
    >
      <h2
        style={{
          margin: '0 0 8px 0',
          fontSize: '1.5rem',
          textTransform: 'uppercase',
          letterSpacing: '-0.5px',
        }}
      >
        {post.title}
      </h2>

      <div
        style={{
          fontSize: '14px',
          color: '#888',
          marginBottom: '16px',
          display: 'flex',
          gap: '12px',
        }}
      >
        <span>BY: {post.author?.displayName || 'ANONYMOUS'}</span>
        <span>/</span>
        <span>ID: {post.id}</span>
      </div>

      <Link
        href={`/posts/${post.id}`}
        className="post-card-link"
        style={{
          display: 'inline-block',
          color: 'var(--neon-red)',
          fontWeight: 'bold',
          textDecoration: 'none',
          border: '1px solid var(--neon-red)',
          padding: '4px 12px',
          fontSize: '14px',
          transition: 'all 0.1s ease-in-out',
        }}
      >
        READ_POST
      </Link>
    </div>
  )
}
