'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function CreatePostPage() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          // Lexical Rich Text format for Payload 3.0
          content: {
            root: {
              type: 'root',
              children: [
                {
                  type: 'paragraph',
                  children: [{ text: content, type: 'text' }],
                },
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              version: 1,
            },
          },
        }),
      })

      if (res.ok) {
        router.push('/dashboard')
        router.refresh()
      } else {
        alert('Failed to create post. Are you logged in?')
      }
    } catch (err) {
      console.error(err)
      alert('An error occurred.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div style={{ maxWidth: '600px', margin: '60px auto', padding: '20px', fontFamily: 'monospace' }}>
      <Link href="/dashboard" style={{ color: '#888', textDecoration: 'none' }}>{'<-- BACK_TO_DASHBOARD'}</Link>
      
      <h1 style={{ marginTop: '20px', borderBottom: '1px solid #333', paddingBottom: '10px' }}>
        NEW_TRANSMISSION
      </h1>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '30px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <label>TITLE</label>
          <input
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ padding: '10px', background: '#111', color: 'white', border: '1px solid #444' }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <label>BODY_TEXT</label>
          <textarea
            required
            rows={10}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={{ padding: '10px', background: '#111', color: 'white', border: '1px solid #444', resize: 'vertical' }}
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            padding: '15px',
            background: isSubmitting ? '#333' : 'red',
            color: 'white',
            border: 'none',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          {isSubmitting ? 'UPLOADING...' : 'BROADCAST_TO_NETWORK'}
        </button>
      </form>
    </div>
  )
}