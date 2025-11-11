'use client';
import { motion } from 'framer-motion';
import { useMemo, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';
import FadeIn from '@/components/animations/FadeIn';

export default function Footer() {
  // Calcular el año de forma consistente
  const currentYear = useMemo(() => new Date().getFullYear(), []);
  const footerRef = useRef<HTMLElement>(null);
  const lineTopRef = useRef<HTMLDivElement>(null);
  const lineBottomRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!footerRef.current) return;

    // Animación de líneas separadoras
    if (lineTopRef.current) {
      gsap.fromTo(
        lineTopRef.current,
        { scaleX: 0, transformOrigin: 'left' },
        {
          scaleX: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }

    if (lineBottomRef.current) {
      gsap.fromTo(
        lineBottomRef.current,
        { scaleX: 0, transformOrigin: 'left' },
        {
          scaleX: 1,
          duration: 1,
          delay: 0.3,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }
  }, { scope: footerRef });

  return (
    <footer ref={footerRef} className="relative bg-white text-black py-16">
      {/* Línea separadora superior animada */}
      <div className="absolute top-0 left-0 right-0 z-20 overflow-hidden">
        <div
          ref={lineTopRef}
          className="h-px bg-gradient-to-r from-transparent via-black to-transparent"
        />
      </div>

      <div className="container mx-auto px-6">
        <FadeIn direction="up">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            <div>
              <h3 className="text-h3 font-bold mb-4 text-black">Storytelling</h3>
              <p className="text-body-sm text-gray-600 font-light">
                Creamos experiencias web únicas que cuentan tu historia.
                Personalización 100% para marcas con personalidad.
              </p>
            </div>

            <div>
              <h4 className="text-h4 font-semibold mb-4 text-black">Enlaces</h4>
              <ul className="space-y-2 text-body-sm text-gray-600 font-light">
                <li>
                  <a href="#about" className="hover:text-black transition-colors">
                    Sobre Nosotros
                  </a>
                </li>
                <li>
                  <a href="#services" className="hover:text-black transition-colors">
                    Servicios
                  </a>
                </li>
                <li>
                  <a href="#works" className="hover:text-black transition-colors">
                    Trabajos
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-black transition-colors">
                    Contacto
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-h4 font-semibold mb-4 text-black">Contacto</h4>
              <ul className="space-y-2 text-body-sm text-gray-600 font-light">
                <li>hola@storytelling.com</li>
                <li>+34 123 456 789</li>
                <li>Madrid, España</li>
              </ul>
            </div>
          </div>
        </FadeIn>

        <FadeIn direction="up" delay={0.2}>
          <div className="border-t border-gray-300 pt-8 text-center text-body-sm text-gray-600 font-light">
            <p>&copy; {currentYear} Storytelling. Todos los derechos reservados.</p>
          </div>
        </FadeIn>
      </div>

      {/* Línea separadora inferior animada */}
      <div className="absolute bottom-0 left-0 right-0 z-20 overflow-hidden">
        <div
          ref={lineBottomRef}
          className="h-px bg-gradient-to-r from-transparent via-black to-transparent"
        />
      </div>
    </footer>
  );
}

