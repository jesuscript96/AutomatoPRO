# Efecto de Revelación Progresiva de Cards - Guía para Cursor

## 📋 Descripción del Efecto

Necesito implementar un efecto de scroll donde múltiples cards/secciones de proyectos se van revelando progresivamente:

### Comportamiento específico:

1. **Estado inicial:** Todas las cards están "cerradas" u ocultas (altura colapsada o escondidas)
2. **Al hacer scroll:**
   - La primera card se expande/revela hasta su altura completa
   - Cuando la primera card está al 80-90% abierta, la siguiente comienza a aparecer
   - Cada card NO ocupa 100vh (viewport height) - ocupan menos
3. **Superposición progresiva:** 
   - Las animaciones se solapan
   - No hay que esperar a que termine una para que empiece la otra
   - Efecto de "cascada" o "domino"
4. **Las cards cerradas** pueden estar totalmente colapsadas (height: 0) o tener una altura mínima visible

## 🎯 Tecnología Recomendada

**GSAP ScrollTrigger** - Perfecto para este efecto porque:
- Control preciso de cuándo inicia cada animación
- Vinculación suave con el scroll (scrub)
- Fácil crear overlap entre animaciones
- Performance optimizada

## 🏗️ Estructura HTML

```jsx
<div className="projects-container">
  <div className="project-card" data-index="1">
    <div className="project-number">3.</div>
    <div className="project-content">
      <div className="left-info">
        <h2 className="project-title">FUTURE BOY CONAN</h2>
        <div className="project-meta">
          <p>Performing Group: HoriPro Inc</p>
          <p>Genre: Physical Theatre</p>
          <p>Status: From 2027 onward</p>
        </div>
      </div>
      <div className="project-image">
        <img src="/project-image.jpg" alt="Project" />
      </div>
    </div>
  </div>

  <div className="project-card" data-index="2">
    <!-- Siguiente proyecto -->
  </div>

  <div className="project-card" data-index="3">
    <!-- Siguiente proyecto -->
  </div>
</div>
```

## 🎨 CSS Base

```css
.projects-container {
  padding: 2rem 0;
}

.project-card {
  /* Altura inicial colapsada */
  height: 60px;
  overflow: hidden;
  margin-bottom: 0;
  border-top: 2px solid black;
  
  /* Transición suave cuando GSAP no está controlando */
  transition: height 0.3s ease;
}

.project-card.expanded {
  /* Altura cuando está abierta - ajustar según contenido */
  height: auto;
  min-height: 400px;
}

.project-content {
  opacity: 0;
  padding: 2rem;
  display: flex;
  gap: 2rem;
}

.project-number {
  font-size: 3rem;
  font-weight: bold;
  padding: 1rem 2rem;
}

/* Estado cerrado: solo número visible */
.project-card:not(.expanded) .project-content {
  display: none;
}
```

## 🎬 Código GSAP - ScrollTrigger Progresivo

### Opción 1: Expansión con Overlap (Recomendada)

```javascript
'use client';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

export default function ProgressiveReveal() {
  const containerRef = useRef(null);

  useGSAP(() => {
    const cards = gsap.utils.toArray('.project-card');
    
    cards.forEach((card, index) => {
      // Timeline para cada card
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: card,
          start: 'top 80%',        // Empieza cuando card está al 80% del viewport
          end: 'top 20%',          // Termina cuando card está al 20% del viewport
          scrub: 1,                // Vincula suavemente al scroll
          // markers: true,        // Descomentar para debug
        },
      });

      // Animar altura de la card
      tl.to(card, {
        height: 'auto',
        minHeight: '400px',
        duration: 1,
        ease: 'power2.out',
      })
      // Animar contenido (fade in)
      .to(card.querySelector('.project-content'), {
        opacity: 1,
        y: 0,
        duration: 0.8,
      }, '-=0.6'); // Overlap: empieza antes de que termine la anterior
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="projects-container">
      {/* Cards aquí */}
    </div>
  );
}
```

### Opción 2: Con Control de Altura Específica

