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
const MAX_GENERATIONS = 1

// 👇 NOUVEAU : Map pour stocker les descriptions
export const imageDescriptions = new Map<string, string>()

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
    const { imageUrl, style } = body

    if (!imageUrl) {
      return NextResponse.json(
        { success: false, error: 'Image URL manquante' },
        { status: 400 }
      )
    }

    // Extraire le public_id du dessin original
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
    const dallePrompt = `Create a beautiful interpretation of this sketch in ${style || 'realistic artistic style'} while STRICTLY preserving its original composition, shapes, and line structure. 

The sketch shows: ${description}

IMPORTANT GUIDELINES:
- Keep the EXACT same layout, proportions and basic forms as the original sketch
- Apply the ${style || 'artistic'} aesthetic with appropriate colors, textures and techniques
- Enhance with professional artistic quality appropriate for this style
- Add details that complement the original lines while maintaining recognizability
- The result should be elegant, tasteful, suitable for all audiences
- NO obscene, violent, or inappropriate content
- Focus on beauty, harmony and artistic excellence in ${style || 'realistic'} style

Transform this sketch into a professional ${style || 'artistic'} masterpiece while preserving its essence and structure.`

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

    // 👇 NOUVEAU : Étape 3 - Générer une description poétique de l'image créée
    const poeticDescriptionResponse = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "Tu es un poète et critique d'art français. Tu écris des descriptions poétiques et évocatrices des œuvres d'art, en 1 phrase courte et élégante avec maximum 20 mots. Ton style est lyrique, imagé et captivant sans jugement de qualité ni propos obscènes. Ne décris pas littéralement le dessin, soit métaphorique."
        },
        {
          role: "user",
          content: `Écris une description poétique en français (1 phrase) de cette œuvre d'art ${style ? `de style ${style}` : 'artistique'}. L'œuvre représente : ${description}. Sois évocateur et lyrique, comme un critique d'art dans un musée.`
        }
      ],
      max_tokens: 200,
      temperature: 0.8, // Plus créatif
    })

    const poeticDescription = poeticDescriptionResponse.choices[0]?.message?.content || 
                             "Une création où l'imagination prend vie, transformant les traits simples en une œuvre empreinte de beauté et d'émotion."

    // Sauvegarder l'image générée par l'IA sur Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(aiImageUrl, {
      folder: 'dessins-ai',
      resource_type: 'image',
      context: {
        original_drawing: originalPublicId,
        original_url: imageUrl,
        poetic_description: poeticDescription // 👈 Sauvegarder aussi la description
      },
      tags: ['ai-generated', 'from-sketch']
    })

    // 👇 NOUVEAU : Sauvegarder la description dans la Map
    imageDescriptions.set(uploadResponse.public_id, poeticDescription)

    console.log('========== DEBUG UPLOAD IA ==========')
    console.log('Description poétique générée:', poeticDescription)
    console.log('====================================')

    // Incrémenter le compteur pour cette IP
    ipUsage.set(ip, currentUsage + 1)

    return NextResponse.json({
      success: true,
      originalUrl: imageUrl,
      originalPublicId: originalPublicId,
      aiUrl: uploadResponse.secure_url,
      aiPublicId: uploadResponse.public_id,
      description: description,
      poeticDescription: poeticDescription, // 👈 Retourner la description poétique
      usage: currentUsage + 1,
      remaining: MAX_GENERATIONS - (currentUsage + 1)
    })
  } catch (error) {
  console.error('Erreur transformation IA:', error)
  
  const errorMessage = error instanceof Error ? error.message : 'Erreur lors de la transformation'
  
  return NextResponse.json(
    { success: false, error: errorMessage },
    { status: 500 }
  )
}
}