'use server'

import { authenticateUser, registerUser, createAdminUser } from '@/lib/auth';
import { AuthResult, CustomUser } from '@/types/auth';
import { z } from 'zod';

// Validation schema for login
const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

// Validation schema for registration
const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
});

/**
 * Server action to authenticate a user
 */
export async function loginUser(
  email: string,
  password: string
): Promise<AuthResult> {
  try {
    // Validate inputs
    const validationResult = loginSchema.safeParse({ email, password });
    if (!validationResult.success) {
      return {
        success: false,
        error: {
          code: 'validation_error',
          message: validationResult.error.message || 'Invalid input data',
        },
      };
    }

    // Authenticate user
    return await authenticateUser(email, password);
  } catch (error) {
    console.error('[AUTH ACTION] Login error:', error);
    return {
      success: false,
      error: {
        code: 'server_error',
        message: 'An unexpected error occurred. Please try again.',
      },
    };
  }
}

/**
 * Server action to register a new user
 */
export async function signupUser(
  email: string,
  password: string,
  name: string
): Promise<AuthResult> {
  try {
    // Validate inputs
    const validationResult = registerSchema.safeParse({ email, password, name });
    if (!validationResult.success) {
      return {
        success: false,
        error: {
          code: 'validation_error',
          message: validationResult.error.message || 'Invalid input data',
        },
      };
    }

    // Register user
    return await registerUser(email, password, name);
  } catch (error) {
    console.error('[AUTH ACTION] Signup error:', error);
    return {
      success: false,
      error: {
        code: 'server_error',
        message: 'An unexpected error occurred. Please try again.',
      },
    };
  }
}

/**
 * Server action to create an admin user (should be protected/used in a controlled environment)
 */
export async function createAdmin(
  email: string,
  password: string,
  name: string,
  secretKey: string
): Promise<AuthResult> {
  try {
    // Check secret key
    const adminSecretKey = process.env.ADMIN_SECRET_KEY;
    if (!adminSecretKey || secretKey !== adminSecretKey) {
      return {
        success: false,
        error: {
          code: 'unauthorized',
          message: 'Not authorized to create admin account',
        },
      };
    }

    // Validate inputs
    const validationResult = registerSchema.safeParse({ email, password, name });
    if (!validationResult.success) {
      return {
        success: false,
        error: {
          code: 'validation_error',
          message: validationResult.error.message || 'Invalid input data',
        },
      };
    }

    // Create admin user
    return await createAdminUser(email, password, name);
  } catch (error) {
    console.error('[AUTH ACTION] Create admin error:', error);
    return {
      success: false,
      error: {
        code: 'server_error',
        message: 'An unexpected error occurred. Please try again.',
      },
    };
  }
}
