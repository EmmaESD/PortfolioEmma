'use client'

import { useState } from "react";
import DrawCanvas from "../components/DrawCanvas";
import Gallery from "../components/Gallery";

export default function DrawingPage() {
  const [galleryReloadTrigger, setGalleryReloadTrigger] = useState(0)
  return (
    <div className="min-h-screen flex flex-col items-center gap-30 p-10 lg:p-20 w-full typography">
      {/* Section titre avec cercle blur */}
      <div className="relative flex flex-col gap-6 items-center">
        {/* Cercle blur en arrière-plan */}
        <div 
          className="absolute inset-0 z-10 flex items-center justify-center"
          style={{
            width: '350px',
            height: '350px',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div 
            className="w-full h-full rounded-full blur-3xl opacity-50"
            style={{ backgroundColor: '#F48B7C' }}
          />
        </div>

        <h1 className="text-2xl relative z-10">Artify</h1>
        <p className="relative z-10 text-center">Laissez une empreinte unique : dessinez, l&apos;IA fera le reste.</p>
      </div>

      <div>
        <h3 className="text-lg">Le concept</h3>
        <p>Artify est une fonctionnalité interactive de mon portfolio : elle vous permet de réaliser un dessin, puis de le voir métamorphosé en œuvre par l&apos;IA avec une description poétique. <br />Une façon simple et ludique de découvrir mon univers, tout en laissant votre marque sur mon site.</p>
      </div>

      <div className="w-full flex flex-col gap-42 items-center">
        <DrawCanvas onImageTransformed={() => setGalleryReloadTrigger(prev => prev + 1)} />
        <Gallery triggerReload={galleryReloadTrigger} />
      </div>
    </div>
  )
}