import bcrypt from 'bcryptjs';
import { prisma } from '../prisma';
import { Prisma } from '@prisma/client';
import { CustomUser, Role, AuthResult } from '@/types/auth';
import crypto from 'crypto';

// Helper function to serialize user data
export function serializeUser(user: any): CustomUser {
  console.log('[AUTH] Serializing user:', { 
    id: user.id, 
    email: user.email, 
    roles: typeof user.roles === 'string' ? user.roles : JSON.stringify(user.roles) 
  });
  
  let roles: Role[] = [];
  
  try {
    if (typeof user.roles === 'string') {
      roles = JSON.parse(user.roles);
    } else if (Array.isArray(user.roles)) {
      roles = user.roles;
    } else if (user.roles && typeof user.roles === 'object') {
      // Handle case where roles might already be parsed as an object
      roles = [user.roles];
    }
  } catch (error) {
    console.error('[AUTH] Error parsing roles:', error);
    console.error('[AUTH] Original roles value:', user.roles);
    roles = [];
  }
  
  console.log('[AUTH] Parsed roles:', roles);
    
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    roles,
    emailVerified: user.emailVerified,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    failedLoginAttempts: user.failedLoginAttempts || 0
  };
}

// Check if the password is in hashed transit format
function isHashedPassword(password: string): boolean {
  // Transit-hashed passwords have format: timestamp:hash
  return password.includes(':') && !isNaN(Number(password.split(':')[0]));
}

// Verify a transit-hashed password
async function verifyTransitHash(transitHash: string, storedHash: string): Promise<boolean> {
  try {
    // Parse the transit hash
    const [salt, hash] = transitHash.split(':');
    
    // We need to recreate the plaintext (which we can't), so we always return false
    // In a real implementation, we would need a server-side secret to recreate the hash
    // This is a placeholder for future enhancement
    return false;
  } catch (error) {
    console.error('[AUTH] Error verifying transit hash:', error);
    return false;
  }
}

// Authenticate a user with email and password
export async function authenticateUser(
  email: string,
  password: string
): Promise<AuthResult> {
  console.log('[AUTH] Authenticating user:', email);
  
  try {
    // Find user by email
    console.log('[AUTH] Looking up user in database');
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() }
    });
    
    if (!user) {
      console.log('[AUTH] User not found');
      return {
        success: false,
        error: {
          code: 'invalid_credentials',
          message: 'No account found with this email. Please check your email or create a new account.'
        }
      };
    }
    
    console.log('[AUTH] User found:', { 
      id: user.id, 
      email: user.email,
      emailVerified: user.emailVerified,
      hasPasswordHash: !!user.hashedPassword,
      passwordHashLength: user.hashedPassword?.length || 0
    });

    // Verify password if hash exists
    if (!user.hashedPassword) {
      console.error('[AUTH] User has no password hash');
      return {
        success: false,
        error: {
          code: 'account_issue',
          message: 'Account requires password reset. Please contact support.'
        }
      };
    }

    console.log('[AUTH] Verifying password');
    
    let isValid = false;
    
    // Check if the password is a transit hash
    if (isHashedPassword(password)) {
      console.log('[AUTH] Detected client-side hashed password');
      // This is a placeholder - for now, we still need to verify the original password
      // since we don't have the server-side implementation to verify transit hashes yet
      
      // In production, we would implement transit hash verification
      // isValid = await verifyTransitHash(password, user.hashedPassword);
      
      // For now, we'll just return false to force the user to use plaintext
      // until we implement the server-side verification
      isValid = false;
    } else {
      // Standard bcrypt comparison
      isValid = await bcrypt.compare(password, user.hashedPassword);
    }
    
    console.log('[AUTH] Password verification result:', isValid);
    
    if (!isValid) {
      return {
        success: false,
        error: {
          code: 'invalid_credentials',
          message: 'Incorrect password. Please try again.'
        }
      };
    }
    
    // Check if email is verified
    if (user.emailVerified === false) {
      console.log('[AUTH] User email is not verified, but proceeding with authentication');
      // Note: We're continuing the authentication process even if email is not verified
      // If you want to enforce email verification, you could return an error here
    }
    
    const serializedUser = serializeUser(user);
    console.log('[AUTH] Authentication successful, returning user');
    
    return {
      success: true,
      data: serializedUser
    };
  } catch (error) {
    console.error('[AUTH] Authentication error:', error);
    
    return {
      success: false,
      error: {
        code: 'server_error',
        message: 'An unexpected error occurred. Please try again.'
      }
    };
  }
}

// Register a new user
export async function registerUser(
  email: string,
  password: string,
  name: string,
  roles: Role[] = [{ id: '1', name: 'user' }]
): Promise<AuthResult> {
  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() }
    });
    
    if (existingUser) {
      return {
        success: false,
        error: {
          code: 'email_exists',
          message: 'This email is already registered. Please use a different email or log in.'
        }
      };
    }

    // Hash password - handle transit hashed passwords
    let hashedPassword: string;
    
    if (isHashedPassword(password)) {
      // If it's already hashed for transit, we should re-hash it properly for storage
      // For now, just use the plaintext part (not recommended for production)
      // In a real implementation, we would need a server-side secret to recreate the hash
      hashedPassword = await bcrypt.hash(password, 10);
    } else {
      // Standard password hashing
      hashedPassword = await bcrypt.hash(password, 10);
    }

    // Create user
    const user = await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        name,
        hashedPassword,
        // Fix: Cast to Prisma.InputJsonValue instead of JsonValue
        roles: JSON.stringify(roles) as Prisma.InputJsonValue,
        emailVerified: false,
        failedLoginAttempts: 0  // Initialize with 0 failed attempts
      }
    });
    
    return {
      success: true,
      data: serializeUser(user)
    };
  } catch (error) {
    console.error('[AUTH] Registration error:', error);
    
    return {
      success: false,
      error: {
        code: 'server_error',
        message: 'An unexpected error occurred during registration. Please try again.'
      }
    };
  }
}

// Create an admin user (simplified for first-time setup)
export async function createAdminUser(
  email: string,
  password: string,
  name: string
): Promise<AuthResult> {
  return registerUser(
    email, 
    password, 
    name, 
    [{ id: '1', name: 'user' }, { id: '2', name: 'admin' }]
  );
}

// Get user by email
export async function getUserByEmail(email: string): Promise<CustomUser | null> {
  try {
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() }
    });
    
    return user ? serializeUser(user) : null;
  } catch (error) {
    console.error('[AUTH] Get user error:', error);
    return null;
  }
}

// Get user by id
export async function getUserById(id: string): Promise<CustomUser | null> {
  try {
    const user = await prisma.user.findUnique({
      where: { id }
    });
    
    return user ? serializeUser(user) : null;
  } catch (error) {
    console.error('[AUTH] Get user error:', error);
    return null;
  }
}