```javascript
'use client';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

export default function ProgressiveReveal() {
  const containerRef = useRef(null);

  useGSAP(() => {
    const cards = gsap.utils.toArray('.project-card');
    
    cards.forEach((card, index) => {
      // Calcular altura del contenido
      const content = card.querySelector('.project-content');
      const fullHeight = content.scrollHeight;

      // Estado inicial: card cerrada
      gsap.set(card, {
        height: 60, // Altura colapsada (solo número visible)
      });
      
      gsap.set(content, {
        opacity: 0,
        y: 20,
      });

      // Animación de apertura
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: card,
          start: 'top 75%',
          end: 'top 25%',
          scrub: 1.5,
          onEnter: () => card.classList.add('active'),
          // markers: { startColor: 'green', endColor: 'red' },
        },
      });

      tl.to(card, {
        height: fullHeight + 60, // +60 para el número
        duration: 1,
        ease: 'power2.inOut',
      })
      .to(content, {
        opacity: 1,
        y: 0,
        duration: 0.6,
      }, '-=0.4'); // Overlap para que el contenido aparezca antes
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="projects-container">
      {/* Cards aquí */}
    </div>
  );
}
```

### Opción 3: Efecto Acordeón (Cierra anterior al abrir siguiente)

```javascript
'use client';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

export default function AccordionReveal() {
  const containerRef = useRef(null);

  useGSAP(() => {
    const cards = gsap.utils.toArray('.project-card');
    
    cards.forEach((card, index) => {
      const content = card.querySelector('.project-content');
      
      // Estado inicial
      gsap.set(card, { height: 60 });
      gsap.set(content, { opacity: 0 });

      ScrollTrigger.create({
        trigger: card,
        start: 'top 70%',
        end: 'bottom 30%',
        
        onEnter: () => {
          // Abrir esta card
          gsap.to(card, { height: 'auto', duration: 0.8, ease: 'power2.out' });
          gsap.to(content, { opacity: 1, duration: 0.6, delay: 0.2 });
        },
        
        onLeave: () => {
          // Cerrar esta card cuando se va hacia arriba
          gsap.to(card, { height: 60, duration: 0.6, ease: 'power2.in' });
          gsap.to(content, { opacity: 0, duration: 0.3 });
        },
        
        onEnterBack: () => {
          // Re-abrir al volver
          gsap.to(card, { height: 'auto', duration: 0.8, ease: 'power2.out' });
          gsap.to(content, { opacity: 1, duration: 0.6, delay: 0.2 });
        },
        
        onLeaveBack: () => {
          // Cerrar al volver hacia arriba
          gsap.to(card, { height: 60, duration: 0.6, ease: 'power2.in' });
          gsap.to(content, { opacity: 0, duration: 0.3 });
        },
      });
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="projects-container">
      {/* Cards aquí */}
    </div>
  );
}
```

## 🎨 Implementación Completa Next.js + TypeScript

