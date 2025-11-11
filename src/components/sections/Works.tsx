'use client';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { useRef } from 'react';
import Image from 'next/image';

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

// Colores de fondo en el mismo orden que las cards de Services
const workColors = ['#ffffff', '#ffffff', '#ffffff']; // Blanco para todos

const works: Work[] = [
  {
    id: 1,
    title: 'E-commerce Platform',
    performingGroup: 'TUILUS',
    genre: 'Moda',
    status: 'Live desde 2024',
    image: '/TUILUS.png',
    listItems: ['Catálogo de productos', 'Carrito de compra', 'Panel de admin'],
    url: 'https://tuilus.com',
  },
  {
    id: 2,
    title: "Diseño 100%",
    performingGroup: 'LABORATORIO ESPERANZA',
    genre: 'Salud y Alimentación',
    status: 'Producción',
    image: '/LAB.png',
    listItems: ['Sistema de pagos', 'Email Mkt', 'Información médica'],
    url: 'https://laboratorioesperanza.com',
  },
  {
    id: 3,
    title: 'Style, elegance',
    performingGroup: 'Designer PIPPA MORRAY',
    genre: 'Portfolio Creativo - Furniture',
    status: 'Live 2024',
    image: '/PIPPA.png',
    listItems: ['Galería de proyectos', 'Sobre la diseñadora', 'Formulario de contacto'],
    url: 'https://www.pippamorraydesign.com/',
  },
];

