import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Metadata } from "next";

// Project data - in a real app, this would come from a database or CMS
const projects = [
  {
    id: 1,
    title: "Hajir Khata",
    description:
      "A comprehensive software solution designed to simplify payroll management for businesses of all sizes. Its primary goal is to help organizations effortlessly track daily employee attendance and manage payroll with ease.",
    fullDescription: `
      Hajir Khata is a comprehensive software solution designed to simplify payroll management for businesses of all sizes. Its primary goal is to help organizations effortlessly track daily employee attendance and manage payroll with ease.
      
      The application features a user-friendly interface that allows managers to monitor employee attendance in real-time, generate detailed reports, and automate payroll calculations based on attendance data. This significantly reduces the time and effort required for manual payroll processing.
      
      Key features include:
      - Real-time attendance tracking
      - Automated payroll calculation
      - Detailed reporting and analytics
      - Employee self-service portal
      - Integration with popular accounting software
    `,
    image: "/placeholder.svg?height=600&width=800",
    technologies: ["React", "TypeScript", "Tailwind CSS", "GraphQL"],
    category: "Web Application",
    featured: true,
    slug: "hajir-khata",
    links: {
      live: "#",
      github: "#",
    },
    challenges: `
      One of the main challenges in developing Hajir Khata was creating a system that could handle various attendance scenarios while maintaining accuracy in payroll calculations. We needed to account for different work schedules, overtime, leaves, and holidays.
      
      Another challenge was ensuring the application remained responsive and performant even with large datasets, as some businesses would need to track hundreds of employees simultaneously.
    `,
    solutions: `
      To address these challenges, we implemented a flexible rule-based system that allows businesses to define their own attendance and payroll policies. This made the application adaptable to different business needs.
      
      For performance optimization, we used efficient data structures and implemented pagination and lazy loading techniques to ensure the application remains responsive even with large datasets.
    `,
    screenshots: [
      {
        url: "/placeholder.svg?height=600&width=800",
        caption: "Dashboard view showing attendance overview",
      },
      {
        url: "/placeholder.svg?height=600&width=800",
        caption: "Employee management interface",
      },
      {
        url: "/placeholder.svg?height=600&width=800",
        caption: "Payroll calculation screen",
      },
    ],
  },
  {
    id: 2,
    title: "TaskFlow",
    description:
      "A project management tool that helps teams organize tasks, track progress, and collaborate effectively. Features include kanban boards, time tracking, and team communication tools.",
    fullDescription: `
      TaskFlow is a comprehensive project management tool designed to help teams organize tasks, track progress, and collaborate effectively. It provides a visual approach to project management through customizable kanban boards, allowing teams to visualize their workflow and identify bottlenecks.
      
      The application includes features for time tracking, which helps teams understand how much time is spent on different tasks and projects. This information can be used for billing clients, estimating future projects, and improving team productivity.
      
      TaskFlow also includes robust team communication tools, allowing team members to discuss tasks, share files, and provide updates without switching to external communication platforms.
    `,
    image: "/placeholder.svg?height=600&width=800",
    technologies: ["Vue.js", "Node.js", "MongoDB", "Socket.io"],
    category: "SaaS Platform",
    featured: false,
    slug: "taskflow",
    links: {
      live: "#",
      github: "#",
    },
    challenges: `
      The main challenge in developing TaskFlow was creating a real-time collaborative environment where multiple team members could work on the same board simultaneously without conflicts or data loss.
      
      Another challenge was designing an intuitive user interface that could accommodate various project management methodologies while remaining simple and easy to use.
    `,
    solutions: `
      We implemented Socket.io to enable real-time updates across all connected clients. This allowed team members to see changes made by others instantly, creating a truly collaborative environment.
      
      For the user interface, we conducted extensive user testing and iterative design to create a clean, intuitive interface that balances functionality with simplicity. We also implemented customizable views to accommodate different project management approaches.
    `,
    screenshots: [
      {
        url: "/placeholder.svg?height=600&width=800",
        caption: "Kanban board view",
      },
      {
        url: "/placeholder.svg?height=600&width=800",
        caption: "Time tracking dashboard",
      },
      {
        url: "/placeholder.svg?height=600&width=800",
        caption: "Team communication interface",
      },
    ],
  },
  {
    id: 3,
    title: "FitTrack",
    description:
      "A fitness tracking application that helps users monitor their workouts, nutrition, and progress. Includes features for creating custom workout plans and setting goals.",
    fullDescription: `
      FitTrack is a comprehensive fitness tracking application designed to help users monitor their workouts, nutrition, and overall progress towards their fitness goals. The app provides a holistic approach to fitness by combining workout tracking, nutrition monitoring, and progress visualization.
      
      Users can create custom workout plans tailored to their specific goals and fitness levels. The app includes a library of exercises with detailed instructions and video demonstrations to ensure proper form and technique.
      
      The nutrition tracking feature allows users to log their meals and track their calorie and macronutrient intake. This helps users understand the relationship between their diet and fitness progress.
    `,
    image: "/placeholder.svg?height=600&width=800",
    technologies: ["React Native", "Firebase", "Redux", "Chart.js"],
    category: "Mobile App",
    featured: false,
    slug: "fittrack",
    links: {
      live: "#",
      github: "#",
    },
    challenges: `
      One of the main challenges in developing FitTrack was creating an intuitive user experience that would encourage consistent use, as fitness tracking apps often suffer from high abandonment rates.
      
      Another challenge was implementing accurate calorie and nutrient calculations for a wide variety of foods and exercises, while also allowing for customization to accommodate different user needs.
    `,
    solutions: `
      To improve user engagement, we implemented gamification elements such as achievements, streaks, and challenges. We also designed the app to minimize the friction of logging workouts and meals, making it as quick and easy as possible.
      
      For nutrition tracking, we integrated a comprehensive food database with detailed nutritional information. We also implemented barcode scanning functionality to make food logging even easier.
    `,
    screenshots: [
      {
        url: "/placeholder.svg?height=600&width=800",
        caption: "Workout tracking interface",
      },
      {
        url: "/placeholder.svg?height=600&width=800",
        caption: "Nutrition logging screen",
      },
      {
        url: "/placeholder.svg?height=600&width=800",
        caption: "Progress visualization dashboard",
      },
    ],
  },
  {
    id: 4,
    title: "E-Commerce Platform",
    description:
      "A fully-featured e-commerce platform with product listings, shopping cart, user authentication, and payment processing integration.",
    fullDescription: `
      This e-commerce platform provides a complete solution for online retail businesses. It features a responsive design that works seamlessly across desktop and mobile devices, ensuring a consistent shopping experience for all users.
      
      The platform includes comprehensive product management capabilities, allowing store owners to easily add, edit, and organize their product catalog. Products can be categorized, tagged, and featured to improve discoverability.
      
      The shopping cart and checkout process is streamlined to minimize friction and reduce cart abandonment. Integration with popular payment processors ensures secure and convenient transactions.
    `,
    image: "/placeholder.svg?height=600&width=800",
    technologies: ["Next.js", "Stripe", "MongoDB", "Tailwind CSS"],
    category: "Web Application",
    featured: false,
    slug: "ecommerce",
    links: {
      live: "#",
      github: "#",
    },
    challenges: `
      A significant challenge in developing this e-commerce platform was creating a seamless and secure checkout process that would minimize cart abandonment while ensuring the security of customer payment information.
      
      Another challenge was optimizing the performance of the product catalog, especially for stores with large inventories, to ensure fast loading times and a smooth browsing experience.
    `,
    solutions: `
      We implemented a multi-step checkout process with progress indicators and form validation to guide users through the checkout flow. We also integrated with trusted payment processors to handle sensitive payment information securely.
      
      For performance optimization, we implemented server-side rendering, pagination, and image optimization techniques. We also used caching strategies to reduce database queries and improve response times.
    `,
    screenshots: [
      {
        url: "/placeholder.svg?height=600&width=800",
        caption: "Product catalog page",
      },
      {
        url: "/placeholder.svg?height=600&width=800",
        caption: "Product detail view",
      },
      {
        url: "/placeholder.svg?height=600&width=800",
        caption: "Checkout process",
      },
    ],
  },
];

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;

  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: "Project Not Found",
      description: "The requested project could not be found.",
    };
  }

  return {
    title: `${project.title} | Project Case Study`,
    description: project.description,
    openGraph: {
      title: `${project.title} | Project Case Study`,
      description: project.description,
      images: [
        {
          url: project.image,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="py-16 md:py-24">
      <div className="container">
        {/* Back button */}
        <div className="mb-8">
          <Button variant="ghost" asChild>
            <Link href="/#projects">
              <ArrowLeft className="mr-2 size-4" /> Back to Projects
            </Link>
          </Button>
        </div>

        {/* Project header */}
        <div className="mb-12">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <Badge className="bg-primary/90 text-primary-foreground">
              {project.category}
            </Badge>
            {project.featured && (
              <Badge
                variant="outline"
                className="bg-primary/10 text-primary border-primary/20"
              >
                Featured Project
              </Badge>
            )}
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {project.title}
          </h1>

          <p className="text-xl text-muted-foreground max-w-3xl">
            {project.description}
          </p>
        </div>

        {/* Main image */}
        <div className="relative w-full h-[50vh] mb-12 rounded-xl overflow-hidden">
          <Image
            src={project.image || "/placeholder.svg"}
            alt={`${project.title} - Main Screenshot`}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>

        {/* Project details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-4">Overview</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              {project.fullDescription.split("\n\n").map((paragraph, i) => (
                <p key={i} className="mb-4 text-muted-foreground">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-4">Challenges</h2>
              <div className="prose prose-lg dark:prose-invert max-w-none">
                {project.challenges.split("\n\n").map((paragraph, i) => (
                  <p key={i} className="mb-4 text-muted-foreground">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-4">Solutions</h2>
              <div className="prose prose-lg dark:prose-invert max-w-none">
                {project.solutions.split("\n\n").map((paragraph, i) => (
                  <p key={i} className="mb-4 text-muted-foreground">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>

          <div>
            <div className="bg-card rounded-xl p-6 border border-border/50 sticky top-24">
              <h3 className="text-xl font-bold mb-4">Project Details</h3>

              <div className="space-y-6">
                <div>
                  <h4 className="text-sm uppercase text-muted-foreground font-medium mb-2">
                    Technologies
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="outline">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm uppercase text-muted-foreground font-medium mb-2">
                    Links
                  </h4>
                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      asChild
                    >
                      <a
                        href={project.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="mr-2 size-4" /> Live Demo
                      </a>
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      asChild
                    >
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="mr-2 size-4" /> Source Code
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Screenshots */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Project Screenshots</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {project.screenshots.map((screenshot, index) => (
              <div
                key={index}
                className="rounded-xl overflow-hidden border border-border/50"
              >
                <div className="relative aspect-video">
                  <Image
                    src={screenshot.url || "/placeholder.svg"}
                    alt={screenshot.caption}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="p-4 bg-card">
                  <p className="text-sm text-muted-foreground">
                    {screenshot.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Next/Prev navigation */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-border pt-8">
          <Button variant="ghost" asChild>
            <Link href="/#projects">
              <ArrowLeft className="mr-2 size-4" /> Back to All Projects
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
