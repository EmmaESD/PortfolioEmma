# Architecture Decision Record (ADR)

> Document généré automatiquement - Dernière mise à jour : 20 janvier 2026

## 1. Technologies

### Framework Principal
- **Next.js 15.5.6** avec App Router
- **React 19.1.0** et **React DOM 19.1.0**
- **TypeScript 5.x** en mode strict
- **Turbopack** pour le bundling (dev et build)

### Styling
- **Tailwind CSS v4.1.15** avec `@tailwindcss/postcss`
- PostCSS 8.5.6 + Autoprefixer
- Thème personnalisé défini dans `globals.css` via `@theme`

### Bibliothèques UI/Animation
- **Three.js 0.180.0** - Rendu 3D (sphère animée sur la page d'accueil)
- **GSAP 3.13.0** - Animations avancées
- **Swiper 12.0.3** - Carrousel/slider
- **react-sketch-canvas 6.2.0** - Canvas de dessin interactif

### Services Externes
| Service | Usage |
|---------|-------|
| **Cloudinary** | Stockage et gestion des images (dessins, images IA) |
| **OpenAI** | GPT-4 Vision (analyse de dessins) + DALL-E 3 (génération d'images) |
| **Vercel KV** | Rate limiting (stockage des quotas par IP) |

### Outils de Développement
- **ESLint 9** avec `eslint-config-next`
- Configuration flat config (`eslint.config.mjs`)

---

## 2. Architecture du projet

### Structure des dossiers

```
portfolio/
├── app/                          # App Router (Next.js 15)
│   ├── api/                      # Routes API
│   │   ├── gallery/route.ts      # GET - Récupère les dessins originaux
│   │   ├── gallery-ai/route.ts   # GET - Récupère les images générées par IA
│   │   ├── transform/route.ts    # POST - Pipeline IA (Vision + DALL-E)
│   │   └── upload/route.ts       # POST - Upload vers Cloudinary
│   │
│   ├── components/               # Composants React réutilisables
│   │   ├── ButtonProject.tsx
│   │   ├── CardGallery.tsx
│   │   ├── CardProject.tsx
│   │   ├── Circle.tsx            # Sphère Three.js animée
│   │   ├── DrawCanvas.tsx        # Canvas de dessin (react-sketch-canvas)
│   │   ├── Footer.tsx
│   │   ├── Gallery.tsx
│   │   ├── LatestProjects.tsx
│   │   ├── NavBar.tsx
│   │   ├── ProjectLinks.tsx
│   │   ├── Swiper.tsx            # Carrousel infini
│   │   ├── Tag.tsx
│   │   └── Techno.tsx
│   │
│   ├── hooks/                    # Custom hooks
│   │   └── useGallery.ts         # Hook pour charger la galerie IA
│   │
│   ├── projets/                  # Pages projets
│   │   ├── data/
│   │   │   ├── projects.ts       # Données des projets (interface Project)
│   │   │   └── technologies.ts   # Registre des technologies (TECHNOLOGIES)
│   │   ├── [slug]/page.tsx       # Page dynamique projet (SSG)
│   │   └── page.tsx              # Liste des projets
│   │
│   ├── artify/                   # Feature interactive IA
│   │   └── page.tsx
│   │
│   ├── globals.css               # Styles globaux + thème Tailwind
│   ├── layout.tsx                # Layout racine
│   ├── page.tsx                  # Page d'accueil
│   └── icon.svg                  # Favicon
│
├── public/
│   └── assets/                   # Assets statiques
│       ├── projects-img/         # Images des projets
│       ├── technos/              # Icônes des technologies
│       ├── SVG/                  # Logos et icônes SVG
│       └── videos/               # Vidéos de démo
│
├── next.config.ts                # Configuration Next.js
├── tsconfig.json                 # Configuration TypeScript
├── package.json
└── eslint.config.mjs             # Configuration ESLint (flat config)
```

### Pattern de Routing

**App Router** avec génération statique (SSG) pour les pages projets :

```typescript
// app/projets/[slug]/page.tsx
export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}
```

### Organisation des Données

Les données sont centralisées dans `app/projets/data/` :

```typescript
// projects.ts - Interface Project
export interface Project {
  slug: string;
  title: string;
  date: Date;
  category: ProjectCategory;  // "pro" | "perso" | "école"
  longDescription: string;
  technologies: Technology[];
  demoUrl?: string;
  githubUrl?: string;
  figmaUrl?: string;
  image: string;
  demoVideo?: string;
}

// technologies.ts - Registre des technologies
export const TECHNOLOGIES: Record<string, Technology> = {
  react: { id: "react", name: "React", icon: "/assets/technos/react.svg" },
  // ...
};
```

---

## 3. Conventions de nommage

### Fichiers et dossiers

| Type | Convention | Exemple |
|------|------------|---------|
| Composants React | **PascalCase** | `NavBar.tsx`, `CardProject.tsx` |
| Pages Next.js | **kebab-case** ou `page.tsx` | `app/artify/page.tsx` |
| Routes API | **kebab-case** | `app/api/gallery-ai/route.ts` |
| Hooks | **camelCase** avec préfixe `use` | `useGallery.ts` |
| Fichiers de données | **camelCase** | `projects.ts`, `technologies.ts` |
| Dossiers | **kebab-case** | `projets/`, `gallery-ai/` |

### Composants React

```typescript
// Nommage : PascalCase, export default
export default function NavBar() {
  // ...
}

// Props : interface suffixée par Props
interface ProjectProps {
  project: Project;
}

export default function CardProject({ project }: ProjectProps) {
  // ...
}
```

### Variables et fonctions

```typescript
// Variables : camelCase
const [isMenuOpen, setIsMenuOpen] = useState(false);
const latestProjects = [...projects].sort((a, b) => b.date.getTime() - a.date.getTime());

// Handlers : préfixe handle
const handleClear = () => { /* ... */ };
const handleTransform = async () => { /* ... */ };
const handleValidateDrawing = async () => { /* ... */ };

// Fonctions async de chargement : préfixe load
const loadGallery = async () => { /* ... */ };
const loadGalleryAI = async () => { /* ... */ };
```

### Types et interfaces

```typescript
// Interface : PascalCase, suffixe descriptif
export interface Technology {
  id: string;
  name: string;
  icon: string;
}

export interface CloudinaryImage {
  public_id: string;
  secure_url: string;
  created_at: string;
  // ...
}

// Type union pour les catégories
export type ProjectCategory = "pro" | "perso" | "école";

// Type pour les clés d'objet
type StyleKey = keyof typeof styles;
```

---

## 4. Patterns et bonnes pratiques

### Pattern "use client"

Les composants interactifs utilisent la directive `'use client'` :

```typescript
'use client'

import { useState, useEffect } from 'react'
// Composant client avec état et effets
```

Composants client : `NavBar`, `Circle`, `DrawCanvas`, `Gallery`, `Swiper`

### Gestion des styles

**Approche hybride Tailwind + CSS custom properties** :

```css
/* globals.css */
@theme {
    --font-jaro: Jaro, sans-serif;
    --font-jetbrains: JetBrains Mono, monospace;
    --color-primary: #FAF7ED;
    --color-secondary: #FBB48E;
    --color-accent: #F48B7C;
    --color-tag-perso: #6BC7CD;
    --color-tag-pro: #96B18B;
    --color-tag-ecole: #F48B7C;
}

/* Système typographique avec classe utilitaire */
@layer components {
    .typography {
        p { font-size: var(--text-xs); /* ... */ }
        h1 { font-size: var(--text-3xl); /* ... */ }
        /* ... */
    }
}
```

Usage dans les composants :

```tsx
<main className="typography px-10 md:px-16 lg:px-20">
  <h1>Titre</h1>
  <p>Paragraphe stylisé automatiquement</p>
</main>
```

### Pattern de Custom Hook

```typescript
// hooks/useGallery.ts
export function useGallery(triggerReload?: number) {
  const [galleryAI, setGalleryAI] = useState<CloudinaryImage[]>([])
  const [loadingGalleryAI, setLoadingGalleryAI] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Logique de chargement...

  return {
    galleryAI,
    loadingGalleryAI,
    error,
    reloadGallery
  }
}
```

### Pattern de Route API

Structure standard des routes API :

```typescript
// app/api/upload/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    // Logique...
    return NextResponse.json({ success: true, /* data */ })
  } catch (error) {
    console.error('Erreur:', error)
    return NextResponse.json(
      { success: false, error: 'Message d\'erreur' },
      { status: 500 }
    )
  }
}
```

### Pattern de Génération Statique

```typescript
// Génération des pages statiques au build
export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

// Métadonnées dynamiques pour le SEO
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return { title: 'Projet non trouvé' };
  return { title: project.title };
}
```

### Gestion des erreurs

Pattern `notFound()` pour les pages dynamiques :

```typescript
import { notFound } from 'next/navigation';

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  return (/* ... */);
}
```

### Structure des imports

Ordre recommandé :

```typescript
// 1. Imports Next.js / React
import { notFound } from 'next/navigation';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// 2. Imports de bibliothèques externes
import * as THREE from 'three';
import { v2 as cloudinary } from 'cloudinary';

// 3. Imports internes (composants, data, hooks)
import { projects } from '../data/projects';
import CardProject from '@/app/components/CardProject';
import { useGallery } from '../hooks/useGallery';
```

---

## 5. Configuration et environnement

### Variables d'environnement requises

```env
# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=xxx
CLOUDINARY_API_KEY=xxx
CLOUDINARY_API_SECRET=xxx

# OpenAI
OPENAI_API_KEY=xxx

# Vercel KV (rate limiting)
KV_URL=xxx
KV_REST_API_URL=xxx
KV_REST_API_TOKEN=xxx
KV_REST_API_READ_ONLY_TOKEN=xxx
```

### Alias de chemins

```json
// tsconfig.json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

Usage :

```typescript
import CardProject from '@/app/components/CardProject';
import { projects } from '@/app/projets/data/projects';
```

### Configuration Next.js

```typescript
// next.config.ts
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
};
```

### Configuration ESLint

```javascript
// eslint.config.mjs (flat config)
const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
];
```

### Configuration TypeScript

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "strict": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "jsx": "preserve",
    "incremental": true
  }
}
```

