import Link from 'next/link';

export default function NavBar() {
  return (
    <nav className="w-full h-fit py-5">
          <div className="flex w-full justify-center gap-14 items-center">
          <Link href="/" className=" text-black">
            QUI SUIS-JE ?
          </Link>
            <Link 
              href="/projects" 
              className="text-black "
            >
              MES PROJETS            
            </Link>
            
          </div>
    </nav>
  );
}