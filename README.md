# Subscription Tracker Landing Page

A modern landing page for the Subscription Tracker application, built with Next.js and optimized for search engines.

## Features

- 🔍 SEO optimized with comprehensive metadata
- 📱 Fully responsive design
- 🌙 Dark mode support
- ⚡ Optimized performance
- 🤖 Search engine friendly
- 📊 Analytics integration (Google Analytics & Microsoft Clarity)
- 📝 Waitlist system with MongoDB database

## Tech Stack

- Next.js 14
- TypeScript
- React
- MongoDB
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
cp .env.example .env.local
```
Then edit `.env.local` to add your MongoDB connection string, API keys, and analytics IDs.

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/             # Next.js App Router pages and API routes
├── components/      # React components
├── lib/             # Utilities and helpers
│   ├── db/          # Database client and utilities
│   └── services/    # Business logic services
├── config/          # Configuration files
└── types/           # TypeScript type definitions
```

## Waitlist Database

The waitlist system uses MongoDB to store and manage user registrations.

### Features

- Email validation and duplicate checking
- User metadata capture (IP, user agent, referrer)
- UTM parameter tracking
- Status management (active, contacted, converted)
- Tagging system
- Comprehensive statistics API

### API Endpoints

- `POST /api/waitlist` - Add a user to the waitlist
- `GET /api/waitlist?email=user@example.com` - Check if an email is registered
- `GET /api/waitlist/stats` - Get waitlist statistics (protected)

### MongoDB Collections

The waitlist database contains the following collections:
- `waitlist` - Stores user information including email, name, registration timestamp, and metadata

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
- Waitlist signup form

### UI Components
We use shadcn/ui components including:
- Cards
- Buttons
- Stars
- Avatars
- Forms

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

### Database Setup for Production
1. Create a MongoDB Atlas cluster (free tier is sufficient for most waitlists)
2. Set the `MONGODB_URI` environment variable in your hosting platform
3. The database and collections will be created automatically on first use

## Contributing

1. Create a feature branch from `main`
2. Make your changes
3. Create a pull request
4. Request review

## Documentation

- [SEO Improvements](./docs/SEO-IMPROVEMENTS.md)
- [Component Library](https://ui.shadcn.com/)
- [Next.js Documentation](https://nextjs.org/docs)
- [MongoDB Documentation](https://www.mongodb.com/docs/)

## Environment Variables

```env
# Database
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/subscriptions-tracker
ADMIN_API_KEY=your-admin-api-key

# Analytics
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
