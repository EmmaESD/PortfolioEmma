import { v2 as cloudinary } from 'cloudinary'
import { NextResponse } from 'next/server'
import { imageDescriptions } from '../transform/route' // 👈 Import

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function GET() {
  try {
    const result = await cloudinary.search
      .expression('folder:dessins-ai')
      .sort_by('created_at', 'desc')
      .with_field('context')
      .with_field('tags')
      .max_results(30)
      .execute()

    // Enrichir avec les descriptions
    const enrichedImages = result.resources.map((img: any) => ({
      ...img,
      poetic_description: imageDescriptions.get(img.public_id) || 
                         img.context?.poetic_description ||
                         null
    }))

    return NextResponse.json({
      success: true,
      images: enrichedImages,
    })
  } catch (error) {
    console.error('Erreur récupération gallery AI:', error)
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la récupération des images IA' },
      { status: 500 }
    )
  }
}