import { v2 as cloudinary } from 'cloudinary'
import { NextResponse } from 'next/server'

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function GET() {
  try {
    // Récupérer toutes les images du dossier "dessins"
    const result = await cloudinary.search
      .expression('folder:dessins')
      .sort_by('created_at', 'desc')
      .max_results(30)
      .execute()

    return NextResponse.json({
      success: true,
      images: result.resources,
    })
  } catch (error) {
    console.error('Erreur récupération gallery:', error)
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la récupération des images' },
      { status: 500 }
    )
  }
}