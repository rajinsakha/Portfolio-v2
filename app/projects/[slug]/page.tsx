import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Code2, ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Metadata } from "next";
import { projects } from "@/constants/projects-data";
import { ProjectScreenshotsGallery } from "@/components/project-screenshots-gallery";
import { SITE_URL } from "@/lib/site";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

// Pre-render every project page at build time for faster crawling and indexing.
export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;

  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: "Project Not Found",
      description: "The requested project could not be found.",
      robots: { index: false, follow: false },
    };
  }

  const canonical = `/projects/${project.slug}`;

  return {
    title: `${project.title} | Case Study`,
    description: project.description,
    keywords: [...project.technologies, project.category, "Rajin Sakha"],
    alternates: {
      canonical,
    },
    openGraph: {
      title: `${project.title} | Case Study`,
      description: project.description,
      url: canonical,
      type: "article",
      images: [
        {
          url: project.image,
          width: 1200,
          height: 630,
          alt: `${project.title} — ${project.category} by Rajin Sakha`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | Case Study`,
      description: project.description,
      images: [project.image],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const projectUrl = `${SITE_URL}/projects/${project.slug}`;

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: project.title,
    description: project.description,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: projectUrl,
    image: `${SITE_URL}${project.image}`,
    author: {
      "@type": "Person",
      name: "Rajin Sakha",
      url: SITE_URL,
    },
    keywords: project.technologies.join(", "),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Projects",
        item: `${SITE_URL}/projects`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: project.title,
        item: projectUrl,
      },
    ],
  };

  return (
    <article className="py-16 md:py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="container">
        {/* Back button */}
        <div className="mb-8">
          <Button variant="ghost" asChild>
            <Link href="/#projects" className="hover:text-primary">
              <ArrowLeft className="mr-2 size-4 " /> Back to Projects
            </Link>
          </Button>
        </div>

        {/* Project header */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <Badge className="bg-primary-fill text-primary-foreground">
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

          <h1 className="font-display text-5xl md:text-6xl font-normal mb-6">
            {project.title}
          </h1>

          <p className="text-xl text-muted-foreground max-w-3xl">
            {project.description}
          </p>
        </div>

        {/* Main image */}
        <div className="relative w-full h-auto">
          <Image
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            width={800}
            height={1000}
            className="w-full h-auto object-contain"
          />
        </div>

        {/* Project details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 my-8">
          <div className="lg:col-span-2">
            <h2 className="font-display text-3xl font-normal mb-4">Overview</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              {project.fullDescription.split("\n\n").map((paragraph, i) => (
                <p key={i} className="mb-4 text-muted-foreground">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-8">
              <h2 className="font-display text-3xl font-normal mb-4">Key Features</h2>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                {project.keyFeatures.map((feature, index) => (
                  <li key={index} className="flex gap-2 items-center">
                    <Code2 className="size-4" /> {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <div className="bg-card rounded-xl p-6 border border-border/50 sticky top-24">
              <h3 className="text-xl font-bold mb-4">Project Details</h3>

              <div className="space-y-6">
                <div>
                  <h4 className="font-mono text-xs uppercase tracking-wider text-muted-foreground mb-2">
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

                {(project.links.live && project.links.live !== "#") ||
                  project.links.github ? (
                  <div>
                    <h4 className="font-mono text-xs uppercase tracking-wider text-muted-foreground mb-2">
                      Links
                    </h4>
                    <div className="space-y-2">
                      {project.links.live && project.links.live !== "#" && (
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
                      )}
                      {project.links.github && (
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
                      )}
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>

        <ProjectScreenshotsGallery
          screenshots={project.screenshots}
          fallbackImage={project.image}
        />

        {/* Next/Prev navigation */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-border pt-8">
          <Button variant="ghost" asChild>
            <Link href="/#projects">
              <ArrowLeft className="mr-2 size-4" /> Back to All Projects
            </Link>
          </Button>
        </div>
      </div>
    </article>
  );
}
