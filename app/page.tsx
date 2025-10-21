
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
  { content: <p className="text-white">Express</p> },
  { content: <p className="text-white">Docker</p> },
  { content: <p className="text-white">PostgreSQL</p> },
  { content: <p className="text-white">Git</p> },
];

export default async function Home() {
  return (
    <main className="w-full m-0 typography">
      <header className="w-full flex flex-col justify-start gap-44 items-center h-screen">
      <ThreeScene />
        <div className="flex flex-col items-start justify-center mt-20 gap-0.5 z-100">
       
          <h1>PORTFOLIO</h1>
          <div className="flex flex-col items-start justify-center">
            <h2>Emma VAYSSE</h2>
            <h2>DEVELOPPEUSE WEB</h2>
          </div>
        </div>
        <section className="w-full">
            <div className="h-[65px] text-white bg-black pt-5">
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
        <section>
          <div className="flex flex-col p-16 items-center gap-15">
            <h3>Qui suis-je ?</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col justify-center items-start gap-16">
                
                  <div className="flex items-start">
                    <div>
                    <h5>Mes Passions</h5>
                    <p>De la peinture, à l'écriture en passant pas le jardinage, j'aime créer, innover, coder et découvrir de nouvelles disciplines qui me donnent envie chaque jour de me surpasser.</p>
                  </div>
                  <Image
                    src="/assets/arrow.svg"
                    alt="arrow"
                    width={88}
                    height={100}
                    className="float"
                  />
                </div>

                <div className="flex items-start">
                  <div>
                    <h5>Mes Compétences</h5>
                    <p>Je connais les langages de base du web, du front au back. J'ai également des compétences dans le webdesign avec notamment le logiciel figma ou illustrator et photoshop pour d'autres créations. Mes expériences passées m'ont également permis de développer des compétences humaines tel que le travail d'équipe, l'analyse des besoins et la rédaction.</p>
                  </div>
                  <Image
                    src="/assets/arrow.svg"
                    alt="arrow"
                    width={88}
                    height={100}
                    className="transform scale-y-[-1] float"
                  />
                </div>
              </div>
              <div className="flex flex-col justify-start items-center gap-10">
                <Image 
                  src="/assets/whoami.png" 
                  alt="photo de profil" 
                  width={250} 
                  height={355}/>
                  <div className="flex flex-col items-center gap-4">
                    <h5>Mon profil vous intéresse ?</h5>
                    <a href="/assets/CV_vaysse_emma.pdf" className="bg-accent text-white px-[20px] py-[10px] rounded-xl" download> Telecharger mon CV</a>
                    <a href="mailto:&#101;&#109;&#109;&#97;&#46;&#118;&#97;&#121;&#115;&#115;&#101;&#46;&#98;&#64;&#111;&#117;&#116;&#108;&#111;&#111;&#107;&#46;&#102;&#114;" className="bg-accent text-white px-[20px] py-[10px] rounded-xl"> Me contacter</a>
                  </div>
              </div>
              <div className="flex flex-col items-start gap-16">
                <div className="flex items-start">
                <Image
                    src="/assets/arrow.svg"
                    alt="arrow"
                    width={88}
                    height={100}
                    className="transform scale-x-[-1] float "
                  />
                  <div>
                    <h5>Biographie</h5>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                  </div>
                </div>
                <div className="flex items-start">
                <Image
                    src="/assets/arrow.svg"
                    alt="arrow"
                    width={88}
                    height={100}
                    className="transform scale-[-1] float "
                  />
                  <div>
                    <h5>Mes études</h5>
                    <p>Après avoir testé plusieurs disciplines notamment 4 ans de formation d'assistante sociale, j'ai décidé de me reconvertir à 25 ans dans le développement web au sein de l'Ecole Supérieur du Digital à Bordeaux. Cetteécole me permet de développer ma créativité et de repousser mes limites chaque jour.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      <LatestProjects limit={6} />
    </main>
  );
}
