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
  {
    slug: "grain-de-voyage",
    title: "Grain de Voyage",
    date: new Date("2024-11-05"),
    longDescription: "Dans le cadre d’un projet de web design, nous avons travaillé sur le brief d’une entreprise fictive afin de concevoir la maquette complète de son site web. L’objectif était de répondre précisément aux besoins et attentes du client tout en respectant sa charte graphique et son positionnement de marque. Réalisé sur Figma, ce projet m’a permis de mettre en pratique mes compétences en UX/UI design, en recherche utilisateur et en création d’interfaces cohérentes et esthétiques. Ce travail a également été l’occasion d’apprendre à analyser un brief client et à traduire une vision stratégique en expérience digitale claire et engageante.",
    technologies: [ TECHNOLOGIES.figma],
    figmaUrl: "https://www.figma.com/proto/wDDWaCtoYEFmhPn3hI1gKy/Grain-de-Voyage?page-id=5%3A97&node-id=60-1116&viewport=699%2C312%2C0.11&t=eIEbeCSekA3Mqvyh-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=60%3A1116",
    image: "/assets/projects-img/grain-de-voyage.png",
    category: "école",
  },
  {
    slug: "portfolio",
    title: "Mon Portfolio",
    date: new Date("2025-10-25"),
    longDescription: "Mon nouveau portfolio a été entièrement repensé et développé avec Next.js afin de mieux refléter mes compétences en design et en développement web. J’ai voulu créer un espace qui me ressemble — à la fois sobre, intuitif et moderne — mettant en avant mes projets, mon parcours et ma polyvalence entre création visuelle et technique. Ce projet m’a permis de combiner mes savoir-faire en UX/UI design et en intégration front-end, tout en explorant les possibilités offertes par Next.js pour offrir une navigation fluide, rapide et optimisée. Plus qu’un simple site vitrine, ce portfolio est une véritable vitrine interactive de mon évolution, de mes inspirations et de ma démarche de développeuse fullstack.",
    technologies: [ TECHNOLOGIES.figma, TECHNOLOGIES.nextjs, TECHNOLOGIES.tailwind, TECHNOLOGIES.ts],
    githubUrl: "https://github.com/EmmaESD/PortfolioEmma",
    image: "/assets/projects-img/portfolio.png",
    category: "perso",
  },
];