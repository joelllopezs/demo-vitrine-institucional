import { Clock, MapPin, MessageCircle, Navigation, Phone } from 'lucide-react'
import { routeLink, waLink } from '../../lib/format'
import { useStore } from '../../store'
import Reveal from '../Reveal'

export default function Location() {
  const info = useStore((s) => s.info)
  return (
    <section id="localizacao" className="bg-sand py-16 sm:py-24 lg:py-32">
      <div className="container-vm grid gap-10 lg:grid-cols-2">
        <Reveal>
          <span className="eyebrow">Localização</span>
          <h2 className="mt-5 text-3xl font-bold sm:text-4xl lg:text-5xl">Sua próxima parada fica aqui.</h2>
          <div className="mt-8 space-y-6">
            <Row icon={MapPin} title="Endereço">
              <p>{info.address}</p>
              <span className="mt-2 inline-block rounded-full bg-brown/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-brown">
                Localização demonstrativa — não é um endereço real
              </span>
            </Row>
            <Row icon={Clock} title="Horário de funcionamento">
              {info.hours.map((h) => (
                <p key={h}>{h}</p>
              ))}
            </Row>
            <Row icon={Phone} title="Telefone">
              <p>{info.phone}</p>
            </Row>
          </div>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href={routeLink(info.address)} target="_blank" rel="noreferrer" className="btn-green px-7 py-4">
              <Navigation className="h-4 w-4" /> Traçar rota
            </a>
            <a href={waLink(info.whatsapp)} target="_blank" rel="noreferrer" className="btn-outline px-7 py-4">
              <MessageCircle className="h-4 w-4" /> Chamar no WhatsApp
            </a>
          </div>
        </Reveal>

        <Reveal delay={150}>
          {/* Mapa ilustrativo: não aponta para nenhum local real */}
          <div className="relative h-full min-h-[300px] overflow-hidden sm:min-h-[360px] rounded-[2rem] bg-forest shadow-2xl">
            <svg viewBox="0 0 600 460" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
              <rect width="600" height="460" fill="#1f4a36" />
              {[...Array(12)].map((_, i) => (
                <path key={i} d={`M-20 ${40 + i * 40} Q 150 ${i * 40 + (i % 2 ? 10 : 70)} 300 ${40 + i * 40} T 620 ${40 + i * 40}`} fill="none" stroke="#315B42" strokeWidth="1.2" opacity=".6" />
              ))}
              <path d="M-20 360 C 120 300 220 330 320 250 S 520 130 640 90" fill="none" stroke="#2a2a2a" strokeWidth="34" strokeLinecap="round" />
              <path d="M-20 360 C 120 300 220 330 320 250 S 520 130 640 90" fill="none" stroke="#C49A52" strokeWidth="2" strokeDasharray="14 14" />
            </svg>
            <div className="absolute left-[48%] top-[42%] -translate-x-1/2 -translate-y-1/2 text-center">
              <span className="relative mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gold text-forest shadow-xl">
                <span className="absolute inset-0 animate-ping rounded-full bg-gold/50" />
                <MapPin className="relative h-7 w-7" />
              </span>
              <p className="mt-3 rounded-full bg-cream px-4 py-1.5 text-xs font-bold text-forest shadow-lg">{info.name}</p>
            </div>
            <p className="absolute bottom-4 left-4 right-4 rounded-xl bg-forest/80 px-4 py-2 text-center text-[11px] uppercase tracking-widest text-cream/70 backdrop-blur">
              Ilustração demonstrativa
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function Row({ icon: Icon, title, children }: { icon: typeof MapPin; title: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-4">
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-forest text-gold">
        <Icon className="h-5 w-5" />
      </span>
      <div className="min-w-0">
        <h3 className="text-base font-bold">{title}</h3>
        <div className="mt-1 break-words text-forest/75">{children}</div>
      </div>
    </div>
  )
}
