// src/components/LikeSystem.tsx
'use client'
import React, { useState } from 'react'

export default function LikeSystem({ postId, initialLikes = 0 }: { postId: string, initialLikes: number }) {
  const [likes, setLikes] = useState(initialLikes)
  const [active, setActive] = useState(false)

  const handlePulse = async () => {
    // Optimistic UI
    setLikes(prev => active ? prev - 1 : prev + 1)
    setActive(!active)

    // API call to Payload collection 'likes' or 'posts/id'
    await fetch(`/api/posts/${postId}/like`, { method: 'POST' })
  }

  return (
    <button 
      onClick={handlePulse}
      style={{
        background: 'none',
        border: `1px solid ${active ? '#ff0000' : '#333'}`,
        color: active ? '#ff0000' : '#444',
        padding: '5px 15px',
        cursor: 'pointer',
        fontFamily: 'monospace'
      }}
    >
      PULSE: {likes} {active ? '•' : ''}
    </button>
  )
}