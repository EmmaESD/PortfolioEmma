import { Metadata } from "next";
import Image from "next/image";
import ThreeScene from "./components/Circle";
import InfiniteScroll from "./components/Swiper";
import LatestProjects from "./components/LatestProjects";

export const metadata: Metadata = {
  title: "Emma Vaysse - Portfolio",
  description: "Portfolio d'Emma Vaysse - Développeuse Web",
};

const items = [
  { content: <p className="text-white">React</p> },
  { content: <p className="text-white">Next.js</p> },
  { content: <p className="text-white">Tailwind</p> },
  { content: <p className="text-white">TypeScript</p> },
  { content: <p className="text-white">Node.js</p> },
  { content: <p className="text-white">Docker</p> },
  { content: <p className="text-white">PostgreSQL</p> },
  { content: <p className="text-white">Git</p> },
  { content: <p className="text-white">Wordpress</p> },
  { content: <p className="text-white">React Native</p> },
  { content: <p className="text-white">PHP</p> },
  { content: <p className="text-white">NestJS</p> },
  { content: <p className="text-white">Prismic</p> },
  { content: <p className="text-white">Figma</p> },
  { content: <p className="text-white">Illustrator</p> },
  { content: <p className="text-white">Photoshop</p> },
  { content: <p className="text-white">Firebase</p> },
  { content: <p className="text-white">Prisma</p> },
];

export default async function Home() {
  return (
    <main className="w-full m-0 typography">
      {/* HEADER - Hero Section */}
      <header className="w-full flex flex-col justify-start gap-80 lg:gap-80 items-center lg:min-h-screen">
        <ThreeScene />
        
        {/* Titre principal */}
        <div className="flex flex-col items-center md:items-start justify-center mt-30 md:mt-44 lg:mt-20 gap-0.5 z-10 px-4">
          <h1 className="text-center md:text-left w-full">PORTFOLIO</h1>
          <div className="flex flex-col items-center md:items-start justify-center">
            <h2 className="text-center md:text-left">Emma VAYSSE</h2>
            <h2 className="text-center md:text-left">DEVELOPPEUSE WEB</h2>
          </div>
        </div>
        
        {/* Bande défilante */}
        <section className="w-full z-10">
          <div className="h-[50px] md:h-[65px] text-white bg-black pt-3 md:pt-5 z-10">
            <InfiniteScroll
              items={items}
              isTilted={true}
              autoplay={true}
              autoplaySpeed={0.6}
              autoplayDirection="left"
              pauseOnHover={true}
            />
          </div>
        </section>
      </header>

      {/* SECTION QUI SUIS-JE */}
      <section id="qui-suis-je" className="mt-20">
        <div className="flex flex-col p-4 md:px-8 lg:px-16 items-center gap-8 lg:gap-15">
          <h3 className="text-center">Qui suis-je ?</h3>
          
          {/* Grid responsive */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-4 w-full">
            
            {/* COLONNE 1 - Passions & Compétences */}
            <div className="flex flex-col justify-center items-start gap-8 lg:gap-16 order-2 lg:order-1">
              {/* Passions */}
              <div className="flex flex-col md:flex-row items-start gap-4">
                <div className="flex-1">
                  <h5>Mes Passions</h5>
                  <p>Entre peinture, écriture et jardinage, j&apos;aime avant tout créer. Le code est pour moi une autre forme d&apos;expression : une manière de résoudre des problèmes tout en donnant vie à des idées. J&apos;aime concevoir des projets utiles, esthétiques et centrés sur l&apos;humain, où la créativité et la logique se rejoignent naturellement.</p>                
                </div>
                <Image
                  src="/assets/arrow.svg"
                  alt="arrow"
                  width={88}
                  height={100}
                  className="float hidden md:block w-16 lg:w-[88px]"
                />
              </div>

              {/* Compétences */}
              <div className="flex flex-col md:flex-row items-start gap-4">
                <div className="flex-1">
                  <h5>Mes Compétences</h5>
                  <p>Polyvalente et autonome, je maîtrise aussi bien le front-end que le back-end, avec des technologies comme React, Next.js ou Node.js. J&apos;accorde une grande importance à la qualité du code, à l&apos;accessibilité et à la cohérence visuelle. Mon objectif : créer des expériences web performantes, durables et agréables à utiliser, où la technique sert réellement le design et les besoins des utilisateurs.</p>                
                </div>
                <Image
                  src="/assets/arrow.svg"
                  alt="arrow"
                  width={88}
                  height={100}
                  className="transform scale-y-[-1] float hidden md:block w-16 lg:w-[88px]"
                />
              </div>
            </div>

            {/* COLONNE 2 - Photo & CTA (au centre sur desktop, en premier sur mobile) */}
            <div className="flex flex-col justify-start items-center gap-6 lg:gap-10 order-1 lg:order-2">
              <Image 
                src="/assets/whoami.png" 
                alt="photo de profil" 
                width={250} 
                height={355}
                className="w-40 md:w-52 lg:w-[250px] h-auto"
              />
              <div className="flex flex-col items-center gap-4">
                <h5 className="text-center">Mon profil vous intéresse ?</h5>
                <a 
                  href="/assets/CV_vaysse_emma.pdf" 
                  className="bg-accent text-white px-5 py-2 lg:px-[20px] lg:py-[10px] rounded-xl hover:bg-secondary transition-colors text-sm lg:text-base" 
                  download
                >
                  Télécharger mon CV
                </a>
              </div>
            </div>

            {/* COLONNE 3 - Biographie & Études */}
            <div className="flex flex-col items-start gap-8 lg:gap-16 order-3">
              {/* Biographie */}
              <div className="flex flex-col md:flex-row items-start gap-4">
                <Image
                  src="/assets/arrow.svg"
                  alt="arrow"
                  width={88}
                  height={100}
                  className="transform scale-x-[-1] float hidden md:block w-16 lg:w-[88px]"
                />
                <div className="flex-1">
                  <h5>Biographie</h5>
                  <p>Développeuse fullstack passionnée, j&apos;aime concevoir des projets qui allient esthétique, utilité et performance. Curieuse et rigoureuse, je prends plaisir à transformer une idée en produit concret, de la maquette à la mise en ligne. Toujours en quête de nouveaux défis, je recherche aujourd&apos;hui une alternance pour poursuivre mon parcours en développement web à l&apos;ESD Bordeaux.</p>                
                </div>
              </div>

              {/* Études */}
              <div className="flex flex-col md:flex-row items-start gap-4">
                <Image
                  src="/assets/arrow.svg"
                  alt="arrow"
                  width={88}
                  height={100}
                  className="transform scale-[-1] float hidden md:block w-16 lg:w-[88px]"
                />
                <div className="flex-1">
                  <h5>Mes études</h5>
                  <p>Avant de me lancer dans le développement web, j&apos;ai étudié pendant quatre ans pour devenir assistante sociale. Cette expérience m&apos;a appris l&apos;écoute, l&apos;analyse des besoins et la collaboration — des qualités que je mets aujourd&apos;hui au service de la création numérique. À 25 ans, j&apos;ai choisi de me reconvertir vers un domaine qui me passionne : le développement web.</p>                
                </div>
              </div>
            </div>
          </div>
          <LatestProjects limit={4} />
        </div>
        
      </section>
      
      
    </main>
  );
}