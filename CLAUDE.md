# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Reveal.js presentation platform built with Astro. It dynamically generates presentation slides from individual Astro components located in the `src/slides/` directory.

## Development Commands

- `npm run dev` - Start the development server
- `npm run build` - Build the project for production
- `npm run preview` - Preview the production build

## Architecture

### Core Structure
- **Dynamic Slide Generation**: Individual presentations are stored as `index.astro` files in `src/slides/[slide-name]/` directories
- **Type-Safe Slide Schema**: Uses arktype for runtime validation of slide metadata (title, description, authors, publishedAt)
- **Static Site Generation**: Uses Astro's `getStaticPaths` to generate routes for each slide at build time

### Key Files
- `src/utils/getSlides.ts`: Core utility that discovers and validates slide files using glob patterns
- `src/layouts/SlideLayout.astro`: Base layout for presentations with Reveal.js integration
- `src/pages/[id].astro`: Dynamic route handler that renders individual presentations
- `src/pages/index.astro`: Homepage listing all available presentations

### Slide Creation
Each slide must be created as `src/slides/[slide-name]/index.astro` with frontmatter containing:
```typescript
title: string
description: string
authors: string[]
publishedAt: string
```

### Technology Stack
- **Astro 5.x** with TypeScript
- **Reveal.js 5.x** for presentations with plugins (Highlight, Zoom, Notes)
- **Tailwind CSS 4.x** via Vite integration
- **Biome** for linting and formatting
- **arktype** for runtime type validation

### Path Aliases
- `@layouts/*` → `src/layouts/*`
- `@utils/*` → `src/utils/*`
- `@slides/*` → `src/slides/*`
- `@theme` → `src/theme/index.css`

## Deployment & CI/CD

### GitHub Pages Configuration
- **Production URL**: `https://alextrotchenko.github.io/ai-slides/`
- **Base Path**: `/ai-slides` (configured in `astro.config.mjs`)
- **Build Output**: Static files in `dist/` directory
- **CI/CD Pipeline**: `.github/workflows/deploy.yml` (triggers on push to main)

### Critical Deployment Requirements

#### Base Path Routing
- **NEVER use absolute paths** (`/`) in href attributes
- **ALWAYS use** `import.meta.env.BASE_URL` for internal links
- Examples:
  ```astro
  <!-- ❌ Wrong - causes 404s on GitHub Pages -->
  <a href="/slide-name">

  <!-- ✅ Correct - works with base path -->
  <a href={`${import.meta.env.BASE_URL}slide-name`}>

  <!-- ✅ Favicon -->
  <link href={`${import.meta.env.BASE_URL}favicon.svg`} />

  <!-- ✅ Home link -->
  <a href={import.meta.env.BASE_URL}>
  ```

#### Dependency Management
- **Package Lock Sync**: Always commit `package-lock.json` when updating dependencies
- **Svelte Dependencies**: Project no longer uses Svelte - ensure no `.svelte` files or Svelte packages
- **Build Failures**: Missing dependencies cause Vite parsing errors

### Common Deployment Issues & Solutions

1. **npm ci sync errors**
   - **Cause**: `package.json` and `package-lock.json` out of sync
   - **Fix**: Run `npm install` locally and commit updated lock file

2. **404 errors on navigation**
   - **Cause**: Using absolute paths instead of base path
   - **Fix**: Replace `/path` with `${import.meta.env.BASE_URL}path`

3. **Build failures from deleted files**
   - **Cause**: Files deleted locally but not committed to git
   - **Fix**: Use `git add -A` to stage all deletions and commit

4. **Vite parsing errors**
   - **Cause**: Trying to build files without proper integration (e.g., `.svelte` files without Svelte config)
   - **Fix**: Remove unused files and dependencies completely

### Deployment Workflow
1. Make changes locally
2. Test with `npm run build` (respects user's CLAUDE.md: never run without explicit request)
3. Commit changes including any `package-lock.json` updates
4. Push to main branch - triggers automatic deployment
5. Monitor deployment at repository Actions tab
6. Site updates at production URL within 2-3 minutes