interface ProjectLink {
  live: string;
  github?: string;
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
  // The distinct product surfaces built for this project — a marketing site,
  // the authenticated app, an admin console, the mobile client. `category` says
  // what the project *is*; `surfaces` says how much of it was owned end to end.
  // Draw from the shared vocabulary in `projectSurfaces` so the chips stay a
  // small closed set rather than free text.
  surfaces?: string[];
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


