"use client";

import type React from "react";

import { useState } from "react";
import { motion } from "motion/react";
import { Card, CardContent } from "@/components/ui/card";
import { Github, ExternalLink } from "lucide-react";
import { GooglePlayIcon } from "@/components/ui/google-play-icon";
import { TechBadge } from "@/components/ui/tech-badge";
import { resolveTechIcons } from "@/constants/tech-icons";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import type { ProjectCardData } from "@/types";
import ProjectSurfaces from "@/components/ui/project-surfaces";
import Link from "next/link";

// Full lists run past 20 badges and drown the card; the detail page shows all.
const MAX_CARD_TECHNOLOGIES = 3;

export default function ProjectCard({
  project,
  index,
}: {
  project: ProjectCardData;
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Mobile screenshots are tall portrait frames that crop badly in the card's
  // landscape slot, so those cards stay on their feature graphic and don't cycle.
  const isStaticCard = project.category === "Mobile Application";

  const allImages = isStaticCard
    ? [project.image]
    : // Some projects reuse the card image as their first screenshot; without
      // dedupe the first hover/focus step would show no change.
      Array.from(new Set([project.image, ...project.screenshotUrls]));

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (!isStaticCard) {
      setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
    }
  };

  return (
    <motion.div
      initial={{ y: 8 }}
      whileInView={{ y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card
        className="group relative overflow-hidden h-full flex flex-col transition-[box-shadow,transform] duration-300 hover:shadow-md hover:-translate-y-1 gap-0 py-0 focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-background"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setIsHovered(false)}
        // Keyboard parity with hover. Focus bubbles from each link in the
        // card, so only react when it enters from outside — otherwise tabbing
        // through the card's three links would cycle the image three times.
        onFocus={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
            handleMouseEnter();
          }
        }}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
            setIsHovered(false);
          }
        }}
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

        <CardContent className="px-4 pt-4 pb-3 flex flex-col flex-grow">
          <h3 className="font-display text-2xl font-normal mb-2">{project.title}</h3>
          <ProjectSurfaces surfaces={project.surfaces} className="mb-3" />
          <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
            {project.description}
          </p>

          <div className="mb-4">
            <div className="flex flex-wrap gap-1.5 mt-2">
              {resolveTechIcons(
                project.technologies.slice(0, MAX_CARD_TECHNOLOGIES)
              ).map(({ tech, iconPath }) => (
                <TechBadge key={tech} tech={tech} iconPath={iconPath} />
              ))}
            </div>
          </div>

          <div className="mt-auto flex flex-wrap items-center gap-2">
            {project.links.live && project.links.live !== "#" && (
              <Button
                size="sm"
                variant="ghost"
                asChild
                className="relative z-20"
                aria-label={`Demo — ${project.title}`}
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
            {project.links.playStore && (
              <Button
                size="sm"
                variant="ghost"
                asChild
                className="relative z-20"
                aria-label={`Google Play — ${project.title}`}
              >
                <a
                  href={project.links.playStore}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GooglePlayIcon className="size-4 mr-1" />{" "}
                  Google Play
                </a>
              </Button>
            )}
            {project.links.github && (
              <Button
                size="sm"
                variant="ghost"
                asChild
                className="relative z-20"
                aria-label={`Code — ${project.title}`}
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
            {/* Stretched link makes the whole card navigable. Its ::after
                covers the entire card and, coming last in DOM order, paints
                over its siblings — so the action links above it need a higher
                z-index or the overlay swallows their clicks. */}
            <Button size="sm" variant="default" asChild className="ml-auto">
              <Link
                href={`/projects/${project.slug}`}
                className="after:absolute after:inset-0 after:z-10 after:content-['']"
              >
                View Details
                {/* Visible text stays first so the accessible name contains
                    it (WCAG 2.5.3); the title disambiguates six identical
                    links for screen-reader link lists. */}
                <span className="sr-only"> — {project.title}</span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
