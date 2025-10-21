import { ProjectCategory } from "../projets/data/projects";

interface TagProps {
    category: ProjectCategory
}

export default function Tag({ category }: TagProps) {
    const styles = {
    école: {
      bg: "bg-blue-500",
      text: "École",
    },
    pro: {
      bg: "bg-green-500",
      text: "Pro",
    },
    perso: {
      bg: "bg-purple-500",
      text: "Perso",
    },
  };

  const { bg, text } = styles[category];

  return (
    <span className={`${bg} text-white text-xs font-semibold px-3 py-1 rounded-full uppercase`}>
      {text}
    </span>
  );
}