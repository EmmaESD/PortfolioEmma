import Image from "next/image"
import { useState } from "react"

interface GalleryCardProps {
  aiImage: {
    public_id: string
    secure_url: string
    created_at: string
    context?: {
      original_url?: string
      poetic_description?: string
    }
    poetic_description?: string
  }
}

export function GalleryCard({ aiImage }: GalleryCardProps) {
  const [showOriginal, setShowOriginal] = useState(false)
  const [showOverlay, setShowOverlay] = useState(false)
  
  const originalUrl = aiImage.context?.original_url || null
  const poeticDesc = aiImage.poetic_description || 
                   aiImage.context?.poetic_description ||
                   null
  
  return (
    <div className="group border-2 border-accent rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all bg-white">
      {/* Image avec overlay au hover/click */}
      <div 
        className="relative w-full h-80 overflow-hidden bg-gray-100 cursor-pointer"
        onClick={() => setShowOverlay(!showOverlay)}
      >
        <Image
          src={showOriginal && originalUrl ? originalUrl : aiImage.secure_url}
          alt={showOriginal ? "Dessin original" : "Création IA"}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Icône "Doigt qui clique" - Visible uniquement sur mobile quand overlay fermé */}
        {poeticDesc && !showOriginal && !showOverlay && (
          <div className="absolute bottom-4 left-4 pointer-events-none md:hidden">
            <div className="bg-black/60 rounded-full p-3 backdrop-blur-sm animate-bounce">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6 text-white" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" 
                />
              </svg>
            </div>
          </div>
        )}
        
        {/* Overlay avec texte poétique - hover desktop / click mobile */}
        {poeticDesc && !showOriginal && (
          <div className={`absolute inset-0 bg-black/60 flex items-end p-6 transition-opacity duration-300
            ${showOverlay ? 'opacity-100' : 'opacity-0'} 
            md:group-hover:opacity-100`}>
            <p className="text-white italic text-sm leading-relaxed">
              &quot;{poeticDesc}&quot;
            </p>
          </div>
        )}

        {/* Badge IA ou Original */}
        <div className="absolute top-4 right-4 pointer-events-none">
          <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-lg ${
            showOriginal 
              ? 'bg-tag-pro text-white' 
              : 'bg-tag-perso text-white'
          }`}>
            {showOriginal ? 'Original' : 'IA'}
          </span>
        </div>
      </div>

      {/* Bouton Switch */}
      {originalUrl && (
        <div className="p-4 flex justify-center border-t border-gray-100">
          <button
            onClick={() => {
              setShowOriginal(!showOriginal)
              setShowOverlay(false)
            }}
            className="px-6 py-3 bg-accent text-white rounded-lg transition-all hover:scale-105 flex items-center gap-2 cursor-pointer"
          >
            {showOriginal ? 'Voir la version IA' : 'Voir l\'original'}
          </button>
        </div>
      )}

      {/* Date en bas */}
      <div className="px-4 pb-4 text-center">
        <p className="text-xs text-gray-500">
          {new Date(aiImage.created_at).toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          })}
        </p>
      </div>
    </div>
  )
}