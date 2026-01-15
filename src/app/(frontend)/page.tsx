import Link from 'next/link'

export default function HomePage() {
  return (
    <div style={{ textAlign: 'center', padding: '100px 20px' }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '10px' }}>WELCOME TO STINKYGIRL.HUB</h1>
      <p style={{ color: '#888', marginBottom: '40px' }}>A community archive.</p>
      
      <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
        <Link href="/posts" style={{ padding: '15px 30px', background: 'red', color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>
          ENTER FEED
        </Link>
        <Link href="/signup" style={{ padding: '15px 30px', border: '1px solid white', color: 'white', textDecoration: 'none' }}>
          CREATE PROFILE
        </Link>
      </div>
    </div>
  )
}