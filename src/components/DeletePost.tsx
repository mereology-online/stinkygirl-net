'use client'
import { useRouter } from 'next/navigation'
import React from 'react'

export const DeletePost = ({ id }: { id: string }) => {
  const router = useRouter()

  const handleDelete = async () => {
    if (!confirm('Permanently delete this post?')) return
    const res = await fetch(`/api/posts/${id}`, { method: 'DELETE' })
    if (res.ok) router.refresh()
  }

  return (
    <button onClick={handleDelete} style={{ color: 'red', border: '1px solid red', background: 'none', cursor: 'pointer', padding: '5px' }}>
      DELETE
    </button>
  )
}