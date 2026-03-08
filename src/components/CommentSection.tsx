// src/components/CommentSection.tsx
'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import CommentItem from './CommentItem'

interface CommentSectionProps {
  postId: string
  initialComments: any[]
  topLevelComments: any[]
  commentMap: Record<string, any[]>
}

export default function CommentSection({ postId, initialComments, topLevelComments, commentMap }: CommentSectionProps) {
  const [commentText, setCommentText] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async () => {
    if (!commentText.trim()) return
    setLoading(true)

    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ post: postId, content: commentText, parent: null }),
      })

      if (res.ok) {
        setCommentText('')
        router.refresh()
      }
    } catch (e) {
      console.error("UPLINK_FAILURE", e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h2 style={{ color: '#ff0000', fontSize: '14px', marginBottom: '20px' }}>[ COMMENTS_LOG: {initialComments.length} ]</h2>
      
      <div style={{ marginBottom: '50px' }}>
        <textarea
          style={{ width: '100%', background: '#0a0a0a', border: '1px solid #333', color: '#00ff00', padding: '15px', fontFamily: 'monospace', minHeight: '80px', outline: 'none' }}
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="ENTER_DATA..."
        />
        <button 
          onClick={handleSubmit} 
          disabled={loading}
          style={{ background: '#ff0000', border: 'none', color: '#fff', padding: '10px 20px', cursor: 'pointer', fontFamily: 'monospace', marginTop: '10px' }}
        >
          {loading ? 'SENDING...' : 'EXECUTE_POST'}
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
        {topLevelComments.map(comment => (
          <CommentItem key={comment.id} comment={comment} commentMap={commentMap} postId={postId} />
        ))}
      </div>
    </div>
  )
}