import { Plus, Trash2 } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import ConfirmDialog from '../../components/ConfirmDialog'
import ImagePicker from '../../components/ImagePicker'
import SafeImage from '../../components/SafeImage'
import { useStore, useUi } from '../../store'
import type { GalleryImage } from '../../types'

export default function GalleryAdmin() {
  const { gallery, addGalleryImage, removeGalleryImage } = useStore()
  const toast = useUi((s) => s.toast)
  const [url, setUrl] = useState('')
  const [caption, setCaption] = useState('')
  const [toDelete, setToDelete] = useState<GalleryImage | null>(null)

  const add = (e: FormEvent) => {
    e.preventDefault()
    if (!url) return toast('Informe a URL ou envie uma imagem.', 'error')
    if (!url.startsWith('data:') && !/^https?:\/\//i.test(url)) return toast('A URL deve começar com http:// ou https://', 'error')
    addGalleryImage(url, caption.trim() || 'Foto do restaurante')
    setUrl('')
    setCaption('')
    toast('Imagem adicionada à galeria!')
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold sm:text-4xl">Galeria</h1>
        <p className="mt-1 text-forest/65">{gallery.length} imagens exibidas na vitrine.</p>
      </div>

      <form onSubmit={add} className="grid gap-5 rounded-3xl bg-white p-6 shadow-sm md:grid-cols-2">
        <ImagePicker value={url} onChange={setUrl} aspect="aspect-[16/9]" />
        <div className="flex flex-col">
          <label className="label">Legenda</label>
          <input className="field" value={caption} onChange={(e) => setCaption(e.target.value)} placeholder="Ex.: Buffet mineiro" />
          <button className="btn-green mt-auto self-start"><Plus className="h-4 w-4" /> Adicionar à galeria</button>
        </div>
      </form>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {gallery.map((g) => (
          <figure key={g.id} className="group relative overflow-hidden rounded-2xl bg-white shadow-sm">
            <SafeImage src={g.url} alt={g.caption} className="aspect-[4/3]" imgClassName="transition duration-500 group-hover:scale-105" />
            <figcaption className="truncate px-3 py-2 text-xs text-forest/70">{g.caption}</figcaption>
            <button onClick={() => setToDelete(g)} aria-label="Remover imagem" className="absolute right-2 top-2 rounded-full bg-forest/85 p-2 text-cream opacity-100 transition hover:bg-red-700 sm:opacity-0 sm:group-hover:opacity-100">
              <Trash2 className="h-4 w-4" />
            </button>
          </figure>
        ))}
      </div>
      {gallery.length === 0 && <div className="rounded-3xl border border-dashed border-forest/25 py-14 text-center text-forest/55">Galeria vazia.</div>}

      <ConfirmDialog
        open={!!toDelete}
        title="Remover imagem"
        message="Deseja remover esta imagem da galeria?"
        confirmLabel="Remover"
        onCancel={() => setToDelete(null)}
        onConfirm={() => { if (toDelete) { removeGalleryImage(toDelete.id); toast('Imagem removida.') } setToDelete(null) }}
      />
    </div>
  )
}
