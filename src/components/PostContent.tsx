// src/components/PostContent.tsx
import React from 'react'

export default function PostContent({ content }: { content: any }) {
  // Guard against empty content or missing structure
  if (!content?.root?.children) return null

  return (
    <div className="prose" style={{ color: '#ccc', lineHeight: '1.6', fontSize: '18px' }}>
      {content.root.children.map((node: any, i: number) => {
        // 1. Handle Paragraphs
        if (node.type === 'paragraph') {
          return (
            <p key={i} style={{ marginBottom: '20px' }}>
              {node.children?.map((child: any, j: number) => (
                <span
                  key={j}
                  style={{
                    fontWeight: child.format & 1 ? 'bold' : 'normal',
                    textDecoration: child.format & 8 ? 'underline' : 'none',
                    fontStyle: child.format & 2 ? 'italic' : 'normal',
                  }}
                >
                  {child.text}
                </span>
              ))}
            </p>
          )
        }

        // 2. Handle Headings - FIX FOR "Cannot find namespace JSX"
        if (node.type === 'heading') {
          // Explicitly define allowed heading tags
          const Tag = (node.tag || `h${node.attrs?.level || 1}`) as
            | 'h1'
            | 'h2'
            | 'h3'
            | 'h4'
            | 'h5'
            | 'h6'

          return (
            <Tag
              key={i}
              style={{ color: '#ff0000', marginTop: '30px', textTransform: 'uppercase' }}
            >
              {node.children?.[0]?.text}
            </Tag>
          )
        }

        return null
      })}
    </div>
  )
}
