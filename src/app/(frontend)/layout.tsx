import React from 'react'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { headers as getHeaders } from 'next/headers'
import { LogoutButton } from '@/components/LogoutButton'
import './styles.css'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const headers = await getHeaders()
  const payload = await getPayload({ config })
  const { user } = await payload.auth({ headers })

  return (
    <html lang="en">
      <body style={{ margin: 0, background: 'black', color: 'white' }}>
        <div
          id="app"
          style={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            overflowX: 'hidden',
          }}
        >
          <header
            style={{
              borderBottom: '1px solid #333',
              padding: '20px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              zIndex: 100,
              background: 'black',
            }}
          >
            <Link
              href="/"
              style={{
                fontSize: '24px',
                fontWeight: 'bold',
                textDecoration: 'none',
                color: 'red',
                fontFamily: 'monospace',
              }}
            >
              STINKYGIRL.NET
            </Link>

            <nav
              style={{
                display: 'flex',
                gap: '20px',
                alignItems: 'center',
                fontFamily: 'monospace',
              }}
            >
              <Link href="/posts" style={{ color: 'white', textDecoration: 'none' }}>
                FEED
              </Link>
              {user ? (
                <>
                  <Link href="/dashboard" style={{ color: 'white', textDecoration: 'none' }}>
                    DASHBOARD
                  </Link>
                  <LogoutButton />
                </>
              ) : (
                <>
                  <Link href="/signup" style={{ color: 'white', textDecoration: 'none' }}>
                    SIGNUP
                  </Link>
                  <Link href="/login" style={{ color: 'white', textDecoration: 'none' }}>
                    LOGIN
                  </Link>
                </>
              )}
            </nav>
          </header>

          {/* MAIN CONTAINER: No padding here to allow sticky items to align with viewport */}
          <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>{children}</main>

          <footer
            style={{
              borderTop: '1px solid #333',
              padding: '20px',
              textAlign: 'center',
              fontSize: '12px',
              opacity: 0.6,
              fontFamily: 'monospace',
            }}
          >
            © 2026 STINKYGIRL.NET — ALL RIGHTS RESERVED
          </footer>
        </div>
      </body>
    </html>
  )
}
