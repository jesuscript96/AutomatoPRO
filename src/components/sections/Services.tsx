'use client';
import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import ColorizedTitle from '@/components/ui/ColorizedTitle';
import FadeIn from '@/components/animations/FadeIn';

const services = [
  {
    title: 'Desarrollo Web',
    secondaryTitle: 'Artesanía Digital',
    description: 'Sitios web únicos y artesanales, construidos desde cero. No usamos plantillas, creamos experiencias a medida.',
    color: 'bg-[#753B67]', // Purple
    textColor: 'text-white',
    flipDirection: 'left',
    mainTitlePosition: { top: '15%', left: '10%' },
    contentPosition: { bottom: '15%', right: '10%', textAlign: 'right' as const, alignItems: 'flex-end' },
    blocks: [
      {
        className: 'w-[200px] h-[200px] md:w-[300px] md:h-[300px] border border-black bg-white transition-colors duration-300 hover:bg-[#F5CC00]',
        style: { top: '10%', right: '15%' }
      },
      {
        className: 'w-[150px] h-[250px] border border-black bg-white transition-colors duration-300 hover:bg-[#35A09E]',
        style: { bottom: '20%', left: '15%' }
      }
    ]
  },
  {
    title: 'Diseño UI/UX',
    secondaryTitle: 'Experiencia de Usuario',
    description: 'Interfaces intuitivas que cautivan. Diseñamos pensando en las personas, no solo en los píxeles.',
    color: 'bg-[#F5CC00]', // Yellow
    textColor: 'text-white',
    flipDirection: 'right',
    mainTitlePosition: { bottom: '20%', left: '10%' },
    contentPosition: { top: '20%', right: '10%', textAlign: 'right' as const, alignItems: 'flex-end' },
    blocks: [
      {
        className: 'w-[350px] h-[150px] border border-black bg-white transition-colors duration-300 hover:bg-[#753B67]',
        style: { top: '15%', left: '10%' }
      },
      {
        className: 'w-[180px] h-[180px] border border-black bg-white transition-colors duration-300 hover:bg-[#35A09E]',
        style: { bottom: '10%', right: '30%' }
      }
    ]
  },
  {
    title: 'SEO & Performance',
    secondaryTitle: 'Crecimiento Orgánico',
    description: 'Optimizamos cada línea de código. Velocidad y visibilidad para que tu negocio destaque en la red.',
    color: 'bg-[#35A09E]', // Teal
    textColor: 'text-white',
    flipDirection: 'none',
    mainTitlePosition: { top: '15%', right: '10%', textAlign: 'right' as const },
    contentPosition: { bottom: '20%', left: '10%', textAlign: 'left' as const, alignItems: 'flex-start' },
    blocks: [
      {
        className: 'w-[250px] h-[250px] border border-black bg-white transition-colors duration-300 hover:bg-[#F5CC00]',
        style: { top: '30%', left: '20%' }
      },
      {
        className: 'w-[120px] h-[300px] border border-black bg-white transition-colors duration-300 hover:bg-[#753B67]',
        style: { top: '10%', right: '30%' }
      }
    ]
  }
];

