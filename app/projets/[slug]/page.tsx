import { notFound } from 'next/navigation';
import { projects } from '../data/projects';

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
    date: project.date,
  };
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="typography">
        <h1>hello {project.title}</h1>
    </main>
  );
}