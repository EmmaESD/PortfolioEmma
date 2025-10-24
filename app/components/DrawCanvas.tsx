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
  const [loadingGallery, setLoadingGallery] = useState(true)
  const [loadingGalleryAI, setLoadingGalleryAI] = useState(true)
  const [gallery, setGallery] = useState<CloudinaryImage[]>([])
  const [galleryAI, setGalleryAI] = useState<CloudinaryImage[]>([])
  const [poeticDescription, setPoeticDescription] = useState<string | null>(null)
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1)

  

  // Définir les styles disponibles
  const styles = {
    realistic: {
      name: "Réaliste",
      prompt: "realistic artistic style with natural colors, professional shading and depth"
    },
    watercolor: {
      name: "Aquarelle",
      prompt: "beautiful watercolor painting style with soft, flowing colors and delicate brush strokes"
    },
    oil: {
      name: "Peinture à l'huile",
      prompt: "classical oil painting style with rich textures, deep colors and masterful brushwork"
    },
    pixel: {
      name: "Pixel Art",
      prompt: "retro pixel art style with clean pixels, vibrant colors and video game aesthetic"
    },
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

  return (
    <main className='flex flex-col items-center gap-8 px-12 w-full'>
      {/* Indicateur d'étapes */}
      <div className="w-full px-44">
        <div className="flex items-center justify-between">
          {/* Étape 1 */}
          <div className="flex flex-col items-center flex-1">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
              currentStep >= 1 ? 'bg-accent text-white' : 'bg-gray-300 text-black'
            }`}>
              1
            </div>
            <p className={` ${
              currentStep >= 1 ? 'text-accent' : 'text-gray-500'
            }`}>
              Dessiner
            </p>
          </div>

          {/* Ligne de connexion */}
          <div className={`flex-1 h-1 ${currentStep >= 2 ? 'bg-accent' : 'bg-gray-300'}`}></div>

          {/* Étape 2 */}
          <div className="flex flex-col items-center flex-1">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
              currentStep >= 2 ? 'bg-accent text-white' : 'bg-gray-300 text-black'
            }`}>
              2
            </div>
            <p className={`w-full text-center ${
              currentStep >= 2 ? 'text-accent' : 'text-black'
            }`}>
              Choisir le style
            </p>
          </div>

          {/* Ligne de connexion */}
          <div className={`flex-1 h-1 ${currentStep >= 3 ? 'bg-accent' : 'bg-gray-300'}`}></div>

          {/* Étape 3 */}
          <div className="flex flex-col items-center flex-1">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
              currentStep >= 3 ? 'bg-accent text-white' : 'bg-gray-300 text-black'
            }`}>
              3
            </div>
            <p className={` ${
              currentStep >= 3 ? 'text-accent' : 'text-black'
            }`}>
              Résultat
            </p>
          </div>
        </div>
      </div>

      {/* ÉTAPE 1 : ZONE DE DESSIN */}
      {currentStep === 1 && (
        <div className="flex flex-col items-center gap-6">
          <h4>Laissez votre empreinte</h4>
          <p>Attention, vous ne disposez que d&apos;un seul essai !</p>
          
          <div className="border-4 border-black rounded-lg shadow-2xl overflow-hidden bg-white">
            <ReactSketchCanvas
              ref={canvasRef}
              strokeWidth={3}
              strokeColor="#000000"
              canvasColor="#FFFFFF"
              width="600px"
              height="400px"
            />
          </div>

          <div className="flex gap-4">
            <button 
              onClick={handleClear}
              className=" px-3 cursor-pointer bg-tag-ecole text-white rounded-lg transition hover:scale-105"
            >
              Effacer
            </button>
            <button 
              onClick={handleValidateDrawing}
              className="px-3 py-3 cursor-pointer bg-tag-pro text-white rounded-lg transition hover:scale-105 disabled:opacity-50"
              disabled={uploading}
            >
              {uploading ? '⏳ Sauvegarde...' : 'Valider et continuer'}
            </button>
          </div>
        </div>
      )}

      {/* ÉTAPE 2 : CHOIX DU STYLE */}
      {currentStep === 2 && (
        <div className="flex flex-col items-center gap-6 w-full">
          <h4 className=" text-black">Choisissez un style artistique</h4>
            <div className='flex justify-center w-full gap-8 items-center'>
          {/* Aperçu du dessin */}
          {uploadedUrl && (
            <div className="relative w-96 h-80 border-2 border-gray-300 rounded-lg overflow-hidden bg-white shadow-lg">
              <Image
                src={uploadedUrl}
                alt="Ton dessin"
                fill
                className="object-fill"
              />
            </div>
          )}

          {/* Grille de styles */}
          <div className="grid grid-cols-2 md:grid-cols-2 gap-2">
            {(Object.keys(styles) as StyleKey[]).map((key) => {
              const style = styles[key]
              return (
                <button
                  key={key}
                  onClick={() => setSelectedStyle(key)}
                  className={`p-3 h-15 rounded-xl transition-all cursor-pointer ${
                    selectedStyle === key
                      ? 'bg-tag-perso text-white'
                      : 'bg-white text-black hover:scale-105 border-2 border-tag-perso'
                  }`}
                >
                  {style.name}
                </button>
              )
            })}
          </div>
          </div>

          <p className="text-black">
            Style sélectionné : <span className=" text-accent">{styles[selectedStyle].name}</span>
          </p>

          <div className="flex gap-4">
            <button 
              onClick={handleTransform}
              className="px-8 py-3 cursor-pointer  from-tag-perso to-tag-pro bg-accent text-white rounded-lg transition hover:scale-105 disabled:opacity-50"
              disabled={transforming}
            >
              {transforming ? 'Transformation en cours...' : 'Lancer la magie !'}
            </button>
          </div>
        </div>
      )}

      {/* ÉTAPE 3 : RÉSULTAT */}
      {currentStep === 3 && (
        <div className="flex flex-col items-center gap-6 w-full max-w-4xl">

          {/* Comparaison Avant/Après */}
          <div className="w-full p-6 flex flex-col gap-3">
            <h4 className="text-center mb-6 text-black">Votre Création</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Original */}
              <div>
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
                {aiImageUrl && (
                  <div className="relative w-full h-80 border-4 border-accent rounded-lg overflow-hidden shadow-xl">
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
              <div className="p-4 rounded-lg border-l-4 border-accent">
                <p className="text-black italic leading-relaxed text-center">
                  &quot;{poeticDescription}&quot;
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
                >
                    <button className='p-3 bg-accent text-white hover:scale-105 rounded-lg cursor-pointer transition'>
                  Télécharger l&apos;original
                  </button>
                </a>
              )}
              {aiImageUrl && (
                <a 
                  href={aiImageUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  
                >
                  <button className='p-3 bg-accent text-white hover:scale-105 rounded-lg cursor-pointer transition'>
                  Télécharger version ia
                  </button>
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      
    </main>
  )
}