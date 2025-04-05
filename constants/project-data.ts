import { Project } from "@/types";

export const categories = [
  "All",
  "Web Application",
  "Mobile App",
  "SaaS Platform",
];

export const projects: Project[] = [
  {
    id: 1,
    title: "Hajir Khata",
    description:
      "A comprehensive software solution designed to simplify payroll management for businesses of all sizes. Its primary goal is to help organizations effortlessly track daily employee attendance and manage payroll with ease.",
    image: "",
    technologies: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Redux",
      "Rest API",
      "WebSocket",
    ],
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
    title: "Billing System",
    description:
      "A user-friendly web application that simplifies billing and record-keeping for businesses. It includes essential functionalities like inventory management, invoice generation, transaction tracking, and sales reporting.",
    image: "/placeholder.svg?height=600&width=800", // Replace with your actual image path
    technologies: ["Next.js", "Redux", "TypeScript"],
    category: "Web Application",
    featured: false,
    links: {
      live: "#", // Replace with live URL if available
      github: "#", // Replace with GitHub repo if available
      caseStudy: "/projects/billing-system",
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
