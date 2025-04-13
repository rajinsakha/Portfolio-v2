"use client";

import type React from "react";

import { SectionHeading } from "@/components/ui/section-heading";

import { techCategories } from "@/constants/skills-data";
import TechCategoryCard from "./tech-category-card";

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
