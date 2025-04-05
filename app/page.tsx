import About from "@/components/sections/about";
import Contact from "@/components/sections/contact";
import CTA from "@/components/sections/cta";
import Experience from "@/components/sections/experience";
import Hero from "@/components/sections/hero";
import Projects from "@/components/sections/projects";
import StructuredData from "@/components/sections/structured-data";

export default function Home() {
  return (
    <>
      <StructuredData />
      <Hero />
      <About />
      <Projects />
      <Experience />
      <CTA />
      <Contact />
    </>
  );
}
