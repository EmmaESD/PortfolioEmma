import { TECHNOLOGIES, Technology } from "./technologies";
export interface Project {
  slug: string;
  title: string;
  date: Date;
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
    technologies: [TECHNOLOGIES.react],
    demoUrl: "https://example.com",
    githubUrl: "https://github.com/...",
    figmaUrl: "https://figma.com/...",
    image: "/assets/profil.png",
  },
];