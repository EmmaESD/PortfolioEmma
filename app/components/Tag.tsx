import { ProjectCategory } from "../projets/data/projects";

interface TagProps {
    category: ProjectCategory
}

export default function Tag({ category }: TagProps) {
    const styles = {
    école: {
      bg: "bg-tag-ecole",
      text: "École",
    },
    pro: {
      bg: "bg-tag-pro",
      text: "Pro",
    },
    perso: {
      bg: "bg-tag-perso",
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