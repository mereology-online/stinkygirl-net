'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function ViewProfilePage() {
  const [displayName, setDisplayName] = useState('')
  const [bio, setBio] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const router = useRouter()

  // Fetch current user data on mount
  useEffect(() => {
    async function fetchUser() {
      const res = await fetch('/api/users/me')
      if (res.ok) {
        const data = await res.json()
        setDisplayName(data.user.displayName || '')
        setBio(data.user.bio || '')
      }
      setLoading(false)
    }
    fetchUser()
  }, [])

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    // We need the user ID to update. /api/users/me gives us that.
    const meRes = await fetch('/api/users/me')
    const meData = await meRes.json()

    const res = await fetch(`/api/users/${meData.user.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ displayName, bio }),
    })

    if (res.ok) {
      alert('IDENTITY_UPDATED')
      router.refresh()
    } else {
      alert('UPDATE_FAILED')
    }
    setSaving(false)
  }

  if (loading)
    return <div style={{ fontFamily: 'monospace', padding: '50px' }}>LOADING_IDENTITY...</div>

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', fontFamily: 'monospace' }}>
      <Link href="/dashboard" style={{ color: '#888', textDecoration: 'none' }}>
        {'<-- BACK_TO_DASHBOARD'}
      </Link>

      <h1 style={{ marginTop: '20px', borderBottom: '1px solid #333', paddingBottom: '10px' }}>
        USER_PROFILE_SETTINGS
      </h1>

      <form
        onSubmit={handleUpdate}
        style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '30px' }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <label style={{ color: 'red' }}>PUBLIC_DISPLAY_NAME</label>
          <input
            required
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            style={{
              padding: '10px',
              background: '#111',
              color: 'white',
              border: '1px solid #444',
            }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <label style={{ color: 'red' }}>BIOGRAPHICAL_DATA (MAX 160)</label>
          <textarea
            rows={4}
            maxLength={160}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Tell the network who you are..."
            style={{
              padding: '10px',
              background: '#111',
              color: 'white',
              border: '1px solid #444',
              resize: 'none',
            }}
          />
          <small style={{ color: '#555', textAlign: 'right' }}>{bio.length}/160</small>
        </div>

        <button
          type="submit"
          disabled={saving}
          style={{
            padding: '15px',
            background: saving ? '#333' : 'white',
            color: 'black',
            border: 'none',
            fontWeight: 'bold',
            cursor: 'pointer',
          }}
        >
          {saving ? 'SYNCING...' : 'UPDATE_NETWORK_IDENTITY'}
        </button>
      </form>
    </div>
  )
}
