'use client'
import React, { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import LinkExtension from '@tiptap/extension-link'
import { TextStyle } from '@tiptap/extension-text-style'
import { MenuBar } from '@/components/MenuBar'
import Link from 'next/link'

export default function EditPostPage() {
  const { id } = useParams()
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [loading, setLoading] = useState(true)

  const editor = useEditor({
    extensions: [StarterKit, Underline, TextStyle, LinkExtension.configure({ openOnClick: false })],
    immediatelyRender: false,
    editorProps: {
      attributes: {
        style:
          // Updated border to yellow for the "Edit" theme
          'min-height: 800px; outline: none; padding: 30px; color: #ccc; background: #050505; border: 1px solid yellow; font-size: 18px;',
      },
    },
  })

  useEffect(() => {
    if (!editor || !id) return

    fetch(`/api/posts/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setTitle(data.title)

       
        if (data.content?.root?.children) {
          editor.commands.setContent({
            type: 'doc',
            content: data.content.root.children,
          })
        }
        setLoading(false)
      })
      .catch((err) => {
        console.error('Fetch error:', err)
        setLoading(false)
      })
  }, [id, editor])

  const handleUpdate = async () => {
    if (!editor || !title) return

    const payload = {
      root: {
        type: 'root',
        version: 1,
        children:
          editor.getJSON().content?.map((n: any) => ({
            ...n,
            direction: 'ltr',
            version: 1,
          })) || [],
      },
    }

    const res = await fetch(`/api/posts/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content: payload }),
    })

    if (res.ok) {
      router.push('/dashboard')
      router.refresh()
    }
  }

  if (loading)
    return (
      <div
        style={{
          color: 'yellow',
          padding: '40px',
          fontFamily: 'monospace',
          background: '#000',
          height: '100vh',
        }}
      >
        ACCESSING_DATABASE...
      </div>
    )

  return (
    <div
      style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '40px 20px',
        fontFamily: 'monospace',
      }}
    >
      <Link
        href="/dashboard"
        style={{ color: '#444', textDecoration: 'none', marginBottom: '10px', display: 'block' }}
      >
        &lt;-- ABORT_EDIT
      </Link>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{
          width: '100%',
          fontSize: '32px',
          background: 'none',
          border: 'none',
          borderBottom: '2px solid yellow',
          color: 'yellow',
          outline: 'none',
          marginBottom: '40px',
          fontWeight: 'bold',
        }}
      />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '160px 1fr',
          gap: '40px',
          alignItems: 'start',
        }}
      >
        <aside style={{ position: 'sticky', top: '20px' }}>
          <MenuBar editor={editor} />
        </aside>

        <div style={{ minWidth: 0 }}>
          <EditorContent editor={editor} />
          <button
            onClick={handleUpdate}
            style={{
              marginTop: '40px',
              width: '100%',
              padding: '20px',
              background: 'yellow',
              color: 'black',
              border: 'none',
              fontWeight: 'bold',
              cursor: 'pointer',
              fontSize: '16px',
            }}
          >
            UPDATE_BROADCAST
          </button>
        </div>
      </div>
    </div>
  )
}
