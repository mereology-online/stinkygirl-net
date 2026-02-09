'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { EditorProvider, useCurrentEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import LinkExtension from '@tiptap/extension-link'
import { TextStyle } from '@tiptap/extension-text-style'

import { MenuBar } from '@/components/MenuBar'

export default function CreatePostPage() {
  const [title, setTitle] = useState('')
  const router = useRouter()

  const extensions = [
    StarterKit,
    Underline,
    TextStyle,
    LinkExtension.configure({ openOnClick: false }),
  ]

  return (
    <div
      style={{
        maxWidth: '1200px',
        margin: '0 auto', // Removed top margin to handle spacing inside
        padding: '40px 20px',
        fontFamily: 'monospace',
        minHeight: '100vh', // Ensure the page is at least full screen
        display: 'flex',
        flexDirection: 'column',
      }}
    >
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
          flexShrink: 0,
        }}
      />

      <EditorProvider
        extensions={extensions}
        content="<p>Start your transmission...</p>"
        immediatelyRender={false}
        slotBefore={null}
        editorProps={{
          attributes: {
            style:
              'min-height: 800px; outline: none; padding: 30px; color: #ccc; background: #050505; border: 1px solid #333; font-size: 18px;',
          },
        }}
      >
        <EditorLayout title={title} router={router} />
      </EditorProvider>
    </div>
  )
}

function EditorLayout({ title, router }: { title: string; router: any }) {
  const { editor } = useCurrentEditor()
  const [isOpen, setIsOpen] = useState(true)

  if (!editor) return null

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: '0px',
        width: '100%',
        position: 'relative',
        flexGrow: 1, // Allow this container to take up remaining height
      }}
    >
      {/* SIDEBAR WRAPPER */}
      <div
        style={{
          position: 'sticky',
          top: '20px', // The distance from the top of the screen when scrolling
          alignSelf: 'flex-start',
          zIndex: 30,
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <aside
          style={{
            width: isOpen ? '200px' : '0px',
            opacity: isOpen ? 1 : 0,
            marginRight: isOpen ? '20px' : '0px',
            overflow: 'hidden',
            flexShrink: 0,
            transition: 'all 0.4s cubic-bezier(0.19, 1, 0.22, 1)',
            background: '#000', // Matches background to prevent overlap flicker
          }}
        >
          <div style={{ width: '200px' }}>
            <MenuBar />
          </div>
        </aside>

        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            background: '#0a0a0a',
            border: '1px solid #333',
            color: isOpen ? '#444' : '#ff0000',
            cursor: 'pointer',
            padding: '10px 8px',
            fontSize: '14px',
            fontFamily: 'monospace',
            marginRight: '20px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {isOpen ? '«' : '»'}
        </button>
      </div>

      {/* EDITOR AREA */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <EditorContent editor={editor} />
        <SubmitAction title={title} router={router} />
      </div>
    </div>
  )
}

function SubmitAction({ title, router }: { title: string; router: any }) {
  const { editor } = useCurrentEditor()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    if (!editor || !title) return
    setIsSubmitting(true)
    const tiptapOutput = editor.getJSON()

    // Mapping Tiptap JSON to Payload CMS Lexical-like structure
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
