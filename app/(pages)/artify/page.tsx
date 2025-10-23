'use client'

import { useRef } from 'react'
import { ReactSketchCanvas, ReactSketchCanvasRef } from 'react-sketch-canvas'

export default function DrawingPage() {
  const canvasRef = useRef<ReactSketchCanvasRef>(null)

  const handleClear = () => {
    canvasRef.current?.clearCanvas()
  }

  const handleUndo = () => {
    canvasRef.current?.undo()
  }

  const handleRedo = () => {
    canvasRef.current?.redo()
  }

  const handleSave = async () => {
    const image = await canvasRef.current?.exportImage('png')
    
    if (image) {
      // Créer un lien de téléchargement
      const link = document.createElement('a')
      link.href = image
      link.download = `dessin-${Date.now()}.png`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
      console.log('Dessin téléchargé!')
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 p-8 bg-gray-50">
      <h1 className="text-4xl font-bold">Zone de dessin</h1>
      
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
        >
            Effacer
        </button>
        <button 
          onClick={handleSave}
          className="px-6 py-3 cursor-pointer bg-tag-pro text-white rounded-lg font-semibold transition"
        >
          Valider
        </button>
      </div>
    </div>
  )
}