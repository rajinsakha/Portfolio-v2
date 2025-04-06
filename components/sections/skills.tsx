"use client";

import type React from "react";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { techCategories } from "@/constants/skills-data";

export default function Skills() {
  return (
    <section
      id="skills"
      className="py-16 md:py-24 bg-muted/30"
      aria-labelledby="skills-heading"
    >
      <div className="container">
        <SectionHeading title="Skills" subtitle="Technologies I work with" />

        <div className="mt-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {techCategories.map((category, index) => (
              <TechCategoryCard
                key={category.title}
                category={category}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TechCategoryCard({
  category,
  index,
}: {
  category: {
    icon: React.ReactNode;
    title: string;
    technologies: { name: string; icon: string }[];
  };
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="h-full">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="p-2 rounded-md bg-primary/10 text-primary">
              {category.icon}
            </div>
            <h3 className="text-xl font-semibold">{category.title}</h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {category.technologies.map((tech) => (
              <div
                key={tech.name}
                className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-muted transition-colors"
              >
                <div className="relative w-10 h-10">
                  <TechLogo name={tech.name} icon={tech.icon} />
                </div>
                <span className="text-sm text-center font-medium">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function TechLogo({ name, icon }: { name: string; icon: string }) {
  // Fallback to placeholder if icon is not available

  console.log(icon);
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* This is a placeholder for the actual tech logos */}
      {/* In a real implementation, you would use actual SVG icons */}
      <div className="w-full h-full rounded-md bg-muted flex items-center justify-center text-primary">
        {name.charAt(0)}
      </div>

      {/* Uncomment this when you have actual icons */}
      {/* <Image
        src={iconSrc || "/placeholder.svg"}
        alt={`${name} logo`}
        fill
        className="object-contain"
        sizes="40px"
      /> */}
    </div>
  );
}
