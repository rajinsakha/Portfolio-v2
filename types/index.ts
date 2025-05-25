interface ProjectLink {
  live: string;
  github: string;
}

interface ProjectScreenshot {
  url: string;
  caption: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  fullDescription: string;
  keyFeatures: string[]
  image: string;
  technologies: string[];
  category: string;
  featured: boolean;
  slug: string;
  links: ProjectLink;
  challenges: string;
  solutions: string;
  screenshots: ProjectScreenshot[];
}

export interface IContactItem {
  icon: React.ReactNode;
  title: string;
  content: string;
  href?: string;
}
