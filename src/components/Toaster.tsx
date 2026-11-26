import { AlertCircle, CheckCircle2, Info, X } from 'lucide-react'
import { useUi } from '../store'

const icon = { success: CheckCircle2, error: AlertCircle, info: Info }
const tone = {
  success: 'border-pine bg-forest text-cream',
  error: 'border-red-800 bg-red-900 text-white',
  info: 'border-gold bg-brown text-cream',
}

export default function Toaster() {
  const { toasts, dismiss } = useUi()
  return (
    <div
      className="pointer-events-none fixed inset-x-4 bottom-4 z-[100] flex flex-col items-end gap-2 sm:left-auto sm:right-6 sm:bottom-6"
      aria-live="polite"
    >
      {toasts.map((t) => {
        const Icon = icon[t.kind]
        return (
          <div
            key={t.id}
            className={`pointer-events-auto flex w-full max-w-sm animate-slide-in items-start gap-3 rounded-2xl border px-4 py-3 shadow-2xl ${tone[t.kind]}`}
          >
            <Icon className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
            <p className="flex-1 text-sm">{t.text}</p>
            <button onClick={() => dismiss(t.id)} aria-label="Fechar" className="opacity-60 hover:opacity-100">
              <X className="h-4 w-4" />
            </button>
          </div>
        )
      })}
    </div>
  )
}
