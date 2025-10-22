import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="w-full py-8 md:py-4 px-4 md:px-10 bg-black flex justify-center items-center">
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-6 md:gap-4 text-white w-full max-w-7xl">
                {/* Réseaux sociaux - en haut */}
                <div className="flex gap-4 justify-center md:justify-start order-1">
                    <Link 
                        href="https://github.com/votreusername" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cursor-pointer transition-transform duration-300 hover:scale-110"
                        aria-label="GitHub"
                    >
                        <Image 
                            src="/assets/github.svg" 
                            alt="github" 
                            width={40} 
                            height={40} 
                            className="w-9 h-9 md:w-10 md:h-10"
                            style={{ 
                                filter: 'brightness(0) invert(1)' 
                            }} 
                        />
                    </Link>
                    
                    <Link 
                        href="https://linkedin.com/in/votreprofil" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cursor-pointer transition-transform duration-300 hover:scale-110"
                        aria-label="LinkedIn"
                    >
                        <Image 
                            src="/assets/linkedin.svg" 
                            alt="linkedin" 
                            width={40} 
                            height={40} 
                            className="w-9 h-9 md:w-10 md:h-10"
                            style={{ 
                                filter: 'brightness(0) invert(1)' 
                            }} 
                        />
                    </Link>
                </div>

                {/* Site web - au milieu */}
                <p className="text-sm md:text-base text-center order-2">
                    www.emmavaysse.com
                </p>

                {/* Copyright - en bas */}
                <p className="text-xs md:text-sm text-center md:text-right order-3">
                    &copy; {new Date().getFullYear()} Tous droits réservés.
                </p>
            </div>
        </footer>
    );
}