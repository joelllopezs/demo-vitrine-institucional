import { ChevronDown, MapPin, UtensilsCrossed } from 'lucide-react'
import { IMG } from '../../data/images'
import SafeImage from '../SafeImage'

export default function Hero() {
  return (
    <section id="inicio" className="relative flex min-h-[100svh] items-center overflow-hidden bg-forest">
      <SafeImage
        src={IMG.hero}
        alt="Mesa farta de comida mineira com panelas de ferro, feijão tropeiro, torresmo e pão de queijo"
        className="absolute inset-0 h-full w-full !bg-forest"
        imgClassName="animate-ken-burns object-center"
        eager
      />
      {/* Camadas escuras para legibilidade */}
      {/* Celular/tablet: véu uniforme, a imagem aparece por inteiro atrás do texto centralizado */}
      <div className="absolute inset-0 bg-forest/55 lg:hidden" />
      {/* Desktop: gradiente lateral, texto à esquerda */}
      <div className="absolute inset-0 hidden bg-gradient-to-r from-forest/90 via-forest/60 to-forest/20 lg:block" />
      <div className="absolute inset-0 bg-gradient-to-t from-forest via-transparent to-forest/60" />

      <div className="container-vm relative z-10 pb-24 pt-24 sm:pt-32">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center lg:mx-0 lg:items-start lg:text-left">
          <span className="eyebrow animate-fade-up justify-center text-[10px] tracking-[0.2em] before:hidden sm:text-xs sm:tracking-[0.28em] lg:justify-start lg:before:block">Restaurante de rodovia · Cozinha mineira</span>
          <h1
            className="mt-5 animate-fade-up text-[2.25rem] font-extrabold leading-[1.08] text-cream min-[380px]:text-[2.6rem] sm:mt-6 sm:text-6xl lg:text-7xl xl:text-8xl"
            style={{ animationDelay: '120ms' }}
          >
            UMA PARADA COM SABOR DE <span className="italic text-gold">MINAS.</span>
          </h1>
          <p
            className="mt-5 max-w-md animate-fade-up text-base sm:mt-7 sm:max-w-xl leading-relaxed text-cream/85 sm:text-xl"
            style={{ animationDelay: '260ms' }}
          >
            Na estrada, seu melhor destino é encontrar o verdadeiro sabor da comida mineira.
          </p>
          <div className="mt-8 flex w-full max-w-xs animate-fade-up flex-col gap-3 sm:mt-10 sm:w-auto sm:max-w-none sm:flex-row sm:justify-center lg:justify-start" style={{ animationDelay: '400ms' }}>
            <a href="#cardapio" className="btn-gold w-full px-8 py-4 sm:w-auto">
              <UtensilsCrossed className="h-4 w-4" /> Conheça nosso cardápio
            </a>
            <a href="#localizacao" className="btn-outline-light w-full px-8 py-4 backdrop-blur-sm sm:w-auto">
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
