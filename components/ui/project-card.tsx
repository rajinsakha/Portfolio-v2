"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Github, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Button } from "./button";
import Link from "next/link";
import { Project } from "@/types";
export default function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card
        className="overflow-hidden h-full flex flex-col"
        onMouseEnter={() => setIsHovered(true)}
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
              src={project.image || "/placeholder.svg"}
              alt={`${project.title} Screenshot`}
              width={600}
              height={300}
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          </motion.div>

          <div className="absolute top-3 left-3">
            <Badge className="bg-primary/90 text-primary-foreground">
              {project.category}
            </Badge>
          </div>
        </div>

        <CardContent className="p-5 flex flex-col flex-grow">
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
            <Button size="sm" variant="ghost" asChild>
              <Link
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="h-4 w-4 mr-1" /> Demo
              </Link>
            </Button>
            <Button size="sm" variant="ghost" asChild>
              <Link
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-4 w-4 mr-1" /> Code
              </Link>
            </Button>
            <Button size="sm" variant="default" className="ml-auto" asChild>
              <Link href={project.links.caseStudy}>Details</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
