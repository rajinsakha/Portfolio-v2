import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

// Project data - in a real app, this would come from a database or CMS
const projects = [
  {
    id: 1,
    title: "Hajir Khata",
    description:
      "A comprehensive software solution designed to simplify payroll management for businesses of all sizes. Its primary goal is to help organizations effortlessly track daily employee attendance and manage payroll with ease.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-vBBf2iedhfLFgK4Vp2DzCvu7n3Kq0j.png",
    technologies: ["React", "TypeScript", "Tailwind CSS", "GraphQL"],
    category: "Web Application",
    featured: true,
    slug: "hajir-khata",
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
  },
];

export const metadata = {
  title: "Projects | Portfolio",
  description: "Explore my portfolio of web and mobile application projects.",
};

export default function ProjectsPage() {
  return (
    <main className="py-16 md:py-24">
      <div className="container">
        <div className="mb-8">
          <Button variant="ghost" asChild>
            <Link href="/">
              <ArrowLeft className="mr-2 size-4" /> Back to Home
            </Link>
          </Button>
        </div>

        <div className="mb-12 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">My Projects</h1>
          <p className="text-xl text-muted-foreground">
            Explore my portfolio of web and mobile application projects. Each
            project represents unique challenges and solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Link
              key={project.id}
              href={`/projects/${project.slug}`}
              className="block h-full"
            >
              <Card className="overflow-hidden h-full flex flex-col transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                <div className="relative aspect-video">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={`${project.title} - Project Screenshot`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

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

                  <div className="flex flex-wrap gap-1.5 mt-auto">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                    {project.technologies.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{project.technologies.length - 3} more
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
