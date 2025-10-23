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
}

export default function DrawCanvas() {
  const canvasRef = useRef<ReactSketchCanvasRef>(null)
  const [uploading, setUploading] = useState(false)
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null)
  const [gallery, setGallery] = useState<CloudinaryImage[]>([])
  const [loadingGallery, setLoadingGallery] = useState(true)

  useEffect(() => {
    loadGallery()
  }, [])

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

  const handleClear = () => {
    canvasRef.current?.clearCanvas()
    setUploadedUrl(null)
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
          className="px-6 py-3 cursor-pointer bg-accent text-white rounded-lg font-semibold transition"
          disabled={uploading}
        >
          Effacer
        </button>
        <button 
          onClick={handleSave}
          className="px-6 py-3 cursor-pointer bg-tag-pro text-white rounded-lg font-semibold transition disabled:opacity-50"
          disabled={uploading}
        >
          {uploading ? 'Upload en cours...' : 'Valider'}
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

      {/* GALERIE */}
      <div className="w-full max-w-6xl mt-12">
        <h2 className="text-3xl font-bold mb-6 text-center">Galerie de dessins</h2>
        
        {loadingGallery ? (
          <p className="text-center text-gray-500">Chargement de la galerie...</p>
        ) : gallery.length === 0 ? (
          <p className="text-center text-gray-500">Aucun dessin pour le moment. Crée ton premier chef-d'œuvre ! 🎨</p>
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