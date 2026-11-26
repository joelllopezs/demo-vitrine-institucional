import { Bath, Car, Soup, Users, Truck } from 'lucide-react'
import { IMG } from '../../data/images'
import Reveal from '../Reveal'
import SafeImage from '../SafeImage'

const items = [
  { icon: Car, title: 'Estacionamento amplo', text: 'Espaço seguro para carros, motos e veículos de maior porte.', img: IMG.estacionamento },
  { icon: Users, title: 'Ambiente familiar', text: 'Salão aconchegante, com mesas para grupos e espaço para crianças.', img: IMG.familia },
  { icon: Soup, title: 'Refeições completas', text: 'Buffet e pratos à la carte com o melhor da cozinha mineira.', img: IMG.buffet },
  { icon: Truck, title: 'Atendimento ao viajante', text: 'Serviço ágil para quem precisa seguir viagem, sem perder o sabor.', img: IMG.viajante },
  { icon: Bath, title: 'Banheiros', text: 'Banheiros limpos, amplos e bem cuidados, a qualquer hora.', img: IMG.interior },
]

export default function Amenities() {
  return (
    <section id="estrutura" className="bg-cream py-24 sm:py-32">
      <div className="container-vm">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Estrutura e comodidades</span>
          <h2 className="mt-5 text-4xl font-bold sm:text-5xl">Tudo o que o viajante precisa.</h2>
        </Reveal>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-6">
          {items.map((it, i) => (
            <Reveal key={it.title} delay={i * 90} className={i < 2 ? 'lg:col-span-3' : 'lg:col-span-2'}>
              <article className="group relative h-full min-h-[300px] overflow-hidden rounded-3xl shadow-lg">
                <SafeImage src={it.img} alt={it.title} className="absolute inset-0" imgClassName="transition duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-forest via-forest/50 to-forest/10 transition group-hover:from-forest/95" />
                <div className="relative flex h-full min-h-[300px] flex-col justify-end p-7 text-cream">
                  <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gold text-forest transition duration-500 group-hover:-translate-y-1 group-hover:rotate-6">
                    <it.icon className="h-6 w-6" strokeWidth={1.8} />
                  </span>
                  <h3 className="text-xl font-bold">{it.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-cream/80">{it.text}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
