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
      <body>
        <div id="app">
          <header className="site-header">
            <Link href="/" className="logo">
              STINKYGIRL.NET
            </Link>

            <nav className="site-nav">
              <Link href="/posts">FEED</Link>
              {user ? (
                <>
                  <Link href="/dashboard">DASHBOARD</Link>
                  <LogoutButton />
                </>
              ) : (
                <>
                  <Link href="/signup">SIGNUP</Link>
                  <Link href="/login">LOGIN</Link>
                </>
              )}
            </nav>
          </header>

          {/* MAIN CONTAINER */}
          <main>{children}</main>

          <footer>© 2026 STINKYGIRL.NET — ALL RIGHTS RESERVED</footer>
        </div>
      </body>
    </html>
  )
}