---

## 6. Commandes utiles

```bash
# Développement
npm run dev          # Démarrer le serveur de développement (Turbopack)
                     # → http://localhost:3000

# Production
npm run build        # Build de production avec Turbopack
npm run start        # Démarrer le serveur de production

# Qualité du code
npm run lint         # Lancer ESLint
```

---

## 7. Palette de couleurs

| Nom | Valeur | Usage |
|-----|--------|-------|
| `primary` | `#FAF7ED` | Fond principal (crème) |
| `secondary` | `#FBB48E` | Couleur secondaire (pêche) |
| `accent` | `#F48B7C` | Couleur d'accent (corail) |
| `dark` | `#000000` | Texte principal |
| `tag-perso` | `#6BC7CD` | Tag projet personnel (turquoise) |
| `tag-pro` | `#96B18B` | Tag projet professionnel (vert) |
| `tag-ecole` | `#F48B7C` | Tag projet école (corail) |

---

## 8. Typographie

| Élément | Police | Taille (desktop) |
|---------|--------|------------------|
| `h1` | Jaro | `var(--text-3xl)` = 150px |
| `h2` | JetBrains Mono | `var(--text-xl)` = 50px |
| `h3` | Jaro | `var(--text-2xl)` = 60px |
| `h4` | Jaro | `var(--text-lg)` = 40px |
| `h5` | JetBrains Mono | `var(--text-md)` = 25px |
| `p` | JetBrains Mono | `var(--text-xs)` = 16px |
| `a` | JetBrains Mono | `var(--text-sm)` = 20px |

Le système est **responsive** avec des breakpoints à 768px (tablette) et 1024px (desktop).
