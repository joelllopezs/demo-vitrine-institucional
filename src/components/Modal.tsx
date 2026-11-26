import { X } from 'lucide-react'
import { useEffect, type ReactNode } from 'react'

export default function Modal({
  open,
  onClose,
  title,
  children,
  wide,
}: {
  open: boolean
  onClose: () => void
  title: string
  children: ReactNode
  wide?: boolean
}) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open, onClose])

  if (!open) return null
  return (
    <div className="fixed inset-0 z-[90] flex items-end justify-center sm:items-center sm:p-6" role="dialog" aria-modal="true" aria-label={title}>
      <div className="absolute inset-0 bg-forest/70 backdrop-blur-sm" onClick={onClose} />
      <div
        className={`relative flex max-h-[92dvh] w-full animate-pop-in flex-col overflow-hidden rounded-t-3xl bg-cream shadow-2xl sm:rounded-3xl ${wide ? 'max-w-3xl' : 'max-w-md'}`}
      >
        <div className="flex items-center justify-between gap-3 border-b border-forest/10 bg-white px-5 py-4 sm:px-6">
          <h3 className="min-w-0 truncate text-lg font-bold sm:text-xl">{title}</h3>
          <button onClick={onClose} aria-label="Fechar" className="shrink-0 rounded-full p-2 transition hover:bg-sand">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="overflow-y-auto">{children}</div>
      </div>
    </div>
  )
}