function Card({
  i,
  service,
  progress,
  range,
  targetScale
}: {
  i: number;
  service: typeof services[0];
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
}) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'start start']
  });

  const start = i * 0.25;
  const end = start + 0.25;
  const exitStart = end;
  const exitEnd = exitStart + 0.3; // Increased from 0.2 to 0.3 for smoother transitions

  // Smoother entry animation with extended range
  const y = useTransform(
    progress,
    [start, start + 0.15], // Extended from 0.1 to 0.15 for smoother entry
    ['100vh', '0vh']
  );

  // More dramatic scale reduction
  const scale = useTransform(
    progress,
    [exitStart, exitEnd],
    [1, 0.65] // Reduced from 0.8 to 0.65 for more exaggerated effect
  );

  // More exaggerated 3D rotation
  const rotateY = useTransform(
    progress,
    [exitStart, exitEnd],
    [0, service.flipDirection === 'left' ? -35 : service.flipDirection === 'right' ? 35 : 0] // Increased from ±15 to ±35
  );

  // More dramatic horizontal translation
  const x = useTransform(
    progress,
    [exitStart, exitEnd],
    ['0%', service.flipDirection === 'left' ? '-40%' : service.flipDirection === 'right' ? '40%' : '0%'] // Increased from ±20% to ±40%
  );

  const isLast = i === services.length - 1;
  const finalScale = isLast ? 1 : scale;
  const finalRotateY = isLast ? 0 : rotateY;
  const finalX = isLast ? '0%' : x;

  return (
    <motion.div
      style={{
        y,
        scale: finalScale,
        rotateY: finalRotateY,
        x: finalX,
        zIndex: i + 10,
        boxShadow: '4px 4px 0px 0px rgba(0, 0, 0, 0.2), -4px -4px 0px 0px rgba(0, 0, 0, 0.2), 8px 8px 0px 0px rgba(0, 0, 0, 0.1), -8px -8px 0px 0px rgba(0, 0, 0, 0.1), 12px 12px 0px 0px rgba(0, 0, 0, 0.05), -12px -12px 0px 0px rgba(0, 0, 0, 0.05)',
        backgroundImage: i === 0 ? 'url(/fondomarillo.png)' : i === 1 ? 'url(/fondozul.png)' : 'url(/Morado.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      transition={{
        type: 'spring',
        stiffness: 100,
        damping: 30,
        mass: 1
      }}
      className="absolute top-0 w-full h-full border border-black bg-white origin-bottom overflow-hidden p-6 md:p-20"
    >
      {/* Bloques de colores */}
      {/* Bloque con imagen (Desktop) */}
      <div
        className="hidden md:block absolute w-[280px] h-[280px] md:w-[320px] md:h-[320px] border border-black z-10 transition-colors duration-300 hover:bg-[#753B67]"
        style={{
          ...(i === 1 ? { top: '15%', right: '10%' } : { bottom: '10%', left: '10%' }),
          boxShadow: '2px 2px 0px 0px rgba(0, 0, 0, 0.1), 4px 4px 0px 0px rgba(0, 0, 0, 0.05)',
          backgroundImage: i === 0 ? 'url(/Tomatemorado.png)' : i === 1 ? 'url(/tomateamarillo.png)' : 'url(/tomateazul.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* Bloque transparente (Mobile) */}
      <div
        className="md:hidden absolute w-[200px] h-[200px] border border-black z-10 transition-colors duration-300 hover:bg-[#F5CC00]"
        style={{
          top: '10%',
          right: '5%',
          boxShadow: '2px 2px 0px 0px rgba(0, 0, 0, 0.1), 4px 4px 0px 0px rgba(0, 0, 0, 0.05)',
          backgroundColor: 'transparent'
        }}
      />

      {/* Bloque verde - Rectángulo horizontal 
      <div
        className="absolute w-[300px] h-[150px] md:w-[360px] md:h-[180px] bg-white border border-black z-10 transition-colors duration-300 hover:bg-[#F5CC00]"
        style={{
          top: '50%',
          left: '5%',
          boxShadow: '2px 2px 0px 0px rgba(0, 0, 0, 0.1), 4px 4px 0px 0px rgba(0, 0, 0, 0.05)',
        }}
      />
      */}

      {/* Título en esquina superior izquierda */}
      <FadeIn direction="up">
        <div className="mb-32 max-w-2xl relative z-30">
          <h2 className={`text-5xl md:text-6xl font-bold ${service.textColor} mb-6`}>
            {service.title}
          </h2>
          <p className={`text-body-lg md:text-xl ${service.textColor} font-light`}>
            {service.description}
          </p>
        </div>
      </FadeIn>

      {/* Filosofía en esquina inferior derecha */}
      <FadeIn direction="up" delay={0.4}>
        <div className="flex justify-end">
          <div className="max-w-2xl text-right relative z-30">
            <h3 className={`text-5xl md:text-6xl font-bold ${service.textColor} mb-6`}>
              {service.secondaryTitle}
            </h3>
            <p className={`text-body-lg md:text-xl ${service.textColor} font-light mb-6`}>
              {service.description}
            </p>
          </div>
        </div>
      </FadeIn>
    </motion.div>
  );
}

const COLORS = ['#F5CC00', '#753B67', '#35A09E'];

export default function Services() {
  const containerRef = useRef(null);
  const [lineColors, setLineColors] = useState<string[]>([]);

  useEffect(() => {
    setLineColors([
      COLORS[Math.floor(Math.random() * COLORS.length)],
      COLORS[Math.floor(Math.random() * COLORS.length)],
      COLORS[Math.floor(Math.random() * COLORS.length)],
      COLORS[Math.floor(Math.random() * COLORS.length)],
      COLORS[Math.floor(Math.random() * COLORS.length)],
      COLORS[Math.floor(Math.random() * COLORS.length)],
      COLORS[Math.floor(Math.random() * COLORS.length)],
      COLORS[Math.floor(Math.random() * COLORS.length)],
    ]);
  }, []);

  const getLineStyle = (index: number) => {
    return {
      borderColor: lineColors[index] || '#000000',
      transition: 'border-color 0.5s ease'
    };
  };

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  return (
    <section ref={containerRef} id="services" className="relative h-[400vh] bg-white">
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col perspective-1000">

        {/* Header Section - Staggered Title */}
        {/* Changed z-index to 0 so cards (z-10+) slide OVER it */}
        <div className="absolute top-0 left-0 w-full h-full z-0 flex flex-col pointer-events-none">
          {/* Row 1: NUESTROS */}
          <div
            className="relative w-full h-[12.5%] border-b flex items-center px-6 md:px-12 bg-white"
            style={getLineStyle(0)}
          >
            <ColorizedTitle
              text="NUESTROS"
              tag="h2"
              className="text-5xl md:text-7xl font-bold text-black leading-none tracking-tighter"
            />
          </div>

          {/* Row 2: SERVICIOS */}
          <div
            className="relative w-full h-[12.5%] border-b flex items-center justify-end px-6 md:px-12 bg-white"
            style={getLineStyle(1)}
          >
            <ColorizedTitle
              text="SERVICIOS"
              tag="h2"
              className="text-5xl md:text-7xl font-bold text-black leading-none tracking-tighter"
            />
          </div>

          {/* Row 3: Subtitle */}
          <div
            className="relative w-full h-[12.5%] border-b flex items-center justify-center bg-white"
            style={getLineStyle(2)}
          >
            <p className="text-body-lg md:text-xl text-gray-600 font-light">
              Soluciones digitales cultivadas con pasión y precisión.
            </p>
          </div>

          {/* Row 4: Empty Line */}
          <div className="relative w-full h-[12.5%] border-b bg-white" style={getLineStyle(3)} />

          {/* Row 5: Empty Line */}
          <div className="relative w-full h-[12.5%] border-b bg-white" style={getLineStyle(4)} />

          {/* Row 6: Empty Line */}
          <div className="relative w-full h-[12.5%] border-b bg-white" style={getLineStyle(5)} />

          {/* Row 7: Empty Line */}
          <div className="relative w-full h-[12.5%] border-b bg-white" style={getLineStyle(6)} />

          {/* Row 8: Empty Line */}
          <div className="relative w-full h-[12.5%] border-b bg-white" style={getLineStyle(7)} />
        </div>

        {/* Cards Container */}
        {/* Cards need higher z-index to slide OVER the header */}
        <div className="relative w-full h-full flex items-center justify-center perspective-[800px] z-10 pointer-events-none">
          {services.map((service, i) => (
            <div key={i} className="pointer-events-auto w-full h-full absolute top-0 left-0 flex items-center justify-center">
              <Card
                i={i}
                service={service}
                progress={scrollYProgress}
                range={[i * 0.25, 1]}
                targetScale={1 - (services.length - i) * 0.05}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
