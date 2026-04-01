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

  // Logic to switch between narrow reader view and wide editor dashboard
  const layoutClass = user ? 'editor-view' : 'reader-view'

  return (
    <html lang="en">
      {/* Applying classes here allows the CSS to control the mobile-first behavior */}
      <body className={`pretext-root ${layoutClass}`}>
        <div id="app">
          <header className="site-header">
            <div className="header-container">
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
            </div>
          </header>

          {/* Use the CSS class instead of inline flex styles to prevent squashing */}
          <main className="main-content">{children}</main>

          <footer className="site-footer">
            <div className="footer-container">© 2026 STINKYGIRL.NET — ALL RIGHTS RESERVED</div>
          </footer>
        </div>
      </body>
    </html>
  )
}
