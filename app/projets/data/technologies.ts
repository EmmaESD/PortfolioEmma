export interface Technology {
  id: string;
  name: string;
  icon: string;
}

export const TECHNOLOGIES: Record<string, Technology> = {
  react: { id: "react", name: "React", icon: "/assets/technos/react.svg" },
  nextjs: { id: "nextjs", name: "Next.js", icon: "/assets/technos/nextjs.svg" },
  tailwind: { id: "tailwind", name: "Tailwind CSS", icon: "/assets/technos/tailwind.svg" },
  threejs: { id: "threejs", name: "Three.js", icon: "/assets/technos/threejs.svg" },
  typescript: { id: "typescript", name: "TypeScript", icon: "/assets/technos/typescript.svg" },
  node: { id: "node", name: "Node.js", icon: "/assets/technos/nodejs.svg" },
};