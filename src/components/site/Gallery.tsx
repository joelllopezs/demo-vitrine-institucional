import { X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useStore } from '../../store'
import Reveal from '../Reveal'
import SafeImage from '../SafeImage'

// Padrão editorial: proporções variadas que se repetem a cada 7 imagens.
const spans = [
  'col-span-2 row-span-2',
  'col-span-1 row-span-1',
  'col-span-1 row-span-2',
  'col-span-1 row-span-1',
  'col-span-2 row-span-1',
  'col-span-1 row-span-2',
  'col-span-1 row-span-1',
]

export default function Gallery() {
  const gallery = useStore((s) => s.gallery)
  const [open, setOpen] = useState<number | null>(null)

  useEffect(() => {
    if (open === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(null)
      if (e.key === 'ArrowRight') setOpen((o) => (o === null ? o : (o + 1) % gallery.length))
      if (e.key === 'ArrowLeft') setOpen((o) => (o === null ? o : (o - 1 + gallery.length) % gallery.length))
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, gallery.length])

  const current = open !== null ? gallery[open] : undefined

  return (
    <section id="galeria" className="bg-sand py-24 sm:py-32">
      <div className="container-vm">
        <Reveal className="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <span className="eyebrow">Galeria</span>
            <h2 className="mt-5 text-4xl font-bold sm:text-5xl">Um olhar sobre a nossa mesa.</h2>
          </div>
          <p className="max-w-sm text-forest/70">Ambiente, buffet, fogão a lenha e pratos que fazem a viagem valer a pena.</p>
        </Reveal>

        {gallery.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-forest/25 py-16 text-center text-forest/60">
            Nenhuma imagem na galeria.
          </div>
        ) : (
          <div className="grid auto-rows-[150px] grid-cols-2 gap-3 sm:auto-rows-[200px] sm:gap-4 md:grid-cols-4 lg:auto-rows-[230px]">
            {gallery.map((g, i) => (
              <Reveal key={g.id} delay={(i % 4) * 80} className={`${spans[i % spans.length]} h-full`}>
                <button
                  onClick={() => setOpen(i)}
                  className="group relative block h-full w-full overflow-hidden rounded-3xl text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                  aria-label={`Ampliar: ${g.caption}`}
                >
                  <SafeImage src={g.url} alt={g.caption} className="h-full w-full" imgClassName="transition duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 flex items-end bg-gradient-to-t from-forest/80 via-transparent to-transparent p-4 opacity-0 transition duration-500 group-hover:opacity-100">
                    <span className="text-sm font-medium text-cream">{g.caption}</span>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        )}
      </div>

      {current && (
        <div className="fixed inset-0 z-[90] flex animate-pop-in items-center justify-center bg-forest/95 p-4" onClick={() => setOpen(null)}>
          <button className="absolute right-5 top-5 rounded-full bg-white/10 p-3 text-cream hover:bg-white/20" aria-label="Fechar">
            <X className="h-6 w-6" />
          </button>
          <figure className="max-h-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <SafeImage src={current.url} alt={current.caption} className="max-h-[78vh] min-h-[40vh] min-w-[min(80vw,640px)] rounded-2xl" imgClassName="!h-auto max-h-[78vh] !w-auto object-contain" eager />
            <figcaption className="mt-4 text-center text-cream/80">{current.caption}</figcaption>
          </figure>
        </div>
      )}
    </section>
  )
}
