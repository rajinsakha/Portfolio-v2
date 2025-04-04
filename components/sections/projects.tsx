"use client";

import { useState } from "react";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

import { SectionHeading } from "@/components/ui/section-heading";
import ProjectCard from "../ui/project-card";

// Project data
const projects = [
  {
    id: 1,
    title: "Hajir Khata",
    description:
      "A comprehensive software solution designed to simplify payroll management for businesses of all sizes. Its primary goal is to help organizations effortlessly track daily employee attendance and manage payroll with ease.",
    image: "",
    technologies: ["React", "TypeScript", "Tailwind CSS", "GraphQL"],
    category: "Web Application",
    featured: true,
    links: {
      live: "#",
      github: "#",
      caseStudy: "/projects/hajir-khata",
    },
  },
  {
    id: 2,
    title: "TaskFlow",
    description:
      "A project management tool that helps teams organize tasks, track progress, and collaborate effectively. Features include kanban boards, time tracking, and team communication tools.",
    image: "/placeholder.svg?height=600&width=800",
    technologies: ["Vue.js", "Node.js", "MongoDB", "Socket.io"],
    category: "SaaS Platform",
    featured: false,
    links: {
      live: "#",
      github: "#",
      caseStudy: "/projects/taskflow",
    },
  },
  {
    id: 3,
    title: "FitTrack",
    description:
      "A fitness tracking application that helps users monitor their workouts, nutrition, and progress. Includes features for creating custom workout plans and setting goals.",
    image: "/placeholder.svg?height=600&width=800",
    technologies: ["React Native", "Firebase", "Redux", "Chart.js"],
    category: "Mobile App",
    featured: false,
    links: {
      live: "#",
      github: "#",
      caseStudy: "/projects/fittrack",
    },
  },
  {
    id: 4,
    title: "E-Commerce Platform",
    description:
      "A fully-featured e-commerce platform with product listings, shopping cart, user authentication, and payment processing integration.",
    image: "/placeholder.svg?height=600&width=800",
    technologies: ["Next.js", "Stripe", "MongoDB", "Tailwind CSS"],
    category: "Web Application",
    featured: false,
    links: {
      live: "#",
      github: "#",
      caseStudy: "/projects/ecommerce",
    },
  },
];

// Filter categories
const categories = ["All", "Web Application", "Mobile App", "SaaS Platform"];

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
