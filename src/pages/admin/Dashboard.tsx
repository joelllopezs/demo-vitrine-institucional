import { ArrowRight, Eye, FolderTree, History, Package, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import { timeAgo } from '../../lib/format'
import { useStore } from '../../store'

export default function Dashboard() {
  const { products, categories, activity, gallery } = useStore()
  const featured = products.filter((p) => p.featured).length
  const available = products.filter((p) => p.available).length
  const max = Math.max(1, ...categories.map((c) => products.filter((p) => p.categoryId === c.id).length))
  const pct = products.length ? Math.round((available / products.length) * 100) : 0

  const kpis = [
    { icon: Package, label: 'Produtos cadastrados', value: products.length, to: '/admin/produtos' },
    { icon: Star, label: 'Em destaque', value: featured, to: '/admin/produtos' },
    { icon: FolderTree, label: 'Categorias', value: categories.length, to: '/admin/categorias' },
    { icon: Eye, label: 'Fotos na galeria', value: gallery.length, to: '/admin/galeria' },
  ]

  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="text-3xl font-bold sm:text-4xl">Dashboard</h1>
          <p className="mt-1 text-forest/65">Visão geral da sua vitrine.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link to="/admin/produtos" className="btn-green btn-sm"><Package className="h-4 w-4" /> Gerenciar produtos</Link>
          <a href="/" target="_blank" rel="noreferrer" className="btn-outline btn-sm"><Eye className="h-4 w-4" /> Visualizar site</a>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {kpis.map((k) => (
          <Link key={k.label} to={k.to} className="group rounded-3xl bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-xl sm:p-6">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-forest text-gold transition group-hover:rotate-6"><k.icon className="h-5 w-5" /></span>
            <p className="mt-4 font-display text-3xl font-bold sm:mt-5 sm:text-4xl">{k.value}</p>
            <p className="mt-1 text-sm text-forest/65">{k.label}</p>
          </Link>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <section className="rounded-3xl bg-white p-5 shadow-sm sm:p-6 lg:col-span-3">
          <h2 className="text-xl font-bold">Produtos por categoria</h2>
          <div className="mt-6 space-y-4">
            {categories.length === 0 && <p className="text-sm text-forest/55">Nenhuma categoria cadastrada.</p>}
            {categories.map((c) => {
              const n = products.filter((p) => p.categoryId === c.id).length
              return (
                <div key={c.id}>
                  <div className="mb-1.5 flex justify-between text-sm">
                    <span className="font-medium">{c.name}</span>
                    <span className="text-forest/60">{n}</span>
                  </div>
                  <div className="h-2.5 overflow-hidden rounded-full bg-sand">
                    <div className="h-full rounded-full bg-gradient-to-r from-pine to-gold transition-all duration-700" style={{ width: `${(n / max) * 100}%` }} />
                  </div>
                </div>
              )
            })}
          </div>
          <div className="mt-8 flex items-center gap-4 rounded-2xl bg-cream p-4 sm:gap-5">
            <div
              className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full"
              style={{ background: `conic-gradient(#315B42 ${pct * 3.6}deg, #E9DDC8 0)` }}
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-cream font-display text-lg font-bold">{pct}%</span>
            </div>
            <div className="text-sm">
              <p className="font-bold">Disponibilidade do cardápio</p>
              <p className="text-forest/65">{available} de {products.length} produtos disponíveis para pedido.</p>
            </div>
          </div>
        </section>

        <section className="rounded-3xl bg-white p-5 shadow-sm sm:p-6 lg:col-span-2">
          <h2 className="flex items-center gap-2 text-xl font-bold"><History className="h-5 w-5 text-gold" /> Últimas alterações</h2>
          <ul className="mt-5 space-y-4">
            {activity.slice(0, 7).map((a) => (
              <li key={a.id} className="flex gap-3 text-sm">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-gold" />
                <div>
                  <p>{a.text}</p>
                  <p className="text-xs text-forest/50">{timeAgo(a.at)}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <Link to="/admin/informacoes" className="group flex items-center justify-between gap-4 rounded-3xl bg-forest p-5 sm:p-6 text-cream transition hover:bg-pine">
        <div>
          <p className="font-display text-xl font-bold">Atualize telefone, horário e redes sociais</p>
          <p className="text-sm text-cream/70">As mudanças aparecem na hora no rodapé e na seção de localização.</p>
        </div>
        <ArrowRight className="h-6 w-6 shrink-0 text-gold transition group-hover:translate-x-1" />
      </Link>
    </div>
  )
}
