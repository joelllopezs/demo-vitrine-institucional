import { Plus, Save, Trash2 } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { useStore, useUi } from '../../store'
import type { RestaurantInfo } from '../../types'

export default function InfoPage() {
  const info = useStore((s) => s.info)
  const updateInfo = useStore((s) => s.updateInfo)
  const toast = useUi((s) => s.toast)
  const [f, setF] = useState<RestaurantInfo>(info)
  const set = <K extends keyof RestaurantInfo>(k: K, v: RestaurantInfo[K]) => setF((x) => ({ ...x, [k]: v }))

  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (!f.name.trim()) return toast('Informe o nome do restaurante.', 'error')
    updateInfo({ ...f, hours: f.hours.map((h) => h.trim()).filter(Boolean) })
    toast('Informações salvas! A vitrine já foi atualizada.')
  }

  return (
    <form onSubmit={submit} className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="text-3xl font-bold sm:text-4xl">Informações</h1>
          <p className="mt-1 text-forest/65">Dados exibidos no site, rodapé e seção de localização.</p>
        </div>
        <button className="btn-green"><Save className="h-4 w-4" /> Salvar informações</button>
      </div>

      <section className="grid gap-5 rounded-3xl bg-white p-4 shadow-sm sm:p-6 md:grid-cols-2">
        <div className="md:col-span-2">
          <label className="label">Nome do restaurante</label>
          <input className="field" value={f.name} onChange={(e) => set('name', e.target.value)} />
        </div>
        <div className="md:col-span-2">
          <label className="label">Descrição</label>
          <textarea className="field min-h-24" value={f.description} onChange={(e) => set('description', e.target.value)} />
        </div>
        <div>
          <label className="label">Telefone</label>
          <input className="field" value={f.phone} onChange={(e) => set('phone', e.target.value)} />
        </div>
        <div>
          <label className="label">WhatsApp</label>
          <input className="field" value={f.whatsapp} onChange={(e) => set('whatsapp', e.target.value)} />
        </div>
        <div className="md:col-span-2">
          <label className="label">Endereço demonstrativo</label>
          <input className="field" value={f.address} onChange={(e) => set('address', e.target.value)} />
        </div>
      </section>

      <section className="rounded-3xl bg-white p-4 shadow-sm sm:p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-xl font-bold">Horário de funcionamento</h2>
          <button type="button" className="btn-outline btn-sm" onClick={() => set('hours', [...f.hours, ''])}><Plus className="h-3.5 w-3.5" /> Adicionar linha</button>
        </div>
        <div className="space-y-3">
          {f.hours.map((h, i) => (
            <div key={i} className="flex gap-2">
              <input className="field" value={h} placeholder="Ex.: Segunda a sexta: 06h às 22h" onChange={(e) => set('hours', f.hours.map((x, j) => (j === i ? e.target.value : x)))} />
              <button type="button" aria-label="Remover linha" className="rounded-xl border border-red-200 px-3 text-red-700 hover:bg-red-700 hover:text-white" onClick={() => set('hours', f.hours.filter((_, j) => j !== i))}><Trash2 className="h-4 w-4" /></button>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-5 rounded-3xl bg-white p-4 shadow-sm sm:p-6 md:grid-cols-3">
        <h2 className="text-xl font-bold md:col-span-3">Redes sociais</h2>
        {(['instagram', 'facebook', 'youtube'] as const).map((k) => (
          <div key={k}>
            <label className="label">{k}</label>
            <input className="field" value={f[k]} onChange={(e) => set(k, e.target.value)} placeholder="https://" />
          </div>
        ))}
      </section>
    </form>
  )
}
