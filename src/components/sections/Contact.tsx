'use client';
import { motion } from 'framer-motion';
import TomateModel from '@/components/3D/TomateModel';
import ColorizedTitle from '@/components/ui/ColorizedTitle';
import { useEffect, useState } from 'react';

const COLORS = ['#F5CC00', '#753B67', '#35A09E'];

export default function Contact() {
  const [lineColors, setLineColors] = useState<string[]>([]);

  useEffect(() => {
    // Generate random colors for lines on mount
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
      borderColor: lineColors[index] || '#000000', // Default to black
      transition: 'border-color 0.5s ease'
    };
  };

  return (
    <section id="contact" className="relative bg-white pb-12 md:pb-16">
      <div className="relative w-full min-h-screen flex flex-col">

        {/* Fila 1 - Vacía */}
        <div
          className="relative w-full h-[calc(100vh/9)] border-b"
          style={getLineStyle(0)}
        ></div>

        {/* Fila 2 - INICIEMOS */}
        <div
          className="relative w-full h-[calc(100vh/9)] border-b flex items-center px-[20%]"
          style={getLineStyle(1)}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-left relative z-30"
          >
            <ColorizedTitle
              text="LET'S START"
              tag="h1"
              className="uppercase text-[1.8rem] sm:text-[2.2rem] md:text-[2.6rem] lg:text-[3rem] xl:text-[3.5rem] font-normal text-black leading-none"
            />
          </motion.div>
        </div>

        {/* Fila 3 - Bloque y "TU" */}
        <div
          className="relative w-full h-[calc(100vh/9)] border-b flex items-center justify-between px-[20%]"
          style={getLineStyle(2)}
        >
          <div className="flex-1"></div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="w-[200px] h-[200px] sm:w-[240px] sm:h-[240px] md:w-[280px] md:h-[280px] lg:w-[320px] lg:h-[320px] xl:w-[360px] xl:h-[360px] bg-[#F5CC00] border border-black z-20 overflow-hidden transition-colors duration-300 hover:bg-white"
            style={{
              boxShadow: '2px 2px 0px 0px rgba(0, 0, 0, 0.1), 4px 4px 0px 0px rgba(0, 0, 0, 0.05)',
            }}
          >
            <TomateModel />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1 flex justify-end relative z-30"
          >
            <ColorizedTitle
              text="YOUR"
              tag="h1"
              className="uppercase text-[1.8rem] sm:text-[2.2rem] md:text-[2.6rem] lg:text-[3rem] xl:text-[3.5rem] font-bold text-black leading-none text-right"
            />
          </motion.div>
        </div>

        {/* Fila 4 - "PROYECTO" */}
        <div
          className="relative w-full h-[calc(100vh/9)] border-b flex items-center justify-end px-[20%]"
          style={getLineStyle(3)}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="text-right relative z-30"
          >
            <ColorizedTitle
              text="PROJECT"
              tag="h1"
              className="uppercase text-[1.8rem] sm:text-[2.2rem] md:text-[2.6rem] lg:text-[3rem] xl:text-[3.5rem] font-bold text-black leading-none"
            />
          </motion.div>
        </div>

        {/* Fila 5 - Vacía */}
        <div
          className="relative w-full h-[calc(100vh/9)] border-b"
          style={getLineStyle(4)}
        ></div>

        {/* Fila 6 - Bloque y primera parte del subtítulo */}
        <div
          className="relative w-full h-[calc(100vh/9)] border-b flex items-center px-[20%]"
          style={getLineStyle(5)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="w-[180px] h-[180px] sm:w-[220px] sm:h-[220px] md:w-[260px] md:h-[260px] lg:w-[300px] lg:h-[300px] bg-[#753B67] border border-black z-20 mr-8 transition-colors duration-300 hover:bg-white"
            style={{
              boxShadow: '2px 2px 0px 0px rgba(0, 0, 0, 0.1), 4px 4px 0px 0px rgba(0, 0, 0, 0.05)',
            }}
          />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1 relative z-30 hidden md:block"
          >
            <p className="text-body-lg text-gray-700 font-light text-backdrop-light">
              If you want your business to grow and scale efficiently, let's talk.
            </p>
          </motion.div>
        </div>

        {/* Fila 7 - Segunda parte del subtítulo */}
        <div
          className="relative w-full h-[calc(100vh/9)] border-b flex items-center px-[20%]"
          style={getLineStyle(6)}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-30"
          >
            <p className="text-xl md:text-body-lg text-gray-700 font-light text-backdrop-light">
              We are here to build your digital success.
            </p>
          </motion.div>
        </div>

        {/* Fila 8 - Vacía */}
        <div
          className="relative w-full h-[calc(100vh/9)] border-b"
          style={getLineStyle(7)}
        ></div>

        {/* Fila 9 - Información de contacto */}
        <div className="relative w-full h-[calc(100vh/9)] flex items-center px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="w-full flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-0 relative z-30"
          >
            {/* Nombre de la agencia - Izquierda */}
            <div className="md:absolute md:left-6 lg:left-8 text-center md:text-left">
              <p className="text-body-lg text-gray-700 font-light text-backdrop-light">
                Automato Agency Ltd
              </p>
            </div>

            {/* WhatsApp CTA - Centrado */}
            <div className="md:absolute md:left-1/2 md:transform md:-translate-x-1/2 text-center">
              <a
                href="https://wa.me/34600412492?text=I%20would%20like%20to%20talk%20about%20my%20web%20project"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 bg-white border border-black text-black hover:bg-black hover:text-white transition-all font-medium text-body"
              >
                Send WhatsApp
              </a>
            </div>

            {/* Localización - Derecha */}
            <div className="md:absolute md:right-6 lg:right-8 text-center md:text-right">
              <p className="text-body-lg text-gray-700 font-light text-backdrop-light">
                Based in Barcelona
              </p>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}

