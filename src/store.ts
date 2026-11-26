import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { SEED_CATEGORIES, SEED_GALLERY, SEED_INFO, SEED_PRODUCTS } from './data/seed'
import { uid } from './lib/format'
import type { ActivityEntry, Category, GalleryImage, Product, RestaurantInfo } from './types'

interface DataState {
  products: Product[]
  categories: Category[]
  info: RestaurantInfo
  gallery: GalleryImage[]
  activity: ActivityEntry[]
}

interface Actions {
  addProduct: (p: Omit<Product, 'id'>) => void
  updateProduct: (id: string, p: Partial<Omit<Product, 'id'>>) => void
  removeProduct: (id: string) => void
  addCategory: (name: string) => void
  renameCategory: (id: string, name: string) => void
  removeCategory: (id: string) => boolean
  updateInfo: (info: RestaurantInfo) => void
  addGalleryImage: (url: string, caption: string) => void
  removeGalleryImage: (id: string) => void
  resetDemo: () => void
}

const initial = (): DataState => ({
  products: SEED_PRODUCTS,
  categories: SEED_CATEGORIES,
  info: SEED_INFO,
  gallery: SEED_GALLERY,
  activity: [{ id: 'a0', text: 'Dados de demonstração carregados', at: Date.now() }],
})

const log = (s: DataState, text: string): ActivityEntry[] =>
  [{ id: uid('a'), text, at: Date.now() }, ...s.activity].slice(0, 30)

export const STORAGE_KEY = 'via-mineira:v1'

/** Storage que não derruba o app se a cota do localStorage estourar. */
const safeStorage = {
  getItem: (k: string) => {
    try {
      return localStorage.getItem(k)
    } catch {
      return null
    }
  },
  setItem: (k: string, v: string) => {
    try {
      localStorage.setItem(k, v)
    } catch {
      window.dispatchEvent(new CustomEvent('vm-storage-full'))
    }
  },
  removeItem: (k: string) => {
    try {
      localStorage.removeItem(k)
    } catch {
      /* ignore */
    }
  },
}

export const useStore = create<DataState & Actions>()(
  persist(
    (set, get) => ({
      ...initial(),

      addProduct: (p) =>
        set((s) => ({
          products: [{ ...p, id: uid('p') }, ...s.products],
          activity: log(s, `Produto cadastrado: ${p.name}`),
        })),

      updateProduct: (id, p) =>
        set((s) => {
          const old = s.products.find((x) => x.id === id)
          return {
            products: s.products.map((x) => (x.id === id ? { ...x, ...p } : x)),
            activity: log(s, `Produto atualizado: ${p.name ?? old?.name ?? ''}`),
          }
        }),

      removeProduct: (id) =>
        set((s) => ({
          products: s.products.filter((x) => x.id !== id),
          activity: log(s, `Produto removido: ${s.products.find((x) => x.id === id)?.name ?? ''}`),
        })),

      addCategory: (name) =>
        set((s) => ({
          categories: [...s.categories, { id: uid('cat'), name }],
          activity: log(s, `Categoria criada: ${name}`),
        })),

      renameCategory: (id, name) =>
        set((s) => ({
          categories: s.categories.map((c) => (c.id === id ? { ...c, name } : c)),
          activity: log(s, `Categoria renomeada: ${name}`),
        })),

      removeCategory: (id) => {
        const s = get()
        if (s.products.some((p) => p.categoryId === id)) return false
        set({
          categories: s.categories.filter((c) => c.id !== id),
          activity: log(s, `Categoria removida: ${s.categories.find((c) => c.id === id)?.name ?? ''}`),
        })
        return true
      },

      updateInfo: (info) => set((s) => ({ info, activity: log(s, 'Informações do restaurante atualizadas') })),

      addGalleryImage: (url, caption) =>
        set((s) => ({
          gallery: [...s.gallery, { id: uid('g'), url, caption }],
          activity: log(s, 'Imagem adicionada à galeria'),
        })),

      removeGalleryImage: (id) =>
        set((s) => ({
          gallery: s.gallery.filter((g) => g.id !== id),
          activity: log(s, 'Imagem removida da galeria'),
        })),

      resetDemo: () => set({ ...initial(), activity: [{ id: uid('a'), text: 'Demonstração restaurada ao estado inicial', at: Date.now() }] }),
    }),
    {
      name: STORAGE_KEY,
      version: 1,
      storage: createJSONStorage(() => safeStorage),
      partialize: (s) => ({
        products: s.products,
        categories: s.categories,
        info: s.info,
        gallery: s.gallery,
        activity: s.activity,
      }),
    },
  ),
)

// Sincroniza abas abertas (ex.: painel numa aba, vitrine em outra) sem recarregar.
if (typeof window !== 'undefined') {
  window.addEventListener('storage', (e) => {
    if (e.key === STORAGE_KEY) void useStore.persist.rehydrate()
  })
}

/* ---------- UI (toasts) ---------- */
interface Toast {
  id: string
  kind: 'success' | 'error' | 'info'
  text: string
}
interface UiState {
  toasts: Toast[]
  toast: (text: string, kind?: Toast['kind']) => void
  dismiss: (id: string) => void
}
export const useUi = create<UiState>((set) => ({
  toasts: [],
  toast: (text, kind = 'success') => {
    const id = uid('t')
    set((s) => ({ toasts: [...s.toasts, { id, kind, text }] }))
    setTimeout(() => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })), 3800)
  },
  dismiss: (id) => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
}))
