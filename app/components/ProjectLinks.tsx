import { Project } from '@/app/projets/data/projects';
import ButtonProject from './ButtonProject';

interface ProjectLinksProps {
  project: Project;
}

export default function ProjectLinks({ project }: ProjectLinksProps) {
  // Si aucun lien n'est disponible, ne rien afficher
  if (!project.demoUrl && !project.githubUrl && !project.figmaUrl) {
    return null;
  }

  return (
    <section className="flex w-full">
      
      <div className="flex justify-between w-full gap-20">
        {/* Bouton 1 : Lien démo */}
        {project.demoUrl && (
          <ButtonProject 
            href={project.demoUrl}
            label="Voir le projet"
          />
        )}
        
        {/* Bouton 2 : GitHub */}
        {project.githubUrl && (
          <ButtonProject 
            href={project.githubUrl}
            label="Github"
          />
        )}
        
        {/* Bouton 3 : Figma */}
        {project.figmaUrl && (
          <ButtonProject 
            href={project.figmaUrl}
            label="Maquette Figma"
          />
        )}
      </div>
    </section>
  );
}