import { ImageOff } from 'lucide-react'
import { useEffect, useState } from 'react'

interface Props {
  src: string
  alt: string
  className?: string
  imgClassName?: string
  eager?: boolean
}

/** Imagem com skeleton de carregamento e fallback caso a URL falhe. */
export default function SafeImage({ src, alt, className = '', imgClassName = '', eager }: Props) {
  const [state, setState] = useState<'loading' | 'ok' | 'error'>(src ? 'loading' : 'error')

  useEffect(() => {
    setState(src ? 'loading' : 'error')
  }, [src])

  // Só aplica `relative` quando o chamador não pediu outro posicionamento;
  // senão o `relative` anula o `absolute` (ex.: imagem de fundo do Hero).
  const positioned = /(^|\s)(absolute|fixed|sticky)(\s|$)/.test(className)

  return (
    <div className={`${positioned ? '' : 'relative'} overflow-hidden bg-sand ${className}`}>
      {state === 'loading' && <div className="skeleton absolute inset-0" />}
      {state === 'error' ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-pine to-forest text-gold/80">
          <ImageOff className="h-8 w-8" strokeWidth={1.5} />
          <span className="px-4 text-center text-[11px] font-medium uppercase tracking-widest text-cream/60">
            Imagem indisponível
          </span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          referrerPolicy="no-referrer"
          onLoad={() => setState('ok')}
          onError={() => setState('error')}
          className={`h-full w-full object-cover transition-opacity duration-700 ${state === 'ok' ? 'opacity-100' : 'opacity-0'} ${imgClassName}`}
        />
      )}
    </div>
  )
}
