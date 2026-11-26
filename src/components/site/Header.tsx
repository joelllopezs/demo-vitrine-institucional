import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useStore } from '../../store'
import { waLink } from '../../lib/format'
import Logo from '../Logo'

const links = [
  { href: '#inicio', label: 'Início' },
  { href: '#historia', label: 'Nossa História' },
  { href: '#cardapio', label: 'Cardápio' },
  { href: '#galeria', label: 'Galeria' },
  { href: '#localizacao', label: 'Localização' },
]

export default function Header() {
  const info = useStore((s) => s.info)
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const solid = scrolled || open

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        solid ? 'bg-forest/95 py-3 shadow-lg shadow-black/20 backdrop-blur-md' : 'bg-transparent py-5'
      }`}
    >
      <div className="container-vm flex items-center justify-between">
        <a href="#inicio" aria-label={info.name} onClick={() => setOpen(false)}>
          <Logo name={info.name} />
        </a>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Principal">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="group relative text-sm font-medium text-cream/90 transition hover:text-gold"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a href={waLink(info.whatsapp)} target="_blank" rel="noreferrer" className="btn-gold btn-sm hidden sm:inline-flex">
            Fale conosco
          </a>
          <button
            className="rounded-full p-2 text-cream transition hover:bg-white/10 lg:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={open}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      <div
        className={`overflow-hidden bg-forest transition-[max-height,opacity] duration-500 lg:hidden ${
          open ? 'max-h-[80vh] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="container-vm flex flex-col gap-1 py-4" aria-label="Mobile">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="border-b border-cream/10 py-3.5 font-display text-lg text-cream transition hover:pl-2 hover:text-gold"
            >
              {l.label}
            </a>
          ))}
          <a href={waLink(info.whatsapp)} target="_blank" rel="noreferrer" className="btn-gold mt-4">
            Fale conosco
          </a>
        </nav>
      </div>
    </header>
  )
}
