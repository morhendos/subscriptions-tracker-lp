# Subscription Tracker Landing Page

A modern landing page for the Subscription Tracker application, built with Next.js and optimized for search engines.

## Features

- 🔍 SEO optimized with comprehensive metadata
- 📱 Fully responsive design
- 🌙 Dark mode support
- ⚡ Optimized performance
- 🤖 Search engine friendly
- 📊 Analytics integration (Google Analytics & Microsoft Clarity)

## Tech Stack

- Next.js 14
- TypeScript
- React
- shadcn/ui
- Tailwind CSS
- Radix UI primitives

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/morhendos/subscriptions-tracker-lp.git
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
```
Then edit `.env.local` to add your Google Analytics and Microsoft Clarity IDs.

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                 # Next.js App Router pages
├── components/          # React components
├── lib/                 # Utilities and helpers
├── config/             # Configuration files
└── types/              # TypeScript type definitions
```

## SEO Features

- Dynamic metadata generation
- Schema.org markup
- XML sitemap
- Robots.txt configuration
- OpenGraph and Twitter cards

For detailed SEO documentation, see [SEO-IMPROVEMENTS.md](./docs/SEO-IMPROVEMENTS.md).

## Analytics

The landing page integrates with both Google Analytics 4 and Microsoft Clarity for comprehensive visitor tracking and user behavior analysis.

### Google Analytics
- Page view tracking
- Event tracking
- User journey analysis
- Conversion tracking

### Microsoft Clarity
- Heatmaps
- Session recordings
- User behavior insights
- Performance metrics

To configure analytics, set the following environment variables:
```
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_CLARITY_PROJECT_ID=xxxxxxxxxx
```

## Components

### Core Components
- Hero section with CTA
- Feature highlights
- Testimonial cards
- Social proof section

### UI Components
We use shadcn/ui components including:
- Cards
- Buttons
- Stars
- Avatars

## Development

### Code Style
- TypeScript for type safety
- ESLint for code quality
- Prettier for code formatting

### Branch Strategy
- `main` - production branch
- `feature/*` - feature branches
- `fix/*` - bug fix branches

## Deployment

The site automatically deploys to production when changes are pushed to the main branch.

## Contributing

1. Create a feature branch from `main`
2. Make your changes
3. Create a pull request
4. Request review

## Documentation

- [SEO Improvements](./docs/SEO-IMPROVEMENTS.md)
- [Component Library](https://ui.shadcn.com/)
- [Next.js Documentation](https://nextjs.org/docs)

## Environment Variables

```env
NEXT_PUBLIC_BASE_URL=https://subscriptions-tracker.com
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_CLARITY_PROJECT_ID=xxxxxxxxxx
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=xxxxxxxxxxxx
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run tree` - Generate directory tree