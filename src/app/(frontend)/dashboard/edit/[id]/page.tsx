'use client'
import React, { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'

export default function EditPostPage() {
  const { id } = useParams()
  const router = useRouter()
  
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // 1. Fetch the existing post data
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/posts/${id}`)
        if (!res.ok) throw new Error('Post not found')
        const data = await res.json()
        
        setTitle(data.title)
        // Extract text from Payload's Lexical JSON structure
        const text = data.content?.root?.children?.[0]?.children?.[0]?.text || ''
        setContent(text)
      } catch (err) {
        console.error(err)
        alert('Could not load post data.')
      } finally {
        setLoading(false)
      }
    }
    fetchPost()
  }, [id])

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const res = await fetch(`/api/posts/${id}`, {
        method: 'PATCH', // PATCH updates existing records
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          content: {
            root: {
              type: 'root',
              children: [{ type: 'paragraph', children: [{ text: content, type: 'text' }] }],
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
        alert('Update failed.')
      }
    } catch (err) {
      alert('An error occurred.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) return <div style={{ padding: '60px', color: 'white' }}>LOADING_TRANSMISSION...</div>

  return (
    <div style={{ maxWidth: '600px', margin: '60px auto', padding: '20px', fontFamily: 'monospace' }}>
      <Link href="/dashboard" style={{ color: '#888', textDecoration: 'none' }}>{'<-- CANCEL_EDIT'}</Link>
      
      <h1 style={{ marginTop: '20px', borderBottom: '1px solid yellow', paddingBottom: '10px' }}>
        EDIT_TRANSMISSION
      </h1>

      <form onSubmit={handleUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '30px' }}>
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
            style={{ padding: '10px', background: '#111', color: 'white', border: '1px solid #444' }}
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            padding: '15px',
            background: isSubmitting ? '#333' : 'yellow',
            color: 'black',
            border: 'none',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          {isSubmitting ? 'SAVING...' : 'UPDATE_BROADCAST'}
        </button>
      </form>
    </div>
  )
}