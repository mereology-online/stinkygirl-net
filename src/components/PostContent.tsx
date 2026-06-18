// src/components/PostContent.tsx
import React from 'react'

export default function PostContent({ content }: { content: any }) {
  // Guard against missing content
  // Since you wrap everything in 'root', we look there first
  const nodes = content?.root?.children || []

  if (!nodes.length) return null

  return (
    <div className="prose" style={{ color: '#ccc', lineHeight: '1.6', fontSize: '18px' }}>
      {nodes.map((node: any, i: number) => {
        // 1. Handle Paragraphs (TipTap style)
        if (node.type === 'paragraph') {
          return (
            <p key={i} style={{ marginBottom: '20px' }}>
              {/* CHANGE: node.content instead of node.children */}
              {node.content?.map((child: any, j: number) => {
                // TipTap uses 'marks' for formatting instead of 'format' numbers
                const isBold = child.marks?.some((m: any) => m.type === 'bold')
                const isItalic = child.marks?.some((m: any) => m.type === 'italic')

                return (
                  <span
                    key={j}
                    style={{
                      fontWeight: isBold ? 'bold' : 'normal',
                      fontStyle: isItalic ? 'italic' : 'normal',
                    }}
                  >
                    {child.text}
                  </span>
                )
              })}
            </p>
          )
        }

        // 2. Handle Headings
        if (node.type === 'heading') {
          const Tag = `h${node.attrs?.level || 1}` as keyof JSX.IntrinsicElements
          return (
            <Tag key={i} style={{ color: 'red', marginTop: '30px', textTransform: 'uppercase' }}>
              {node.content?.[0]?.text}
            </Tag>
          )
        }

        return null
      })}
    </div>
  )
}
