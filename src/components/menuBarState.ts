import { Editor } from '@tiptap/react'

export const menuBarStateSelector = ({ editor }: { editor: Editor }) => {
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

    // History
    canUndo: editor.can().undo(),
    canRedo: editor.can().redo(),
  }
}
