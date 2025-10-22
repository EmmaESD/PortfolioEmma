import { notFound } from 'next/navigation';
import { projects } from '../data/projects';
import Image from 'next/image';
import Techno from '@/app/components/Techno';
import ProjectLinks from '@/app/components/ProjectLinks';
import Tag from '@/app/components/Tag';
import LatestProjects from '@/app/components/LatestProjects';

// Génère les routes statiques au build
export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

// Métadonnées dynamiques pour le SEO
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug);
  
  if (!project) return { title: 'Projet non trouvé' };
  
  return {
    title: `${project.title}`,
  };
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="typography flex flex-col gap-8 md:gap-12 lg:gap-20 px-4 md:px-8 lg:px-20 py-8 md:py-12 lg:py-16 w-full">
      {/* En-tête du projet */}
      <div className='flex flex-col justify-center items-center gap-2 md:gap-4 w-full'>
        <h1 className='text-2xl md:text-3xl lg:text-xl'>{project.title}</h1>
        <p className='text-sm md:text-base'>{project.date.toLocaleDateString()}</p>
        <Tag category={project.category} />
      </div>

      {/* Brief */}
      <div className='w-full'>
        <h2 className='text-xl md:text-2xl lg:text-lg mb-4'>Brief</h2>
        <p className='text-sm md:text-base leading-relaxed'>{project.longDescription}</p>
      </div>

      {/* Image et Technos */}
      <div className='flex flex-col lg:flex-row gap-8 lg:gap-30 items-start w-full'>
        {project.demoVideo ? (
                <div className="w-full rounded-2xl overflow-hidden shadow-lg">
                  <video 
                    className="w-full h-auto"
                    controls
                    preload="metadata"
                    poster={project.image}
                  >
                    <source src={project.demoVideo} type="video/mp4" />
                    Votre navigateur ne supporte pas la lecture de vidéos.
                  </video>
                </div>
              ) : (
                <div 
                  className="w-full h-[400px] lg:h-[400px] rounded-2xl bg-cover bg-center shadow-lg"
                  style={{ backgroundImage: `url(${project.image})` }}
                />
              )}
        

        {/* Technos */}
        <div className='flex flex-col gap-4 w-full'>
          <h2 className='text-xl md:text-2xl lg:text-lg text-center'>Technos utilisées</h2>
          <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
            {project.technologies.map((tech) => (
              <div key={tech.id} className='flex items-center justify-center'>
                <Techno icon={tech.icon} name={tech.name} />
              </div>
            ))} 
          </div>
        </div>
      </div>

      {/* Liens du projet */}
      <div className="flex w-full justify-center">
        <ProjectLinks project={project} />
      </div>

      {/* Derniers projets */}
      <div className="w-full">
        <LatestProjects limit={4} />
      </div>
    </main>
  );
}