```typescript
'use client';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: number;
  title: string;
  performingGroup: string;
  genre: string;
  status: string;
  image: string;
}

const projects: Project[] = [
  {
    id: 3,
    title: 'FUTURE BOY CONAN',
    performingGroup: 'HoriPro Inc',
    genre: 'Physical Theatre',
    status: 'From 2027 onward. Sales Form',
    image: '/projects/future-boy-conan.jpg',
  },
  {
    id: 4,
    title: 'The Unknown Dancer in the Neighborhood',
    performingGroup: 'Theatre Company',
    genre: 'Contemporary Dance',
    status: 'Available now',
    image: '/projects/unknown-dancer.jpg',
  },
  {
    id: 5,
    title: 'SONNET',
    performingGroup: 'Shakespeare Collective',
    genre: 'Classic Theatre',
    status: 'Touring 2025',
    image: '/projects/sonnet.jpg',
  },
];

export default function ProgressiveProjectsReveal() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const cards = gsap.utils.toArray<HTMLElement>('.project-card');
    
    cards.forEach((card, index) => {
      const content = card.querySelector('.project-content');
      const contentHeight = content?.scrollHeight || 400;
      
      // Estado inicial: colapsado
      gsap.set(card, {
        height: 80,
        overflow: 'hidden',
      });
      
      gsap.set(content, {
        opacity: 0,
        y: 30,
      });

      // Timeline de apertura
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: card,
          start: 'top 80%',
          end: 'top 30%',
          scrub: 1,
          // markers: true,
        },
      });

      tl.to(card, {
        height: contentHeight + 80,
        duration: 1,
        ease: 'power2.out',
      })
      .to(content, {
        opacity: 1,
        y: 0,
        duration: 0.8,
      }, '-=0.5');
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="bg-white py-12">
      <div className="container mx-auto px-8">
        {/* Header con "View More" */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-4xl font-bold">Projects</h2>
          <button className="flex items-center gap-2 text-lg font-semibold border-b-2 border-black pb-1">
            View More
            <span>→</span>
          </button>
        </div>

        {/* Cards de proyectos */}
        <div className="space-y-0">
          {projects.map((project) => (
            <div
              key={project.id}
              className="project-card border-t-2 border-black"
            >
              {/* Número siempre visible */}
              <div className="project-number px-8 py-4">
                <span className="text-4xl font-bold">{project.id}.</span>
              </div>

              {/* Contenido que se revela */}
              <div className="project-content px-8 pb-8">
                <div className="flex flex-col lg:flex-row gap-8 items-start">
                  {/* Info izquierda */}
                  <div className="flex-1 space-y-6">
                    <h3 className="text-5xl font-bold leading-tight">
                      {project.title}
                    </h3>
                    
                    <div className="space-y-2 text-lg">
                      <div className="flex border-b border-gray-300 py-2">
                        <span className="font-semibold w-48">Performing Group:</span>
                        <span>{project.performingGroup}</span>
                      </div>
                      <div className="flex border-b border-gray-300 py-2">
                        <span className="font-semibold w-48">Genre:</span>
                        <span>{project.genre}</span>
                      </div>
                      <div className="flex border-b border-gray-300 py-2">
                        <span className="font-semibold w-48">Status:</span>
                        <span>{project.status}</span>
                      </div>
                    </div>
                  </div>

                  {/* Imagen derecha */}
                  <div className="flex-1 lg:flex-none lg:w-[500px]">
                    <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        style={{ objectFit: 'cover' }}
                        className="transition-transform duration-500 hover:scale-105"
                      />
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
```

## 🎛️ Parámetros Ajustables

### Control del Overlap entre cards:

```javascript
scrollTrigger: {
  start: 'top 80%',  // Más alto = empieza antes (más overlap)
  start: 'top 60%',  // Más bajo = empieza después (menos overlap)
}
```

### Control de velocidad de apertura:

```javascript
scrollTrigger: {
  end: 'top 30%',    // Distancia corta = apertura rápida
  end: 'top 10%',    // Distancia larga = apertura lenta
  scrub: 1,          // Mayor número = más suave pero más lento
}
```

### Control de la altura colapsada:

```javascript
// Altura mínima cuando está cerrada
gsap.set(card, {
  height: 60,   // Solo línea y número
  height: 120,  // Un poco más de preview
  height: 0,    // Totalmente oculta
});
```

### Timing del contenido:

```javascript
.to(content, {
  opacity: 1,
  y: 0,
  duration: 0.8,
}, '-=0.5');  // Overlap: negativo = antes, positivo = después
```

## 🎨 Variantes del Efecto

### Variante 1: Con Stagger en Elementos Internos

```javascript
useGSAP(() => {
  const cards = gsap.utils.toArray('.project-card');
  
  cards.forEach((card, index) => {
    const content = card.querySelector('.project-content');
    const elements = content.querySelectorAll('.fade-in-element');
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: card,
        start: 'top 75%',
        end: 'top 25%',
        scrub: 1,
      },
    });

    tl.to(card, {
      height: 'auto',
      duration: 1,
    })
    .to(content, {
      opacity: 1,
      duration: 0.5,
    }, '-=0.5')
    // Stagger en elementos internos
    .from(elements, {
      opacity: 0,
      y: 20,
      stagger: 0.1,
      duration: 0.5,
    }, '-=0.3');
  });
});
```

### Variante 2: Con Borde Animado

