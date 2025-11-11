# Manual Stack Next.js + Framer Motion + GSAP
## Guía de Mejores Prácticas para Webs de Alto Impacto

---

## 📋 Índice

1. [Descripción del Stack](#descripción-del-stack)
2. [Setup Inicial del Proyecto](#setup-inicial-del-proyecto)
3. [Estructura de Proyecto Recomendada](#estructura-de-proyecto-recomendada)
4. [Mejores Prácticas por Tecnología](#mejores-prácticas-por-tecnología)
5. [Patrones de Animación Comunes](#patrones-de-animación-comunes)
6. [Performance y Optimización](#performance-y-optimización)
7. [Casos de Uso Específicos](#casos-de-uso-específicos)
8. [Recursos y Referencias](#recursos-y-referencias)

---

## 🎯 Descripción del Stack

### Next.js 15
**¿Qué es?** Framework React con renderizado híbrido (SSR, SSG, ISR).

**¿Por qué usarlo?**
- SEO excelente (crítico para webs corporativas)
- Performance optimizada automáticamente
- Sistema de rutas basado en archivos
- Image optimization nativo
- API routes integradas

**Ideal para:** Sitios corporativos, portafolios, landing pages, webs de producto.

---

### Framer Motion
**¿Qué es?** Librería de animaciones declarativas para React.

**¿Por qué usarlo?**
- Sintaxis simple e intuitiva
- Animaciones basadas en gestos (drag, hover, tap)
- Scroll animations integradas
- Variants para animaciones coordinadas
- Layout animations automáticas

**Ideal para:** Transiciones de página, micro-interacciones, animaciones de entrada/salida.

---

### GSAP (GreenSock Animation Platform)
**¿Qué es?** La librería de animaciones JavaScript más potente del mercado.

**¿Por qué usarlo?**
- Control preciso timeline-based
- ScrollTrigger para efectos parallax y scroll-based
- Performance superior (usa GPU acceleration)
- Compatible con cualquier propiedad CSS/SVG
- Mejor para animaciones complejas y secuenciales

**Ideal para:** Animaciones complejas, efectos scroll, secuencias coordinadas, SVG animations.

---

### ¿Cuándo usar cada uno?

| Caso de Uso | Framer Motion | GSAP |
|-------------|---------------|------|
| Fade in/out simple | ✅ | ⚠️ |
| Drag & drop | ✅ | ❌ |
| Scroll parallax | ⚠️ | ✅ |
| Timeline complejo | ❌ | ✅ |
| SVG morphing | ❌ | ✅ |
| Page transitions | ✅ | ⚠️ |
| Hover effects | ✅ | ⚠️ |
| Secuencias coordinadas | ⚠️ | ✅ |

**Regla general:** Framer Motion para React components y micro-interacciones. GSAP para animaciones complejas y efectos scroll.

---

## 🚀 Setup Inicial del Proyecto

### 1. Crear proyecto Next.js

```bash
npx create-next-app@latest mi-proyecto-web --typescript --tailwind --app
cd mi-proyecto-web
```

**Opciones recomendadas:**
- ✅ TypeScript
- ✅ ESLint
- ✅ Tailwind CSS
- ✅ App Router (nuevo sistema)
- ✅ src/ directory
- ❌ Import alias (usar @ por defecto)

---

### 2. Instalar dependencias de animación

```bash
npm install framer-motion gsap
```

**Opcional pero recomendado:**
```bash
npm install @gsap/react  # Helpers para React
npm install lenis         # Smooth scroll premium
npm install locomotive-scroll  # Alternativa smooth scroll
```

---

### 3. Configuración de GSAP

Crear archivo `src/lib/gsap.ts`:

```typescript
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

// Registrar plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
}

export { gsap, ScrollTrigger };
```

---

### 4. Configuración Next.js

Actualizar `next.config.js`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
  },
  // Optimización para animaciones
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

module.exports = nextConfig;
```

---

## 📁 Estructura de Proyecto Recomendada

```
mi-proyecto-web/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Layout principal
│   │   ├── page.tsx             # Homepage
│   │   ├── globals.css          # Estilos globales
│   │   └── (routes)/            # Rutas agrupadas
│   │       ├── about/
│   │       └── contact/
│   ├── components/
│   │   ├── animations/          # Componentes animados reutilizables
│   │   │   ├── FadeIn.tsx
│   │   │   ├── ParallaxSection.tsx
│   │   │   └── ScrollReveal.tsx
│   │   ├── layout/              # Layout components
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── Navigation.tsx
│   │   └── ui/                  # UI components
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       └── Hero.tsx
│   ├── hooks/                   # Custom hooks
│   │   ├── useScrollAnimation.ts
│   │   ├── useMediaQuery.ts
│   │   └── useIsomorphicLayoutEffect.ts
│   ├── lib/                     # Utilities y configuraciones
│   │   ├── gsap.ts
│   │   ├── animations.ts
│   │   └── utils.ts
│   └── types/                   # TypeScript types
│       └── index.ts
├── public/
│   ├── images/
│   ├── videos/
│   └── fonts/
└── package.json
```

---

## 🎨 Mejores Prácticas por Tecnología

### Next.js Best Practices

#### 1. **Usa Server Components por defecto**

```typescript
// app/page.tsx (Server Component por defecto)
export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <FeaturesSection />
    </main>
  );
}
```

Solo usa `'use client'` cuando necesites:
- Hooks (useState, useEffect)
- Event listeners
- Browser APIs
- Animaciones con Framer Motion o GSAP

---

#### 2. **Optimiza imágenes con next/image**

```typescript
import Image from 'next/image';

export default function Hero() {
  return (
    <Image
      src="/hero-image.jpg"
      alt="Descripción"
      width={1920}
      height={1080}
      priority              // Para imágenes above the fold
      quality={90}
      placeholder="blur"    // Blur-up effect
      blurDataURL="..."     // Base64 tiny image
    />
  );
}
```

**Tips:**
- Usa `priority` solo en imágenes above-the-fold
- Define width/height explícitos para evitar layout shift
- Usa formatos modernos (WebP, AVIF) automáticamente

---

#### 3. **Lazy loading para componentes pesados**

```typescript
import dynamic from 'next/dynamic';

// Cargar componente animado solo cuando sea necesario
const HeavyAnimation = dynamic(
  () => import('@/components/animations/HeavyAnimation'),
  {
    loading: () => <div>Loading...</div>,
    ssr: false  // No renderizar en servidor si usa window/document
  }
);
```

---

#### 4. **Metadata para SEO**

```typescript
// app/page.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mi Web de Alto Impacto | Agencia Digital',
  description: 'Diseño web premium con animaciones impactantes',
  openGraph: {
    title: 'Mi Web de Alto Impacto',
    description: 'Diseño web premium',
    images: ['/og-image.jpg'],
  },
};
```

---

### Framer Motion Best Practices

#### 1. **Usa Variants para animaciones coordinadas**

```typescript
'use client';
import { motion } from 'framer-motion';

// ✅ BUENO: Variants reutilizables
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,  // Anima hijos uno por uno
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function AnimatedList() {
  return (
    <motion.ul
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {items.map((item) => (
        <motion.li key={item.id} variants={itemVariants}>
          {item.text}
        </motion.li>
      ))}
    </motion.ul>
  );
}
```

---

#### 2. **whileInView para animaciones scroll-based**

```typescript
'use client';
import { motion } from 'framer-motion';

export default function ScrollReveal({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}  // Trigger cuando 30% visible
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}
```

---

#### 3. **Layout animations para cambios suaves**

```typescript
'use client';
import { motion, LayoutGroup } from 'framer-motion';

export default function Tab() {
  const [selected, setSelected] = useState(0);

  return (
    <LayoutGroup>
      {tabs.map((tab, i) => (
        <motion.button
          key={tab}
          onClick={() => setSelected(i)}
          layout  // Anima cambios de layout automáticamente
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          {tab}
          {selected === i && (
            <motion.div
              layoutId="underline"  // Comparte animación entre elementos
              className="underline"
            />
          )}
        </motion.button>
      ))}
    </LayoutGroup>
  );
}
```

---

#### 4. **Optimiza re-renders con useMemo**

```typescript
'use client';
import { motion } from 'framer-motion';
import { useMemo } from 'react';

export default function OptimizedAnimation() {
  // ✅ BUENO: Variants memoizados
  const variants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  }), []);

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
    >
      Content
    </motion.div>
  );
}
```

---

### GSAP Best Practices

#### 1. **useGSAP Hook para componentes React**

```typescript
'use client';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';
import { useRef } from 'react';

