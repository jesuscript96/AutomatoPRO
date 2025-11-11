'use client';
import { motion } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { gsap } from '@/lib/gsap';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Determinar si el navbar debe estar visible
      if (currentScrollY < 50) {
        // En la parte superior, siempre visible
        setIsVisible(true);
      } else if (currentScrollY < lastScrollY.current) {
        // Scroll hacia arriba
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY.current) {
        // Scroll hacia abajo
        setIsVisible(false);
      }
      
      // Actualizar estado de scroll para el estilo
      setIsScrolled(currentScrollY > 50);
      
      // Guardar la posición actual para la próxima comparación
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const leftNavItems = [
    { label: 'Inicio', id: 'hero' },
    { label: 'Sobre Nosotros', id: 'about' },
  ];

  const rightNavItems = [
    { label: 'Servicios', id: 'services' },
    { label: 'Trabajos', id: 'works' },
    { label: 'Contacto', id: 'contact' },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ 
        y: isVisible ? 0 : -100,
        opacity: isVisible ? 1 : 0
      }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-white/80 backdrop-blur-md'
      }`}
    >
      <nav className="w-full">
        <div className="flex items-center justify-between w-full">
          {/* Sección izquierda */}
          <ul className="hidden md:flex items-center flex-1 justify-evenly">
            {leftNavItems.map((item, index) => (
              <motion.li
                key={item.id}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.3 }}
              >
                <button
                  onClick={() => scrollToSection(item.id)}
                  className="text-body-sm font-bold uppercase text-black transition-colors hover:opacity-70"
                >
                  {item.label}
                </button>
              </motion.li>
            ))}
          </ul>

          {/* Logo centrado */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex-shrink-0 cursor-pointer m-0 p-0"
            onClick={() => scrollToSection('hero')}
          >
            <Image
              src="/logoautomatoPRO.png"
              alt="AutomatoPRO Logo"
              width={260}
              height={78}
              className="h-auto w-auto max-h-[78px] object-contain m-0 p-0"
              priority
            />
          </motion.div>

          {/* Sección derecha */}
          <ul className="hidden md:flex items-center flex-1 justify-evenly">
            {rightNavItems.map((item, index) => (
              <motion.li
                key={item.id}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (index + leftNavItems.length) * 0.1 + 0.3 }}
              >
                <button
                  onClick={() => scrollToSection(item.id)}
                  className="text-body-sm font-bold uppercase text-black transition-colors hover:opacity-70"
                >
                  {item.label}
                </button>
              </motion.li>
            ))}
          </ul>
        </div>
      </nav>
    </motion.header>
  );
}

