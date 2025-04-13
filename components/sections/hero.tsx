"use client";

import { motion } from "framer-motion";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";
import { TypewriterEffect } from "../ui/typewriter-effect";

export default function Hero() {
  const words = [
    { text: "Build." },
    { text: "Design." },
    { text: "Develop." },
    { text: "Create." },
  ];

  return (
    <section className="relative pt-36 pb-20 md:pt-44 md:pb-32 overflow-hidden">
      {/* Background gradient */}
      <div
        className={cn(
          "absolute inset-0 -z-10",
          "[background-size:20px_20px]",
          "[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]",
          "dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]"
        )}
      />
      {/* Radial gradient for the faded look */}
      <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

      {/* Top gradient overlay */}
      <div className="absolute top-0 -z-10 h-[50vh] w-full bg-gradient-to-b from-primary/5 to-transparent"></div>

      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 text-shadow-xs dark:text-shadow-white">
              Hi, I&apos;m Rajin Sakha
              <span className="text-primary text-shadow-none">.</span>
            </h1>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6 text-primary text-shadow-xs">
              Front-end Developer
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-8"
          >
            <div className="h-16 flex items-center justify-center">
              <TypewriterEffect
                words={words}
                className="sm:text-shadow-xs dark:text-shadow-white "
              />
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-muted-foreground text-base sm:text-lg mb-8 max-w-2xl mx-auto"
          >
            I create engaging web experiences that blend creativity with
            technical expertise. Specializing in React.js and Next.js to build
            modern, responsive applications.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button size="lg" asChild>
              <Link href="#projects">
                View My Work <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="#contact">Contact Me</Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex items-center justify-center gap-4 mt-10"
          >
            <Link
              href="https://github.com/rajinsakha"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors"
            >
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link
              href="https://www.linkedin.com/in/rajin-sakha-22003b229/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors"
            >
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </Link>
            <Link
              href="mailto:rajinsakha07@gmail.com"
              className="p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors"
            >
              <Mail className="h-5 w-5" />
              <span className="sr-only">Email</span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
