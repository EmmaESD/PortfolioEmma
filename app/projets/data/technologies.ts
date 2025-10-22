import css from "styled-jsx/css";

export interface Technology {
  id: string;
  name: string;
  icon: string;
}

export const TECHNOLOGIES: Record<string, Technology> = {
  react: { id: "react", name: "React", icon: "/assets/technos/react.svg" },
  reactnative: { id: "reactnative", name: "React Native", icon: "/assets/technos/react.svg" },
  nextjs: { id: "nextjs", name: "Next.js", icon: "/assets/technos/nextjs.svg" },
  tailwind: { id: "tailwind", name: "Tailwind CSS", icon: "/assets/technos/tailwind.svg" },
  wordpress: { id: "wordpress", name: "WordPress", icon: "/assets/technos/wordpress.svg" },
  typescript: { id: "typescript", name: "TypeScript", icon: "/assets/technos/typescript.svg" },
  node: { id: "node", name: "Node.js", icon: "/assets/technos/nodejs.svg" },
  airtable: { id: "airtable", name: "Airtable", icon: "/assets/technos/airtable.svg" },
  css: { id: "css", name: "CSS3", icon: "/assets/technos/css.svg" },
  docker: { id: "docker", name: "Docker", icon: "/assets/technos/docker.svg" },
  figma: { id: "figma", name: "Figma", icon: "/assets/technos/figma.svg" },
  firebase: { id: "firebase", name: "Firebase", icon: "/assets/technos/firebase.svg" },
  git: { id: "git", name: "Git", icon: "/assets/technos/git.svg" },
  html: { id: "html", name: "HTML5", icon: "/assets/technos/html.svg" },
  illustrator: { id: "illustrator", name: "Adobe Illustrator", icon: "/assets/technos/illustrator.svg" },
  photoshop: { id: "photoshop", name: "Adobe Photoshop", icon: "/assets/technos/photoshop.svg" },
  js: { id: "js", name: "JavaScript", icon: "/assets/technos/js.svg" },
  postgresql: { id: "postgresql", name: "PostgreSQL", icon: "/assets/technos/postgresql.svg" },
  prismic: { id: "prismic", name: "Prismic", icon: "/assets/technos/prismic.svg" },
  ts: { id: "ts", name: "TypeScript", icon: "/assets/technos/ts.svg" },
  vuejs: { id: "vuejs", name: "Vue.js", icon: "/assets/technos/vuejs.svg" },
  prisma: { id: "prisma", name: "Prisma", icon: "/assets/technos/prisma.svg" },
  mapbox: { id: "mapbox", name: "Mapbox", icon: "/assets/technos/mapbox.svg" },
  tiled: { id: "tiled", name: "TiledMap", icon: "/assets/technos/tiled.svg" },
  expo: { id: "expo", name: "Expo", icon: "/assets/technos/expo.svg" },
};