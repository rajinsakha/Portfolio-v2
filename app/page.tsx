import About from "@/components/sections/about/about";
import Contact from "@/components/sections/contact/contact";
import CTA from "@/components/sections/cta";
import Experience from "@/components/sections/experience";
import Hero from "@/components/sections/hero/hero";

import Projects from "@/components/sections/projects";
import Skills from "@/components/sections/skills/skills";
import StructuredData from "@/components/sections/structured-data";
import { describeCareerLength } from "@/lib/career";

// The "X years" wording in About depends on today's date; re-render daily so
// a static page doesn't keep saying "almost 3 years" until the next deploy.
export const revalidate = 86400;

export default function Home() {
  return (
    <>
      <StructuredData />
      <Hero />
      <About careerLength={describeCareerLength()} />
      <Skills />
      <Projects />
      <Experience />
      <CTA />
      <Contact />
    </>
  );
}
