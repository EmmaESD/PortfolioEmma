import { projects } from '@/app/projets/data/projects';
import CardProject from './CardProject';
import Link from 'next/link';

interface LatestProjectsProps {
  limit?: number;
}

export default function LatestProjects({ limit = 4 }: LatestProjectsProps) {
  // Trier par date décroissante et limiter
  const latestProjects = [...projects]
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .slice(0, limit);

  return (
    <section className="py-16 px-8">
      <div className="flex items-center justify-between mb-8">
        <h2>Mes derniers projets</h2>
        <Link 
          href="/projets" 
          className="text-accent hover:text-secondary transition-colors font-medium"
        >
          Voir tous les projets →
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {latestProjects.map((project) => (
          <Link 
            key={project.slug} 
            href={`/projets/${project.slug}`}
          >
            <CardProject project={project} />
          </Link>
        ))}
      </div>
    </section>
  );
}