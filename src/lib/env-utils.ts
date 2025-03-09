import dotenv from 'dotenv';

// Load environment variables from .env files
export function loadEnvVars() {
  dotenv.config();
  
  // Also try loading from .env.local for local development
  try {
    dotenv.config({ path: '.env.local' });
  } catch (e) {
    console.warn('No .env.local file found');
  }

  // Debug output for environment status
  const nextAuthSecret = process.env.NEXTAUTH_SECRET ? '[SET]' : '[MISSING]';
  const nextAuthUrl = process.env.NEXTAUTH_URL ? '[SET]' : '[MISSING]';
  const dbUrl = process.env.DATABASE_URL ? '[SET]' : '[MISSING]';

  console.log(`Environment variables status:
    NEXTAUTH_SECRET: ${nextAuthSecret}
    NEXTAUTH_URL: ${nextAuthUrl}
    DATABASE_URL: ${dbUrl}
  `);
}

// Call this function to ensure critical env vars are set
export function ensureEnvVars() {
  const requiredVars = ['NEXTAUTH_SECRET', 'NEXTAUTH_URL', 'DATABASE_URL'];
  const missing = requiredVars.filter(v => !process.env[v]);
  
  if (missing.length > 0) {
    console.error(`Missing required environment variables: ${missing.join(', ')}`);
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
}