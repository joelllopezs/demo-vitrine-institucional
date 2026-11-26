import { Ban, Search, Sparkles } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { brl } from '../../lib/format'
import { useStore } from '../../store'
import Reveal from '../Reveal'
import SafeImage from '../SafeImage'

export default function Menu() {
  const products = useStore((s) => s.products)
  const categories = useStore((s) => s.categories)
  const [active, setActive] = useState<string>('all')
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(true)

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

  return (
    <section id="cardapio" className="bg-forest py-24 text-cream sm:py-32">
      <div className="container-vm">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Cardápio</span>
          <h2 className="mt-5 text-4xl font-bold sm:text-5xl">Sabores que abraçam.</h2>
          <p className="mt-4 text-cream/70">
            Pratos feitos como em casa, com ingredientes selecionados e muito tempero de panela de ferro.
          </p>
        </Reveal>

        <Reveal delay={100} className="mt-12 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:flex-wrap sm:px-0" role="tablist" aria-label="Categorias">
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
              className="w-full rounded-full border border-cream/20 bg-white/5 py-3 pl-11 pr-4 text-sm text-cream outline-none transition placeholder:text-cream/40 focus:border-gold"
            />
          </div>
        </Reveal>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="overflow-hidden rounded-3xl bg-cream/5">
                  <div className="skeleton aspect-[4/3] opacity-40" />
                  <div className="space-y-3 p-6">
                    <div className="skeleton h-5 w-2/3 rounded opacity-40" />
                    <div className="skeleton h-4 w-full rounded opacity-40" />
                    <div className="skeleton h-4 w-4/5 rounded opacity-40" />
                  </div>
                </div>
              ))
            : visible.map((p, i) => (
                <article
                  key={p.id}
                  style={{ animationDelay: `${Math.min(i, 8) * 60}ms` }}
                  className={`group animate-fade-up overflow-hidden rounded-3xl bg-cream text-forest shadow-xl transition duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/40 ${
                    p.available ? '' : 'opacity-80'
                  }`}
                >
                  <div className="relative">
                    <SafeImage
                      src={p.image}
                      alt={p.name}
                      className="aspect-[4/3]"
                      imgClassName={`transition duration-700 group-hover:scale-110 ${p.available ? '' : 'grayscale'}`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-forest/40 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
                    {p.featured && (
                      <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-gold px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-forest shadow-lg">
                        <Sparkles className="h-3 w-3" /> Destaque
                      </span>
                    )}
                    {!p.available && (
                      <span className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-forest/90 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-cream">
                        <Ban className="h-3 w-3" /> Indisponível
                      </span>
                    )}
                  </div>
                  <div className="p-6">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brown/70">{catName(p.categoryId)}</p>
                    <div className="mt-2 flex items-start justify-between gap-4">
                      <h3 className="text-xl font-bold leading-snug">{p.name}</h3>
                      <span className="shrink-0 rounded-full bg-forest px-3 py-1 text-sm font-bold text-gold">{brl(p.price)}</span>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-forest/70">{p.description}</p>
                  </div>
                </article>
              ))}
        </div>

        {!loading && visible.length === 0 && (
          <div className="mt-10 rounded-3xl border border-dashed border-cream/25 py-16 text-center text-cream/60">
            Nenhum item encontrado nesta seleção.
          </div>
        )}
        <p className="mt-10 text-center text-xs text-cream/45">Preços fictícios, apenas para demonstração.</p>
      </div>
    </section>
  )
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={`flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full border px-5 py-2.5 text-sm font-medium transition duration-300 ${
        active
          ? 'border-gold bg-gold text-forest shadow-lg shadow-gold/20'
          : 'border-cream/25 text-cream/85 hover:border-gold hover:text-gold'
      }`}
    >
      {children}
    </button>
  )
}
