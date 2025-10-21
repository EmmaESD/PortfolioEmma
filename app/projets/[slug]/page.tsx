import { notFound } from 'next/navigation';
import { projects } from '../data/projects';
import Image from 'next/image';
import Techno from '@/app/components/Techno';
import ProjectLinks from '@/app/components/ProjectLinks';

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
    <main className="typography flex flex-col gap-20">
      <div className='flex flex-col justify-center items-center'>
        <h1 className='text-xl'>{project.title}</h1>
        <p>{project.date.toLocaleDateString()}</p>
      </div>
      <div>
        <h2 className='text-lg'>Brief</h2>
        <p>{project.longDescription}</p>
      </div>
      <div className='flex justify-between'>
        <Image
          src={project.image}
          alt={project.title}
          width={500}
          height={300}
          className="object-cover"
        />
        <div>
          <h2 className='text-lg'>Technos utilisées</h2>
          <div className='grid grid-cols-4 gap-4'>
            {project.technologies.map((tech) => (
              <div key={tech.id} className='flex items-center mb-2'>
                <Techno icon={tech.icon} name={tech.name} />
              </div>
            ))} 
          </div>
        </div>
        
      </div>
      <div className="flex w-full justify-center">
          <ProjectLinks project={project} />
      </div>
    </main>
  );
}