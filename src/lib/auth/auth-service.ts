import bcrypt from 'bcryptjs';
import { prisma } from '../prisma';
import { Prisma } from '@prisma/client';
import { CustomUser, Role, AuthResult } from '@/types/auth';

// Helper function to serialize user data
export function serializeUser(user: any): CustomUser {
  const roles = typeof user.roles === 'string' 
    ? JSON.parse(user.roles) 
    : (user.roles as Role[] || []);
    
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    roles,
    emailVerified: user.emailVerified,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
  };
}

// Authenticate a user with email and password
export async function authenticateUser(
  email: string,
  password: string
): Promise<AuthResult> {
  try {
    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() }
    });
    
    if (!user) {
      return {
        success: false,
        error: {
          code: 'invalid_credentials',
          message: 'No account found with this email. Please check your email or create a new account.'
        }
      };
    }

    // Verify password
    const isValid = await bcrypt.compare(password, user.hashedPassword);
    if (!isValid) {
      return {
        success: false,
        error: {
          code: 'invalid_credentials',
          message: 'Incorrect password. Please try again.'
        }
      };
    }
    
    return {
      success: true,
      data: serializeUser(user)
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

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        name,
        hashedPassword,
        roles: roles as unknown as Prisma.JsonValue,
        emailVerified: false
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
