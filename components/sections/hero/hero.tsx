import DottedBackground from "@/components/sections/hero/dotted-background";
import HeroActions from "@/components/sections/hero/hero-actions";
import HeroHeading from "@/components/sections/hero/hero-heading";
import HeroSocialLinks from "@/components/sections/hero/hero-social-links";
import MotionWrapper from "@/components/sections/hero/motion-wrapper";

export default function Hero() {
  return (
    <section className="relative min-h-svh overflow-hidden pt-[var(--navbar-height)]">
      <DottedBackground />

      <div className="container relative z-10 flex min-h-[calc(100svh-var(--navbar-height))] items-center py-14 md:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <MotionWrapper delay={0.1}>
            <HeroHeading />
          </MotionWrapper>

          <MotionWrapper delay={0.2}>
            <p className="mx-auto mb-8 max-w-2xl text-xs text-muted-foreground sm:text-base lg:text-lg">
              I create engaging web experiences that blend creativity with
              technical expertise. Specializing in React.js and Next.js to
              build modern, responsive applications.
            </p>
          </MotionWrapper>

          <MotionWrapper delay={0.3}>
            <HeroActions />
          </MotionWrapper>

          <MotionWrapper delay={0.4}>
            <HeroSocialLinks />
          </MotionWrapper>
        </div>
      </div>
    </section>
  );
}
