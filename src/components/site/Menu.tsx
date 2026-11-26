import { Ban, Search, Sparkles } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { brl } from '../../lib/format'
import { useStore } from '../../store'
import Modal from '../Modal'
import Reveal from '../Reveal'
import SafeImage from '../SafeImage'

export default function Menu() {
  const products = useStore((s) => s.products)
  const categories = useStore((s) => s.categories)
  const [active, setActive] = useState<string>('all')
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [selectedId, setSelectedId] = useState<string | null>(null)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 450)
    return () => clearTimeout(t)
  }, [])

  // Se a categoria ativa for excluída no painel, volta para "Todos".
  useEffect(() => {
    if (active !== 'all' && !categories.some((c) => c.id === active)) setActive('all')
  }, [categories, active])

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    return products
      .filter((p) => active === 'all' || p.categoryId === active)
      .filter((p) => !q || p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q))
      .sort((a, b) => Number(b.featured) - Number(a.featured))
  }, [products, active, query])

  const catName = (id: string) => categories.find((c) => c.id === id)?.name ?? 'Sem categoria'
  const countOf = (id: string) => products.filter((p) => p.categoryId === id).length
  const selected = products.find((p) => p.id === selectedId)

  return (
    <section id="cardapio" className="bg-forest py-16 text-cream sm:py-24 lg:py-32">
      <div className="container-vm">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Cardápio</span>
          <h2 className="mt-5 text-3xl font-bold sm:text-4xl lg:text-5xl">Sabores que abraçam.</h2>
          <p className="mt-4 text-sm text-cream/70 sm:text-base">
            Pratos feitos como em casa, com ingredientes selecionados e muito tempero de panela de ferro.
          </p>
        </Reveal>

        <Reveal delay={100} className="mt-10 flex flex-col gap-4 sm:mt-12 sm:gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div
            className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 [-ms-overflow-style:none] [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0 [&::-webkit-scrollbar]:hidden"
            role="tablist"
            aria-label="Categorias"
          >
            <Chip active={active === 'all'} onClick={() => setActive('all')}>
              Todos <small className="opacity-60">{products.length}</small>
            </Chip>
            {categories.map((c) => (
              <Chip key={c.id} active={active === c.id} onClick={() => setActive(c.id)}>
                {c.name} <small className="opacity-60">{countOf(c.id)}</small>
              </Chip>
            ))}
          </div>
          <div className="relative w-full lg:w-72">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-cream/50" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar no cardápio"
              className="w-full rounded-full border border-cream/20 bg-white/5 py-3 pl-11 pr-4 text-base text-cream outline-none transition placeholder:text-cream/40 focus:border-gold sm:text-sm"
            />
          </div>
        </Reveal>

        {/* Celular: grade 3 colunas (3×3 por tela) com cards compactos. Tablet: 2 colunas. Desktop: 3 colunas completas. */}
        <div className="mt-8 grid grid-cols-3 gap-2.5 sm:mt-10 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {loading
            ? Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className={`overflow-hidden rounded-2xl bg-cream/5 sm:rounded-3xl ${i >= 6 ? 'sm:hidden' : ''}`}>
                  <div className="skeleton aspect-square opacity-40 sm:aspect-[4/3]" />
                  <div className="space-y-2 p-2.5 sm:space-y-3 sm:p-6">
                    <div className="skeleton h-3 w-full rounded opacity-40 sm:h-5 sm:w-2/3" />
                    <div className="skeleton h-3 w-2/3 rounded opacity-40 sm:h-4 sm:w-full" />
                    <div className="skeleton hidden h-4 w-4/5 rounded opacity-40 sm:block" />
                  </div>
                </div>
              ))
            : visible.map((p, i) => (
                <article
                  key={p.id}
                  style={{ animationDelay: `${Math.min(i, 8) * 60}ms` }}
                  className={`group relative animate-fade-up overflow-hidden rounded-2xl bg-cream text-forest shadow-lg transition duration-500 sm:rounded-3xl sm:shadow-xl sm:hover:-translate-y-2 sm:hover:shadow-2xl sm:hover:shadow-black/40 ${
                    p.available ? '' : 'opacity-80'
                  }`}
                >
                  {/* No celular o card inteiro abre os detalhes */}
                  <button
                    type="button"
                    onClick={() => setSelectedId(p.id)}
                    aria-label={`Ver detalhes de ${p.name}`}
                    className="absolute inset-0 z-10 rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-gold sm:hidden"
                  />
                  <div className="relative">
                    <SafeImage
                      src={p.image}
                      alt={p.name}
                      className="aspect-square sm:aspect-[4/3]"
                      imgClassName={`transition duration-700 group-hover:scale-110 ${p.available ? '' : 'grayscale'}`}
                    />
                    <div className="absolute inset-0 hidden bg-gradient-to-t from-forest/40 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100 sm:block" />
                    {p.featured && (
                      <span
                        title="Destaque"
                        className="absolute left-1.5 top-1.5 inline-flex items-center gap-1.5 rounded-full bg-gold p-1 text-[11px] font-bold uppercase tracking-wider text-forest shadow-lg sm:left-4 sm:top-4 sm:px-3 sm:py-1"
                      >
                        <Sparkles className="h-3 w-3" aria-hidden />
                        <span className="sr-only sm:not-sr-only">Destaque</span>
                      </span>
                    )}
                    {!p.available && (
                      <span
                        title="Indisponível"
                        className="absolute right-1.5 top-1.5 inline-flex items-center gap-1.5 rounded-full bg-forest/90 p-1 text-[11px] font-bold uppercase tracking-wider text-cream sm:right-4 sm:top-4 sm:px-3 sm:py-1"
                      >
                        <Ban className="h-3 w-3" aria-hidden />
                        <span className="sr-only sm:not-sr-only">Indisponível</span>
                      </span>
                    )}
                  </div>
                  <div className="p-2.5 sm:p-6">
                    <p className="hidden text-[11px] font-semibold uppercase tracking-[0.2em] text-brown/70 sm:block">{catName(p.categoryId)}</p>
                    <div className="flex flex-col items-start gap-1.5 sm:mt-2 sm:flex-row sm:justify-between sm:gap-4">
                      <h3 className="line-clamp-2 min-h-[2.1rem] text-[13px] font-bold leading-tight sm:min-h-0 sm:line-clamp-none sm:text-xl sm:leading-snug">
                        {p.name}
                      </h3>
                      <span className="shrink-0 rounded-full bg-forest px-2 py-0.5 text-[11px] font-bold text-gold sm:px-3 sm:py-1 sm:text-sm">
                        {brl(p.price)}
                      </span>
                    </div>
                    <p className="mt-3 hidden text-sm leading-relaxed text-forest/70 sm:block">{p.description}</p>
                  </div>
                </article>
              ))}
        </div>

        {!loading && visible.length === 0 && (
          <div className="mt-10 rounded-3xl border border-dashed border-cream/25 px-4 py-16 text-center text-cream/60">
            Nenhum item encontrado nesta seleção.
          </div>
        )}
        <p className="mt-8 text-center text-xs text-cream/45 sm:mt-10">
          <span className="sm:hidden">Toque em um prato para ver os detalhes. </span>
          Preços fictícios, apenas para demonstração.
        </p>
      </div>

      {/* Detalhes do prato (celular) */}
      <Modal open={!!selected} onClose={() => setSelectedId(null)} title={selected?.name ?? ''}>
        {selected && (
          <div>
            <div className="relative">
              <SafeImage
                src={selected.image}
                alt={selected.name}
                className="aspect-[4/3]"
                imgClassName={selected.available ? '' : 'grayscale'}
              />
              <div className="absolute left-3 top-3 flex flex-wrap gap-2">
                {selected.featured && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-gold px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-forest shadow-lg">
                    <Sparkles className="h-3 w-3" /> Destaque
                  </span>
                )}
                {!selected.available && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-forest/90 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-cream">
                    <Ban className="h-3 w-3" /> Indisponível
                  </span>
                )}
              </div>
            </div>
            <div className="space-y-3 p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brown/70">{catName(selected.categoryId)}</p>
              <span className="inline-block rounded-full bg-forest px-4 py-1.5 text-base font-bold text-gold">{brl(selected.price)}</span>
              <p className="text-sm leading-relaxed text-forest/75">{selected.description}</p>
            </div>
          </div>
        )}
      </Modal>
    </section>
  )
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={`flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full border px-4 py-2.5 text-sm font-medium transition duration-300 sm:px-5 ${
        active
          ? 'border-gold bg-gold text-forest shadow-lg shadow-gold/20'
          : 'border-cream/25 text-cream/85 hover:border-gold hover:text-gold'
      }`}
    >
      {children}
    </button>
  )
}
