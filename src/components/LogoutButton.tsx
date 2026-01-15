'use client'
import React from 'react'

export const LogoutButton = () => {
  const handleLogout = async () => {
    // Hits the Payload auth endpoint to clear the cookie
    await fetch('/api/users/logout', { method: 'POST' })
    // Send them back to the home page
    window.location.href = '/'
  }

  return (
    <button 
      onClick={handleLogout}
      style={{ 
        background: 'none', 
        border: '1px solid #ff0000', 
        color: '#ff0000', 
        cursor: 'pointer', 
        padding: '5px 10px', 
        fontFamily: 'monospace',
        fontSize: '12px',
        textTransform: 'uppercase'
      }}
    >
      [DISCONNECT]
    </button>
  )
}