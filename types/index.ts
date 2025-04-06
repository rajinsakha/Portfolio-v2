export type Project = {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  category: string;
  featured: boolean;
  slug: string;
  links: {
    live: string;
    github: string;
  };
};
