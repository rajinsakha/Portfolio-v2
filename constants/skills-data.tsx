import { Code, Wrench, Layers } from "lucide-react";
import {
  css3,
  git,
  github,
  html5,
  javascript,
  nextjs,
  react,
  redux,
  tailwindcss,
  typescript,
} from "@/assets/icons";
// Tech categories with their respective technologies
export const techCategories = [
  {
    icon: <Code className="size-5" />,
    title: "Languages",
    technologies: [
      { name: "HTML5", icon: html5 },
      { name: "CSS3", icon: css3 },
      { name: "JavaScript", icon: javascript },
      { name: "TypeScript", icon: typescript },
    ],
  },
  {
    icon: <Layers className="size-5" />,
    title: "Frameworks & Libraries",
    technologies: [
      { name: "React", icon: react },
      { name: "Next.js", icon: nextjs },
      { name: "Tailwind CSS", icon: tailwindcss },
      { name: "Redux", icon: redux },
    ],
  },
  //   {
  //     icon: <Database className="size-5" />,
  //     title: "Backend",
  //     technologies: [
  //       { name: "Node.js", icon: "/icons/nodejs.svg" },
  //       { name: "Express.js", icon: "/icons/expressjs.svg" },
  //       { name: "MongoDB", icon: "/icons/mongodb.svg" },
  //       { name: "Firebase", icon: "/icons/firebase.svg" },
  //       { name: "REST API", icon: "/icons/api.svg" },
  //       { name: "GraphQL", icon: "/icons/graphql.svg" },
  //     ],
  //   },
  {
    icon: <Wrench className="size-5" />,
    title: "Tools",
    technologies: [
      { name: "Git", icon: git },
      { name: "GitHub", icon: github },
      // { name: "Webpack", icon: "/icons/webpack.svg" },
      // { name: "Jest", icon: "/icons/jest.svg" },
      // { name: "Testing Library", icon: "/icons/testing-library.svg" },
    ],
  },
];