```javascript
useGSAP(() => {
  const cards = gsap.utils.toArray('.project-card');
  
  cards.forEach((card) => {
    const border = card.querySelector('.animated-border');
    
    gsap.set(border, { scaleX: 0, transformOrigin: 'left' });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: card,
        start: 'top 80%',
        end: 'top 40%',
        scrub: 1,
      },
    });

    tl.to(border, {
      scaleX: 1,
      duration: 0.6,
    })
    .to(card, {
      height: 'auto',
      duration: 1,
    }, '-=0.3');
  });
});
```

### Variante 3: Efecto "Push Down" (Empuja hacia abajo)

```javascript
useGSAP(() => {
  const cards = gsap.utils.toArray('.project-card');
  
  cards.forEach((card, index) => {
    const nextCards = cards.slice(index + 1);
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: card,
        start: 'top 70%',
        end: 'top 30%',
        scrub: 1,
      },
    });

    // Abrir card actual
    tl.to(card, {
      height: 'auto',
      duration: 1,
    })
    // Empujar cards siguientes hacia abajo simultáneamente
    .to(nextCards, {
      y: '+=100',
      duration: 1,
    }, '<'); // '<' = al mismo tiempo que la anterior
  });
});
```

## 📱 Consideraciones Mobile

```javascript
useGSAP(() => {
  const isMobile = window.innerWidth < 768;
  const cards = gsap.utils.toArray('.project-card');
  
  cards.forEach((card) => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: card,
        start: isMobile ? 'top 85%' : 'top 75%',
        end: isMobile ? 'top 40%' : 'top 25%',
        scrub: isMobile ? 0.5 : 1,
      },
    });

    tl.to(card, {
      height: 'auto',
      duration: 1,
      ease: isMobile ? 'power1.out' : 'power2.out',
    });
  });
});
```

## 🐛 Troubleshooting

### Si las cards no se abren correctamente:
```javascript
// Asegúrate de calcular la altura real del contenido
const content = card.querySelector('.project-content');
const fullHeight = content.scrollHeight;

gsap.to(card, {
  height: fullHeight,  // Usar altura calculada
});
```

### Si hay saltos bruscos:
```javascript
// Ajusta el scrub para más suavidad
scrollTrigger: {
  scrub: 2,  // Mayor = más suave
}
```

### Si las cards no mantienen su altura:
```javascript
// Fuerza min-height en CSS
.project-card.active {
  min-height: 400px;
  height: auto;
}
```

### Si el overlap no funciona bien:
```javascript
// Ajusta start/end para mejor timing
scrollTrigger: {
  start: 'top 80%',  // Card empieza a abrirse aquí
  end: 'top 20%',    // Card termina de abrirse aquí
  // La siguiente puede empezar mientras esta aún se está abriendo
}
```

## 🎯 Diferencias Clave con Stacked Cards

| Aspecto | Stacked Cards | Progressive Reveal |
|---------|---------------|-------------------|
| Posición | Sticky (pegadas) | Scroll normal |
| Altura | 100vh cada una | Variable (< 100vh) |
| Overlap | Se reemplazan | Se revelan en secuencia |
| Escala | Se achican | Se expanden |
| Efecto | Baraja de cartas | Acordeón progresivo |

## 🎓 Recomendaciones Finales

1. **Calcula alturas dinámicamente** - Usa `scrollHeight` para obtener altura real
2. **Usa scrub para suavidad** - Vincula la animación al scroll
3. **Ajusta el overlap** - Experimenta con `start` y `end` para el timing perfecto
4. **Prueba con contenido real** - Las alturas variarán según el contenido
5. **Considera mobile** - Ajusta velocidades y overlap para pantallas pequeñas
6. **Debug con markers** - Usa `markers: true` para ver los trigger points

---

## 📋 Resumen para Cursor

**Este efecto es:**
- Cards que se expanden/revelan al hacer scroll
- Cada card comienza colapsada (altura mínima)
- Al hacer scroll, se expanden a su altura completa
- Las animaciones se solapan (la siguiente empieza antes de que termine la anterior)
- NO ocupan 100vh
- Es como un acordeón vertical progresivo

**NO es:**
- Stacked cards (no se pegan al viewport)
- Parallax simple (hay expansión de altura)
- Tabs o acordeón con clicks (es scroll-driven)

---

**Nota para Cursor:** Este efecto requiere:
```bash
npm install gsap @gsap/react
```

Y el componente debe tener `'use client'` en Next.js.
