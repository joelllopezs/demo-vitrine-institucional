import { Flame, Heart, Wheat } from 'lucide-react'
import { IMG } from '../../data/images'
import { useStore } from '../../store'
import Reveal from '../Reveal'
import SafeImage from '../SafeImage'

const pillars = [
  { icon: Flame, title: 'Fogão a lenha', text: 'Panelas de ferro que guardam o calor e o sabor de geração em geração.' },
  { icon: Wheat, title: 'Ingredientes da terra', text: 'Queijo, café, feijão e hortaliças de produtores mineiros parceiros.' },
  { icon: Heart, title: 'Receber bem', text: 'Quem para na estrada é tratado como visita de casa.' },
]

export default function History() {
  const name = useStore((s) => s.info.name)
  return (
    <section id="historia" className="grain relative overflow-hidden bg-cream py-16 sm:py-24 lg:py-32">
      <div className="container-vm grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <Reveal className="relative order-2 lg:order-1">
          <div className="grid grid-cols-6 grid-rows-6 gap-3 sm:gap-4">
            <SafeImage
              src={IMG.historyMain}
              alt="Cozinheira preparando comida mineira na panela de ferro"
              className="col-span-4 row-span-6 aspect-[3/4.4] rounded-[2rem] shadow-xl"
            />
            <SafeImage
              src={IMG.historySecondary}
              alt="Ambiente rústico do restaurante"
              className="col-span-2 row-span-3 rounded-[1.5rem] shadow-lg"
            />
            <SafeImage
              src={IMG.historyThird}
              alt="Ingredientes frescos sobre a mesa"
              className="col-span-2 row-span-3 rounded-[1.5rem] shadow-lg"
            />
          </div>
          <div className="absolute -bottom-6 -left-2 rounded-2xl bg-forest px-6 py-5 text-cream shadow-2xl sm:-left-6">
            <p className="font-display text-4xl font-bold text-gold">+30</p>
            <p className="text-xs uppercase tracking-widest text-cream/75">anos de tradição*</p>
          </div>
        </Reveal>

        <div className="order-1 lg:order-2">
          <Reveal>
            <span className="eyebrow">Nossa história</span>
            <h2 className="mt-5 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
              Da cozinha da vó para a beira da estrada.
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <div className="mt-7 space-y-5 text-base leading-relaxed text-forest/80 sm:text-lg">
              <p>
                O {name} nasceu de uma vontade simples: oferecer a quem está viajando a mesma mesa farta que a família
                mineira prepara aos domingos. Tudo começou com um fogão a lenha, algumas panelas de ferro e uma porta
                sempre aberta.
              </p>
              <p>
                Aqui, o feijão cozinha devagar, o pão de queijo sai quentinho do forno e o café é coado na hora. Cada
                prato respeita a receita de família e o cuidado com os ingredientes — porque comida de verdade pede
                tempo e carinho.
              </p>
              <p>
                Mais do que uma parada, queremos ser o lugar onde o viajante descansa, se alimenta bem e segue viagem
                com o coração aquecido.
              </p>
            </div>
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {pillars.map((p, i) => (
              <Reveal key={p.title} delay={200 + i * 100}>
                <div className="h-full rounded-2xl border border-forest/10 bg-white/60 p-5 transition duration-300 hover:-translate-y-1 hover:border-gold/60 hover:shadow-lg">
                  <p.icon className="mb-3 h-6 w-6 text-gold" strokeWidth={1.7} />
                  <h3 className="text-base font-bold">{p.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-forest/70">{p.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="mt-6 text-xs text-forest/50">* História fictícia, criada para fins de demonstração.</p>
        </div>
      </div>
    </section>
  )
}
