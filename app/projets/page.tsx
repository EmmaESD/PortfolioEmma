import Link from 'next/link';
import { projects } from './data/projects';
import Image from 'next/image';

export default function ProjectsPage() {
  return (
    <main>
         <h1>Mes Projets</h1>
      
      <div className="grid grid-cols-2 gap-8 mt-16">
        {projects.map((project) => (
          <Link 
            key={project.slug} 
            href={`/projets/${project.slug}`}
            className="group"
          >
            <div className="relative h-96 overflow-hidden rounded-xl">
              <Image 
                src={project.images[0]}
                alt={project.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <h3 className="mt-4">{project.title}</h3>
            <p>{project.date.toLocaleDateString()}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}