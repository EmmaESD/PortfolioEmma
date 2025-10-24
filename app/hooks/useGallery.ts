'use client'

import { useState, useEffect } from 'react'

export interface CloudinaryImage {
  public_id: string
  secure_url: string
  created_at: string
  width: number
  height: number
  context?: {
    original_drawing?: string
    original_url?: string
    poetic_description?: string
  }
  poetic_description?: string
}

// 👇 NOUVEAU : Ajouter un paramètre triggerReload
export function useGallery(triggerReload?: number) {
  const [galleryAI, setGalleryAI] = useState<CloudinaryImage[]>([])
  const [loadingGalleryAI, setLoadingGalleryAI] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadGalleryAI = async () => {
    try {
      setLoadingGalleryAI(true)
      setError(null)
      
      const response = await fetch('/api/gallery-ai')
      const data = await response.json()
      
      if (data.success) {
        setGalleryAI(data.images)
      } else {
        setError('Erreur lors du chargement de la galerie')
      }
    } catch (error) {
      console.error('Erreur chargement galerie IA:', error)
      setError('Erreur lors du chargement de la galerie')
    } finally {
      setLoadingGalleryAI(false)
    }
  }

  // Charger au montage
  useEffect(() => {
    loadGalleryAI()
  }, [])

  // 👇 NOUVEAU : Recharger quand triggerReload change
  useEffect(() => {
    if (triggerReload && triggerReload > 0) {
      loadGalleryAI()
    }
  }, [triggerReload])

  // Fonction pour recharger manuellement
  const reloadGallery = () => {
    loadGalleryAI()
  }

  return {
    galleryAI,
    loadingGalleryAI,
    error,
    reloadGallery
  }
}