import { Ban, CheckCircle2, Pencil, Plus, Search, Star, Trash2 } from 'lucide-react'
import { useEffect, useMemo, useState, type FormEvent } from 'react'
import ConfirmDialog from '../../components/ConfirmDialog'
import ImagePicker from '../../components/ImagePicker'
import Modal from '../../components/Modal'
import SafeImage from '../../components/SafeImage'
import { brl } from '../../lib/format'
import { useStore, useUi } from '../../store'
import type { Product } from '../../types'

type Draft = Omit<Product, 'id'> & { id?: string }

export default function Products() {
  const { products, categories, addProduct, updateProduct, removeProduct } = useStore()
  const toast = useUi((s) => s.toast)
  const [editing, setEditing] = useState<Draft | null>(null)
  const [toDelete, setToDelete] = useState<Product | null>(null)
  const [q, setQ] = useState('')
  const [cat, setCat] = useState('all')

  const list = useMemo(
    () =>
      products
        .filter((p) => cat === 'all' || p.categoryId === cat)
        .filter((p) => p.name.toLowerCase().includes(q.trim().toLowerCase())),
    [products, q, cat],
  )

  const catName = (id: string) => categories.find((c) => c.id === id)?.name ?? '—'

  const openNew = () => {
    if (categories.length === 0) return toast('Crie uma categoria antes de cadastrar produtos.', 'error')
    setEditing({ name: '', description: '', price: 0, categoryId: categories[0].id, image: '', featured: false, available: true })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="text-3xl font-bold sm:text-4xl">Produtos</h1>
          <p className="mt-1 text-forest/65">{products.length} itens no cardápio.</p>
        </div>
        <button className="btn-green" onClick={openNew}><Plus className="h-4 w-4" /> Novo produto</button>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-forest/40" />
          <input className="field pl-10" placeholder="Buscar produto" value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
        <select className="field sm:w-60" value={cat} onChange={(e) => setCat(e.target.value)}>
          <option value="all">Todas as categorias</option>
          {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {list.map((p) => (
          <article key={p.id} className="flex gap-4 rounded-3xl bg-white p-3 shadow-sm transition hover:shadow-lg">
            <SafeImage src={p.image} alt={p.name} className="h-28 w-28 shrink-0 rounded-2xl sm:h-32 sm:w-36" />
            <div className="flex min-w-0 flex-1 flex-col py-1 pr-1">
              <div className="flex items-start justify-between gap-2">
                <h3 className="truncate text-base font-bold">{p.name}</h3>
                <span className="shrink-0 text-sm font-bold text-brown">{brl(p.price)}</span>
              </div>
              <p className="text-xs text-forest/55">{catName(p.categoryId)}</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                <button
                  onClick={() => { updateProduct(p.id, { featured: !p.featured }); toast(p.featured ? 'Destaque removido.' : 'Produto em destaque!') }}
                  className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold transition ${p.featured ? 'bg-gold text-forest' : 'bg-sand text-forest/60 hover:bg-gold/30'}`}
                  title="Alternar destaque"
                >
                  <Star className="h-3 w-3" /> Destaque
                </button>
                <button
                  onClick={() => { updateProduct(p.id, { available: !p.available }); toast(p.available ? 'Marcado como indisponível.' : 'Marcado como disponível.') }}
                  className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold transition ${p.available ? 'bg-pine/15 text-pine hover:bg-pine/25' : 'bg-red-100 text-red-800 hover:bg-red-200'}`}
                  title="Alternar disponibilidade"
                >
                  {p.available ? <CheckCircle2 className="h-3 w-3" /> : <Ban className="h-3 w-3" />}
                  {p.available ? 'Disponível' : 'Indisponível'}
                </button>
              </div>
              <div className="mt-auto flex gap-2 pt-3">
                <button className="btn-outline btn-sm" onClick={() => setEditing({ ...p })}><Pencil className="h-3.5 w-3.5" /> Editar</button>
                <button className="btn-sm btn rounded-full border border-red-200 text-red-700 hover:bg-red-700 hover:text-white" onClick={() => setToDelete(p)}><Trash2 className="h-3.5 w-3.5" /> Excluir</button>
              </div>
            </div>
          </article>
        ))}
      </div>
      {list.length === 0 && <div className="rounded-3xl border border-dashed border-forest/25 py-14 text-center text-forest/55">Nenhum produto encontrado.</div>}

      <ProductModal
        draft={editing}
        onClose={() => setEditing(null)}
        onSave={(d) => {
          const { id, ...rest } = d
          if (id) { updateProduct(id, rest); toast('Produto atualizado com sucesso!') }
          else { addProduct(rest); toast('Produto cadastrado com sucesso!') }
          setEditing(null)
        }}
      />

      <ConfirmDialog
        open={!!toDelete}
        title="Excluir produto"
        message={`Tem certeza que deseja excluir "${toDelete?.name}"? Ele deixará de aparecer na vitrine.`}
        onCancel={() => setToDelete(null)}
        onConfirm={() => { if (toDelete) { removeProduct(toDelete.id); toast('Produto excluído.') } setToDelete(null) }}
      />
    </div>
  )
}

