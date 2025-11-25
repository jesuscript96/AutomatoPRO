import Hero from '@/components/sections/Hero';
import AboutUs from '@/components/sections/AboutUs';
import Services from '@/components/sections/Services';
import Works from '@/components/sections/Works';
import WorksMobile from '@/components/sections/WorksMobile';
import Contact from '@/components/sections/Contact';

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <AboutUs />
      <div className="hidden md:block">
        <Works />
      </div>
      <div className="block md:hidden">
        <WorksMobile />
      </div>
      <Contact />
    </>
  );
}

