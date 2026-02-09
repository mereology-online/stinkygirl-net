'use client'
import { useCurrentEditor, Editor } from '@tiptap/react'
import React, { useState, useEffect } from 'react'

/**
 * State Selector logic to extract active/disabled status
 */
export const menuBarStateSelector = (editor: Editor | null) => {
  if (!editor) return {}

  return {
    // Marks
    isBold: editor.isActive('bold'),
    canBold: editor.can().chain().focus().toggleBold().run(),
    isItalic: editor.isActive('italic'),
    canItalic: editor.can().chain().focus().toggleItalic().run(),
    isStrike: editor.isActive('strike'),
    canStrike: editor.can().chain().focus().toggleStrike().run(),
    isCode: editor.isActive('code'),
    canCode: editor.can().chain().focus().toggleCode().run(),

    // Nodes
    isParagraph: editor.isActive('paragraph'),
    isHeading1: editor.isActive('heading', { level: 1 }),
    isHeading2: editor.isActive('heading', { level: 2 }),
    isHeading3: editor.isActive('heading', { level: 3 }),
    isBulletList: editor.isActive('bulletList'),
    isOrderedList: editor.isActive('orderedList'),
    isCodeBlock: editor.isActive('codeBlock'),
    isBlockquote: editor.isActive('blockquote'),
    isLink: editor.isActive('link'),

    // History
    canUndo: editor.can().undo(),
    canRedo: editor.can().redo(),
  }
}

export function MenuBar() {
  const { editor } = useCurrentEditor()
  const [, setUpdate] = useState(0)

  // Sync Tiptap state with React state for instant "glow" updates
  useEffect(() => {
    if (!editor) return
    const updateHandler = () => setUpdate((s) => s + 1)
    editor.on('transaction', updateHandler)
    return () => {
      editor.off('transaction', updateHandler)
    }
  }, [editor])

  if (!editor) return null

  const s = menuBarStateSelector(editor)

  const exec = (action: () => void) => (e: React.MouseEvent) => {
    e.preventDefault()
    action()
  }

  return (
    <div
      style={{
        padding: '12px',
        background: '#0a0a0a',
        border: '1px solid #333',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        width: '160px', // Fixed width for sidebar
        position: 'sticky',
        top: '20px', // Distance from top of viewport when scrolling
        maxHeight: 'calc(100vh - 40px)',
        overflowY: 'auto',
      }}
    >
      {/* --- MARKS SECTION --- */}
      <div>
        <Label>INLINE</Label>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px' }}>
          <MenuBtn
            label="B"
            active={s.isBold}
            disabled={!s.canBold}
            onMouseDown={exec(() => editor.chain().focus().toggleBold().run())}
          />
          <MenuBtn
            label="I"
            active={s.isItalic}
            disabled={!s.canItalic}
            onMouseDown={exec(() => editor.chain().focus().toggleItalic().run())}
          />
          <MenuBtn
            label="S"
            active={s.isStrike}
            disabled={!s.canStrike}
            onMouseDown={exec(() => editor.chain().focus().toggleStrike().run())}
          />
          <MenuBtn
            label="<>"
            active={s.isCode}
            disabled={!s.canCode}
            onMouseDown={exec(() => editor.chain().focus().toggleCode().run())}
          />
        </div>
        <MenuBtn
          label="LINK"
          active={s.isLink}
          onMouseDown={(e: React.MouseEvent) => {
            e.preventDefault()
            const url = window.prompt('URL:')
            if (url) editor.chain().focus().setLink({ href: url }).run()
            else if (url === '') editor.chain().focus().unsetLink().run()
          }}
          style={{ width: '100%', marginTop: '4px' }}
        />
      </div>

      <Separator />

      {/* --- NODES SECTION --- */}
      <div>
        <Label>BLOCKS</Label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <MenuBtn
            label="TEXT"
            active={s.isParagraph}
            onMouseDown={exec(() => editor.chain().focus().setParagraph().run())}
          />
          <MenuBtn
            label="H1"
            active={s.isHeading1}
            onMouseDown={exec(() => editor.chain().focus().toggleHeading({ level: 1 }).run())}
          />
          <MenuBtn
            label="H2"
            active={s.isHeading2}
            onMouseDown={exec(() => editor.chain().focus().toggleHeading({ level: 2 }).run())}
          />
          <MenuBtn
            label="H3"
            active={s.isHeading3}
            onMouseDown={exec(() => editor.chain().focus().toggleHeading({ level: 3 }).run())}
          />
          <MenuBtn
            label="BULLET"
            active={s.isBulletList}
            onMouseDown={exec(() => editor.chain().focus().toggleBulletList().run())}
          />
          <MenuBtn
            label="NUMBERED"
            active={s.isOrderedList}
            onMouseDown={exec(() => editor.chain().focus().toggleOrderedList().run())}
          />
          {/* <MenuBtn
            label="QUOTE"
            active={s.isBlockquote}
            onMouseDown={exec(() => editor.chain().focus().toggleBlockquote().run())}
          />
          <MenuBtn
            label="CODE_BLOCK"
            active={s.isCodeBlock}
            onMouseDown={exec(() => editor.chain().focus().toggleCodeBlock().run())}
          /> */}
        </div>
      </div>

      <Separator />

      {/* --- HISTORY SECTION --- */}
      <div>
        <Label>HISTORY</Label>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px' }}>
          <MenuBtn
            label="UNDO"
            disabled={!s.canUndo}
            onMouseDown={exec(() => editor.chain().focus().undo().run())}
          />
          <MenuBtn
            label="REDO"
            disabled={!s.canRedo}
            onMouseDown={exec(() => editor.chain().focus().redo().run())}
          />
        </div>
      </div>
    </div>
  )
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontSize: '9px', color: '#444', marginBottom: '6px', letterSpacing: '1px' }}>
      {children}
    </div>
  )
}

function Separator() {
  return <div style={{ height: '1px', background: '#222', margin: '4px 0' }} />
}

interface MenuBtnProps {
  label: string
  active?: boolean
  disabled?: boolean
  onMouseDown: (e: React.MouseEvent) => void
  style?: React.CSSProperties
}

function MenuBtn({ label, active, disabled, onMouseDown, style }: MenuBtnProps) {
  return (
    <button
      type="button"
      onMouseDown={onMouseDown}
      disabled={disabled}
      aria-pressed={active}
      style={{
        background: active ? '#ff0000' : '#111',
        color: active ? '#fff' : disabled ? '#222' : '#666',
        border: `1px solid ${active ? '#ff0000' : '#333'}`,
        boxShadow: active ? '0 0 10px rgba(255, 0, 0, 0.5)' : 'none',
        padding: '6px 8px',
        cursor: disabled ? 'not-allowed' : 'pointer',
        fontFamily: 'monospace',
        fontSize: '10px',
        fontWeight: active ? 'bold' : 'normal',
        transition: 'all 0.1s ease-in-out',
        outline: 'none',
        textAlign: 'center',
        ...style,
      }}
    >
      {label}
    </button>
  )
}
