'use client';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { useRef, useEffect, useState } from 'react';

// Contenido de las cards
const serviceCards = [
  {
    id: 1,
    title: 'Contenido que Impacta',
    text: 'Creamos narrativas imposibles de olvidar. Estrategia y creatividad que hacen destacar tu marca en un mercado saturado. Transformamos ideas complejas en mensajes claros y poderosos que resuenan con tu audiencia. Cada palabra, cada imagen, cada elemento visual está cuidadosamente diseñado para generar impacto y dejar una huella duradera en quienes interactúan con tu marca.',
    keyword: 'Storytelling',
    bgColor: 'bg-white border border-black', // Blanco con borde negro
  },
  {
    id: 2,
    title: 'Diseño que Define',
    text: 'Identidades de marca distintivas y memorables que elevan tu presencia y te diferencian de la competencia desde el primer contacto. Desarrollamos sistemas visuales completos que comunican tu esencia de manera coherente y poderosa. Cada detalle, desde la tipografía hasta la paleta de colores, está pensado para construir una identidad única que refleje tus valores y conecte emocionalmente con tu público objetivo.',
    keyword: 'Branding',
    bgColor: 'bg-white border border-black', // Blanco con borde negro
  },
  {
    id: 3,
    title: 'Experiencias que Conectan',
    text: 'De la estrategia a la ejecución, diseñamos experiencias audaces que amplifican tu visibilidad y forjan conexiones profundas con tu audiencia. Creamos interfaces intuitivas y funcionales que guían a los usuarios de manera natural, transformando cada interacción en una oportunidad de engagement. Nuestro enfoque combina diseño centrado en el usuario con innovación tecnológica para construir experiencias digitales que no solo funcionan, sino que inspiran y generan resultados tangibles.',
    keyword: 'Experience',
    bgColor: 'bg-white border border-black', // Blanco con borde negro
  },
];