export default function GSAPAnimation() {
  const container = useRef(null);

  useGSAP(() => {
    // Animaciones automáticamente limpiadas al desmontar
    gsap.from('.box', {
      opacity: 0,
      y: 50,
      stagger: 0.1,
      duration: 1,
    });
  }, { scope: container }); // Scope limita animaciones a este container

  return (
    <div ref={container}>
      <div className="box">Box 1</div>
      <div className="box">Box 2</div>
      <div className="box">Box 3</div>
    </div>
  );
}
```

---

#### 2. **ScrollTrigger para efectos scroll**

```typescript
'use client';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { useRef } from 'react';

export default function ParallaxSection() {
  const container = useRef(null);

  useGSAP(() => {
    gsap.to('.parallax-bg', {
      y: -200,
      ease: 'none',
      scrollTrigger: {
        trigger: container.current,
        start: 'top bottom',    // Cuando top del trigger toca bottom del viewport
        end: 'bottom top',      // Cuando bottom del trigger toca top del viewport
        scrub: true,            // Vincula animación al scroll (smooth)
        markers: false,         // true para debug
      },
    });
  }, { scope: container });

  return (
    <section ref={container} className="relative h-screen overflow-hidden">
      <div className="parallax-bg absolute inset-0">
        <img src="/bg.jpg" alt="Background" />
      </div>
      <div className="relative z-10">
        <h2>Contenido</h2>
      </div>
    </section>
  );
}
```

---

#### 3. **Timelines para secuencias complejas**

```typescript
'use client';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';
import { useRef } from 'react';

