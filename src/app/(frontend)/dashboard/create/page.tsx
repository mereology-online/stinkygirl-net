'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import LinkExtension from '@tiptap/extension-link'
import { TextStyle } from '@tiptap/extension-text-style'
import { MenuBar } from '@/components/MenuBar'

export default function CreatePostPage() {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const editor = useEditor({
    extensions: [StarterKit, Underline, TextStyle, LinkExtension.configure({ openOnClick: false })],
    content: '<p>Start your transmission...</p>',
    immediatelyRender: false,
    editorProps: {
      attributes: {
        style:
          'min-height: 700px; outline: none; padding: 30px; color: #ccc; background: #050505; border: 1px solid #333; font-size: 18px;',
      },
    },
  })

  const handleSubmit = async () => {
    if (!editor || !title) return
    const payload = {
      root: {
        type: 'root',
        version: 1,
        children:
          editor.getJSON().content?.map((n: any) => ({ ...n, direction: 'ltr', version: 1 })) || [],
      },
    }
    const res = await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content: payload }),
    })
    if (res.ok) {
      router.push('/dashboard')
      router.refresh()
    }
  }

  if (!mounted) return null

  return (
    <div
      style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '40px 20px',
        fontFamily: 'monospace',
      }}
    >
      {/* TITLE AT TOP */}
      <input
        placeholder="TRANSMISSION_TITLE"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{
          width: '100%',
          fontSize: '32px',
          background: 'none',
          border: 'none',
          borderBottom: '2px solid #222',
          color: '#ff0000',
          outline: 'none',
          marginBottom: '40px',
          fontWeight: 'bold',
        }}
      />

      {/* GRID: TOOLBAR LEFT, TEXTAREA RIGHT */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '160px 1fr',
          gap: '40px',
          alignItems: 'start',
        }}
      >
        <div style={{ position: 'sticky', top: '20px' }}>
          <MenuBar editor={editor} />
        </div>

        <div style={{ minWidth: 0 }}>
          <EditorContent editor={editor} />

          {/* SUBMIT AT BOTTOM OF TEXTAREA COLUMN */}
          <button
            onClick={handleSubmit}
            style={{
              marginTop: '40px',
              width: '100%',
              padding: '20px',
              background: '#ff0000',
              color: 'white',
              border: 'none',
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
          >
            INITIATE_BROADCAST
          </button>
        </div>
      </div>
    </div>
  )
}

function SubmitAction({ title, router, editor }: { title: string; router: any; editor: any }) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    if (!editor || !title) return
    setIsSubmitting(true)
    const tiptapOutput = editor.getJSON()

    // YOUR ORIGINAL MAPPING LOGIC RESTORED
    const payloadData = {
      root: {
        type: 'root',
        format: '',
        indent: 0,
        version: 1,
        children:
          tiptapOutput.content?.map((node: any) => ({
            ...node,
            direction: 'ltr',
            format: '',
            indent: 0,
            version: 1,
            tag: node.type === 'heading' ? `h${node.attrs?.level || 1}` : undefined,
          })) || [],
      },
    }

    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content: payloadData }),
      })
      if (res.ok) {
        router.push('/dashboard')
        router.refresh()
      }
    } catch (err) {
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <button
      onClick={handleSubmit}
      disabled={isSubmitting}
      style={{
        marginTop: '20px',
        width: '100%',
        padding: '20px',
        background: isSubmitting ? '#222' : '#ff0000',
        color: 'white',
        border: 'none',
        fontWeight: 'bold',
        cursor: 'pointer',
        fontFamily: 'monospace',
        fontSize: '16px',
        boxShadow: isSubmitting ? 'none' : '0 0 15px rgba(255, 0, 0, 0.3)',
      }}
    >
      {isSubmitting ? 'UPLOADING...' : 'INITIATE_BROADCAST'}
    </button>
  )
}
