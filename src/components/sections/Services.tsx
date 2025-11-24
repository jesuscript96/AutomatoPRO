'use client';
import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import ColorizedTitle from '@/components/ui/ColorizedTitle';

const services = [
  {
    title: 'Desarrollo Web',
    secondaryTitle: 'Artesanía Digital',
    description: 'Sitios web únicos y artesanales, construidos desde cero. No usamos plantillas, creamos experiencias a medida.',
    color: 'bg-[#FF6B35]', // Orange
    textColor: 'text-white',
    flipDirection: 'left',
    mainTitlePosition: { top: '15%', left: '10%' },
    contentPosition: { bottom: '15%', right: '10%', textAlign: 'right' as const, alignItems: 'flex-end' },
    blocks: [
      {
        className: 'w-[200px] h-[200px] md:w-[300px] md:h-[300px] border border-black bg-white transition-colors duration-300 hover:bg-[#0066FF]',
        style: { top: '10%', right: '15%' }
      },
      {
        className: 'w-[150px] h-[250px] border border-black bg-white transition-colors duration-300 hover:bg-[#00C896]',
        style: { bottom: '20%', left: '15%' }
      }
    ]
  },
  {
    title: 'Diseño UI/UX',
    secondaryTitle: 'Experiencia de Usuario',
    description: 'Interfaces intuitivas que cautivan. Diseñamos pensando en las personas, no solo en los píxeles.',
    color: 'bg-[#0066FF]', // Blue
    textColor: 'text-white',
    flipDirection: 'right',
    mainTitlePosition: { bottom: '20%', left: '10%' },
    contentPosition: { top: '20%', right: '10%', textAlign: 'right' as const, alignItems: 'flex-end' },
    blocks: [
      {
        className: 'w-[350px] h-[150px] border border-black bg-white transition-colors duration-300 hover:bg-[#FF6B35]',
        style: { top: '15%', left: '10%' }
      },
      {
        className: 'w-[180px] h-[180px] border border-black bg-white transition-colors duration-300 hover:bg-[#00C896]',
        style: { bottom: '10%', right: '30%' }
      }
    ]
  },
  {
    title: 'SEO & Performance',
    secondaryTitle: 'Crecimiento Orgánico',
    description: 'Optimizamos cada línea de código. Velocidad y visibilidad para que tu negocio destaque en la red.',
    color: 'bg-[#00C896]', // Green
    textColor: 'text-black',
    flipDirection: 'none',
    mainTitlePosition: { top: '15%', right: '10%', textAlign: 'right' as const },
    contentPosition: { bottom: '20%', left: '10%', textAlign: 'left' as const, alignItems: 'flex-start' },
    blocks: [
      {
        className: 'w-[250px] h-[250px] border border-black bg-white transition-colors duration-300 hover:bg-[#0066FF]',
        style: { top: '30%', left: '20%' }
      },
      {
        className: 'w-[120px] h-[300px] border border-black bg-white transition-colors duration-300 hover:bg-[#FF6B35]',
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
  const exitEnd = exitStart + 0.2;

  const y = useTransform(
    progress,
    [start, start + 0.1],
    ['100vh', '0vh']
  );

  const scale = useTransform(
    progress,
    [exitStart, exitEnd],
    [1, 0.8]
  );

  const rotateY = useTransform(
    progress,
    [exitStart, exitEnd],
    [0, service.flipDirection === 'left' ? -15 : service.flipDirection === 'right' ? 15 : 0]
  );

  const x = useTransform(
    progress,
    [exitStart, exitEnd],
    ['0%', service.flipDirection === 'left' ? '-20%' : service.flipDirection === 'right' ? '20%' : '0%']
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
        boxShadow: '4px 4px 0px 0px rgba(0, 0, 0, 0.2), -4px -4px 0px 0px rgba(0, 0, 0, 0.2), 8px 8px 0px 0px rgba(0, 0, 0, 0.1), -8px -8px 0px 0px rgba(0, 0, 0, 0.1), 12px 12px 0px 0px rgba(0, 0, 0, 0.05), -12px -12px 0px 0px rgba(0, 0, 0, 0.05)'
      }}
      className={`absolute top-0 w-full h-full border border-black ${service.color} origin-bottom overflow-hidden`}
    >
      {/* Decorative Blocks */}
      {service.blocks.map((block, idx) => (
        <div
          key={idx}
          className={`absolute z-0 ${block.className}`}
          style={{
            ...block.style,
            boxShadow: '2px 2px 0px 0px rgba(0, 0, 0, 0.1)'
          }}
        />
      ))}

      {/* Main Title */}
      <div
        className="absolute z-20 max-w-2xl"
        style={service.mainTitlePosition}
      >
        <h3 className={`text-6xl md:text-8xl font-bold ${service.textColor} tracking-tight`}>
          {service.title}
        </h3>
      </div>

      {/* Secondary Title + Content */}
      <div
        className="absolute z-20 max-w-xl flex flex-col"
        style={service.contentPosition}
      >
        <h4 className={`text-3xl md:text-4xl font-bold mb-6 ${service.textColor} opacity-90`}>
          {service.secondaryTitle}
        </h4>
        <p className={`text-xl md:text-2xl ${service.textColor} font-light leading-relaxed`}>
          {service.description}
        </p>
      </div>
    </motion.div>
  );
}

const COLORS = ['#0066FF', '#FF6B35', '#00C896'];

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
        <div className="relative w-full h-full flex items-center justify-center perspective-[1200px] z-10 pointer-events-none">
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
