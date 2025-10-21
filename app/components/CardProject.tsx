import Image from "next/image";
import { Project } from "../projets/data/projects";
import Tag from "./Tag";

interface ProjectProps {
    project: Project;
}

export default function CardProject({ project }: ProjectProps) {
    return (
        <div className="group relative h-50 overflow-hidden rounded-xl cursor-pointer typography p-2">
            {/* Image */}
            <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
            />

            <div className="absolute flex item-start justify-center z-20">
                <Tag category={project.category} />
            </div>
            
            {/* Overlay sombre au hover */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/70 transition-all duration-300" />
            
            {/* Contenu qui apparaît au hover */}
            <div className="absolute inset-0 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                <h5 className="text-white text-center">{project.title}</h5>
            </div>
        </div>
    );
}