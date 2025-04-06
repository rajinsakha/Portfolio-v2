import { Project } from "@/types";

export const categories = ["All", "Web Apps", "Websites", "Mobile Apps"];

export const projects: Project[] = [
  {
    id: 1,
    title: "Hajir Khata",
    description:
      "A comprehensive software solution designed to simplify payroll management for businesses of all sizes. Its primary goal is to help organizations effortlessly track daily employee attendance and manage payroll with ease.",
    image: "",
    technologies: ["React", "TypeScript", "Tailwind CSS", "GraphQL"],
    category: "Web Application",
    featured: true,
    slug: "hajir-khata",
    links: {
      live: "#",
      github: "#",
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
    slug: "taskflow",
    links: {
      live: "#",
      github: "#",
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
    slug: "fittrack",
    links: {
      live: "#",
      github: "#",
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
    slug: "ecommerce",
    links: {
      live: "#",
      github: "#",
    },
  },
];
