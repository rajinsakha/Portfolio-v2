import { Code, Wrench, Layers } from "lucide-react";
// Tech categories with their respective technologies
export const techCategories = [
  {
    icon: <Code className="size-5" />,
    title: "Languages",
    technologies: [
      { name: "HTML5", icon: "/icons/html5.svg" },
      { name: "CSS3", icon: "/icons/css3.svg" },
      { name: "JavaScript", icon: "/icons/javascript.svg" },
      { name: "TypeScript", icon: "/icons/typescript.svg" },
    ],
  },
  {
    icon: <Layers className="size-5" />,
    title: "Frontend",
    technologies: [
      { name: "React", icon: "/icons/react.svg" },
      { name: "Next.js", icon: "/icons/nextjs.svg" },
      { name: "Tailwind CSS", icon: "/icons/tailwindcss.svg" },
      { name: "Redux", icon: "/icons/redux.svg" },
      { name: "React Query", icon: "/icons/react-query.svg" },
      { name: "Zustand", icon: "/icons/zustand.svg" },
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
      { name: "Git", icon: "/icons/git.svg" },
      { name: "GitHub", icon: "/icons/github.svg" },
      { name: "VS Code", icon: "/icons/vscode.svg" },
      { name: "Webpack", icon: "/icons/webpack.svg" },
      { name: "Jest", icon: "/icons/jest.svg" },
      { name: "Testing Library", icon: "/icons/testing-library.svg" },
    ],
  },
];
