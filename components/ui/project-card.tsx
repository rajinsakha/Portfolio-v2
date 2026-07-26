"use client";

import type React from "react";

import { useState } from "react";
import { motion } from "motion/react";
import { Card, CardContent } from "@/components/ui/card";
import { Github, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import type { Project } from "@/types";
import Link from "next/link";

export default function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Mobile screenshots are tall portrait frames that crop badly in the card's
  // landscape slot, so those cards stay on their feature graphic and don't cycle.
  const isStaticCard = project.category === "Mobile Application";

  const allImages = isStaticCard
    ? [project.image]
    : [project.image, ...project.screenshots.map((screenshot) => screenshot.url)];

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (!isStaticCard) {
      setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card
        className="group relative overflow-hidden h-full flex flex-col transition-[box-shadow,transform] duration-300 hover:shadow-md hover:-translate-y-1 py-3 focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-background"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative h-48 overflow-hidden">
          <motion.div
            animate={{
              scale: isHovered ? 1.05 : 1,
            }}
            transition={{ duration: 0.4 }}
          >
            <Image
              src={allImages[currentImageIndex] || "/placeholder.svg"}
              alt={`${project.title} - Project Screenshot`}
              width={600}
              height={300}
              className="object-cover w-full h-full"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          </motion.div>
        </div>

        <CardContent className="px-4 py-3 flex flex-col flex-grow">
          <h3 className="text-xl font-bold mb-2">{project.title}</h3>
          <p className="text-muted-foreground text-sm mb-4 line-clamp-3 flex-grow">
            {project.description}
          </p>

          <div className="mb-4">
            <div className="flex flex-wrap gap-1.5 mt-2">
              {project.technologies.map((tech: string) => (
                <Badge key={tech} variant="outline" className="text-xs">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          <div className="relative z-10 flex gap-2 mt-auto">
            {project.links.live && project.links.live !== "#" && (
              <Button
                size="sm"
                variant="ghost"
                asChild
                aria-label={`View ${project.title} demo`}
              >
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="size-4 mr-1" aria-hidden="true" />{" "}
                  Demo
                </a>
              </Button>
            )}
            {project.links.github && (
              <Button
                size="sm"
                variant="ghost"
                asChild
                aria-label={`View ${project.title} source code`}
              >
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="size-4 mr-1" aria-hidden="true" /> Code
                </a>
              </Button>
            )}
            {/* Stretched link makes the whole card navigable while keeping the
                action links above independently clickable. */}
            <Button size="sm" variant="default" asChild className="ml-auto">
              <Link
                href={`/projects/${project.slug}`}
                className="after:absolute after:inset-0 after:content-['']"
                aria-label={`View ${project.title} details`}
              >
                View Details
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
