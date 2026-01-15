'use client'
import React, { useState } from 'react'

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('') 

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const res = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        email, 
        password, 
        displayName, 
        role: 'user' // Ensures they default to the restricted role
      }),
    })

    if (res.ok) {
      alert(`Welcome, ${displayName}! Account created.`)
      window.location.href = '/dashboard'
    } else {
      alert('Signup failed. That email might be taken.')
    }
  }

  return (
    <div style={{ maxWidth: '400px', margin: '100px auto', padding: '20px', border: '1px solid #333', fontFamily: 'monospace' }}>
      <h2 style={{ marginBottom: '20px', borderBottom: '1px solid #333', paddingBottom: '10px' }}>NEW_USER_REGISTRATION</h2>
      
      <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input 
          type="text" 
          placeholder="PUBLIC NAME (DISPLAYED ON POSTS)" 
          value={displayName} 
          onChange={(e) => setDisplayName(e.target.value)}
          style={{ padding: '10px', background: '#111', color: 'white', border: '1px solid #444' }} 
          required 
        />
        <input 
          type="email" 
          placeholder="EMAIL (FOR LOGIN)" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: '10px', background: '#111', color: 'white', border: '1px solid #444' }} 
          required 
        />
        <input 
          type="password" 
          placeholder="PASSWORD" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: '10px', background: '#111', color: 'white', border: '1px solid #444' }} 
          required 
        />
        <button type="submit" style={{ padding: '12px', background: 'red', color: 'white', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>
          CREATE_PROFILE
        </button>
      </form>
      
      <p style={{ marginTop: '20px', fontSize: '10px', opacity: 0.5 }}>
        By registering, you agree to the stinkygirl.net community guidelines.
      </p>
    </div>
  )
}