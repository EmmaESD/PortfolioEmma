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
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1)

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

  const handleValidateDrawing = async () => {
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
        setCurrentStep(2) // Passer à l'étape 2
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
      alert('Erreur : aucun dessin sauvegardé')
      return
    }

    setTransforming(true)
    
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
        setCurrentStep(3) // Passer à l'étape 3
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

  const handleRestart = () => {
    setCurrentStep(1)
    setUploadedUrl(null)
    setAiImageUrl(null)
    setPoeticDescription(null)
    setSelectedStyle('realistic')
    canvasRef.current?.clearCanvas()
  }

  return (
    <>
      {/* Indicateur d'étapes */}
      <div className="w-full max-w-2xl mb-8">
        <div className="flex items-center justify-between">
          {/* Étape 1 */}
          <div className="flex flex-col items-center flex-1">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
              currentStep >= 1 ? 'bg-purple-600 text-white' : 'bg-gray-300 text-gray-600'
            }`}>
              1
            </div>
            <p className={`text-sm mt-2 font-semibold ${
              currentStep >= 1 ? 'text-purple-600' : 'text-gray-500'
            }`}>
              Dessiner
            </p>
          </div>

          {/* Ligne de connexion */}
          <div className={`flex-1 h-1 ${currentStep >= 2 ? 'bg-purple-600' : 'bg-gray-300'}`}></div>

          {/* Étape 2 */}
          <div className="flex flex-col items-center flex-1">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
              currentStep >= 2 ? 'bg-purple-600 text-white' : 'bg-gray-300 text-gray-600'
            }`}>
              2
            </div>
            <p className={`text-sm mt-2 font-semibold ${
              currentStep >= 2 ? 'text-purple-600' : 'text-gray-500'
            }`}>
              Choisir le style
            </p>
          </div>

          {/* Ligne de connexion */}
          <div className={`flex-1 h-1 ${currentStep >= 3 ? 'bg-purple-600' : 'bg-gray-300'}`}></div>

          {/* Étape 3 */}
          <div className="flex flex-col items-center flex-1">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
              currentStep >= 3 ? 'bg-purple-600 text-white' : 'bg-gray-300 text-gray-600'
            }`}>
              3
            </div>
            <p className={`text-sm mt-2 font-semibold ${
              currentStep >= 3 ? 'text-purple-600' : 'text-gray-500'
            }`}>
              Résultat
            </p>
          </div>
        </div>
      </div>

      {/* ÉTAPE 1 : ZONE DE DESSIN */}
      {currentStep === 1 && (
        <div className="flex flex-col items-center gap-6">
          <h2 className="text-2xl font-bold text-gray-800">✏️ Dessine ta création</h2>
          
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
              className="px-6 py-3 cursor-pointer bg-gray-500 text-white rounded-lg font-semibold transition hover:bg-gray-600"
            >
              Effacer
            </button>
            <button 
              onClick={handleValidateDrawing}
              className="px-8 py-3 cursor-pointer bg-purple-600 text-white rounded-lg font-bold text-lg transition hover:bg-purple-700 hover:scale-105 disabled:opacity-50"
              disabled={uploading}
            >
              {uploading ? '⏳ Sauvegarde...' : '✅ Valider et continuer'}
            </button>
          </div>
        </div>
      )}

      {/* ÉTAPE 2 : CHOIX DU STYLE */}
      {currentStep === 2 && (
        <div className="flex flex-col items-center gap-6 w-full max-w-4xl">
          <h2 className="text-2xl font-bold text-gray-800">🎨 Choisis un style artistique</h2>

          {/* Aperçu du dessin */}
          {uploadedUrl && (
            <div className="relative w-64 h-48 border-2 border-gray-300 rounded-lg overflow-hidden bg-white shadow-lg">
              <Image
                src={uploadedUrl}
                alt="Ton dessin"
                fill
                className="object-contain"
              />
            </div>
          )}

          {/* Grille de styles */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
            {(Object.keys(styles) as StyleKey[]).map((key) => {
              const style = styles[key]
              return (
                <button
                  key={key}
                  onClick={() => setSelectedStyle(key)}
                  className={`px-6 py-4 rounded-xl font-semibold transition-all ${
                    selectedStyle === key
                      ? 'bg-purple-600 text-white shadow-xl scale-105 border-4 border-purple-400'
                      : 'bg-white text-gray-700 hover:bg-purple-50 border-2 border-gray-300 hover:border-purple-300'
                  }`}
                >
                  {style.name}
                </button>
              )
            })}
          </div>

          <p className="text-gray-600">
            Style sélectionné : <span className="font-bold text-purple-600">{styles[selectedStyle].name}</span>
          </p>

          <div className="flex gap-4">
            <button 
              onClick={handleRestart}
              className="px-6 py-3 cursor-pointer bg-gray-400 text-white rounded-lg font-semibold transition hover:bg-gray-500"
            >
              ← Retour au dessin
            </button>
            <button 
              onClick={handleTransform}
              className="px-8 py-3 cursor-pointer bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-bold text-lg transition hover:shadow-xl hover:scale-105 disabled:opacity-50"
              disabled={transforming}
            >
              {transforming ? '✨ Transformation en cours...' : '🚀 Lancer la magie !'}
            </button>
          </div>
        </div>
      )}

      {/* ÉTAPE 3 : RÉSULTAT */}
      {currentStep === 3 && (
        <div className="flex flex-col items-center gap-6 w-full max-w-4xl">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            ✨ Ta création est prête !
          </h2>

          {/* Comparaison Avant/Après */}
          <div className="w-full bg-white rounded-xl shadow-2xl p-6">
            <h3 className="text-xl font-bold text-center mb-6 text-gray-800">Avant → Après</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Original */}
              <div>
                <p className="text-sm font-semibold text-gray-600 mb-2 text-center">✏️ Ton dessin original</p>
                {uploadedUrl && (
                  <div className="relative w-full h-80 border-2 border-gray-300 rounded-lg overflow-hidden">
                    <Image
                      src={uploadedUrl}
                      alt="Dessin original"
                      fill
                      className="object-contain"
                    />
                  </div>
                )}
              </div>

              {/* IA */}
              <div>
                <p className="text-sm font-semibold text-purple-600 mb-2 text-center">🤖 Version {styles[selectedStyle].name}</p>
                {aiImageUrl && (
                  <div className="relative w-full h-80 border-4 border-purple-400 rounded-lg overflow-hidden shadow-xl">
                    <Image
                      src={aiImageUrl}
                      alt="Version IA"
                      fill
                      className="object-contain"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Description poétique */}
            {poeticDescription && (
              <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border-l-4 border-purple-500">
                <p className="text-gray-700 italic text-lg leading-relaxed text-center">
                  "{poeticDescription}"
                </p>
              </div>
            )}

            {/* Liens */}
            <div className="flex gap-4 justify-center mt-6">
              {uploadedUrl && (
                <a 
                  href={uploadedUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline font-semibold"
                >
                  📥 Télécharger l'original
                </a>
              )}
              {aiImageUrl && (
                <a 
                  href={aiImageUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-purple-600 hover:underline font-semibold"
                >
                  📥 Télécharger la version IA
                </a>
              )}
            </div>
          </div>

          {/* Bouton recommencer */}
          <button 
            onClick={handleRestart}
            className="px-8 py-4 cursor-pointer bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-xl font-bold text-lg transition hover:shadow-xl hover:scale-105"
          >
            🎨 Créer un nouveau dessin
          </button>
        </div>
      )}

      {/* GALERIES (toujours visibles en bas) */}
      <div className="w-full max-w-7xl mt-20 border-t-2 border-gray-200 pt-12">
        {/* GALERIE IMAGES IA */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            ✨ Galerie des transformations IA
          </h2>
          
          {loadingGalleryAI ? (
            <p className="text-center text-gray-500">Chargement...</p>
          ) : galleryAI.length === 0 ? (
            <p className="text-center text-gray-500">Aucune création pour le moment 🎨</p>
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
                    className="border-2 border-purple-300 rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition bg-white"
                  >
                    <div className="p-4">
                      <h3 className="text-lg font-bold text-purple-700 mb-4 text-center">
                        Avant → Après
                      </h3>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <p className="text-xs text-gray-600 font-semibold text-center">✏️ Original</p>
                          {originalUrl ? (
                            <div className="relative w-full h-48 border-2 border-gray-300 rounded-lg overflow-hidden">
                              <Image
                                src={originalUrl}
                                alt="Original"
                                fill
                                className="object-contain"
                              />
                            </div>
                          ) : (
                            <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                              <p className="text-gray-400 text-xs">Non disponible</p>
                            </div>
                          )}
                        </div>

                        <div className="space-y-2">
                          <p className="text-xs text-purple-600 font-semibold text-center">🤖 IA</p>
                          <div className="relative w-full h-48 border-2 border-purple-300 rounded-lg overflow-hidden">
                            <Image
                              src={aiImage.secure_url}
                              alt="IA"
                              fill
                              className="object-contain"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {poeticDesc && (
                      <div className="px-4 pb-4">
                        <div className="p-3 bg-purple-50 rounded-lg">
                          <p className="text-sm text-gray-700 italic">"{poeticDesc}"</p>
                        </div>
                      </div>
                    )}

                    <div className="px-4 pb-4 text-center">
                      <p className="text-xs text-gray-500">
                        {new Date(aiImage.created_at).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* GALERIE DESSINS ORIGINAUX */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
            🎨 Galerie des dessins originaux
          </h2>
          
          {loadingGallery ? (
            <p className="text-center text-gray-500">Chargement...</p>
          ) : gallery.length === 0 ? (
            <p className="text-center text-gray-500">Aucun dessin pour le moment ✏️</p>
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
                    <p className="text-xs text-gray-500">
                      {new Date(image.created_at).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}