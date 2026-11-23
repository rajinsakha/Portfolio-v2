import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

import { SectionHeading } from "@/components/ui/section-heading";

import { homeProjectSlugs, projects } from "@/constants/projects-data";
import { toProjectCardData } from "@/lib/projects";
import ProjectCard from "../ui/project-card";

// Server component on purpose: it reads the full project data here and hands
// the client-side cards only the fields they render.
const cardProjects = homeProjectSlugs
  .map((slug) => projects.find((project) => project.slug === slug))
  .filter((project): project is NonNullable<typeof project> => Boolean(project))
  .map(toProjectCardData);

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
          title="Projects"
          subtitle="Web and mobile products I've shipped"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {cardProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button asChild>
            <Link href="/projects">
              View all {projects.length} projects <ArrowUpRight className="ml-2 size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
