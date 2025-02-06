# Subscription Tracker Landing Page

A modern landing page for the Subscription Tracker application, built with Next.js and optimized for search engines.

## Features

- 🔍 SEO optimized with comprehensive metadata
- 📱 Fully responsive design
- 🌙 Dark mode support
- ⚡ Optimized performance
- 🤖 Search engine friendly

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

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                  # Next.js App Router pages
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
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run tree` - Generate directory tree