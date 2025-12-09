'use client';
import FadeIn from '@/components/animations/FadeIn';
import ColoredLinesBackground from '@/components/ui/ColoredLinesBackground';

export default function AboutUs() {

  return (
    <section id="about" className="relative bg-white py-20 overflow-hidden">
      <ColoredLinesBackground />
      <div
        className="container mx-auto px-6 py-20 relative border border-black z-10"
        style={{
          boxShadow: '4px 4px 0px 0px rgba(0, 0, 0, 0.2), -4px -4px 0px 0px rgba(0, 0, 0, 0.2), 8px 8px 0px 0px rgba(0, 0, 0, 0.1), -8px -8px 0px 0px rgba(0, 0, 0, 0.1), 12px 12px 0px 0px rgba(0, 0, 0, 0.05), -12px -12px 0px 0px rgba(0, 0, 0, 0.05)',
          backgroundImage: 'url(/bgaboutus.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Bloques de colores */}
        {/* Bloque con imagen (Desktop) */}
        <div
          className="hidden md:block absolute w-[280px] h-[280px] md:w-[320px] md:h-[320px] border border-black z-10 transition-colors duration-300 hover:bg-[#753B67]"
          style={{
            top: '15%',
            right: '10%',
            boxShadow: '2px 2px 0px 0px rgba(0, 0, 0, 0.1), 4px 4px 0px 0px rgba(0, 0, 0, 0.05)',
            backgroundImage: 'url(/Tomatemorado.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />

        {/* Bloque transparente (Mobile) */}
        <div
          className="md:hidden absolute w-[200px] h-[200px] border border-black z-10 transition-colors duration-300 hover:bg-[#F5CC00]"
          style={{
            top: '10%',
            right: '5%',
            boxShadow: '2px 2px 0px 0px rgba(0, 0, 0, 0.1), 4px 4px 0px 0px rgba(0, 0, 0, 0.05)',
            backgroundColor: 'transparent'
          }}
        />

        {/* Bloque verde - Rectángulo horizontal 
        <div
          className="absolute w-[300px] h-[150px] md:w-[360px] md:h-[180px] bg-white border border-black z-10 transition-colors duration-300 hover:bg-[#F5CC00]"
          style={{
            top: '50%',
            left: '5%',
            boxShadow: '2px 2px 0px 0px rgba(0, 0, 0, 0.1), 4px 4px 0px 0px rgba(0, 0, 0, 0.05)',
          }}
        />
        */}


        {/* Título en esquina superior izquierda */}
        <FadeIn direction="up">
          <div className="mb-32 max-w-2xl relative z-30">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              About Us
            </h2>
            <p className="text-body-lg md:text-xl text-white font-light text-backdrop">
              Growing a business is like cultivating a garden: it requires strategy, care, and dedication.
              We help your business bloom in the digital landscape. Every strategy, every automation
              is crafted with the same attention a farmer gives to their crops.
            </p>
          </div>
        </FadeIn>

        {/* Filosofía en esquina inferior derecha */}
        <FadeIn direction="up" delay={0.4}>
          <div className="flex justify-end">
            <div className="max-w-2xl text-right relative z-30">
              <h3 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Our Culture
              </h3>
              <p className="text-body-lg md:text-xl text-white font-light mb-6 text-backdrop">
                Just as a harvest needs time and the right tools, sustainable growth requires
                a custom approach. We specialize in custom e-commerce, paid media, and operations automation.
                We don&apos;t believe in one-size-fits-all. Each solution is unique.
              </p>
              <p className="text-body-lg md:text-xl text-white font-light text-backdrop">
                Our culture is rooted in helping businesses grow. We combine digital craftsmanship
                with data-driven strategies. We work with brands that value bespoke web creation
                and efficient automation to scale their sales and operations.
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
