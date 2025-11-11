import Hero from '@/components/sections/Hero';
import AboutUs from '@/components/sections/AboutUs';
import Services from '@/components/sections/Services';
import Works from '@/components/sections/Works';
import Contact from '@/components/sections/Contact';

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <AboutUs />
      <Works />
      <Contact />
    </>
  );
}

