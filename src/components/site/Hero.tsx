import { ChevronDown, MapPin, UtensilsCrossed } from 'lucide-react'
import { IMG } from '../../data/images'
import SafeImage from '../SafeImage'

export default function Hero() {
  return (
    <section id="inicio" className="relative flex min-h-[100svh] items-center overflow-hidden bg-forest">
      <SafeImage
        src={IMG.hero}
        alt="Mesa farta de comida mineira com panelas de ferro, feijão tropeiro, torresmo e pão de queijo"
        className="absolute inset-0 !bg-forest"
        imgClassName="animate-ken-burns"
        eager
      />
      {/* Camadas escuras para legibilidade */}
      <div className="absolute inset-0 bg-gradient-to-r from-forest/90 via-forest/60 to-forest/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-forest via-transparent to-forest/60" />

      <div className="container-vm relative z-10 pb-24 pt-28 sm:pt-32">
        <div className="max-w-3xl">
          <span className="eyebrow animate-fade-up">Restaurante de rodovia · Cozinha mineira</span>
          <h1
            className="mt-6 animate-fade-up text-[2.5rem] font-extrabold leading-[1.05] text-cream sm:text-6xl lg:text-7xl xl:text-8xl"
            style={{ animationDelay: '120ms' }}
          >
            UMA PARADA COM SABOR DE <span className="italic text-gold">MINAS.</span>
          </h1>
          <p
            className="mt-6 max-w-xl animate-fade-up text-base leading-relaxed text-cream/85 sm:mt-7 sm:text-xl"
            style={{ animationDelay: '260ms' }}
          >
            Na estrada, seu melhor destino é encontrar o verdadeiro sabor da comida mineira.
          </p>
          <div className="mt-10 flex animate-fade-up flex-col gap-3 sm:flex-row" style={{ animationDelay: '400ms' }}>
            <a href="#cardapio" className="btn-gold px-8 py-4">
              <UtensilsCrossed className="h-4 w-4" /> Conheça nosso cardápio
            </a>
            <a href="#localizacao" className="btn-outline-light px-8 py-4">
              <MapPin className="h-4 w-4" /> Como chegar
            </a>
          </div>
        </div>
      </div>

      <a
        href="#historia"
        aria-label="Rolar para baixo"
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 animate-bounce text-cream/70 transition hover:text-gold"
      >
        <ChevronDown className="h-7 w-7" />
      </a>
    </section>
  )
}
