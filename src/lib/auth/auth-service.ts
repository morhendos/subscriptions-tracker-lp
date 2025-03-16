import bcrypt from 'bcryptjs';
import { prisma } from '../prisma';
import { Prisma } from '@prisma/client';
import { CustomUser, Role, AuthResult } from '@/types/auth';

// Helper function to serialize user data
export function serializeUser(user: any): CustomUser {
  console.log('[AUTH] Serializing user:', { 
    id: user.id, 
    email: user.email, 
    // Remove logging of sensitive data like roles
    hasRoles: !!user.roles
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
    // Don't log the original value as it may contain sensitive information
    roles = [];
  }
  
  // Log role information safely
  console.log('[AUTH] User has roles:', roles.length > 0);
    
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

// Authenticate a user with email and password
export async function authenticateUser(
  email: string,
  password: string
): Promise<AuthResult> {
  console.log('[AUTH] Authenticating user (email redacted for security)');
  
  try {
    // Find user by email
    console.log('[AUTH] Looking up user in database');
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() }
    });
    
    if (!user) {
      console.log('[AUTH] User not found');
      // Use a generic error message to prevent email enumeration
      return {
        success: false,
        error: {
          code: 'invalid_credentials',
          message: 'Invalid credentials. Please check your email and password.'
        }
      };
    }
    
    console.log('[AUTH] User found:', { 
      id: user.id, 
      // Don't log potentially identifying information
      emailVerified: user.emailVerified,
      hasPasswordHash: !!user.hashedPassword,
      // Don't log password hash length or other details that could leak information
    });

    // Verify password using constant-time comparison
    console.log('[AUTH] Verifying password');
    
    // Check if user has a hash (safety check)
    if (!user.hashedPassword) {
      console.error('[AUTH] User has no password hash');
      return {
        success: false,
        error: {
          code: 'account_issue',
          message: 'Account requires reset. Please contact support.'
        }
      };
    }
    
    const isValid = await bcrypt.compare(password, user.hashedPassword);
    console.log('[AUTH] Password verification completed');
    
    if (!isValid) {
      // Implement rate limiting for failed attempts
      await prisma.user.update({
        where: { id: user.id },
        data: { failedLoginAttempts: (user.failedLoginAttempts || 0) + 1 }
      });
      
      return {
        success: false,
        error: {
          code: 'invalid_credentials',
          message: 'Invalid credentials. Please check your email and password.'
        }
      };
    }
    
    // Reset failed login attempts on successful login
    await prisma.user.update({
      where: { id: user.id },
      data: { failedLoginAttempts: 0 }
    });
    
    // Check if email is verified
    if (user.emailVerified === false) {
      console.log('[AUTH] User email is not verified, but proceeding with authentication');
      // Note: We're continuing the authentication process even if email is not verified
      // If you want to enforce email verification, you could return an error here
    }
    
    // Check for admin role
    const serializedUser = serializeUser(user);
    let hasAdminRole = false;
    
    try {
      // Check roles for admin
      if (serializedUser.roles && Array.isArray(serializedUser.roles)) {
        hasAdminRole = serializedUser.roles.some(role => 
          typeof role === 'string' 
            ? role === 'admin' 
            : (role && role.name === 'admin')
        );
      }
    } catch (error) {
      console.error('[AUTH] Error checking admin role:', error);
    }
    
    console.log('[AUTH] User admin status:', hasAdminRole);
    
    // If user doesn't have admin role, check if this is an admin-only area
    if (!hasAdminRole) {
      // The logic for this would depend on your application
      // This is just a placeholder for where you might implement route-based access control
      console.log('[AUTH] User authenticated, but lacks admin role');
    }
    
    console.log('[AUTH] Authentication successful');
    
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

    // Hash password with strong parameters
    const hashedPassword = await bcrypt.hash(password, 12); // Increased from 10 to 12 rounds

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
