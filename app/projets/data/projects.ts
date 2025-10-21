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
    slug: "residence-arsenal-royal",
    title: "Résidence Arsenal Royal",
    date: new Date("2025-08-29"),
    longDescription: "Durant mon stage de 4 mois au sein de la Résidence de l'arsenal royal, j'ai eu l'opportunité de refaire entièrement le site web de l'entreprise. De la conception de la maquette sur figma à la mise en ligne, j'ai pu expérimenter l'organisation d'un projet mené de A à Z. J'ai développé le site sous wordpress en utilisant le thème builder Elementor. Ce fut une expérience enrichissante qui m'a permis de mieux comprendre les besoins des clients et de perfectionner mes compétences en développement web.",
    technologies: [TECHNOLOGIES.wordpress, TECHNOLOGIES.figma, TECHNOLOGIES.illustrator, TECHNOLOGIES.photoshop],
    demoUrl: "https://www.residencearsenalroyal.fr/",
    figmaUrl: "https://www.figma.com/proto/Meu0BAo6622jXvXvgPrW78/Arsenal-Royal?page-id=165%3A3554&node-id=308-5910&p=f&viewport=497%2C291%2C0.03&t=KOOv4uK6a0G9gc2c-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=308%3A5910",
    image: "/assets/projects-img/residence-arsenal-royal.png",
    category: "pro",
  },
  {
    slug: "blogflix",
    title: "blogflix",
    date: new Date("2025-01-12"),
    longDescription: "Blogflix est un projet scolaire dont l’objectif était de se familiariser avec Prismic, un CMS headless moderne permettant de gérer du contenu de manière flexible et dynamique.Pour ce projet, nous devions reproduire une direction artistique (DA) existante, afin de concentrer nos efforts sur l’intégration technique et la gestion du contenu plutôt que sur la conception graphique.",
    technologies: [TECHNOLOGIES.prismic, TECHNOLOGIES.figma, TECHNOLOGIES.nextjs, TECHNOLOGIES.tailwind, TECHNOLOGIES.ts, TECHNOLOGIES.airtable],
    demoUrl: "https://blogflix-app.vercel.app/",
    githubUrl: "https://github.com/EmmaESD/blogflix_app",
    image: "/assets/projects-img/blogflix.png",
    category: "école",
  },
  {
    slug: "CarLink",
    title: "CarLink",
    date: new Date("2025-03-29"),
    longDescription: "CarLink est une application web fictive de location de véhicules électriques, développée dans le cadre d’un partiel. Conçue avec Next.js, Mapbox et Prisma, elle vise à offrir une expérience utilisateur fluide et intuitive pour la planification d’itinéraires et la réservation de véhicules. L’intégration de Mapbox permet d’afficher en temps réel les trajets et la disponibilité des véhicules, tandis que Prisma et Docker garantissent une structure de données robuste et un environnement de développement maîtrisé. Ce projet m’a permis de mettre en pratique mes compétences en développement full-stack et en intégration d’API cartographiques, tout en travaillant sur un concept aligné avec les enjeux actuels de mobilité durable.",
    technologies: [ TECHNOLOGIES.nextjs, TECHNOLOGIES.tailwind, TECHNOLOGIES.ts, TECHNOLOGIES.docker, TECHNOLOGIES.postgresql, TECHNOLOGIES.prisma, TECHNOLOGIES.mapbox],
    demoUrl: "https://mapbox-woad.vercel.app/",
    githubUrl: "https://github.com/EmmaESD/partiel_next_mapbox_2025",
    image: "/assets/projects-img/carlink.png",
    category: "école",
  },
  {
    slug: "paper-fighter",
    title: "Paper Fighter",
    date: new Date("2025-10-17"),
    longDescription: "Paper Fighter est un jeu vidéo multijoueur développé en équipe de trois sur cinq jours, dans le cadre d’un projet d’école. Le concept est simple : être le dernier en vie dans une arène remplie de coffres bonus et de pièges mortels. Le jeu a été conçu avec Phaser 3 et Next.js pour le gameplay, Colyseus pour la gestion du mode multijoueur en temps réel, Easystar.js pour l’implémentation de bots intelligents, et TiledMap pour la création des environnements. Ce projet nous a permis d’explorer la programmation orientée jeu, la logique réseau et la collaboration technique sous contrainte de temps.",
    technologies: [ TECHNOLOGIES.nextjs, TECHNOLOGIES.ts, TECHNOLOGIES.tiled],
    githubUrl: "https://github.com/mdorizon/Paper-Fighter",
    image: "/assets/projects-img/paper-fighter.png",
    category: "école",
  },
];