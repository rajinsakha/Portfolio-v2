import type { Project, ProjectCardData } from "@/types";

export function toProjectCardData(project: Project): ProjectCardData {
  return {
    id: project.id,
    title: project.title,
    description: project.description,
    image: project.image,
    technologies: project.technologies,
    category: project.category,
    surfaces: project.surfaces,
    slug: project.slug,
    links: project.links,
    screenshotUrls: project.screenshots.map((screenshot) => screenshot.url),
  };
}
