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
          {/* Not wrapped: the h1 here is the LCP element, so it paints on the
              first frame instead of fading in. */}
          <HeroHeading />

          <MotionWrapper delay={0.1}>
            <p className="mx-auto mb-8 max-w-2xl text-base text-muted-foreground lg:text-lg">
              I build web and mobile products end to end for teams abroad
              &mdash; from the database to the interface. Recent work: an AI
              ads platform, a dating app past 20,000 downloads, and HR software
              running 40+ organisations.
            </p>
          </MotionWrapper>

          <MotionWrapper delay={0.2}>
            <HeroActions />
          </MotionWrapper>

          <MotionWrapper delay={0.3}>
            <HeroSocialLinks />
          </MotionWrapper>
        </div>
      </div>
    </section>
  );
}
