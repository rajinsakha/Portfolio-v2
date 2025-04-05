"use client";

import { useState } from "react";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

import { SectionHeading } from "@/components/ui/section-heading";
import ProjectCard from "../ui/project-card";

import { categories, projects } from "@/constants/project-data";

export default function Projects() {
  const [filter, setFilter] = useState("All");

  const filteredProjects =
    filter === "All"
      ? projects
      : projects.filter((project) => project.category === filter);

  return (
    <section id="projects" className="py-16 md:py-24">
      <div className="container">
        <SectionHeading title="My Projects" subtitle="Recent work I've done" />

        <div className="flex flex-wrap justify-center gap-2 mt-8 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={filter === category ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(category)}
              className="rounded-full"
            >
              {category}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button asChild>
            <Link href="/projects">
              View All Projects <ArrowUpRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
