import { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { AUTH_CONFIG } from './config'
import { validateEmail, validatePassword, AuthError } from './validation'
import { authenticateUser } from './auth-service'
import { CustomUser } from '@/types/auth'

// In development, provide a default secret if environment variable is missing
const isDevEnvironment = process.env.NODE_ENV === 'development' || 
                         typeof window !== 'undefined'; // Also check if running in browser

// Set default values for development
let nextAuthSecret = process.env.NEXTAUTH_SECRET;
let nextAuthUrl = process.env.NEXTAUTH_URL;

// If we're in development and missing the secret, use a default
if (isDevEnvironment && !nextAuthSecret) {
  console.warn('[NEXTAUTH] Using fallback secret for development. DO NOT use in production!');
  nextAuthSecret = 'development-secret-do-not-use-in-production';
}

// If we're in development and missing the URL, use a default
if (isDevEnvironment && !nextAuthUrl) {
  console.warn('[NEXTAUTH] Using default NEXTAUTH_URL for development');
  nextAuthUrl = 'http://localhost:3000';
}

// Only throw errors in production
if (!isDevEnvironment && !nextAuthSecret) {
  console.error('[NEXTAUTH] Missing NEXTAUTH_SECRET environment variable');
  throw new Error('NEXTAUTH_SECRET must be set in environment variables');
}

if (!isDevEnvironment && !nextAuthUrl) {
  console.error('[NEXTAUTH] Missing NEXTAUTH_URL environment variable in production');
  throw new Error('NEXTAUTH_URL must be set in production environment');
}

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials, req) {
        try {
          console.log('[AUTH] Authorizing user with credentials')
          
          if (!credentials?.email || !credentials?.password) {
            console.log('[AUTH] Missing email or password')
            throw new AuthError('Email and password are required', 'invalid_credentials')
          }

          if (!validateEmail(credentials.email)) {
            console.log('[AUTH] Invalid email format')
            throw new AuthError('Invalid email format', 'invalid_credentials')
          }

          if (!validatePassword(credentials.password)) {
            console.log('[AUTH] Invalid password format')
            throw new AuthError('Password must be at least 8 characters', 'invalid_credentials')
          }
          
          const result = await authenticateUser(
            credentials.email,
            credentials.password
          )

          console.log(`[AUTH] Authentication result: ${result.success ? 'success' : 'failed'}`)

          if (!result.success || !result.data) {
            console.log('[AUTH] Authentication failed:', result.error)
            return null
          }

          // Return user object
          return {
            id: result.data.id,
            email: result.data.email,
            name: result.data.name,
            roles: result.data.roles || [],
          }
        } catch (error) {
          console.error('[AUTH] Authentication error:', error)
          return null
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const customUser = user as CustomUser
        token.id = customUser.id
        token.email = customUser.email
        token.name = customUser.name
        token.roles = customUser.roles || []
      }
      return token
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id
        session.user.email = token.email
        session.user.name = token.name
        session.user.roles = token.roles || []
      }
      return session
    },
  },

  pages: AUTH_CONFIG.ROUTES,

  session: {
    strategy: 'jwt',
    maxAge: AUTH_CONFIG.SESSION_MAX_AGE,
  },

  cookies: {
    sessionToken: {
      name: isDevEnvironment ? 'next-auth.session-token' : '__Secure-next-auth.session-token',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: !isDevEnvironment
      }
    },
    callbackUrl: {
      name: isDevEnvironment ? 'next-auth.callback-url' : '__Secure-next-auth.callback-url',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: !isDevEnvironment
      }
    },
    csrfToken: {
      name: 'next-auth.csrf-token',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: !isDevEnvironment
      }
    },
  },

  debug: isDevEnvironment,
  // Always provide a secret, even if it's a fallback for development
  secret: nextAuthSecret,
}