'use client'

import { useRef, useState, useEffect } from 'react'
import { ReactSketchCanvas, ReactSketchCanvasRef } from 'react-sketch-canvas'
import Image from 'next/image'

interface CloudinaryImage {
  public_id: string
  secure_url: string
  created_at: string
  width: number
  height: number
  context?: {
    custom?: {
      original_drawing?: string
      original_url?: string
      poetic_description?: string
    }
    poetic_description?: string
  }
}

export default function DrawCanvas() {
  const canvasRef = useRef<ReactSketchCanvasRef>(null)
  const [uploading, setUploading] = useState(false)
  const [transforming, setTransforming] = useState(false)
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null)
  const [aiImageUrl, setAiImageUrl] = useState<string | null>(null)
  const [gallery, setGallery] = useState<CloudinaryImage[]>([])
  const [galleryAI, setGalleryAI] = useState<CloudinaryImage[]>([])
  const [loadingGallery, setLoadingGallery] = useState(true)
  const [loadingGalleryAI, setLoadingGalleryAI] = useState(true)
  const [poeticDescription, setPoeticDescription] = useState<string | null>(null)

  useEffect(() => {
    loadGalleries()
  }, [])

  const loadGalleries = async () => {
    await Promise.all([
      loadGallery(),
      loadGalleryAI()
    ])
  }

  const loadGallery = async () => {
    try {
      const response = await fetch('/api/gallery')
      const data = await response.json()
      
      if (data.success) {
        setGallery(data.images)
      }
    } catch (error) {
      console.error('Erreur chargement galerie:', error)
    } finally {
      setLoadingGallery(false)
    }
  }

  const loadGalleryAI = async () => {
    try {
      const response = await fetch('/api/gallery-ai')
      const data = await response.json()
      
      if (data.success) {
        setGalleryAI(data.images)
      }
    } catch (error) {
      console.error('Erreur chargement galerie IA:', error)
    } finally {
      setLoadingGalleryAI(false)
    }
  }

  // Définir les styles disponibles
  const styles = {
    realistic: {
      name: "🎨 Réaliste",
      prompt: "realistic artistic style with natural colors, professional shading and depth"
    },
    watercolor: {
      name: "💧 Aquarelle",
      prompt: "beautiful watercolor painting style with soft, flowing colors and delicate brush strokes"
    },
    manga: {
      name: "📚 Manga",
      prompt: "Japanese manga/anime art style with bold lines, expressive features and vibrant colors"
    },
    oil: {
      name: "🖌️ Peinture à l'huile",
      prompt: "classical oil painting style with rich textures, deep colors and masterful brushwork"
    },
    pixel: {
      name: "🎮 Pixel Art",
      prompt: "retro pixel art style with clean pixels, vibrant colors and video game aesthetic"
    },
    sketch: {
      name: "✏️ Croquis raffiné",
      prompt: "refined pencil sketch with professional shading, cross-hatching and artistic details"
    },
    abstract: {
      name: "🌈 Abstrait",
      prompt: "modern abstract art with bold shapes, vibrant colors and creative composition"
    },
    cyberpunk: {
      name: "🌃 Cyberpunk",
      prompt: "futuristic cyberpunk style with neon colors, digital effects and sci-fi atmosphere"
    }
  }

  type StyleKey = keyof typeof styles
  const [selectedStyle, setSelectedStyle] = useState<StyleKey>('realistic')

  const handleClear = () => {
    canvasRef.current?.clearCanvas()
    setUploadedUrl(null)
    setAiImageUrl(null)
  }

  const handleSave = async () => {
    setUploading(true)
    
    try {
      const image = await canvasRef.current?.exportImage('png')
      
      if (!image) {
        alert('Erreur lors de l\'export du dessin')
        return
      }

      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image }),
      })

      const data = await response.json()

      if (data.success) {
        setUploadedUrl(data.url)
        alert('Dessin sauvegardé avec succès ! ✅')
        await loadGallery()
      } else {
        alert('Erreur lors de la sauvegarde')
      }
    } catch (error) {
      console.error('Erreur:', error)
      alert('Erreur lors de la sauvegarde')
    } finally {
      setUploading(false)
    }
  }

  const handleTransform = async () => {
    if (!uploadedUrl) {
      alert('Veuillez d\'abord sauvegarder votre dessin')
      return
    }

    setTransforming(true)
    setPoeticDescription(null)
    
    try {
      const response = await fetch('/api/transform', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          imageUrl: uploadedUrl,
          style: styles[selectedStyle].prompt
        }),
      })

      const data = await response.json()

      if (data.success) {
        setAiImageUrl(data.aiUrl)
        setPoeticDescription(data.poeticDescription)
        alert(`Transformation réussie ! 🎨✨\n\nGénérations restantes : ${data.remaining || '?'}`)
        await loadGalleryAI()
      } else {
        alert('Erreur lors de la transformation : ' + data.error)
      }
    } catch (error) {
      console.error('Erreur:', error)
      alert('Erreur lors de la transformation IA')
    } finally {
      setTransforming(false)
    }
  }

  return (
    <>
      <div className="border-4 border-gray-800 rounded-lg shadow-xl overflow-hidden bg-white">
        <ReactSketchCanvas
          ref={canvasRef}
          strokeWidth={3}
          strokeColor="#000000"
          canvasColor="#FFFFFF"
          width="800px"
          height="600px"
        />
      </div>

      <div className="flex gap-4">
        <button 
          onClick={handleClear}
          className="px-6 py-3 cursor-pointer bg-gray-500 text-white rounded-lg font-semibold transition"
          disabled={uploading || transforming}
        >
          Effacer
        </button>
        <button 
          onClick={handleSave}
          className="px-6 py-3 cursor-pointer bg-blue-500 text-white rounded-lg font-semibold transition disabled:opacity-50"
          disabled={uploading || transforming}
        >
          {uploading ? 'Upload en cours...' : 'Sauvegarder'}
        </button>
        <button 
          onClick={handleTransform}
          className="px-6 py-3 cursor-pointer bg-purple-600 text-white rounded-lg font-semibold transition disabled:opacity-50"
          disabled={!uploadedUrl || uploading || transforming}
        >
          {transforming ? '✨ Transformation...' : '🤖 Transformer avec IA'}
        </button>
      </div>

      {uploadedUrl && (
        <div className="mt-4 p-4 bg-green-100 rounded-lg">
          <p className="text-green-800 font-semibold">✅ Dessin sauvegardé !</p>
          <a 
            href={uploadedUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 underline text-sm"
          >
            Voir sur Cloudinary
          </a>
        </div>
      )}

      {uploadedUrl && (
        <div className="w-full max-w-4xl mt-8 p-6 from-purple-50 to-pink-50 rounded-xl border-2 border-purple-200">
          <h3 className="text-2xl font-bold text-center mb-4 text-purple-800">
            ✨ Transforme ton dessin avec l'IA
          </h3>
          <p className="text-center text-gray-600 mb-6">
            Choisis un style artistique pour ta création
          </p>

          {/* Grille de boutons de styles */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            {(Object.entries(styles) as [StyleKey, { name: string; prompt: string }][]).map(([key, style]) => (
              <button
                key={key}
                onClick={() => setSelectedStyle(key)}
                className={`px-4 py-3 rounded-lg font-semibold transition-all ${
                  selectedStyle === key
                    ? 'bg-purple-600 text-white shadow-lg scale-105'
                    : 'bg-white text-gray-700 hover:bg-purple-100 border-2 border-purple-200'
                }`}
                disabled={transforming}
              >
                {style.name}
              </button>
            ))}
          </div>

          {/* Bouton de transformation */}
          <button 
            onClick={handleTransform}
            className="w-full px-6 py-4 cursor-pointer from-purple-600 to-pink-600 text-white rounded-lg font-bold text-lg transition-all hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={transforming}
          >
            {transforming ? '✨ Transformation en cours...' : `🤖 Transformer en ${styles[selectedStyle].name}`}
          </button>

          <p className="text-center text-sm text-gray-500 mt-4">
            Style sélectionné : <span className="font-semibold text-purple-600">{styles[selectedStyle].name}</span>
          </p>
        </div>
      )}


      {aiImageUrl && (
        <div className="mt-4 p-6 bg-purple-100 rounded-lg border-2 border-purple-300">
          <p className="text-purple-800 font-bold mb-4">✨ Transformation IA réussie !</p>
          <div className="relative w-full h-96">
            <Image
              src={aiImageUrl}
              alt="Version IA"
              fill
              className="object-contain rounded-lg"
            />
          </div>
            {poeticDescription && (
                        <div className="mb-4 p-4 bg-white rounded-lg shadow-md border-l-4 border-purple-500">
                          <p className="text-gray-700 italic text-base leading-relaxed">
                            "{poeticDescription}"
                          </p>
                        </div>
                      )}

          <a 
            href={aiImageUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-purple-600 underline text-sm mt-2 inline-block"
          >
            Voir en grand
          </a>
        </div>
        )}
          

      {/* GALERIE IMAGES IA AVEC ORIGINAUX */}
      <div className="w-full max-w-7xl mt-16">
        <h2 className="text-3xl font-bold mb-6 text-center from-purple-600 to-pink-600 bg-clip-text text-transparent">
          ✨ Galerie des transformations IA
        </h2>
        
        {loadingGalleryAI ? (
          <p className="text-center text-gray-500">Chargement de la galerie IA...</p>
        ) : galleryAI.length === 0 ? (
          <p className="text-center text-gray-500">Aucune création IA pour le moment. Transforme ton premier dessin ! 🎨</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {galleryAI.map((aiImage: any) => {
              const originalUrl = aiImage.context?.original_url || null
              const poeticDesc = aiImage.poetic_description || 
                               aiImage.context?.poetic_description ||
                               null
              return (
                <div 
                  key={aiImage.public_id}
                  className="border-2 border-purple-300 rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition bg-white p-4"
                >
                  <h3 className="text-lg font-bold text-purple-700 mb-4 text-center">
                    Avant → Après
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    {/* Dessin original */}
                    <div className="space-y-2">
                      <p className="text-xs text-gray-600 font-semibold text-center">✏️ Original</p>
                      {originalUrl ? (
                        <div className="relative w-full h-48 border-2 border-gray-300 rounded-lg overflow-hidden">
                          <Image
                            src={originalUrl}
                            alt="Dessin original"
                            fill
                            className="object-contain"
                          />
                        </div>
                      ) : (
                        <div className="w-full h-48 border-2 border-gray-300 rounded-lg bg-gray-100 flex items-center justify-center">
                          <p className="text-gray-400 text-sm">Original non disponible</p>
                        </div>
                      )}
                    </div>

                    {/* Image IA */}
                    <div className="space-y-2">
                      <p className="text-xs text-purple-600 font-semibold text-center">🤖 IA</p>
                      <div className="relative w-full h-48 border-2 border-purple-300 rounded-lg overflow-hidden">
                        <Image
                          src={aiImage.secure_url}
                          alt="Création IA"
                          fill
                          className="object-contain"
                        />
                      </div>
                    </div>
                  </div>

                  {poeticDesc && (
                    <div className="px-4 pb-4">
                      <div className="p-3 from-purple-50 to-pink-50 rounded-lg border-l-4 border-purple-400">
                        <p className="text-sm text-gray-700 italic leading-relaxed">
                          "{poeticDesc}"
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="mt-4 text-center">
                    <p className="text-sm text-gray-500 mb-2">
                      {new Date(aiImage.created_at).toLocaleDateString('fr-FR', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                    <div className="flex gap-2 justify-center">
                      {originalUrl && (
                        <a 
                          href={originalUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline text-sm"
                        >
                          Voir l'original
                        </a>
                      )}
                      <span className="text-gray-400">•</span>
                      <a 
                        href={aiImage.secure_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-purple-600 hover:underline text-sm"
                      >
                        Voir la version IA
                      </a>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* GALERIE DESSINS ORIGINAUX */}
      <div className="w-full max-w-6xl mt-16 mb-12">
        <h2 className="text-3xl font-bold mb-6 text-center">
          🎨 Galerie des dessins originaux
        </h2>
        
        {loadingGallery ? (
          <p className="text-center text-gray-500">Chargement de la galerie...</p>
        ) : gallery.length === 0 ? (
          <p className="text-center text-gray-500">Aucun dessin pour le moment. Crée ton premier chef-d'œuvre ! ✏️</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gallery.map((image) => (
              <div 
                key={image.public_id}
                className="border-2 border-gray-300 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition bg-white"
              >
                <div className="relative w-full h-64">
                  <Image
                    src={image.secure_url}
                    alt="Dessin"
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="p-4">
                  <p className="text-xs text-gray-600 font-semibold mb-1">✏️ Dessin original</p>
                  <p className="text-sm text-gray-500">
                    {new Date(image.created_at).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                  <a 
                    href={image.secure_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline text-sm mt-2 inline-block"
                  >
                    Voir en grand
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}