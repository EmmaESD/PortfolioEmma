Analyse le projet en profondeur et génère un fichier `adr.md` à la racine du projet.

## Instructions

1. **Explore le projet** en lisant les fichiers clés :
   - `package.json` pour les dépendances et scripts
   - `tsconfig.json` pour la configuration TypeScript
   - `next.config.ts` pour la configuration Next.js
   - `tailwind.config.ts` ou fichiers CSS pour le styling
   - Structure des dossiers (`app/`, `components/`, `api/`, etc.)
   - Exemples de composants pour identifier les conventions

2. **Analyse et documente** les éléments suivants :

### Technologies
- Framework principal et version
- Langage et configuration
- Bibliothèques UI/styling
- Services externes (APIs, cloud)
- Outils de build/dev

### Architecture
- Structure des dossiers
- Pattern de routing (App Router, Pages Router)
- Organisation des composants
- Gestion des données (data fetching, state)
- API routes

### Conventions de nommage
- Fichiers et dossiers (kebab-case, PascalCase, etc.)
- Composants React
- Variables et fonctions
- Types et interfaces
- Fichiers de données

### Patterns et bonnes pratiques
- Patterns de composants utilisés
- Gestion des styles
- Gestion des erreurs
- Structure des imports

### Configuration
- Variables d'environnement requises
- Alias de chemins
- Configuration ESLint/Prettier si présente

3. **Génère le fichier `adr.md`** avec une structure claire et des exemples de code quand pertinent.

## Format attendu du fichier adr.md

```markdown
# Architecture Decision Record (ADR)

> Document généré automatiquement - Dernière mise à jour : [DATE]

## 1. Technologies

## 2. Architecture du projet

## 3. Conventions de nommage

## 4. Patterns et bonnes pratiques

## 5. Configuration et environnement

## 6. Commandes utiles
```

Assure-toi que le document est complet, bien structuré et utilisable comme référence pour tout développeur rejoignant le projet.
