import React from 'react'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { headers as getHeaders } from 'next/headers'
import { LogoutButton } from '@/components/LogoutButton' // Ensure this path is correct
import './styles.css'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // 1. Check for logged-in user session
  const headers = await getHeaders()
  const payload = await getPayload({ config })
  const { user } = await payload.auth({ headers })

  return (
    <html lang="en">
      <body>
        <div id="app" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'black', color: 'white' }}>
          
          <header style={{ borderBottom: '1px solid #333', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Link href="/" style={{ fontSize: '24px', fontWeight: 'bold', textDecoration: 'none', color: 'red' }}>
              STINKYGIRL.NET
            </Link>
            
            <nav style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
  <Link href="/posts" style={{ color: 'white', textDecoration: 'none' }}>FEED</Link>
  
  {user ? (
    <>
      <Link href="/dashboard" style={{ color: 'white', textDecoration: 'none' }}>DASHBOARD</Link>
      <LogoutButton />
    </>
  ) : (
    <>
      <Link href="/signup" style={{ color: 'white', textDecoration: 'none' }}>SIGNUP</Link>
      {/* CHANGE THIS FROM /admin TO /login */}
      <Link href="/login" style={{ color: 'white', textDecoration: 'none' }}>LOGIN</Link>
    </>
  )}
</nav>
          </header>

          <main style={{ flex: 1, padding: '20px' }}>
            {children}
          </main>

          <footer style={{ borderTop: '1px solid #333', padding: '20px', textAlign: 'center', fontSize: '12px', opacity: 0.6 }}>
            © 2026 STINKYGIRL.NET — ALL RIGHTS RESERVED
          </footer>
          
        </div>
      </body>
    </html>
  )
}