export default function ComplexAnimation() {
  const container = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      defaults: { ease: 'power2.inOut' },
    });

    tl.from('.title', { opacity: 0, y: -50, duration: 0.8 })
      .from('.subtitle', { opacity: 0, y: 30, duration: 0.6 }, '-=0.4') // Overlap
      .from('.buttons', { opacity: 0, scale: 0.8, duration: 0.5 }, '-=0.2');
  }, { scope: container });

  return (
    <div ref={container}>
      <h1 className="title">Título</h1>
      <p className="subtitle">Subtítulo</p>
      <div className="buttons">
        <button>CTA</button>
      </div>
    </div>
  );
}
```

---

#### 4. **Cleanup automático con Context Safe**

```typescript
'use client';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';

export default function SafeAnimation() {
  const { contextSafe } = useGSAP();

  // contextSafe asegura que la animación se limpia correctamente
  const handleClick = contextSafe(() => {
    gsap.to('.element', { rotation: 360, duration: 1 });
  });

  return <button onClick={handleClick}>Animate</button>;
}
```

---

## 🎬 Patrones de Animación Comunes

### 1. Fade In on Scroll (Framer Motion)

```typescript
// components/animations/FadeIn.tsx
'use client';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
}

export default function FadeIn({ 
  children, 
  delay = 0, 
  direction = 'up' 
}: FadeInProps) {
  const directions = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { x: 40, y: 0 },
    right: { x: -40, y: 0 },
  };

  return (
    <motion.div
      initial={{ opacity: 0, ...directions[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
```

**Uso:**
```typescript
<FadeIn direction="up" delay={0.2}>
  <h2>Título que aparece desde abajo</h2>
</FadeIn>
```

---

### 2. Parallax Scroll (GSAP)

```typescript
// components/animations/ParallaxImage.tsx
'use client';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';
import { useRef } from 'react';
import Image from 'next/image';

interface ParallaxImageProps {
  src: string;
  alt: string;
  speed?: number;
}

export default function ParallaxImage({ 
  src, 
  alt, 
  speed = 0.5 
}: ParallaxImageProps) {
  const containerRef = useRef(null);
  const imageRef = useRef(null);

  useGSAP(() => {
    gsap.to(imageRef.current, {
      yPercent: -20 * speed,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative h-[500px] overflow-hidden">
      <div ref={imageRef} className="absolute inset-0 scale-110">
        <Image
          src={src}
          alt={alt}
          fill
          style={{ objectFit: 'cover' }}
        />
      </div>
    </div>
  );
}
```

---

### 3. Stagger Grid Animation (Framer Motion)

```typescript
// components/animations/StaggerGrid.tsx
'use client';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface StaggerGridProps {
  children: ReactNode[];
  columns?: number;
}

export default function StaggerGrid({ children, columns = 3 }: StaggerGridProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.5, ease: 'easeOut' }
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className={`grid grid-cols-${columns} gap-6`}
    >
      {children.map((child, i) => (
        <motion.div key={i} variants={itemVariants}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
```

---

### 4. Scroll-Triggered Text Reveal (GSAP)

```typescript
// components/animations/TextReveal.tsx
'use client';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { useRef } from 'react';

export default function TextReveal({ text }: { text: string }) {
  const textRef = useRef(null);

  useGSAP(() => {
    const words = textRef.current.querySelectorAll('.word');
    
    gsap.from(words, {
      opacity: 0.2,
      stagger: 0.05,
      scrollTrigger: {
        trigger: textRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
        scrub: 1,
      },
    });
  });

  return (
    <h2 ref={textRef} className="text-5xl font-bold">
      {text.split(' ').map((word, i) => (
        <span key={i} className="word inline-block mr-2">
          {word}
        </span>
      ))}
    </h2>
  );
}
```

---

### 5. Magnetic Button Effect (Framer Motion)

```typescript
// components/ui/MagneticButton.tsx
'use client';
import { motion } from 'framer-motion';
import { useRef, useState } from 'react';

export default function MagneticButton({ children }) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { width, height, left, top } = ref.current.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * 0.3;
    const y = (clientY - (top + height / 2)) * 0.3;
    setPosition({ x, y });
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
      className="px-8 py-4 bg-black text-white rounded-full"
    >
      {children}
    </motion.button>
  );
}
```

---

## ⚡ Performance y Optimización

### 1. Reduce Motion para usuarios con preferencias

```typescript
// hooks/useReducedMotion.ts
'use client';
import { useEffect, useState } from 'react';

export function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return prefersReducedMotion;
}
```

**Uso:**
```typescript
const prefersReducedMotion = useReducedMotion();

return (
  <motion.div
    animate={{ opacity: prefersReducedMotion ? 1 : [0, 1] }}
    transition={{ duration: prefersReducedMotion ? 0 : 1 }}
  >
    Content
  </motion.div>
);
```

---

### 2. Will-change para animaciones pesadas

```css
/* globals.css */
.will-animate {
  will-change: transform, opacity;
}

/* Remover después de la animación */
.animation-done {
  will-change: auto;
}
```

**Cuidado:** No abuses de `will-change`, consume memoria GPU.

---

### 3. Use transform y opacity (GPU-accelerated)

```typescript
// ❌ MAL: Anima propiedades que causan reflow
gsap.to('.element', { width: 500, height: 300 });

// ✅ BUENO: Usa transform (GPU)
gsap.to('.element', { scale: 1.5, x: 100 });
```

**Propiedades GPU-accelerated:**
- `transform` (translate, scale, rotate)
- `opacity`
- `filter`

**Evita animar:**
- `width`, `height`
- `top`, `left`, `margin`
- `padding`, `border`

---

### 4. Lazy load componentes animados

```typescript
import dynamic from 'next/dynamic';

const HeroAnimation = dynamic(
  () => import('@/components/HeroAnimation'),
  { 
    ssr: false,
    loading: () => <div className="h-screen bg-gray-100" />
  }
);
```

---

### 5. Debounce scroll events

```typescript
import { useEffect, useRef } from 'react';

export function useScrollDebounce(callback: () => void, delay = 100) {
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const handleScroll = () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(callback, delay);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [callback, delay]);
}
```

---

## 🎯 Casos de Uso Específicos

### Case 1: Hero Section con Scroll Parallax

```typescript
// components/sections/ParallaxHero.tsx
'use client';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';
import { motion } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

export default function ParallaxHero() {
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.to('.hero-image', {
      yPercent: 30,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });

    gsap.to('.hero-content', {
      opacity: 0,
      y: 100,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '50% top',
        scrub: true,
      },
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative h-screen overflow-hidden">
      {/* Background con parallax */}
      <div className="hero-image absolute inset-0 scale-110">
        <Image
          src="/hero-bg.jpg"
          alt="Hero background"
          fill
          priority
          style={{ objectFit: 'cover' }}
          quality={90}
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Content que se desvanece con scroll */}
      <div className="hero-content relative z-10 flex items-center justify-center h-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-center text-white"
        >
          <h1 className="text-7xl font-bold mb-6">
            Diseño que Impacta
          </h1>
          <p className="text-2xl mb-8">
            Experiencias web memorables
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-white text-black rounded-full font-semibold"
          >
            Ver Proyectos
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
```

---

### Case 2: Scroll-Triggered Cards

```typescript
// components/sections/ProjectsGrid.tsx
'use client';
import { motion } from 'framer-motion';

const projects = [
  { id: 1, title: 'Proyecto 1', image: '/project1.jpg' },
  { id: 2, title: 'Proyecto 2', image: '/project2.jpg' },
  { id: 3, title: 'Proyecto 3', image: '/project3.jpg' },
];

export default function ProjectsGrid() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    },
  };

  return (
    <section className="py-24">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        {projects.map((project) => (
          <motion.div
            key={project.id}
            variants={cardVariants}
            whileHover={{ y: -10 }}
            className="group relative overflow-hidden rounded-2xl aspect-[4/5] bg-gray-900"
          >
            <Image
              src={project.image}
              alt={project.title}
              fill
              style={{ objectFit: 'cover' }}
              className="transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            <div className="absolute bottom-0 p-8 text-white">
              <h3 className="text-2xl font-bold">{project.title}</h3>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
```

---

### Case 3: Smooth Scroll con Lenis

```typescript
// app/layout.tsx
'use client';
import { useEffect } from 'react';
import Lenis from 'lenis';

export default function RootLayout({ children }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
```

---

### Case 4: Page Transitions

```typescript
// app/template.tsx
'use client';
import { motion } from 'framer-motion';

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  );
}
```

---

## 📚 Recursos y Referencias

### Documentación Oficial
- **Next.js:** https://nextjs.org/docs
- **Framer Motion:** https://www.framer.com/motion/
- **GSAP:** https://gsap.com/docs/v3/
- **ScrollTrigger:** https://gsap.com/docs/v3/Plugins/ScrollTrigger/

### Tutoriales Recomendados
- **Framer Motion Tutorial:** https://www.youtube.com/watch?v=2V1WK-3HQNk
- **GSAP ScrollTrigger:** https://www.youtube.com/watch?v=X7IBa7vZjmo
- **Next.js 15 Crash Course:** https://www.youtube.com/watch?v=wm5gMKuwSYk

### Herramientas Útiles
- **Easings.net:** Visualizador de easing functions
- **Cubic-bezier.com:** Generador de cubic-bezier
- **GSAP Ease Visualizer:** https://gsap.com/docs/v3/Eases/

### Inspiración
- **Awwwards:** https://www.awwwards.com/
- **Codrops:** https://tympanus.net/codrops/
- **CodePen (GSAP):** https://codepen.io/tag/gsap

### Comunidad
- **GSAP Forums:** https://gsap.com/community/
- **Framer Motion Discord:** https://discord.gg/framer
- **Next.js Discord:** https://discord.gg/nextjs

---

## 🎓 Consejos Finales

1. **Comienza simple:** No agregues todas las animaciones de golpe. Empieza con fade-ins básicos y ve escalando.

2. **Prioriza UX sobre "wow factor":** Las animaciones deben mejorar la experiencia, no distraer.

3. **Performance first:** Usa DevTools para monitorear FPS y optimiza animaciones pesadas.

4. **Mobile matters:** Reduce animaciones en móvil, usa `prefers-reduced-motion`.

5. **Prueba en dispositivos reales:** Las animaciones pueden verse diferentes en móviles reales vs. simuladores.

6. **Combina ambas librerías:** Framer Motion para components, GSAP para efectos complejos.

7. **Documenta tus animaciones:** Crea un storybook o galería de componentes animados reutilizables.

---

**Creado para:** Webs de Alto Impacto  
**Stack:** Next.js 15 + Framer Motion + GSAP  
**Versión:** 1.0  
**Fecha:** Noviembre 2025
