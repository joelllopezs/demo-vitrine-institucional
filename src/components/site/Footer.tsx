import { Lock } from 'lucide-react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { useStore } from '../../store'
import Logo from '../Logo'

export default function Footer() {
  const info = useStore((s) => s.info)
  const socials: { icon: ReactNode; href: string; label: string }[] = [
    { icon: <Svg d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zm5 5.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zM17.5 6.5h.01" />, href: info.instagram, label: 'Instagram' },
    { icon: <Svg d="M14 8h3V4h-3a4 4 0 0 0-4 4v2H7v4h3v7h4v-7h3l1-4h-4V8z" />, href: info.facebook, label: 'Facebook' },
    { icon: <Svg d="M3 8a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8zm7 1.5v5l4.5-2.5L10 9.5z" />, href: info.youtube, label: 'YouTube' },
  ].filter((s) => s.href)

  return (
    <footer className="bg-forest text-cream/80">
      <div className="container-vm grid gap-12 py-16 md:grid-cols-3">
        <div>
          <Logo name={info.name} />
          <p className="mt-5 max-w-xs text-sm leading-relaxed">{info.description}</p>
          <div className="mt-6 flex gap-3">
            {socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label} className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/25 transition hover:-translate-y-1 hover:border-gold hover:bg-gold hover:text-forest">
                {s.icon}
              </a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="mb-4 text-lg font-bold text-cream">Links rápidos</h4>
          <ul className="space-y-2.5 text-sm">
            {[
              ['#inicio', 'Início'],
              ['#historia', 'Nossa História'],
              ['#cardapio', 'Cardápio'],
              ['#galeria', 'Galeria'],
              ['#estrutura', 'Estrutura'],
              ['#localizacao', 'Localização'],
            ].map(([h, l]) => (
              <li key={h}>
                <a href={h} className="transition hover:pl-1 hover:text-gold">
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="mb-4 text-lg font-bold text-cream">Contato (demonstrativo)</h4>
          <ul className="space-y-2.5 text-sm">
            <li>Tel.: {info.phone}</li>
            <li>WhatsApp: {info.whatsapp}</li>
            <li>{info.address}</li>
            {info.hours.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-cream/10">
        <div className="container-vm flex flex-col items-center justify-between gap-3 py-6 text-xs text-cream/55 sm:flex-row">
          <p>© {new Date().getFullYear()} {info.name}. Todos os direitos reservados. Site fictício para demonstração comercial.</p>
          <Link to="/admin" className="inline-flex items-center gap-1.5 opacity-60 transition hover:text-gold hover:opacity-100">
            <Lock className="h-3 w-3" /> Área administrativa
          </Link>
        </div>
      </div>
    </footer>
  )
}

function Svg({ d }: { d: string }) {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d={d} />
    </svg>
  )
}
