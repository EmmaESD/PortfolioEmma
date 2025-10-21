export interface Project {
  slug: string;
  title: string;
  date: Date;
  longDescription: string;
  technologies: string[];
  images: string[];
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
    technologies: ["Next.js", "Three.js", "Tailwind CSS"],
    images: ["/projects/portfolio/hero.jpg", "/projects/portfolio/1.jpg"],
    demoUrl: "https://example.com",
    githubUrl: "https://github.com/...",
    figmaUrl: "https://figma.com/...",
    image: "/projects/portfolio/hero.jpg",
  },
];