export default function Works() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    const cards = gsap.utils.toArray<HTMLElement>('.work-card');
    const collapsedHeight = 50; // Altura cuando está colapsada (solo número visible)
    
    // Función para calcular y actualizar alturas
    const setupCards = () => {
      const viewportHeight = window.innerHeight;
      const maxHeight = viewportHeight * 0.6; // 60vh máximo
      
      // Calcular alturas completas de todas las cards
      const cardHeights: number[] = [];
      cards.forEach((card) => {
        const content = card.querySelector('.work-content') as HTMLElement;
        if (!content) {
          cardHeights.push(collapsedHeight);
          return;
        }
        const contentHeight = content.scrollHeight;
        const calculatedHeight = contentHeight + collapsedHeight;
        const fullHeight = Math.min(calculatedHeight, maxHeight);
        cardHeights.push(fullHeight);
      });
      
      // Configurar posición inicial de todas las cards
      cards.forEach((card, index) => {
        const content = card.querySelector('.work-content') as HTMLElement;
        
        // Posición inicial: todas colapsadas, apiladas desde abajo
        const bottomOffset = (cards.length - 1 - index) * collapsedHeight;
        
        gsap.set(card, {
          height: collapsedHeight,
          overflow: 'hidden',
          position: 'absolute',
          bottom: bottomOffset,
          left: 0,
          right: 0,
          width: '100%',
          zIndex: cards.length - index + 10, // Primera card tiene zIndex más alto, por encima de las líneas
          backgroundColor: workColors[index] || '#ffffff', // Color de fondo según el índice
        });
        
        if (content) {
          gsap.set(content, {
            opacity: 0,
            y: 30,
          });
        }
      });
      
      // Contenedor de cards debe tener altura fija y posicionamiento relativo (100vh)
      if (containerRef.current) {
        const cardsContainer = containerRef.current.querySelector('.space-y-0') as HTMLElement;
        if (cardsContainer) {
          gsap.set(cardsContainer, {
            position: 'relative',
            height: '100vh',
            minHeight: '100vh',
          });
        }
      }

      // Esperar a que todas las imágenes se carguen
      const allImages = containerRef.current?.querySelectorAll('img') || [];
      let imagesLoaded = 0;
      const totalImages = allImages.length;

      const setupAnimations = () => {
        // Obtener todas las líneas de secciones cerradas
        const lines = gsap.utils.toArray<HTMLElement>('.work-line');
        
        // Inicializar las líneas: todas visibles y posicionadas correctamente
        // Distribuir uniformemente en el viewport de 100vh
        // La última línea (índice más alto) está en bottom: 0, las demás apiladas por encima
        const viewportHeight = window.innerHeight;
        const totalLines = lines.length;
        const lineHeight = 50;
        const totalLinesHeight = totalLines * lineHeight;
        const availableSpace = viewportHeight - totalLinesHeight;
        const spacing = totalLines > 1 ? availableSpace / (totalLines - 1) : 0;
        
        lines.forEach((line, index) => {
          const bottomPosition = index * (lineHeight + spacing);
          gsap.set(line, {
            opacity: 1,
            bottom: bottomPosition,
          });
        });
        
        // Crear timeline maestro para controlar todas las animaciones secuencialmente
        const masterTimeline = gsap.timeline();

        // Duración de cada animación de card (en segundos de scroll)
        const cardAnimationDuration = 1.5; // Duración para abrir cada card

        // Procesar cada card secuencialmente
        cards.forEach((card, index) => {
          const content = card.querySelector('.work-content') as HTMLElement;
          if (!content) return;

          const fullHeight = cardHeights[index];

          // Calcular cuándo empieza esta animación (después de que todas las anteriores terminen)
          const startTime = index * cardAnimationDuration;

          // Crear animación para esta card
          const cardTimeline = gsap.timeline();
          
          // Si es la primera card, hacer que el título desaparezca
          if (index === 0 && titleRef.current) {
            cardTimeline.to(titleRef.current, {
              opacity: 0,
              y: -30,
              duration: 0.8,
              ease: 'power2.out',
            }, 0);
          }

          // Calcular posición bottom final para esta card
          // Cuando esta card se expande, debe mostrarse al 100% y estar completamente visible
          // La parte superior de la card debe coincidir con la parte superior de la pantalla
          const viewportHeight = window.innerHeight;
          let bottomPosition = 0;
          
          // Posicionar la card para que su parte superior coincida con la parte superior del viewport
          // Si la card es más alta que el viewport, posicionarla en bottom: 0 (se cortará por abajo)
          // Si la card cabe en el viewport, posicionarla para que quepa completamente desde arriba
          if (fullHeight >= viewportHeight) {
            // Card más alta que el viewport: posicionarla en bottom: 0
            bottomPosition = 0;
          } else {
            // Card cabe en el viewport: posicionarla para que la parte superior esté en top: 0
            // bottomPosition = viewportHeight - fullHeight hace que la parte superior esté en top: 0
            bottomPosition = viewportHeight - fullHeight;
          }

          // 3. Primero empujar todas las cards anteriores hacia arriba (desde el inicio)
          // Cuando se abre una nueva card, las anteriores deben moverse fuera del viewport
          // para que la nueva card quede centrada y completamente visible
          // Esto incluye la primera card cuando se abre la segunda
          if (index > 0) {
            for (let i = 0; i < index; i++) {
              const previousCard = cards[i];
              
              // Mover las cards anteriores fuera del viewport (por encima)
              // Para que la nueva card quede completamente visible y centrada
              // Usar viewportHeight + un poco más para asegurar que esté completamente fuera
              const prevBottomPosition = viewportHeight + 100; // Fuera del viewport por arriba
              
              // Mover la card anterior hacia arriba desde el inicio, al mismo tiempo que se expande la nueva
              cardTimeline.to(previousCard, {
                bottom: prevBottomPosition,
                opacity: 0, // También hacer que desaparezca
                duration: 1,
                ease: 'power2.out',
              }, 0); // Empieza al mismo tiempo que la expansión (tiempo 0)
            }
          }

          // 4. Animar las líneas de secciones cerradas para que suban
          // Ocultar la línea de la card que se está abriendo
          if (lines[index]) {
            cardTimeline.to(lines[index], {
              opacity: 0,
              duration: 0.5,
              ease: 'power2.out',
            }, 0);
          }
          
          // Animar las líneas de las cards que aún no se han abierto (índices > index)
          for (let i = index + 1; i < lines.length; i++) {
            const line = lines[i];
            if (!line) continue;
            
            // Calcular nueva posición bottom para esta línea
            // La línea debe estar en la posición donde estaría la card colapsada correspondiente
            // Cuando esta línea sube, todas las cards anteriores (0 a index) ya están expandidas
            // La posición bottom es la suma de las alturas de todas las cards debajo de esta línea
            let lineBottomPosition = 0;
            
            // Sumar las alturas de todas las cards que están debajo de esta línea
            // Las cards debajo de la línea i son las cards con índices j donde j > i
            for (let j = i + 1; j < cards.length; j++) {
              // Todas las cards debajo de la línea i aún están colapsadas
              lineBottomPosition += collapsedHeight;
            }
            
            // Mover la línea hacia arriba al mismo tiempo que se expande la card
            cardTimeline.to(line, {
              bottom: lineBottomPosition,
              duration: 1,
              ease: 'power2.out',
            }, 0); // Empieza al mismo tiempo que la expansión
          }

          // 1. Expandir la card (empieza al mismo tiempo que el empuje)
          cardTimeline.to(card, {
            height: fullHeight,
            bottom: bottomPosition,
            backgroundColor: workColors[index] || '#ffffff', // Color de fondo según el índice
            duration: 1,
            ease: 'power2.out',
          }, 0) // Empieza al mismo tiempo que el empuje
          // 2. Revelar contenido (con overlap)
          .to(content, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
          }, '-=0.3');

          // Agregar al timeline maestro en el momento correcto
          masterTimeline.add(cardTimeline, startTime);
        });

        // Calcular altura de scroll necesaria
        // Cada card necesita cardAnimationDuration segundos de scroll
        const scrollHeight = viewportHeight * cards.length * cardAnimationDuration;
        
        // Crear ScrollTrigger que controla el timeline maestro
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: 'top top',
          end: `+=${scrollHeight}`,
          animation: masterTimeline,
          scrub: 1,
          pin: true,
          pinSpacing: true,
          invalidateOnRefresh: true,
        });
      };

      if (totalImages === 0) {
        // No hay imágenes, configurar inmediatamente
        setupAnimations();
      } else {
        // Esperar a que todas las imágenes se carguen
        if (allImages.length === 0) {
          setupAnimations();
        } else {
          allImages.forEach((img) => {
            if (img.complete) {
              imagesLoaded++;
              if (imagesLoaded === totalImages) {
                setTimeout(setupAnimations, 100);
              }
            } else {
              img.addEventListener('load', () => {
                imagesLoaded++;
                if (imagesLoaded === totalImages) {
                  setTimeout(setupAnimations, 100);
                }
              });
              img.addEventListener('error', () => {
                imagesLoaded++;
                if (imagesLoaded === totalImages) {
                  setTimeout(setupAnimations, 100);
                }
              });
            }
          });
        }
      }
    };

    setupCards();

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, { scope: containerRef });

  return (
    <section id="works" className="relative bg-white">
      
      <div ref={containerRef} className="projects-container">
        {/* Header de la sección */}
        <div className="container mx-auto px-8 py-12">
          <h2 ref={titleRef} className="text-h1 font-bold text-black mb-6">
            Nuestros Trabajos
          </h2>
        </div>

        {/* Cards de trabajos */}
        <div className="space-y-0 relative">
          {/* Líneas de secciones cerradas - siempre visibles en la parte inferior */}
          <div 
            className="work-lines-container absolute bottom-0 left-0 right-0 pointer-events-none" 
            style={{ 
              zIndex: 1,
              height: '100vh',
              minHeight: '100vh',
            }}
          >
            {works.map((work, index) => (
              <div
                key={`line-${work.id}`}
                className="work-line border-t border-black"
                data-line-index={index}
                style={{
                  height: '50px',
                  width: '100%',
                  position: 'absolute',
                  bottom: 0,
                  opacity: 1,
                  backgroundColor: workColors[index] || '#ffffff',
                }}
              />
            ))}
          </div>

          {works.map((work, index) => (
            <div
              key={work.id}
              className="work-card border-t border-black"
              style={{ 
                maxHeight: '60vh', 
                overflow: 'hidden',
                backgroundColor: workColors[index] || '#ffffff',
                boxShadow: '-4px -4px 0px 0px rgba(0, 0, 0, 0.2), -8px -8px 0px 0px rgba(0, 0, 0, 0.1), -12px -12px 0px 0px rgba(0, 0, 0, 0.05)',
              }}
            >
              {/* Número siempre visible */}
              <div className="work-number px-8 py-2">
                <span className="text-3xl font-bold">{work.id}.</span>
              </div>

              {/* Contenido que se revela - Grid de 3 columnas */}
              <div className="work-content px-8 pb-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  {/* COLUMNA IZQUIERDA - Información (35% = 4.2/12 ≈ 4) */}
                  <div className="lg:col-span-4 space-y-6">
                    <h3 className="text-6xl lg:text-7xl font-black leading-tight text-black">
                      {work.title}
                    </h3>
                    
                    {/* Metadata en formato tabla */}
                    <div className="space-y-2 text-lg">
                      <div className="flex border-b border-gray-300 py-2">
                        <span className="font-semibold w-48">Performing Group:</span>
                        <span className="font-normal">{work.performingGroup}</span>
                      </div>
                      <div className="flex border-b border-gray-300 py-2">
                        <span className="font-semibold w-48">Genre:</span>
                        <span className="font-normal">{work.genre}</span>
                      </div>
                      <div className="flex border-b border-gray-300 py-2">
                        <span className="font-semibold w-48">Status:</span>
                        <span className="font-normal">{work.status}</span>
                      </div>
                    </div>
                  </div>

                  {/* COLUMNA CENTRAL - Imagen con overlay (40% = 4.8/12 ≈ 5) */}
                  <div className="lg:col-span-5 relative">
                    <a 
                      href={work.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block relative aspect-[4/5] overflow-hidden cursor-pointer"
                    >
                      {/* Imagen de fondo */}
                      <div className="relative w-full h-full bg-white border border-black">
                        <Image
                          src={work.image}
                          alt={work.title}
                          fill
                          className="object-cover"
                          onError={(e) => {
                            // Fallback si la imagen no existe
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                          }}
                        />
                      </div>
                      
                      {/* Overlay con marquee "View More" */}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                        <div className="marquee-container w-full">
                          <div className="marquee-text text-black text-2xl font-semibold">
                            View More • View More • View More • View More • View More • View More • View More • View More • View More • View More • View More • View More • View More • View More • View More • View More • View More • View More • View More • View More • View More • View More • View More • View More • View More • View More • View More • View More • View More • View More • View More • View More • 
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>

                  {/* COLUMNA DERECHA - Lista de items (25% = 3/12) */}
                  <div className="lg:col-span-3">
                    {/* Header de la lista */}
                    <a 
                      href={work.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex justify-between items-center mb-4 pb-4 border-b border-black cursor-pointer hover:opacity-70 transition-opacity"
                    >
                      <span className="text-xl font-semibold">View More</span>
                      <span className="text-2xl">→</span>
                    </a>
                    
                    {/* Lista de items con líneas separadoras */}
                    <div className="space-y-0">
                      {work.listItems.map((item, index) => (
                        <div
                          key={index}
                          className="border-b border-black py-8 first:pt-0"
                        >
                          <span className="text-lg">{item}</span>
                        </div>
                      ))}
                    </div>
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
