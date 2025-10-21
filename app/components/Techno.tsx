import Image from "next/image";

interface TechnoProps {
    name: string;
    icon: string;
}

export default function Techno({ name, icon }: TechnoProps) {
  return (
    <div className="relative group/techno">
      <Image 
        src={icon}
        alt={name}
        width={32}
        height={32}
        className="hover:scale-110 transition-transform cursor-pointer"
      />
      <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover/techno:opacity-100 bg-dark text-white text-xs px-2 py-1 rounded whitespace-nowrap transition-opacity pointer-events-none">
        {name}
      </span>
    </div>
  );
}