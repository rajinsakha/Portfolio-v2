export type Project = {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  category: string;
  featured: boolean;
  links: {
    live: string;
    github: string;
    caseStudy: string;
  };
};
