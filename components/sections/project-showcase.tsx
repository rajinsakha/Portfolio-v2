"use client";

import type React from "react";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink, Github, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export default function ProjectShowcase() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="bg-black text-white min-h-screen">
      <div className="container mx-auto px-4 py-16 md:py-24">
        {/* Section Header */}
        <div className="mb-16">
          <div className="flex items-baseline">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight"
            >
              Projects
              <span className="text-rose-500 ml-1">.</span>
            </motion.h2>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="h-px bg-zinc-800 ml-6 flex-grow"
            />
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-zinc-400 mt-4 max-w-2xl text-lg"
          >
            Showcasing my latest work and passion projects. Each project
            represents a unique challenge and solution.
          </motion.p>
        </div>

        {/* Project Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card
            className="bg-zinc-900/50 border-zinc-800 overflow-hidden"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <CardContent className="p-0">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Project Info */}
                <div className="p-6 md:p-10 flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="bg-rose-500/20 text-rose-400 border-rose-500/30 hover:bg-rose-500/30">
                        Featured Project
                      </Badge>
                      <Badge className="bg-zinc-800 text-zinc-300 border-zinc-700 hover:bg-zinc-700">
                        Web Application
                      </Badge>
                    </div>

                    <h3 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                      Hajir Khata
                    </h3>

                    <p className="text-zinc-300 mb-6 text-lg leading-relaxed">
                      Hajir Khata is a comprehensive software solution designed
                      to simplify payroll management for businesses of all
                      sizes. Its primary goal is to help organizations
                      effortlessly track daily employee attendance and manage
                      payroll with ease.
                    </p>

                    <div className="mb-8">
                      <h4 className="text-zinc-400 text-sm uppercase tracking-wider mb-3">
                        Technologies
                      </h4>
                      <div className="flex flex-wrap gap-3">
                        <TechBadge icon={<ReactIcon />} name="React" />
                        <TechBadge
                          icon={<TypeScriptIcon />}
                          name="TypeScript"
                        />
                        <TechBadge icon={<TailwindIcon />} name="Tailwind" />
                        <TechBadge icon={<GraphQLIcon />} name="GraphQL" />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4">
                    <Button className="bg-rose-500 hover:bg-rose-600 text-white">
                      View Project <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      className="border-zinc-700 text-zinc-300 hover:bg-zinc-800"
                    >
                      Source Code <Github className="ml-2 h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      className="text-zinc-400 hover:text-white hover:bg-zinc-800"
                    >
                      Case Study <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Project Image */}
                <div className="relative overflow-hidden lg:h-auto">
                  <motion.div
                    animate={{
                      scale: isHovered ? 1.03 : 1,
                      y: isHovered ? -5 : 0,
                    }}
                    transition={{ duration: 0.4 }}
                    className="relative h-full min-h-[300px]"
                  >
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-A1PMSBLKtcaiTlSGRsdF3rrSWoNmdU.png"
                      alt="Hajir Khata Dashboard"
                      width={800}
                      height={500}
                      className="object-cover rounded-b-xl lg:rounded-r-xl lg:rounded-bl-none h-full w-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:bg-gradient-to-r lg:from-black/60 lg:via-transparent lg:to-transparent" />
                  </motion.div>

                  <div className="absolute bottom-4 left-4 flex gap-2">
                    <Badge className="bg-black/70 backdrop-blur-sm text-white border-zinc-700">
                      Payroll Management
                    </Badge>
                    <Badge className="bg-black/70 backdrop-blur-sm text-white border-zinc-700">
                      Attendance Tracking
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* More Projects Button */}
        <div className="mt-12 text-center">
          <Button
            variant="outline"
            className="border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800 hover:border-zinc-700"
          >
            View All Projects <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

function TechBadge({ icon, name }: { icon: React.ReactNode; name: string }) {
  return (
    <div className="flex items-center gap-1.5 bg-zinc-800/70 px-3 py-1.5 rounded-full text-sm">
      {icon}
      <span className="text-zinc-300">{name}</span>
    </div>
  );
}

function ReactIcon() {
  return (
    <svg
      className="w-4 h-4 text-[#61DAFB]"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M12 13.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zm6.24-3.76a11.44 11.44 0 01-2.65 1.52c.41-.72.75-1.45 1.02-2.2.28.4.57.79.88 1.17.25.29.5.53.75.75zm-12.48 0c.25-.22.5-.46.75-.75.31-.38.6-.77.88-1.17.27.75.61 1.48 1.02 2.2a11.44 11.44 0 01-2.65-1.52z"
      />
    </svg>
  );
}

function TypeScriptIcon() {
  return (
    <svg
      className="w-4 h-4 text-[#3178C6]"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M3 3h18v18H3V3z" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14 10v2h-4v7h-2v-7H4v-2h10zm.955 9.5v-2.337c0-.454-.087-.78-.26-.98-.173-.207-.456-.307-.84-.307-.38 0-.67.1-.87.3-.193.2-.29.487-.29.86v.464h1.44v2.333c0 .467.087.8.26 1 .18.2.463.3.85.3.38 0 .67-.1.87-.3.2-.2.3-.487.3-.86v-.473h-1.46z"
        fill="white"
      />
    </svg>
  );
}

function TailwindIcon() {
  return (
    <svg
      className="w-4 h-4 text-[#38BDF8]"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
    </svg>
  );
}

function GraphQLIcon() {
  return (
    <svg
      className="w-4 h-4 text-[#E535AB]"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M12 2L2.25 7.5v9L12 22l9.75-5.5v-9L12 2zm0 3.333l6.5 3.667v7.33L12 19.997l-6.5-3.667v-7.33L12 5.333z" />
      <path d="M8.25 7.5L12 9.75l3.75-2.25L12 5.25 8.25 7.5zM7.5 12l2.25 3.75 2.25-3.75-2.25-3.75L7.5 12zm4.5 0l2.25 3.75 2.25-3.75-2.25-3.75L12 12zm4.5 0l-2.25 3.75L18 12l-3.75-3.75L16.5 12zm-9 0l-2.25 3.75L9 12 5.25 8.25 7.5 12z" />
    </svg>
  );
}
