# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
npm run dev      # Start development server with Turbopack (http://localhost:3000)
npm run build    # Production build with Turbopack
npm run lint     # Run ESLint
npm run start    # Start production server
```

## Architecture Overview

This is a **Next.js 15 portfolio website** using the App Router with TypeScript and Tailwind CSS v4.

### Core Pages
- `/` - Homepage with hero section, Three.js animated sphere, skills carousel, and bio
- `/projets` - Projects listing page
- `/projets/[slug]` - Dynamic project detail pages (statically generated)
- `/artify` - Interactive AI art feature where users draw and AI transforms their drawings

### Data Layer
- **`app/projets/data/projects.ts`** - Central project definitions with the `Project` interface (slug, title, date, category, technologies, URLs, etc.)
- **`app/projets/data/technologies.ts`** - Technology registry (`TECHNOLOGIES` object) with icons and metadata

### API Routes (`app/api/`)
- **`/api/transform`** - Main AI pipeline: analyzes drawings with GPT-4 Vision, generates art with DALL-E 3, creates poetic descriptions, stores in Cloudinary. Includes rate limiting via Vercel KV.
- **`/api/upload`** - Handles image uploads to Cloudinary
- **`/api/gallery`** / **`/api/gallery-ai`** - Fetch gallery images from Cloudinary

### Key Components (`app/components/`)
- **`Circle.tsx`** - Three.js animated sphere that follows mouse cursor
- **`DrawCanvas.tsx`** - Drawing canvas using react-sketch-canvas
- **`Gallery.tsx`** - Displays AI-generated artwork gallery
- **`Swiper.tsx`** - Infinite scroll carousel for skills display
- **`LatestProjects.tsx`** - Reusable component showing recent projects

### Styling
- Tailwind CSS v4 with custom theme in `globals.css`
- Custom color palette: `primary` (#FAF7ED), `secondary` (#FBB48E), `accent` (#F48B7C)
- Typography system using CSS custom properties with responsive scaling
- Two font families: Jaro (headings) and JetBrains Mono (body)
- Apply `.typography` class to containers for consistent text styling

## External Services

Requires environment variables for:
- **Cloudinary** - Image storage (`NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`)
- **OpenAI** - GPT-4 Vision & DALL-E 3 (`OPENAI_API_KEY`)
- **Vercel KV** - Rate limiting storage

## Path Aliases

`@/*` maps to the project root (configured in `tsconfig.json`).
