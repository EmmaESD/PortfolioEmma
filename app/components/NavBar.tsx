'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <nav className="w-full h-fit py-5 px-4 md:px-10 flex items-center justify-between relative z-4 bg-primary mb-10">
        {/* Logo */}
        <Link href="/" className="relative z-50">
          <Image 
            src="/assets/SVG/logo.svg" 
            alt="Logo" 
            width={80} 
            height={80}
            className="w-16 md:w-20 lg:w-[80px]"
          />
        </Link>

        {/* Menu Desktop (caché sur mobile) */}
        <div className="hidden md:flex w-full justify-center gap-6 lg:gap-14 items-center">
          <Link 
            href="/#qui-suis-je" 
            className="relative text-black px-4 lg:px-6 py-3 group text-sm lg:text-base"
          >
            <span 
              className="absolute inset-0 opacity-0 group-hover:opacity-70 transition-opacity duration-300 -z-10"
              style={{ 
                backgroundColor: 'var(--color-accent)',
                filter: 'blur(50px)' 
              }}
            />
            QUI SUIS-JE ?
          </Link>

          <Link 
            href="/projets" 
            className="relative text-black px-4 lg:px-6 py-3 group text-sm lg:text-base"
          >
            <span 
              className="absolute inset-0 opacity-0 group-hover:opacity-70 transition-opacity duration-300 -z-10"
              style={{ 
                backgroundColor: 'var(--color-accent)',
                filter: 'blur(50px)' 
              }}
            />
            MES PROJETS
          </Link>

          <Link 
            href="mailto:&#101;&#109;&#109;&#97;&#46;&#118;&#97;&#121;&#115;&#115;&#101;&#46;&#98;&#64;&#111;&#117;&#116;&#108;&#111;&#111;&#107;&#46;&#102;&#114;" 
            className="text-white px-4 lg:px-[20px] py-2 lg:py-[10px] rounded-xl transition-colors text-sm lg:text-base"
            style={{ 
              backgroundColor: 'var(--color-accent)'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-secondary)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--color-accent)'}
          >
            Me contacter
          </Link>
        </div>

        {/* Bouton Hamburger (visible sur mobile uniquement) */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden relative z-50 w-10 h-10 flex flex-col justify-center items-center gap-1.5"
          aria-label="Menu"
        >
          <span 
            className={`block w-6 h-0.5 transition-all duration-300 ${
              isMenuOpen ? 'rotate-45 translate-y-2 bg-black' : 'bg-black'
            }`}
          />
          <span 
            className={`block w-6 h-0.5 bg-black transition-all duration-300 ${
              isMenuOpen ? 'opacity-0' : 'opacity-100'
            }`}
          />
          <span 
            className={`block w-6 h-0.5 transition-all duration-300 ${
              isMenuOpen ? '-rotate-45 -translate-y-2 bg-black' : 'bg-black'
            }`}
          />
        </button>
      </nav>

      {/* Menu Mobile (overlay fullscreen) */}
      <div 
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
          isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
        style={{ backgroundColor: 'var(--color-primary)' }}
      >
        <div className="flex flex-col items-center justify-center h-full gap-12 px-8">
          <Link 
            href="/#qui-suis-je" 
            className="text-black text-xl font-medium hover:opacity-70 transition-opacity"
            onClick={() => setIsMenuOpen(false)}
            style={{ color: 'var(--color-dark)' }}
          >
            QUI SUIS-JE ?
          </Link>

          <Link 
            href="/projets" 
            className="text-black text-xl font-medium hover:opacity-70 transition-opacity"
            onClick={() => setIsMenuOpen(false)}
            style={{ color: 'var(--color-dark)' }}
          >
            MES PROJETS
          </Link>

          <Link 
            href="mailto:&#101;&#109;&#109;&#97;&#46;&#118;&#97;&#121;&#115;&#115;&#101;&#46;&#98;&#64;&#111;&#117;&#116;&#108;&#111;&#111;&#107;&#46;&#102;&#114;" 
            className="text-white px-8 py-4 rounded-xl text-xl transition-opacity hover:opacity-80"
            onClick={() => setIsMenuOpen(false)}
            style={{ backgroundColor: 'var(--color-accent)' }}
          >
            Me contacter
          </Link>
        </div>
      </div>
    </>
  );
}