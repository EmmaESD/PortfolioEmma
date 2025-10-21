import Link from 'next/link';

interface ButtonProjectProps {
  href: string;
  label: string;
}

export default function ButtonProject({ href, label }: ButtonProjectProps) {
  return (
    <Link 
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-full items-center text-center gap-2 bg-accent text-white py-3 rounded-xl font-medium hover:bg-secondary hover:scale-105 transition-all duration-300"
    >
      {label}
    </Link>
  );
}