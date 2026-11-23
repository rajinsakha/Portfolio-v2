"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import profile from "@/assets/images/about-img.webp";

export default function About({ careerLength }: { careerLength: string }) {
  return (
    <section id="about" className="py-16 md:py-24">
      <div className="container">
        <SectionHeading title="About Me" subtitle="Who you'd be working with" />

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
                src={profile}
                alt="Rajin Sakha"
                fill
                // Column is capped at max-w-md (448px); without `sizes`, `fill`
                // makes the browser assume 100vw and fetch an oversized image.
                sizes="(max-width: 448px) 100vw, 448px"
                className="object-cover"
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
              Full-stack developer who owns features from schema to UI
            </h3>

            <div className="space-y-4 text-muted-foreground">
              <p className="text-sm sm:text-base ">
                I&apos;m Rajin Sakha, a full-stack developer who builds products
                from the interface down to the database. I work across React, Next.js and React Native on the frontend, and NestJS, PostgreSQL, Redis, background job queues and Docker on the backend.
              </p>
              <p className="text-sm sm:text-base ">
                I started as a frontend developer {careerLength} ago and have
                since grown into owning whole features: schema design, API
                endpoints, auth and integrations, then the UI that consumes
                them. That has meant an AI ads platform, a dating app past
                20,000 downloads, the web frontend of HR software running 40+ organisations, and
                e-commerce and enterprise dashboards.
              </p>
              <p className="text-sm sm:text-base ">
                Working across the stack means I can trace a slow page
                straight through to the query causing it, and design APIs the
                UI actually wants to consume. I build to WCAG accessibility
                guidelines and watch bundle size and Core Web Vitals, and this
                site is built the same way.
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
