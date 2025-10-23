import { v2 as cloudinary } from 'cloudinary'
import { NextResponse } from 'next/server'

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function GET() {
  try {
    // Récupérer toutes les images du dossier "dessins-ai" avec leur contexte
    const result = await cloudinary.search
      .expression('folder:dessins-ai')
      .sort_by('created_at', 'desc')
      .with_field('context')  // Important : récupérer le contexte
      .with_field('tags')
      .max_results(30)
      .execute()

       console.log('========== DEBUG GALLERY AI ==========')
    console.log('Nombre d\'images:', result.resources.length)
    result.resources.forEach((img: any) => {
      console.log('---')
      console.log('Public ID:', img.public_id)
      console.log('Context:', JSON.stringify(img.context, null, 2))
      console.log('Tags:', img.tags)
      console.log('URL:', img.secure_url)
    })
    console.log('====================================')

    return NextResponse.json({
      success: true,
      images: result.resources,
    })
  } catch (error) {
    console.error('Erreur récupération gallery AI:', error)
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la récupération des images IA' },
      { status: 500 }
    )
  }
}