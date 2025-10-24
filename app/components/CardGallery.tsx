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
  
  const originalUrl = aiImage.context?.original_url || null
  const poeticDesc = aiImage.poetic_description || 
                   aiImage.context?.poetic_description ||
                   null
  
  return (
    <div className="group border-2 border-accent rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all bg-white">
      {/* Image avec overlay au hover */}
      <div className="relative w-full h-80 overflow-hidden bg-gray-100">
        <Image
          src={showOriginal && originalUrl ? originalUrl : aiImage.secure_url}
          alt={showOriginal ? "Dessin original" : "Création IA"}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Overlay avec texte poétique au hover */}
        {poeticDesc && !showOriginal && (
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
            <p className="text-white italic text-sm leading-relaxed">
              &quot;{poeticDesc}&quot;
            </p>
          </div>
        )}

        {/* Badge IA ou Original */}
        <div className="absolute top-4 right-4">
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
            onClick={() => setShowOriginal(!showOriginal)}
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