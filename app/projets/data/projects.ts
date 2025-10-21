import { TECHNOLOGIES, Technology } from "./technologies";

export type ProjectCategory = "pro" | "perso" | "école";

export interface Project {
  slug: string;
  title: string;
  date: Date;
  category: ProjectCategory;
  longDescription: string;
  technologies: Technology[];
  demoUrl?: string;
  githubUrl?: string;
  figmaUrl?: string;
  image: string;
}

export const projects: Project[] = [
  {
    slug: "portfolio-3d",
    title: "Portfolio 3D Interactif",
    date: new Date("2024-01-01"),
    longDescription: "Lorem ipsum dolor sit amet...",
    technologies: [TECHNOLOGIES.react, TECHNOLOGIES.tailwind],
    demoUrl: "https://example.com",
    githubUrl: "https://github.com/...",
    figmaUrl: "https://figma.com/...",
    image: "/assets/projects-img/test.png",
    category: "perso",
  },
];