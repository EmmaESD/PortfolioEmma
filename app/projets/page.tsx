import Link from 'next/link';
import { projects } from './data/projects';
import CardProject from '../components/CardProject';

export default function ProjectsPage() {
  return (
    <main className=" typography px-10 md:px-16 lg:px-20 mb-10 mt-20 min-h-screen">

      <div className="relative flex flex-col gap-6 items-center">
        {/* Cercle blur en arrière-plan */}
        <div 
          className="absolute inset-0 z-10 flex items-center justify-center"
          style={{
            width: '350px',
            height: '350px',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div 
            className="w-full h-full rounded-full blur-3xl opacity-50"
            style={{ backgroundColor: '#F48B7C' }}
          />
        </div>

        <h1 className="text-2xl relative z-10">Mes projets</h1>
        <p className="relative z-10 text-center">Découvrez mes projets persos et d&apos;école !</p>
      </div>

      
      <div className="z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
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