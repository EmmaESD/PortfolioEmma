import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="w-full py-4 px-4 md:px-10 bg-black flex justify-center items-center">
            <div className="flex justify-between text-white w-full">
                <p>
                    &copy; {new Date().getFullYear()} Tous droits réservés.
                </p>
                <p>www.emmavaysse.com</p>
                <div className="flex gap-4">
                    <Link 
                        href="https://github.com/votreusername" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cursor-pointer transition-transform duration-300 hover:scale-110"
                    >
                        <Image 
                            src="/assets/github.svg" 
                            alt="github" 
                            width={40} 
                            height={40} 
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
                    >
                        <Image 
                            src="/assets/linkedin.svg" 
                            alt="linkedin" 
                            width={40} 
                            height={40} 
                            style={{ 
                                filter: 'brightness(0) invert(1)' 
                            }} 
                        />
                    </Link>
                </div>
            </div>
        </footer>
    );
}