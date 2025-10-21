import Link from 'next/link';
import { projects } from './data/projects';
import CardProject from '../components/CardProject';

export default function ProjectsPage() {
  return (
    <main className="p-16 typography">
      <h1 className='text-2xl'>Mes Projets</h1>
      <p>Découvrez mes projets persos et d'école !</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
        {projects.map((project) => (
          <Link 
            key={project.slug} 
            href={`/projets/${project.slug}`}
          >
            <CardProject project={project} />
          </Link>
        ))}
      </div>
    </main>
  );
}