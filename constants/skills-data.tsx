import { Wrench, Layers, Database } from "lucide-react";
import zustand from "@/assets/icons/zustand-mascot.svg";
import {
  docker,
  expo,
  express,
  git,
  github,
  javascript,
  mongodb,
  nestjs,
  nextjs,
  nodejs,
  postgresql,
  react,
  redis,
  redux,
  tailwindcss,
  typescript,
} from "@/assets/icons";

// TypeScript/JavaScript sit with Tools because they span Frontend and Backend.
export const techCategories = [
  {
    icon: <Layers className="size-5" />,
    title: "Frontend",
    technologies: [
      { name: "React", icon: react },
      { name: "Next.js", icon: nextjs, invertInDark: true },
      { name: "Expo", icon: expo, invertInDark: true },
      { name: "Tailwind CSS", icon: tailwindcss },
      { name: "Redux", icon: redux },
      { name: "Zustand", icon: zustand },
    ],
  },
  {
    icon: <Database className="size-5" />,
    title: "Backend",
    technologies: [
      { name: "Node.js", icon: nodejs },
      { name: "Express", icon: express, invertInDark: true },
      { name: "Nest.js", icon: nestjs },
      { name: "PostgreSQL", icon: postgresql },
      { name: "MongoDB", icon: mongodb },
      { name: "Redis", icon: redis },
    ],
  },
  {
    icon: <Wrench className="size-5" />,
    title: "Languages & Tools",
    technologies: [
      { name: "TypeScript", icon: typescript },
      { name: "JavaScript", icon: javascript },
      { name: "Git", icon: git },
      { name: "GitHub", icon: github, invertInDark: true },
      { name: "Docker", icon: docker },
    ],
  },
];
