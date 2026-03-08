// src/components/CommentItem.tsx
'use client'
import React from 'react'

export default function CommentItem({ comment, commentMap }: any) {
  const replies = commentMap[comment.id] || []
  
  // Property access is key: Rendering 'comment.author' (object) = CRASH. 
  // Rendering 'comment.author.displayName' (string) = SUCCESS.
  const authorName = comment.author?.displayName || 'Anonymous'

  return (
    <div style={{ padding: '10px', borderLeft: '1px solid #222', marginTop: '10px' }}>
      <div style={{ fontSize: '12px', color: '#ff0000' }}>{authorName}</div>
      <p style={{ color: '#ccc' }}>{comment.content}</p>
      
      {replies.length > 0 && (
        <div className="replies">
          {replies.map((reply: any) => (
            <CommentItem key={reply.id} comment={reply} commentMap={commentMap} />
          ))}
        </div>
      )}
    </div>
  )
}