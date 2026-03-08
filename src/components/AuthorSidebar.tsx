// src/components/AuthorSidebar.tsx
export default function AuthorSidebar({ author }: { author: any }) {
  if (!author || typeof author !== 'object') return null

  return (
    <div style={{ background: '#111', padding: '20px', border: '1px solid #333' }}>
      <h2 style={{ color: '#fff' }}>{author.displayName}</h2>
      <p style={{ color: '#888' }}>{author.bio}</p>
    </div>
  )
}