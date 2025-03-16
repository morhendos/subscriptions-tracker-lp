import { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { AUTH_CONFIG } from './config'
import { validateEmail, validatePassword, AuthError } from './validation'
import { authenticateUser } from './auth-service'
import { CustomUser } from '@/types/auth'

// Use a fallback secret in development - this is safe because the client
// can't directly access process.env values anyway on the client side
const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET || 'fallback-dev-secret-not-for-production';

// Helper function to check if user has admin role
const hasAdminRole = (user: any): boolean => {
  if (!user || !user.roles) return false;
  
  try {
    if (Array.isArray(user.roles)) {
      return user.roles.some((role: any) => 
        (typeof role === 'string' && role === 'admin') || 
        (role && typeof role === 'object' && role.name === 'admin')
      );
    } else if (typeof user.roles === 'string') {
      try {
        const roles = JSON.parse(user.roles);
        return Array.isArray(roles) && roles.some((role: any) => 
          (typeof role === 'string' && role === 'admin') || 
          (role && typeof role === 'object' && role.name === 'admin')
        );
      } catch (e) {
        return false;
      }
    }
  } catch (e) {
    console.error('[AUTH] Error checking admin role:', e);
  }
  
  return false;
};

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
          console.log('[AUTH] Authorizing user with credentials', { 
            emailProvided: !!credentials?.email,
            passwordProvided: !!credentials?.password,
            environment: process.env.NODE_ENV
          });
          
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
          
          // We never log the actual credentials for security
          const result = await authenticateUser(
            credentials.email,
            credentials.password
          )

          console.log(`[AUTH] Authentication result: ${result.success ? 'success' : 'failed'}`, {
            success: result.success,
            hasError: !!result.error,
            userAvailable: !!result.data
          });

          if (!result.success || !result.data) {
            console.log('[AUTH] Authentication failed')
            return null
          }

          // Check if this is an admin page and if the user has admin rights
          const isAdminPage = req.headers?.referer?.includes('/admin');
          const userHasAdminRole = result.data && hasAdminRole(result.data);
          
          console.log('[AUTH] Access control check:', {
            isAdminPage,
            userHasAdminRole
          });
          
          // Prevent non-admin users from accessing admin pages
          if (isAdminPage && !userHasAdminRole) {
            console.log('[AUTH] Unauthorized access attempt to admin page');
            return null;
          }

          console.log('[AUTH] User authenticated successfully', {
            id: result.data.id,
            hasRoles: !!result.data.roles && result.data.roles.length > 0
          });

          // Return user object without sensitive data
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
      console.log('[AUTH:JWT] Processing JWT', { 
        hasUser: !!user, 
        hasToken: !!token
      });
      
      if (user) {
        const customUser = user as CustomUser
        token.id = customUser.id
        token.email = customUser.email
        token.name = customUser.name
        token.roles = customUser.roles || []
        
        console.log('[AUTH:JWT] Updated token with user data', {
          hasUserId: !!token.id,
          hasRoles: Array.isArray(token.roles) && token.roles.length > 0
        });
      }
      return token
    },

    async session({ session, token }) {
      console.log('[AUTH:SESSION] Processing session', { 
        hasUser: !!session.user,
        hasToken: !!token
      });
      
      if (session.user) {
        session.user.id = token.id
        session.user.email = token.email
        session.user.name = token.name
        session.user.roles = token.roles || []
        
        console.log('[AUTH:SESSION] Updated session with token data', {
          hasUserId: !!session.user.id,
          hasRoles: Array.isArray(session.user.roles) && session.user.roles.length > 0
        });
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
      name: process.env.NODE_ENV === 'development' ? 'next-auth.session-token' : '__Secure-next-auth.session-token',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV !== 'development'
      }
    },
    callbackUrl: {
      name: process.env.NODE_ENV === 'development' ? 'next-auth.callback-url' : '__Secure-next-auth.callback-url',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV !== 'development'
      }
    },
    csrfToken: {
      name: 'next-auth.csrf-token',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV !== 'development'
      }
    },
  },

  debug: process.env.NODE_ENV === 'development', // Only enable debug in development
  secret: NEXTAUTH_SECRET,
}