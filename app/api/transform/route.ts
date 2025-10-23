import OpenAI from 'openai'
import { NextRequest, NextResponse } from 'next/server'
import { v2 as cloudinary } from 'cloudinary'

// Config Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

// Config OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { imageUrl, prompt } = body

    if (!imageUrl) {
      return NextResponse.json(
        { success: false, error: 'Image URL manquante' },
        { status: 400 }
      )
    }

    // Étape 1 : GPT-4 Vision analyse le dessin
    const visionResponse = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content: [
            { 
              type: "text", 
              text: "Describe this sketch in detail. What objects, shapes, or figures do you see? Be specific and descriptive." 
            },
            {
              type: "image_url",
              image_url: {
                url: imageUrl,
              },
            },
          ],
        },
      ],
      max_tokens: 300,
    })

    const description = visionResponse.choices[0]?.message?.content || "a simple drawing"

    // Étape 2 : DALL-E génère une nouvelle image basée sur la description
    const dallePrompt = prompt 
      ? `${prompt}. Based on this sketch: ${description}`
      : `Transform this sketch into a beautiful, colorful artistic masterpiece. The sketch shows: ${description}`

    const dalleResponse = await openai.images.generate({
      model: "dall-e-3",
      prompt: dallePrompt,
      n: 1,
      size: "1024x1024",
      quality: "standard",
    })

    const aiImageUrl = dalleResponse.data?.[0]?.url

    if (!aiImageUrl) {
      return NextResponse.json(
        { success: false, error: 'Erreur génération IA' },
        { status: 500 }
      )
    }

    // Sauvegarder l'image générée par l'IA sur Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(aiImageUrl, {
      folder: 'dessins-ai',
      resource_type: 'image',
    })

    return NextResponse.json({
      success: true,
      originalUrl: imageUrl,
      aiUrl: uploadResponse.secure_url,
      aiPublicId: uploadResponse.public_id,
      description: description, // Pour debug
    })
  } catch (error: any) {
    console.error('Erreur transformation IA:', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Erreur lors de la transformation' },
      { status: 500 }
    )
  }
}