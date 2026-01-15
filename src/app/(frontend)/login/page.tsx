'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const res = await fetch('/api/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })

    if (res.ok) {
      router.push('/dashboard')
      router.refresh()
    } else {
      alert('ACCESS_DENIED: Invalid credentials.')
      setLoading(false)
    }
  }

  return (
    <div style={{ padding: '100px', textAlign: 'center', fontFamily: 'monospace' }}>
      <h1>LOGIN_REQUIRED</h1>
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '300px', margin: '0 auto' }}>
        <input 
          type="email" 
          placeholder="EMAIL" 
          value={email} 
          onChange={e => setEmail(e.target.value)} 
          style={{ padding: '10px', background: '#111', color: 'white', border: '1px solid #333' }}
        />
        <input 
          type="password" 
          placeholder="PASSWORD" 
          value={password} 
          onChange={e => setPassword(e.target.value)} 
          style={{ padding: '10px', background: '#111', color: 'white', border: '1px solid #333' }}
        />
        <button type="submit" style={{ background: 'red', color: 'white', border: 'none', padding: '10px', cursor: 'pointer' }}>
          {loading ? 'WAIT...' : 'CONNECT'}
        </button>
      </form>
      <Link href="/signup" style={{ display: 'block', marginTop: '20px', color: '#555' }}>NEED AN ACCOUNT? SIGNUP</Link>
    </div>
  )
}