export default function Services() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setIsReducedMotion(mediaQuery.matches);
      
      const handleMotionChange = (e: MediaQueryListEvent) => {
        setIsReducedMotion(e.matches);
      };
      
      mediaQuery.addEventListener('change', handleMotionChange);
      
      return () => {
        mediaQuery.removeEventListener('change', handleMotionChange);
      };
    }
  }, []);

  useGSAP(() => {
    if (!containerRef.current || !cardsContainerRef.current) return;
    
    let scrollTriggers: ScrollTrigger[] = [];
    let timeoutId: NodeJS.Timeout;
    
    timeoutId = setTimeout(() => {
      const cards = cardsContainerRef.current?.querySelectorAll('.service-card');
      if (!cards || cards.length === 0) return;
      
      if (isReducedMotion) {
        cards.forEach((card) => {
          const cardElement = card as HTMLElement;
          gsap.set(cardElement, { opacity: 1, position: 'relative', transform: 'none' });
        });
        return;
      }

      const totalCards = cards.length;
      const viewportHeight = window.innerHeight;
      
      // Altura del scroll necesario para completar todas las animaciones
      // Con 3 cards, necesitamos 2 transiciones (card1->card2 y card2->card3)
      const scrollHeight = viewportHeight * (totalCards - 1); // Espacio de scroll para las animaciones
      
      // El contenedor de cards ocupa solo 100vh
      if (cardsContainerRef.current) {
        gsap.set(cardsContainerRef.current, { 
          height: viewportHeight,
          width: '100%',
          overflow: 'hidden',
        });
      }

      // Configurar todas las cards
      cards.forEach((card, index) => {
        const cardElement = card as HTMLElement;
        gsap.set(cardElement, {
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: index + 1,
          opacity: 1,
          y: index === 0 ? 0 : viewportHeight, // Primera card visible, otras desde abajo
          scale: 1,
          rotation: 0,
          transformOrigin: 'center center',
        });
      });

      const firstCard = cards[0] as HTMLElement;
      const secondCard = cards[1] as HTMLElement;
      const thirdCard = cards[2] as HTMLElement;

      // Crear ScrollTrigger único para todas las cards con pin
      // El pin fija la sección mientras se hace scroll
      const trigger = ScrollTrigger.create({
        trigger: containerRef.current,
        start: `top top`,
        end: `+=${scrollHeight}`,
        pin: true, // Fija la sección durante el scroll
        pinSpacing: true, // Añade espacio para el pin
        scrub: 1,
        onUpdate: (self) => {
          const scrollProgress = self.progress;
          
          // Dividir el scroll en fases según el número de cards
          // Fase 1 (0-0.5): Primera card se empequeñece/rota, segunda card sube
          // Fase 2 (0.5-1): Segunda card se empequeñece/rota, tercera card sube
          
          if (scrollProgress <= 0.5) {
            // Primera fase: transición de card 1 a card 2
            const phaseProgress = scrollProgress / 0.5; // 0 a 1 en la primera mitad
            
            // Primera card: se empequeñece gradualmente hasta 80% y gira hacia la izquierda hasta 30 grados
            const scale = 1 - (phaseProgress * 0.2); // Se reduce hasta 80% (1 - 0.2 = 0.8)
            const rotation = -phaseProgress * 30; // Gira hacia la izquierda hasta -30 grados
            
            gsap.to(firstCard, {
              scale: scale,
              rotation: rotation,
              duration: 0.1,
            });
            
            // Segunda card: sube desde abajo
            const yOffset = viewportHeight * (1 - phaseProgress);
            gsap.to(secondCard, {
              y: yOffset,
              duration: 0.1,
            });
            
            // Tercera card: se mantiene abajo
            gsap.set(thirdCard, { y: viewportHeight });
          } else {
            // Segunda fase: transición de card 2 a card 3
            const phaseProgress = (scrollProgress - 0.5) / 0.5; // 0 a 1 en la segunda mitad
            
            // Primera card: mantener estado final (80% y -30 grados)
            gsap.set(firstCard, { scale: 0.8, rotation: -30 });
            
            // Segunda card: se empequeñece gradualmente hasta 80% y gira hacia la derecha hasta 30 grados
            const scale = 1 - (phaseProgress * 0.2); // Se reduce hasta 80%
            const rotation = phaseProgress * 30; // Gira hacia la derecha hasta +30 grados
            
            gsap.to(secondCard, {
              scale: scale,
              rotation: rotation,
              duration: 0.1,
            });
            
            // Tercera card: sube desde abajo
            const yOffset = viewportHeight * (1 - phaseProgress);
            gsap.to(thirdCard, {
              y: yOffset,
              duration: 0.1,
            });
          }
        },
      });
      
      scrollTriggers.push(trigger);
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      scrollTriggers.forEach(trigger => trigger.kill());
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === cardsContainerRef.current) {
          trigger.kill();
        }
      });
    };
  }, { scope: containerRef, dependencies: [isReducedMotion] });

  return (
    <section id="services" className="relative bg-white overflow-hidden">
      
      <div ref={containerRef} className="relative w-full">
        {/* Contenedor de cards - ocupa solo 100vh */}
        <div 
          ref={cardsContainerRef}
          className="relative w-full"
          style={{ height: '100vh' }}
        >
          {serviceCards.map((card, index) => {
            let cardStyle: React.CSSProperties;
            if (index === 0) {
              cardStyle = { 
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 1,
                opacity: 1,
                transform: 'none'
              };
            } else {
              cardStyle = { 
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: index + 1,
                opacity: 1,
                transform: `translateY(100%)`
              };
            }

            // Estructura diferente para la segunda card
            if (index === 1) {
              return (
                <div
                  key={card.id}
                  className={`service-card ${card.bgColor} w-full relative`}
                  style={{
                    ...cardStyle,
                    boxShadow: '-4px -4px 0px 0px rgba(0, 0, 0, 0.2), -8px -8px 0px 0px rgba(0, 0, 0, 0.1), -12px -12px 0px 0px rgba(0, 0, 0, 0.05)',
                  }}
                >
                  <div className="h-full w-full flex">
                    {/* Columna Izquierda: Título y Palabra clave */}
                    <div className="w-1/2 flex flex-col justify-between p-12 md:p-20">
                      <div>
                        <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-black leading-tight mb-8">
                          {card.title}
                        </h2>
                        <span className="text-5xl md:text-6xl font-bold text-black opacity-50">
                          {card.keyword}
                        </span>
                      </div>
                      <div></div> {/* Spacer */}
                    </div>

                    {/* Columna Derecha: Imagen abajo */}
                    <div className="w-1/2 flex items-end justify-center p-12 md:p-20 pb-8">
                      <div className="relative w-full aspect-square" style={{ padding: '10%' }}>
                        <div className="relative w-full h-full flex items-center justify-center">
                          <img 
                            src="/undraw_making-art_c05m.svg" 
                            alt={card.title}
                            className="w-full h-full object-contain"
                            style={{ filter: 'grayscale(100%)' }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Texto en la parte inferior, ancho completo */}
                  <div className="absolute bottom-0 left-0 right-0 p-12 md:p-20 pb-8">
                    <p className="text-body-lg md:text-xl text-gray-700 font-light leading-relaxed max-w-2xl">
                      {card.text}
                    </p>
                  </div>
                </div>
              );
            }

            // Estructura estándar para primera y tercera card
            return (
              <div
                key={card.id}
                className={`service-card ${card.bgColor} w-full`}
                style={{
                  ...cardStyle,
                  boxShadow: '4px 4px 0px 0px rgba(0, 0, 0, 0.2), 8px 8px 0px 0px rgba(0, 0, 0, 0.1), 12px 12px 0px 0px rgba(0, 0, 0, 0.05)',
                }}
              >
                <div className="h-full w-full flex">
                  {/* Columna Izquierda: Título arriba + Palabra clave en medio */}
                  <div className="w-1/3 flex flex-col justify-between p-12 md:p-20">
                    <div>
                      <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-black leading-tight">
                        {card.title}
                      </h2>
                    </div>
                    <div className="flex items-center justify-center">
                      <span className="text-5xl md:text-6xl font-bold text-black opacity-50">
                        {card.keyword}
                      </span>
                    </div>
                    <div></div> {/* Spacer para mantener la palabra clave centrada */}
                  </div>

                  {/* Columna Centro: Texto (centrado verticalmente) */}
                  <div className="w-1/3 flex flex-col justify-center p-12 md:p-20">
                    <p className="text-body-lg md:text-xl text-gray-700 font-light leading-relaxed">
                      {card.text}
                    </p>
                  </div>

                  {/* Columna Derecha: Imagen abajo con padding */}
                  <div className="w-1/3 flex items-end justify-center p-12 md:p-20 pb-8">
                    <div className="relative w-full aspect-square" style={{ padding: '10%' }}>
                      {index === 0 ? (
                        // Primera card: mostrar contenido2.svg
                        <div className="relative w-full h-full flex items-center justify-center">
                          <img 
                            src="/contenido2.svg" 
                            alt={card.title}
                            className="w-full h-full object-contain"
                            style={{ filter: 'grayscale(100%)' }}
                          />
                        </div>
                      ) : index === 2 ? (
                        // Tercera card: mostrar RV.svg
                        <div className="relative w-full h-full flex items-center justify-center">
                          <img 
                            src="/RV.svg" 
                            alt={card.title}
                            className="w-full h-full object-contain"
                            style={{ filter: 'grayscale(100%)' }}
                          />
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
