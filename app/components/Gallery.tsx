'use client'

import { useEffect, useState } from "react"
import { GalleryCard } from "./CardGallery"
import { useGallery } from "../hooks/useGallery"

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

export default function Gallery( ) {
  const { galleryAI, loadingGalleryAI, error, reloadGallery } = useGallery()
    return (
        <div className="w-full">
            <div className="mb-16 flex flex-col gap-16">
                <div className="flex flex-col gap-5">
                    <h2 className=" text-center">
                      Gallerie
                    </h2>
                    <p className="text-center">Ici, chaque création capture un instant de passage.</p>
                </div>

              {loadingGalleryAI ? (
                <p className="text-center text-gray-500">Chargement...</p>
              ) : galleryAI.length === 0 ? (
                <p className="text-center text-gray-500">Aucune création pour le moment 🎨</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {galleryAI.map((aiImage) => (
                    <GalleryCard key={aiImage.public_id} aiImage={aiImage} />
                  ))}
                </div>
              )}
            </div>
        </div>
    )
}