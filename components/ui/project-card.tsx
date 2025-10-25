"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Github, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Button } from "./button";
import { Project } from "@/types";
import { useRouter } from "next/navigation";

export default function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/projects/${project.slug}`);
  };

  const handleLinkClick = (e: React.MouseEvent, url: string) => {
    e.stopPropagation(); // Prevent the card click from triggering
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card
        className="overflow-hidden h-full flex flex-col transition-all duration-300 hover:shadow-md hover:-translate-y-1 cursor-pointer py-3"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleCardClick}
      >
        <div className="relative h-48 overflow-hidden">
          <motion.div
            animate={{
              scale: isHovered ? 1.05 : 1,
            }}
            transition={{ duration: 0.4 }}
          >
            <Image
              src={project.image || "/placeholder.svg"}
              alt={`${project.title} - Project Screenshot`}
              width={600}
              height={300}
              className="object-cover w-full h-full"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          </motion.div>

          {/* <div className="absolute top-3 left-3">
            <Badge className="bg-primary/90 text-primary-foreground">
              {project.category}
            </Badge>
          </div> */}
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

          <div className="flex gap-2 mt-auto">
            <Button
              size="sm"
              variant="ghost"
              onClick={(e) => handleLinkClick(e, project.links.live)}
              aria-label={`View ${project.title} demo`}
              className="cursor-pointer"
            >
              <ExternalLink className="size-4 mr-1" /> Demo
            </Button>
            {project.links.github !== undefined && (
              <Button
                size="sm"
                variant="ghost"
                onClick={(e) => handleLinkClick(e, project.links.github || "")}
                aria-label={`View ${project.title} source code`}
                className="cursor-pointer"
              >
                <Github className="size-4 mr-1" /> Code
              </Button>
            )}
            <Button
              size="sm"
              variant="default"
              className="ml-auto cursor-pointer"
            >
              View Details
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
