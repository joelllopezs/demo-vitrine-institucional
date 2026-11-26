import { Check, Pencil, Plus, Trash2, X } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import ConfirmDialog from '../../components/ConfirmDialog'
import { useStore, useUi } from '../../store'
import type { Category } from '../../types'

export default function Categories() {
  const { categories, products, addCategory, renameCategory, removeCategory } = useStore()
  const toast = useUi((s) => s.toast)
  const [name, setName] = useState('')
  const [editId, setEditId] = useState<string | null>(null)
  const [editName, setEditName] = useState('')
  const [toDelete, setToDelete] = useState<Category | null>(null)

  const exists = (n: string, ignore?: string) => categories.some((c) => c.id !== ignore && c.name.toLowerCase() === n.trim().toLowerCase())

  const add = (e: FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return
    if (exists(name)) return toast('Já existe uma categoria com esse nome.', 'error')
    addCategory(name.trim())
    setName('')
    toast('Categoria criada!')
  }

  const saveEdit = (id: string) => {
    if (!editName.trim()) return
    if (exists(editName, id)) return toast('Já existe uma categoria com esse nome.', 'error')
    renameCategory(id, editName.trim())
    setEditId(null)
    toast('Categoria atualizada!')
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold sm:text-4xl">Categorias</h1>
        <p className="mt-1 text-forest/65">Organize o cardápio exibido na vitrine.</p>
      </div>

      <form onSubmit={add} className="flex flex-col gap-3 rounded-3xl bg-white p-5 shadow-sm sm:flex-row">
        <input className="field flex-1" placeholder="Nome da nova categoria" value={name} onChange={(e) => setName(e.target.value)} />
        <button className="btn-green"><Plus className="h-4 w-4" /> Criar categoria</button>
      </form>

      <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
        {categories.length === 0 && <p className="p-8 text-center text-forest/55">Nenhuma categoria cadastrada.</p>}
        {categories.map((c) => {
          const n = products.filter((p) => p.categoryId === c.id).length
          const editing = editId === c.id
          return (
            <div key={c.id} className="flex flex-wrap items-center gap-3 border-b border-forest/10 px-4 py-4 last:border-0 sm:px-5">
              {editing ? (
                <input className="field max-w-xs flex-1" value={editName} onChange={(e) => setEditName(e.target.value)} autoFocus onKeyDown={(e) => e.key === 'Enter' && saveEdit(c.id)} />
              ) : (
                <span className="flex-1 font-semibold">{c.name}</span>
              )}
              <span className="rounded-full bg-sand px-3 py-1 text-xs font-semibold text-forest/70">{n} {n === 1 ? 'produto' : 'produtos'}</span>
              {editing ? (
                <div className="flex gap-2">
                  <button className="btn-green btn-sm" onClick={() => saveEdit(c.id)}><Check className="h-3.5 w-3.5" /> Salvar</button>
                  <button className="btn-outline btn-sm" onClick={() => setEditId(null)}><X className="h-3.5 w-3.5" /></button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <button className="btn-outline btn-sm" onClick={() => { setEditId(c.id); setEditName(c.name) }}><Pencil className="h-3.5 w-3.5" /> Editar</button>
                  <button
                    className="btn btn-sm rounded-full border border-red-200 text-red-700 hover:bg-red-700 hover:text-white"
                    onClick={() => (n > 0 ? toast(`Mova ou exclua os ${n} produtos desta categoria antes de removê-la.`, 'error') : setToDelete(c))}
                  >
                    <Trash2 className="h-3.5 w-3.5" /> Excluir
                  </button>
                </div>
              )}
            </div>
          )
        })}
      </div>

      <ConfirmDialog
        open={!!toDelete}
        title="Excluir categoria"
        message={`Deseja excluir a categoria "${toDelete?.name}"?`}
        onCancel={() => setToDelete(null)}
        onConfirm={() => { if (toDelete && removeCategory(toDelete.id)) toast('Categoria excluída.'); setToDelete(null) }}
      />
    </div>
  )
}
