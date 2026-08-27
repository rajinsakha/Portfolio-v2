"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import profile from "@/assets/images/about-img.jpg";

// Year I started web development — keeps the "X years" copy from going stale.
const CAREER_START_YEAR = 2023;

export default function About() {
  const yearsOfExperience = new Date().getFullYear() - CAREER_START_YEAR;

  return (
    <section id="about" className="py-16 md:py-24">
      <div className="container">
        <SectionHeading title="About Me" subtitle="Get to know me better" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative  h-full  w-full max-w-md mx-auto lg:mx-0 rounded-2xl overflow-hidden"
          >
            <div className="h-full min-h-[400px] lg:min-h-full lg:h-full w-full relative">
              <Image
                src={profile.src}
                alt="Rajin Sakha"
                fill
                className="object-cover"
                priority
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col justify-center"
          >
            <h3 className="font-display text-3xl font-normal mb-4">
              Full-stack Developer who ships product end to end
            </h3>

            <div className="space-y-4 text-muted-foreground">
              <p className="text-sm sm:text-base ">
                I&apos;m Rajin Sakha, a full-stack developer who builds products
                from the interface down to the database. I work across React, Next.js and React Native on the frontend, and NestJS, PostgreSQL, Redis, background job queues and Docker on the backend.
              </p>
              <p className="text-sm sm:text-base ">
                My journey in software began {yearsOfExperience} years ago as a
                frontend developer, and I&apos;ve since grown into owning whole
                features: schema design, API endpoints, auth and integrations,
                then the UI that consumes them. That range covers e-commerce
                platforms, enterprise dashboards and AI-driven ad tooling.
              </p>
              <p className="text-sm sm:text-base ">
                Working across the stack means I can trace a bug from a slow
                page straight through to the query causing it, and design APIs
                that the UI actually wants to consume. I care about performance,
                accessibility and code that stays readable once the team grows.
              </p>
            </div>

            <div className="mt-8">
              <Button size="lg" asChild>
                <a href="/RajinSakha_Resume.pdf" download="RajinSakha_Resume.pdf">
                  Download Resume
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
