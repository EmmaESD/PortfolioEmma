import { url } from 'inspector';
import Image from 'next/image';
import Link from 'next/link';

export default function NavBar() {
  return (
    <nav className="w-full h-fit py-5 px-10 flex items-center">
      <Link href="/"><Image src="/assets/SVG/logo.svg" alt="Logo" width={80} height={80} /> </Link>
      <div className="flex w-full justify-center gap-14 items-center">
        <Link 
          href="/#qui-suis-je" 
          className="relative text-black px-6 py-3 group"
        >
          <span 
            className="absolute inset-0 bg-accent opacity-0 group-hover:opacity-70 transition-opacity duration-300 -z-10"
            style={{ filter: 'blur(50px)' }}
          />
          QUI SUIS-JE ?
        </Link>

        <Link 
          href="/projets" 
          className="relative text-black px-6 py-3 group"
        >
          <span 
            className="absolute inset-0 bg-accent opacity-0 group-hover:opacity-70 transition-opacity duration-300 -z-10"
            style={{ filter: 'blur(50px)' }}
          />
          MES PROJETS
        </Link>

        {/* Pas de blur sur le bouton contact */}
        <Link 
          href="mailto:&#101;&#109;&#109;&#97;&#46;&#118;&#97;&#121;&#115;&#115;&#101;&#46;&#98;&#64;&#111;&#117;&#116;&#108;&#111;&#111;&#107;&#46;&#102;&#114;" 
          className="bg-accent text-white px-[20px] py-[10px] rounded-xl hover:bg-secondary transition-colors"
        >
          Me contacter
        </Link>
      </div>
    </nav>
  );
}