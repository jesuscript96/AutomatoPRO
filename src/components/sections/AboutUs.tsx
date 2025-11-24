'use client';
import FadeIn from '@/components/animations/FadeIn';
import ColoredLinesBackground from '@/components/ui/ColoredLinesBackground';

export default function AboutUs() {

  return (
    <section id="about" className="relative bg-white py-20 overflow-hidden">
      <ColoredLinesBackground />
      <div
        className="container mx-auto px-6 py-20 relative border border-black z-10 bg-white"
        style={{
          boxShadow: '4px 4px 0px 0px rgba(0, 0, 0, 0.2), -4px -4px 0px 0px rgba(0, 0, 0, 0.2), 8px 8px 0px 0px rgba(0, 0, 0, 0.1), -8px -8px 0px 0px rgba(0, 0, 0, 0.1), 12px 12px 0px 0px rgba(0, 0, 0, 0.05), -12px -12px 0px 0px rgba(0, 0, 0, 0.05)'
        }}
      >
        {/* Bloques de colores */}
        {/* Bloque con imagen (Desktop) */}
        <div
          className="hidden md:block absolute w-[280px] h-[280px] md:w-[320px] md:h-[320px] border border-black z-10 transition-colors duration-300 hover:bg-[#FF6B35]"
          style={{
            top: '15%',
            right: '10%',
            boxShadow: '2px 2px 0px 0px rgba(0, 0, 0, 0.1), 4px 4px 0px 0px rgba(0, 0, 0, 0.05)',
            backgroundImage: 'url(/Google_AI_Studio_2025-11-11T04_02_52.506Z.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />

        {/* Bloque transparente (Mobile) */}
        <div
          className="md:hidden absolute w-[200px] h-[200px] border border-black z-10 transition-colors duration-300 hover:bg-[#0066FF]"
          style={{
            top: '10%',
            right: '5%',
            boxShadow: '2px 2px 0px 0px rgba(0, 0, 0, 0.1), 4px 4px 0px 0px rgba(0, 0, 0, 0.05)',
            backgroundColor: 'transparent'
          }}
        />

        {/* Bloque verde - Rectángulo horizontal */}
        <div
          className="absolute w-[300px] h-[150px] md:w-[360px] md:h-[180px] bg-white border border-black z-10 transition-colors duration-300 hover:bg-[#00C896]"
          style={{
            top: '50%',
            left: '5%',
            boxShadow: '2px 2px 0px 0px rgba(0, 0, 0, 0.1), 4px 4px 0px 0px rgba(0, 0, 0, 0.05)',
          }}
        />

        {/* Bloque naranja - Rectángulo vertical */}
        <div
          className="absolute w-[150px] h-[300px] md:w-[180px] md:h-[360px] bg-white border border-black z-10 transition-colors duration-300 hover:bg-[#0066FF]"
          style={{
            bottom: '20%',
            right: '20%',
            boxShadow: '2px 2px 0px 0px rgba(0, 0, 0, 0.1), 4px 4px 0px 0px rgba(0, 0, 0, 0.05)',
          }}
        />

        {/* Título en esquina superior izquierda */}
        <FadeIn direction="up">
          <div className="mb-32 max-w-2xl relative z-30">
            <h2 className="text-5xl md:text-6xl font-bold text-black mb-6">
              Sobre Nosotros
            </h2>
            <p className="text-body-lg md:text-xl text-gray-600 font-light">
              Crear una web es como cultivar un tomate: requiere paciencia, cuidado y dedicación.
              Cada línea de código, cada detalle de diseño, se trabaja con la misma atención
              que un agricultor dedica a sus cultivos. No hay atajos en la artesanía.
            </p>
          </div>
        </FadeIn>

        {/* Filosofía en esquina inferior derecha */}
        <FadeIn direction="up" delay={0.4}>
          <div className="flex justify-end">
            <div className="max-w-2xl text-right relative z-30">
              <h3 className="text-5xl md:text-6xl font-bold text-black mb-6">
                Nuestra Cultura
              </h3>
              <p className="text-body-lg md:text-xl text-gray-600 font-light mb-6">
                Así como un tomate necesita tiempo para crecer, ser regado con cuidado y
                recibir la atención adecuada, cada proyecto web requiere un proceso artesanal.
                No creamos en producción en masa. Cada sitio es único, cultivado desde cero
                con dedicación y esmero.
              </p>
              <p className="text-body-lg md:text-xl text-gray-600 font-light">
                Nuestra cultura de trabajo se basa en el respeto por el proceso, la atención
                al detalle y la pasión por crear algo verdaderamente excepcional. Trabajamos
                con marcas que valoran la artesanía digital y entienden que lo mejor requiere
                tiempo, cuidado y dedicación.
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
