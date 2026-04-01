// components/LayoutSwitch.tsx
export default function LayoutSwitch({
  children,
  isEditor,
}: {
  children: React.ReactNode
  isEditor: boolean
}) {
  return (
    <div className={isEditor ? 'editor-view' : 'reader-view'}>
      {/* In 'reader-view', we use Pretext logic for a narrow, centered column.
         In 'editor-view', we use a wide, edge-to-edge dashboard layout.
      */}
      {children}
    </div>
  )
}
