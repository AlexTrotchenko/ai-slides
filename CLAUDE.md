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