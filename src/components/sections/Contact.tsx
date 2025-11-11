'use client';
import { motion } from 'framer-motion';
import TomateModel from '@/components/3D/TomateModel';

export default function Contact() {
  return (
    <section id="contact" className="relative bg-white pb-12 md:pb-16">
      <div className="relative w-full min-h-screen flex flex-col">
        
        {/* Fila 1 - Vacía */}
        <div className="relative w-full h-[calc(100vh/9)] border-b border-black"></div>

        {/* Fila 2 - INICIEMOS */}
        <div className="relative w-full h-[calc(100vh/9)] border-b border-black flex items-center px-[20%]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-left relative z-30"
          >
            <h1 className="uppercase text-[1.8rem] sm:text-[2.2rem] md:text-[2.6rem] lg:text-[3rem] xl:text-[3.5rem] font-normal text-black leading-none">
              INICIEMOS
            </h1>
          </motion.div>
        </div>

        {/* Fila 3 - Bloque y "TU" */}
        <div className="relative w-full h-[calc(100vh/9)] border-b border-black flex items-center justify-between px-[20%]">
          <div className="flex-1"></div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="w-[200px] h-[200px] sm:w-[240px] sm:h-[240px] md:w-[280px] md:h-[280px] lg:w-[320px] lg:h-[320px] xl:w-[360px] xl:h-[360px] bg-white border border-black z-20 overflow-hidden"
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
            <h1 className="uppercase text-[1.8rem] sm:text-[2.2rem] md:text-[2.6rem] lg:text-[3rem] xl:text-[3.5rem] font-bold text-black leading-none text-right">
              TU
            </h1>
          </motion.div>
        </div>

        {/* Fila 4 - "PROYECTO" */}
        <div className="relative w-full h-[calc(100vh/9)] border-b border-black flex items-center justify-end px-[20%]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="text-right relative z-30"
          >
            <h1 className="uppercase text-[1.8rem] sm:text-[2.2rem] md:text-[2.6rem] lg:text-[3rem] xl:text-[3.5rem] font-bold text-black leading-none">
              PROYECTO
            </h1>
          </motion.div>
        </div>

        {/* Fila 5 - Vacía */}
        <div className="relative w-full h-[calc(100vh/9)] border-b border-black"></div>

        {/* Fila 6 - Bloque y primera parte del subtítulo */}
        <div className="relative w-full h-[calc(100vh/9)] border-b border-black flex items-center px-[20%]">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="w-[180px] h-[180px] sm:w-[220px] sm:h-[220px] md:w-[260px] md:h-[260px] lg:w-[300px] lg:h-[300px] bg-white border border-black z-20 mr-8"
            style={{
              boxShadow: '2px 2px 0px 0px rgba(0, 0, 0, 0.1), 4px 4px 0px 0px rgba(0, 0, 0, 0.05)',
            }}
          />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1 relative z-30"
          >
            <p className="text-body-lg text-gray-700 font-light">
              Si tu marca tiene personalidad y quieres dejar huella con tu storytelling, hablemos.
            </p>
          </motion.div>
        </div>

        {/* Fila 7 - Segunda parte del subtítulo */}
        <div className="relative w-full h-[calc(100vh/9)] border-b border-black flex items-center px-[20%]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-30"
          >
            <p className="text-body-lg text-gray-700 font-light">
              Estamos aquí para crear algo único contigo.
            </p>
          </motion.div>
        </div>

        {/* Fila 8 - Vacía */}
        <div className="relative w-full h-[calc(100vh/9)] border-b border-black"></div>

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
              <p className="text-body-lg text-gray-700 font-light">
                Automato Agency Ltd
              </p>
            </div>

            {/* WhatsApp CTA - Centrado */}
            <div className="md:absolute md:left-1/2 md:transform md:-translate-x-1/2 text-center">
              <a
                href="https://wa.me/34600412492?text=Me%20gustaría%20hablar%20sobre%20mi%20proyecto%20web"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 bg-white border border-black text-black hover:bg-black hover:text-white transition-all font-medium text-body"
              >
                Enviar WhatsApp
              </a>
            </div>

            {/* Localización - Derecha */}
            <div className="md:absolute md:right-6 lg:right-8 text-center md:text-right">
              <p className="text-body-lg text-gray-700 font-light">
                Estamos en Ciudad de México
              </p>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}

