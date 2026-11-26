import { ExternalLink, FolderTree, ImageIcon, LayoutDashboard, LogOut, Menu as MenuIcon, Package, RotateCcw, Settings, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import ConfirmDialog from '../../components/ConfirmDialog'
import Logo from '../../components/Logo'
import { logout } from '../../lib/auth'
import { useStore, useUi } from '../../store'

const nav = [
  { to: '/admin', end: true, icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/admin/produtos', icon: Package, label: 'Produtos' },
  { to: '/admin/categorias', icon: FolderTree, label: 'Categorias' },
  { to: '/admin/informacoes', icon: Settings, label: 'Informações' },
  { to: '/admin/galeria', icon: ImageIcon, label: 'Galeria' },
]

export default function AdminLayout({ onLogout }: { onLogout: () => void }) {
  const [open, setOpen] = useState(false)
  const [confirmReset, setConfirmReset] = useState(false)
  const navigate = useNavigate()
  const resetDemo = useStore((s) => s.resetDemo)
  const toast = useUi((s) => s.toast)

  useEffect(() => {
    const full = () => toast('Armazenamento do navegador cheio. Use imagens menores ou por URL.', 'error')
    window.addEventListener('vm-storage-full', full)
    return () => window.removeEventListener('vm-storage-full', full)
  }, [toast])

  const out = () => {
    logout()
    onLogout()
    navigate('/admin')
  }

  const sidebar = (
    <div className="flex h-full flex-col bg-forest text-cream">
      <div className="flex items-center justify-between px-6 py-6">
        <Logo />
        <button className="lg:hidden" onClick={() => setOpen(false)} aria-label="Fechar menu">
          <X className="h-5 w-5" />
        </button>
      </div>
      <nav className="flex-1 space-y-1 px-3">
        {nav.map((n) => (
          <NavLink
            key={n.to}
            to={n.to}
            end={n.end}
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${isActive ? 'bg-gold text-forest shadow-lg' : 'text-cream/75 hover:bg-white/10 hover:text-cream'}`
            }
          >
            <n.icon className="h-[18px] w-[18px]" /> {n.label}
          </NavLink>
        ))}
        <a href="/" target="_blank" rel="noreferrer" className="mt-4 flex items-center gap-3 rounded-xl border border-cream/20 px-4 py-3 text-sm font-medium text-cream/85 transition hover:border-gold hover:text-gold">
          <ExternalLink className="h-[18px] w-[18px]" /> Visualizar site
        </a>
      </nav>
      <div className="space-y-1 border-t border-cream/10 p-3">
        <button onClick={() => setConfirmReset(true)} className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-cream/70 transition hover:bg-white/10 hover:text-cream">
          <RotateCcw className="h-[18px] w-[18px]" /> Restaurar demo
        </button>
        <button onClick={out} className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-cream/70 transition hover:bg-white/10 hover:text-cream">
          <LogOut className="h-[18px] w-[18px]" /> Sair
        </button>
      </div>
    </div>
  )

  return (
    <div className="min-h-[100dvh] bg-[#f3ecdd]">
      <aside className="fixed inset-y-0 left-0 hidden w-64 lg:block">{sidebar}</aside>
      {open && (
        <div className="fixed inset-0 z-[80] lg:hidden">
          <div className="absolute inset-0 bg-forest/60" onClick={() => setOpen(false)} />
          <aside className="absolute inset-y-0 left-0 w-72 animate-slide-in">{sidebar}</aside>
        </div>
      )}

      <div className="lg:pl-64">
        <div className="bg-brown px-4 py-2 text-center text-xs text-cream/90">
          Modo demonstração: login simulado e dados salvos apenas neste navegador (localStorage).
        </div>
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-forest/10 bg-cream/90 px-5 py-3 backdrop-blur lg:hidden">
          <button onClick={() => setOpen(true)} aria-label="Abrir menu" className="rounded-lg p-2 hover:bg-sand">
            <MenuIcon className="h-6 w-6" />
          </button>
          <Logo light={false} />
          <a href="/" target="_blank" rel="noreferrer" aria-label="Visualizar site" className="rounded-lg p-2 hover:bg-sand">
            <ExternalLink className="h-5 w-5" />
          </a>
        </header>
        <main className="mx-auto max-w-6xl p-4 sm:p-8">
          <Outlet />
        </main>
      </div>

      <ConfirmDialog
        open={confirmReset}
        title="Restaurar demonstração"
        message="Todos os produtos, categorias, informações e imagens voltarão aos dados iniciais. Suas alterações neste navegador serão perdidas."
        confirmLabel="Restaurar"
        onCancel={() => setConfirmReset(false)}
        onConfirm={() => {
          resetDemo()
          setConfirmReset(false)
          toast('Demonstração restaurada ao estado inicial.')
        }}
      />
    </div>
  )
}
