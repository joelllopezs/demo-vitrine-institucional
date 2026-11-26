import { ImagePlus, Link2, Upload } from 'lucide-react'
import { useRef, useState } from 'react'
import { fileToDataUrl } from '../lib/format'
import { useUi } from '../store'
import SafeImage from './SafeImage'

/** Escolha de imagem por URL ou upload local, com pré-visualização. */
export default function ImagePicker({
  value,
  onChange,
  aspect = 'aspect-[16/10]',
}: {
  value: string
  onChange: (v: string) => void
  aspect?: string
}) {
  const [busy, setBusy] = useState(false)
  const input = useRef<HTMLInputElement>(null)
  const toast = useUi((s) => s.toast)
  const isData = value.startsWith('data:')

  const onFile = async (f?: File) => {
    if (!f) return
    setBusy(true)
    try {
      onChange(await fileToDataUrl(f))
    } catch (e) {
      toast((e as Error).message, 'error')
    } finally {
      setBusy(false)
      if (input.current) input.current.value = ''
    }
  }

  return (
    <div>
      <span className="label">Imagem</span>
      <div className={`mb-3 overflow-hidden rounded-2xl border border-forest/10 ${aspect}`}>
        {value ? (
          <SafeImage src={value} alt="Pré-visualização" className="h-full w-full" />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-sand/60 text-forest/50">
            <ImagePlus className="h-8 w-8" strokeWidth={1.5} />
            <span className="text-xs">Pré-visualização da imagem</span>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-2 sm:flex-row">
        <div className="relative flex-1">
          <Link2 className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-forest/40" />
          <input
            className="field pl-9"
            placeholder="Cole a URL de uma imagem (https://…)"
            value={isData ? '' : value}
            onChange={(e) => onChange(e.target.value.trim())}
          />
        </div>
        <button type="button" className="btn-outline btn-sm shrink-0" onClick={() => input.current?.click()} disabled={busy}>
          <Upload className="h-4 w-4" /> {busy ? 'Processando…' : 'Enviar arquivo'}
        </button>
        <input ref={input} type="file" accept="image/*" hidden onChange={(e) => onFile(e.target.files?.[0])} />
      </div>
      {isData && <p className="mt-2 text-xs text-forest/55">Imagem local salva (redimensionada) apenas neste navegador.</p>}
    </div>
  )
}
