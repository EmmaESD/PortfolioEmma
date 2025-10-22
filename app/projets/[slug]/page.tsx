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
    <main className="typography flex flex-col gap-8 md:gap-12 lg:gap-20 px-4 md:px-8 lg:px-30 py-8 md:py-12 lg:py-16">
      {/* En-tête du projet */}
      <div className='flex flex-col justify-center items-center gap-2 md:gap-4'>
        <h1 className='text-2xl md:text-3xl lg:text-xl text-center'>{project.title}</h1>
        <p className='text-sm md:text-base'>{project.date.toLocaleDateString()}</p>
        <Tag category={project.category} />
      </div>

      {/* Brief */}
      <div className='max-w-4xl mx-auto w-full'>
        <h2 className='text-xl md:text-2xl lg:text-lg mb-4'>Brief</h2>
        <p className='text-sm md:text-base leading-relaxed'>{project.longDescription}</p>
      </div>

      {/* Image et Technos */}
      <div className='flex flex-col lg:flex-row gap-8 lg:gap-12 lg:justify-between items-start w-full max-w-7xl mx-auto'>
        {/* Image */}
        <div className='w-full lg:w-1/2'>
          <Image
            src={project.image}
            alt={project.title}
            width={600}
            height={500}
            className="w-full h-auto object-cover rounded-2xl"
          />
        </div>

        {/* Technos */}
        <div className='flex flex-col gap-4 w-full lg:w-1/2'>
          <h2 className='text-xl md:text-2xl lg:text-lg'>Technos utilisées</h2>
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