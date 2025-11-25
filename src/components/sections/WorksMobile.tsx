'use client';
import Image from 'next/image';
import ColorizedTitle from '@/components/ui/ColorizedTitle';
import ColoredLinesBackground from '@/components/ui/ColoredLinesBackground';

interface Work {
  id: number;
  title: string;
  performingGroup: string;
  genre: string;
  status: string;
  image: string;
  listItems: string[];
  url: string;
}

const workColors = ['#F5CC00', '#753B67', '#35A09E'];

const works: Work[] = [
  {
    id: 1,
    title: 'E-commerce Platform',
    performingGroup: 'TUILUS',
    genre: 'Moda',
    status: 'Live desde 2024',
    image: '/tuiluscopia.tiff',
    listItems: ['Catálogo de productos', 'Carrito de compra', 'Panel de admin'],
    url: 'https://tuilus.com',
  },
  {
    id: 2,
    title: "Diseño 100%",
    performingGroup: 'LABORATORIO ESPERANZA',
    genre: 'Salud y Alimentación',
    status: 'Producción',
    image: '/yogurtbenefitslastcopia.tiff',
    listItems: ['Sistema de pagos', 'Email Mkt', 'Información médica'],
    url: 'https://laboratorioesperanza.com',
  },
  {
    id: 3,
    title: 'Style, elegance',
    performingGroup: 'Designer PIPPA MORRAY',
    genre: 'Portfolio Creativo - Furniture',
    status: 'Live 2024',
    image: '/muebles.webp',
    listItems: ['Galería de proyectos', 'Sobre la diseñadora', 'Formulario de contacto'],
    url: 'https://www.pippamorraydesign.com/',
  },
];

export default function WorksMobile() {
  return (
    <section id="works-mobile" className="relative bg-white overflow-hidden py-12">
      <ColoredLinesBackground className="z-0" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="mb-12 flex flex-col gap-2">
          <div className="text-left">
            <ColorizedTitle
              text="NUESTROS"
              tag="h2"
              className="uppercase text-[2.34rem] font-normal text-black leading-none"
            />
          </div>
          <div className="text-right">
            <ColorizedTitle
              text="TRABAJOS"
              tag="h2"
              className="uppercase text-[2.34rem] font-medium text-black leading-none"
            />
          </div>
        </div>

        {/* Cards Container */}
        <div className="flex flex-col gap-8">
          {works.map((work, index) => (
            <div
              key={work.id}
              className="w-full overflow-hidden border border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              style={{ backgroundColor: workColors[index] || '#ffffff' }}
            >
              {/* Card Header (Number & Title) */}
              <div className="p-6 pb-4">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-4xl font-bold text-white opacity-90">
                    {String(work.id).padStart(2, '0')}.
                  </span>
                  <a
                    href={work.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white/20 hover:bg-white/30 text-white px-4 py-1 text-sm font-medium transition-colors border border-white/30"
                  >
                    Visit Site ↗
                  </a>
                </div>
                <h3 className="text-3xl font-black leading-tight text-white mb-2">
                  {work.title}
                </h3>
                <p className="text-white/90 font-medium text-lg text-backdrop">
                  {work.performingGroup}
                </p>
              </div>

              {/* Image Area */}
              <div className="relative w-full aspect-[4/3] border-y border-black/10">
                <Image
                  src={work.image}
                  alt={work.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Details / Footer */}
              <div className="p-6 pt-4">
                <div className="flex flex-wrap gap-2 mb-4">
                  {work.listItems.map((item, i) => (
                    <span
                      key={i}
                      className="text-backdrop text-white px-3 py-1 text-xs font-medium"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm text-white/80 border-t border-white/20 pt-4">
                  <div>
                    <span className="block font-bold text-white">Genre</span>
                    <span className="text-backdrop">{work.genre}</span>
                  </div>
                  <div className="text-right">
                    <span className="block font-bold text-white">Status</span>
                    <span className="text-backdrop">{work.status}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
