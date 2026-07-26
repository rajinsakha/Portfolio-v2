"use client";

import type React from "react";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

import { SectionHeading } from "@/components/ui/section-heading";

import { projects } from "@/constants/projects-data";
import ProjectCard from "../ui/project-card";

export default function Projects() {
  return (
    <section
      id="projects"
      className="py-16 md:py-24"
      aria-labelledby="projects-heading"
    >
      <div className="container">
        <SectionHeading
          id="projects-heading"
          title="My Projects"
          subtitle="Recent work I've done"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button asChild>
            <Link href="/projects">
              View All Projects <ArrowUpRight className="ml-2 size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