function ProductModal({ draft, onClose, onSave }: { draft: Draft | null; onClose: () => void; onSave: (d: Draft) => void }) {
  const categories = useStore((s) => s.categories)
  const [d, setD] = useState<Draft | null>(draft)
  const [price, setPrice] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    setD(draft)
    setPrice(draft ? String(draft.price).replace('.', ',') : '')
    setErrors({})
  }, [draft])

  if (!d) return <Modal open={false} onClose={onClose} title="" children={null} />
  const set = <K extends keyof Draft>(k: K, v: Draft[K]) => setD((x) => (x ? { ...x, [k]: v } : x))

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const n = parseFloat(price.replace(/\./g, '').replace(',', '.'))
    const errs: Record<string, string> = {}
    if (!d.name.trim()) errs.name = 'Informe o nome.'
    if (!d.description.trim()) errs.description = 'Informe a descrição.'
    if (!Number.isFinite(n) || n <= 0) errs.price = 'Informe um preço válido.'
    if (!d.categoryId) errs.categoryId = 'Escolha a categoria.'
    setErrors(errs)
    if (Object.keys(errs).length) return
    onSave({ ...d, name: d.name.trim(), description: d.description.trim(), price: Math.round(n * 100) / 100 })
  }

  return (
    <Modal open onClose={onClose} title={d.id ? 'Editar produto' : 'Novo produto'} wide>
      <form onSubmit={submit} className="grid gap-6 p-6 md:grid-cols-2">
        <div className="space-y-4">
          <div>
            <label className="label">Nome</label>
            <input className="field" value={d.name} onChange={(e) => set('name', e.target.value)} placeholder="Ex.: Leitão à pururuca" autoFocus />
            {errors.name && <p className="mt-1 text-xs text-red-700">{errors.name}</p>}
          </div>
          <div>
            <label className="label">Descrição</label>
            <textarea className="field min-h-24 resize-y" value={d.description} onChange={(e) => set('description', e.target.value)} />
            {errors.description && <p className="mt-1 text-xs text-red-700">{errors.description}</p>}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Preço (R$)</label>
              <input className="field" inputMode="decimal" value={price} onChange={(e) => setPrice(e.target.value.replace(/[^\d.,]/g, ''))} placeholder="0,00" />
              {errors.price && <p className="mt-1 text-xs text-red-700">{errors.price}</p>}
            </div>
            <div>
              <label className="label">Categoria</label>
              <select className="field" value={d.categoryId} onChange={(e) => set('categoryId', e.target.value)}>
                {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
          </div>
          <div className="space-y-2.5 rounded-2xl bg-white p-4">
            <Toggle checked={d.featured} onChange={(v) => set('featured', v)} label="Produto em destaque" />
            <Toggle checked={d.available} onChange={(v) => set('available', v)} label="Disponível no cardápio" />
          </div>
        </div>
        <div className="flex flex-col">
          <ImagePicker value={d.image} onChange={(v) => set('image', v)} />
          <div className="mt-auto flex justify-end gap-3 pt-6">
            <button type="button" className="btn-outline btn-sm" onClick={onClose}>Cancelar</button>
            <button className="btn-green btn-sm">{d.id ? 'Salvar alterações' : 'Cadastrar produto'}</button>
          </div>
        </div>
      </form>
    </Modal>
  )
}

function Toggle({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-3 text-sm font-medium">
      {label}
      <button type="button" role="switch" aria-checked={checked} onClick={() => onChange(!checked)} className={`relative h-6 w-11 rounded-full transition ${checked ? 'bg-pine' : 'bg-sand'}`}>
        <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${checked ? 'left-[22px]' : 'left-0.5'}`} />
      </button>
    </label>
  )
}
