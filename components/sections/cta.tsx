"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CTA() {
  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-3xl border border-border/60 bg-card px-6 py-16 text-center md:px-12 md:py-20"
        >
          {/* Decorative glow + dot texture */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10"
          >
            <div className="absolute left-1/2 top-0 h-64 w-[36rem] max-w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-3xl" />
            <div
              className="absolute inset-0 opacity-[0.15]"
              style={{
                backgroundImage:
                  "radial-gradient(circle, var(--muted-foreground) 1px, transparent 1px)",
                backgroundSize: "28px 28px",
                maskImage:
                  "radial-gradient(ellipse 60% 60% at 50% 0%, #000 30%, transparent 75%)",
                WebkitMaskImage:
                  "radial-gradient(ellipse 60% 60% at 50% 0%, #000 30%, transparent 75%)",
              }}
            />
          </div>

          <h2 className="font-display mx-auto max-w-2xl text-4xl font-normal tracking-tight md:text-6xl">
            Ready to bring your ideas to life?
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base text-muted-foreground md:text-lg">
            Whether it&apos;s a freelance project or a new opportunity, I&apos;d
            love to hear what you&apos;re building.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button size="lg" asChild className="group w-full sm:w-auto">
              <Link href="#contact">
                Let&apos;s Talk
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="w-full sm:w-auto"
            >
              <Link href="/projects">View My Work</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
