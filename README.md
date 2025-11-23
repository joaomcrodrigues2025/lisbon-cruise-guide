# Lisbon Shore Guide - Cruise Passenger Directory

A comprehensive NextJS directory website featuring 37 tourist attractions in Lisbon, Portugal, specifically optimized for cruise ship passengers.

## Features

- **Homepage**: Beautiful hero section with featured attractions and category browsing
- **37 Individual Attraction Pages**: Complete details with photos, prices, hours, and cruise passenger tips
- **Dynamic Category Pages**: Browse attractions by type (monuments, museums, viewpoints, etc.)
- **Tag-based Navigation**: Discover attractions by tags (family-friendly, historic, free, etc.)
- **Search Functionality**: Full-text search across attractions
- **SEO Optimized**: Every page has unique meta titles, descriptions, and structured data
- **Mobile Responsive**: Fully responsive design matching the provided HTML/CSS templates
- **Map Page**: Placeholder for interactive map integration

## Tech Stack

- **NextJS 14+** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Server Components** for optimal performance
- **Static Site Generation** for all pages

## Project Structure

```
lisbon-cruise-guide/
├── app/
│   ├── layout.tsx              # Root layout with header/footer
│   ├── page.tsx                # Homepage
│   ├── attractions/
│   │   ├── page.tsx            # All attractions list
│   │   └── [slug]/page.tsx     # Individual attraction pages (37 pages)
│   ├── categories/
│   │   └── [category]/page.tsx # Category pages (dynamic)
│   ├── tags/
│   │   └── [tag]/page.tsx      # Tag pages (dynamic)
│   ├── search/page.tsx         # Search results page
│   ├── map/page.tsx            # Map view page
│   ├── sitemap.ts              # Sitemap generation
│   └── robots.ts               # Robots.txt generation
├── components/
│   ├── Header.tsx              # Navigation header
│   ├── AttractionCard.tsx      # Attraction display card
│   ├── SearchBar.tsx           # Search input component
│   └── FilterChips.tsx         # Category filter chips
├── lib/
│   ├── types.ts                # TypeScript interfaces
│   ├── data.ts                 # Data fetching utilities
│   └── seo.ts                  # SEO helper functions
├── public/
│   └── data/                   # JSON data files (37 attractions)
└── README.md
```

## Setup Instructions

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run development server:**
   ```bash
   npm run dev
   ```

3. **Open browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm run start
```

## Page Counts

The website generates:

- **1** Homepage
- **1** All Attractions list page
- **37** Individual attraction detail pages
- **~15** Category pages (monuments, museums, viewpoints, etc.)
- **~40** Tag pages (family-friendly, historic, free, etc.)
- **1** Search page
- **1** Map page
- **1** Sitemap
- **Total: 96+ statically generated pages**

## Data Structure

All attraction data is stored in JSON files in `public/data/`. Each attraction includes:

- Basic information (name, tagline, type, categories)
- Detailed descriptions (short, full, history, significance)
- Location data (address, coordinates, directions from cruise port)
- Contact information (phone, email, website, social media)
- Visiting information (hours, prices, duration, best times)
- Cruise passenger specific tips and accessibility info
- Features, highlights, and facilities
- Images (hero image and gallery)
- Nearby attractions
- Tags and ratings

## SEO Features

- **Unique Meta Titles**: Every page has a clickbait-style title optimized for Google
- **Meta Descriptions**: Compelling descriptions for each page
- **Structured Data**: Schema.org markup on attraction pages
- **Sitemap**: Auto-generated XML sitemap with all pages
- **Robots.txt**: Proper crawling configuration
- **Open Graph Tags**: Social media sharing optimization
- **Semantic HTML**: Proper heading hierarchy and landmarks

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import repository in Vercel
3. Deploy automatically

### Other Platforms

The site can be deployed to:
- **Netlify**: Static site deployment
- **AWS Amplify**: Full-stack deployment
- **Digital Ocean App Platform**: Container deployment
- **Any static host**: Build and upload `.next` folder

---

**Generated with Claude Code Directory Builder** 🤖
