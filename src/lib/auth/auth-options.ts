import { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { AUTH_CONFIG } from './config'
import { validateEmail, validatePassword, AuthError } from './validation'
import { authenticateUser } from './auth-service'
import { CustomUser } from '@/types/auth'

// Use a fallback secret in development - this is safe because the client
// can't directly access process.env values anyway on the client side
const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET || 'fallback-dev-secret-not-for-production';

// DEBUG HELPER: logs object without circular references
function safeLog(prefix: string, obj: any) {
  const seen = new WeakSet();
  const safeObj = JSON.stringify(obj, (key, value) => {
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) {
        return '[Circular]';
      }
      seen.add(value);
    }
    return value;
  }, 2);
  
  console.log(`${prefix}: ${safeObj}`);
  return obj; // For chaining
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
          console.log('[AUTH:DEBUG] ===== authorize() called =====');
          console.log('[AUTH:DEBUG] Environment:', process.env.NODE_ENV);
          console.log('[AUTH:DEBUG] NEXTAUTH_URL:', process.env.NEXTAUTH_URL);
          console.log('[AUTH:DEBUG] Has NEXTAUTH_SECRET:', !!process.env.NEXTAUTH_SECRET);
          
          console.log('[AUTH] Authorizing user with credentials', { 
            email: credentials?.email,
            hasPassword: !!credentials?.password,
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
          
          const result = await authenticateUser(
            credentials.email,
            credentials.password
          )

          console.log(`[AUTH] Authentication result: ${result.success ? 'success' : 'failed'}`, {
            success: result.success,
            error: result.error,
            userAvailable: !!result.data
          });

          if (!result.success || !result.data) {
            console.log('[AUTH] Authentication failed:', result.error)
            return null
          }

          console.log('[AUTH:DEBUG] User roles before return:');
          console.log('Type of roles:', typeof result.data.roles);
          console.log('Is array:', Array.isArray(result.data.roles));
          console.log('Roles value:', JSON.stringify(result.data.roles, null, 2));
          
          // Check for admin role
          const hasAdmin = result.data.roles.some((role: any) => {
            if (typeof role === 'string') return role === 'admin';
            return role && typeof role === 'object' && role.name === 'admin';
          });
          
          console.log('[AUTH:DEBUG] Has admin role:', hasAdmin);

          console.log('[AUTH] User authenticated successfully', {
            id: result.data.id,
            email: result.data.email,
            roles: result.data.roles
          });

          // Return user object - ENSURE ROLES IS SERIALIZABLE
          return {
            id: result.data.id,
            email: result.data.email,
            name: result.data.name,
            roles: result.data.roles || [],
          }
        } catch (error) {
          console.error('[AUTH:DEBUG] Authentication error in authorize():', error)
          return null
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      console.log('[AUTH:DEBUG] ===== jwt() callback called =====');
      console.log('[AUTH:JWT:DEBUG] Token before:', safeLog('token', {...token}));
      console.log('[AUTH:JWT:DEBUG] User provided:', !!user);
      
      if (user) {
        console.log('[AUTH:JWT:DEBUG] User data:', safeLog('user', user));
        
        const customUser = user as CustomUser
        token.id = customUser.id
        token.email = customUser.email
        token.name = customUser.name
        token.roles = customUser.roles || []
        
        console.log('[AUTH:JWT] Updated token with user data', {
          id: token.id,
          email: token.email,
          roles: JSON.stringify(token.roles)
        });
      }
      
      console.log('[AUTH:JWT:DEBUG] Final token to be encoded:', safeLog('final token', {...token}));
      return token
    },

    async session({ session, token }) {
      console.log('[AUTH:DEBUG] ===== session() callback called =====');
      console.log('[AUTH:SESSION:DEBUG] Building session from token:', safeLog('token', {...token}));
      console.log('[AUTH:SESSION:DEBUG] Initial session:', safeLog('session', {...session}));
      
      if (session.user) {
        session.user.id = token.id
        session.user.email = token.email
        session.user.name = token.name
        session.user.roles = token.roles || []
        
        console.log('[AUTH:SESSION:DEBUG] Updated session.user:', safeLog('session.user', {...session.user}));
        
        // Check for admin role
        const hasAdmin = session.user.roles.some((role: any) => {
          if (typeof role === 'string') return role === 'admin';
          return role && typeof role === 'object' && role.name === 'admin';
        });
        
        console.log('[AUTH:SESSION:DEBUG] Session has admin role:', hasAdmin);
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

  debug: true, // Enable debug for both development and production temporarily
  secret: NEXTAUTH_SECRET,
}