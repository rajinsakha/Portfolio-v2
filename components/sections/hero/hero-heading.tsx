import { TypewriterEffect } from "@/components/ui/typewriter-effect";

const words = [
  { text: "Build." },
  { text: "Design." },
  { text: "Develop." },
  { text: "Create." },
];

export default function HeroHeading() {
  return (
    <>
      <div>
        <h1 className="font-display mb-4 text-4xl font-normal tracking-tight md:text-6xl lg:text-7xl">
          Hi, I&apos;m Rajin Sakha
          <span className="text-primary text-shadow-none">.</span>
        </h1>
        <p className="mb-6 font-mono text-xs font-medium uppercase tracking-[0.2em] text-primary sm:text-sm">
          Front-end Developer
        </p>
      </div>

      <div className="mb-8">
        <div className="flex h-16 items-center justify-center">
          <TypewriterEffect
            words={words}
            className="font-mono sm:text-shadow-xs dark:text-shadow-white"
          />
        </div>
      </div>
    </>
  );
}
