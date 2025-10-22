import { Metadata } from "next";
import Image from "next/image";
import ThreeScene from "./components/Circle";
import InfiniteScroll from "./components/Swiper";
import LatestProjects from "./components/LatestProjects";

export const metadata: Metadata = {
  title: "Emma Vaysse - Portfolio",
  description: "Portfolio d&apos;Emma Vaysse - Développeuse Web",
};

const items = [
  { content: <p className="text-white">React</p> },
  { content: <p className="text-white">Next.js</p> },
  { content: <p className="text-white">Tailwind</p> },
  { content: <p className="text-white">TypeScript</p> },
  { content: <p className="text-white">Node.js</p> },
  { content: <p className="text-white">Express</p> },
  { content: <p className="text-white">Docker</p> },
  { content: <p className="text-white">PostgreSQL</p> },
  { content: <p className="text-white">Git</p> },
];

export default async function Home() {
  return (
    <main className="w-full m-0 typography">
      {/* HEADER - Hero Section */}
      <header className="w-full flex flex-col justify-start gap-60 lg:gap-80 items-center min-h-screen">
        <ThreeScene />
        
        {/* Titre principal */}
        <div className="flex flex-col items-center md:items-start justify-center mt-20 md:mt-44 lg:mt-20 gap-0.5 z-10 px-4">
          <h1 className="text-center md:text-left w-full">PORTFOLIO</h1>
          <div className="flex flex-col items-center md:items-start justify-center">
            <h2 className="text-center md:text-left">Emma VAYSSE</h2>
            <h2 className="text-center md:text-left">DEVELOPPEUSE WEB</h2>
          </div>
        </div>
        
        {/* Bande défilante */}
        <section className="w-full">
          <div className="h-[50px] md:h-[65px] text-white bg-black pt-3 md:pt-5">
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
      <section id="qui-suis-je" className="scroll-mt-20">
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
                  <p>De la peinture, à l&apos;écriture en passant par le jardinage, j&apos;adore coder, créer et résoudre des problèmes techniques tout en explorant le design. J&apos;aime voir un projet prendre vie et correspondre aux besoins réels des utilisateurs. La créativité, la logique et l&apos;innovation sont au cœur de tout ce que je fais.</p>
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
                  <p>Je suis une développeuse fullstack polyvalente, à l&apos;aise autant avec le design qu&apos;avec la programmation. J&apos;aime mener mes projets de A à Z, en combinant Next.js, React, Node.js et bien d&apos;autres outils pour créer des expériences web fluides, esthétiques et fonctionnelles. Mon approche est toujours guidée par la rigueur, la créativité et l&apos;écoresponsabilité.</p>
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
                  <p>Je suis une développeuse fullstack passionnée par la création de projets alliant design et technique. Curieuse et organisée, j&apos;aime transformer une idée en expérience concrète, du concept à la mise en ligne. Toujours en quête d&apos;apprentissage, je cherche aujourd&apos;hui une alternance pour poursuivre mon parcours en développement web à l&apos;ESD Bordeaux.</p>
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
                  <p>Actuellement en B3 Développement Web à l&apos;ESD Bordeaux, je me forme à toutes les facettes du développement, du front au back-end, tout en explorant l&apos;UX/UI et les meilleures pratiques du web moderne. Mon parcours m&apos;a permis de travailler sur des projets variés et concrets, où je mets en pratique mes compétences tout en expérimentant de nouvelles technologies.</p>
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