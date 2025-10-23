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

// Stockage en mémoire des IPs
const ipUsage = new Map<string, number>()
const MAX_GENERATIONS = 10

export async function POST(request: NextRequest) {
  try {
    // Récupérer l'IP
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'unknown'

    // Vérifier le quota
    const currentUsage = ipUsage.get(ip) || 0

    if (currentUsage >= MAX_GENERATIONS) {
      return NextResponse.json(
        { 
          success: false, 
          error: `Limite atteinte ! Vous avez déjà généré ${MAX_GENERATIONS} images. Revenez plus tard ! 🎨`,
          usage: currentUsage,
          limit: MAX_GENERATIONS
        },
        { status: 429 }
      )
    }

    const body = await request.json()
    const { imageUrl, prompt } = body

    if (!imageUrl) {
      return NextResponse.json(
        { success: false, error: 'Image URL manquante' },
        { status: 400 }
      )
    }

    // Extraire le public_id du dessin original depuis l'URL Cloudinary
    const originalPublicId = imageUrl.match(/\/v\d+\/(.+)\.[^.]+$/)?.[1] || 'unknown'

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

    // Étape 2 : DALL-E génère une nouvelle image
    const dallePrompt = `Create a beautiful, artistic and realistic interpretation of this sketch while STRICTLY preserving its original composition, shapes, and line structure. 

The sketch shows: ${description}

IMPORTANT GUIDELINES:
- Keep the EXACT same layout, proportions and basic forms as the original sketch
- Enhance with professional artistic techniques: shading, colors, textures, depth
- Add realistic or abstract details that complement the original lines
- The result should be recognizable and clearly related to the original sketch
- Style: artistic, elegant, tasteful, suitable for all audiences
- NO obscene, violent, or inappropriate content
- Focus on beauty, harmony and artistic quality

The final artwork should look like a professional artist took the original sketch and elevated it with colors, shading and refined details, while keeping the soul and structure of the original drawing intact.`

    const dalleResponse = await openai.images.generate({
      model: "dall-e-3",
      prompt: dallePrompt,
      n: 1,
      size: "1024x1024",
      quality: "standard",
    })

    const aiImageUrl = dalleResponse?.data?.[0]?.url

    if (!aiImageUrl) {
      return NextResponse.json(
        { success: false, error: 'Erreur génération IA' },
        { status: 500 }
      )
    }

    // Sauvegarder l'image générée par l'IA sur Cloudinary avec metadata
    const uploadResponse = await cloudinary.uploader.upload(aiImageUrl, {
      folder: 'dessins-ai',
      resource_type: 'image',
      // Ajouter le public_id de l'image originale dans le contexte
      context: {
        original_drawing: originalPublicId,
        original_url: imageUrl
      },
      // Optionnel : ajouter des tags pour faciliter la recherche
      tags: ['ai-generated', 'from-sketch']
    })

    // Incrémenter le compteur pour cette IP
    ipUsage.set(ip, currentUsage + 1)

    return NextResponse.json({
      success: true,
      originalUrl: imageUrl,
      originalPublicId: originalPublicId,
      aiUrl: uploadResponse.secure_url,
      aiPublicId: uploadResponse.public_id,
      description: description,
      usage: currentUsage + 1,
      remaining: MAX_GENERATIONS - (currentUsage + 1)
    })
  } catch (error: any) {
    console.error('Erreur transformation IA:', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Erreur lors de la transformation' },
      { status: 500 }
    )
  }
}