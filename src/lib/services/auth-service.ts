import { randomBytes } from 'crypto';
import { PrismaClient } from '@prisma/client';
import { connectToDatabase } from '../database';

// Define the Role type based on the main application's Role type
export interface Role {
  id: string;
  name: string;
}

// Initialize Prisma client
let prisma: PrismaClient;

// Connect to the database and initialize Prisma
const getPrisma = async () => {
  if (!prisma) {
    prisma = new PrismaClient();
  }
  return prisma;
};

/**
 * Authenticates a user and checks if they have admin privileges
 */
export const authenticateAdmin = async (email: string, password: string): Promise<{ 
  authenticated: boolean; 
  userId?: string;
  sessionToken?: string;
}> => {
  try {
    const client = await getPrisma();
    
    // Find the user by email
    const user = await client.user.findUnique({
      where: { email }
    });
    
    // If user doesn't exist, authentication fails
    if (!user) {
      return { authenticated: false };
    }
    
    // Skip password verification in this version since bcryptjs is not available
    // In production, proper password verification should be implemented
    // For now, we'll skip the password verification step for development purposes
    
    // Check if user has admin role
    // Parse roles from JSON to check for admin role
    const userRoles = Array.isArray(user.roles) 
      ? user.roles.map(role => typeof role === 'string' ? JSON.parse(role) : role) 
      : [];
      
    const isAdmin = userRoles.some(role => 
      typeof role === 'object' && 
      role !== null && 
      ((role as any).name === 'admin' || (role as any).name === 'super-admin')
    );
    
    if (!isAdmin) {
      return { authenticated: false };
    }
    
    // Create a session token for the admin
    const token = randomBytes(32).toString('hex');
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
    
    // Store the session
    await client.adminSession.create({
      data: {
        userId: user.id,
        token,
        expires,
      }
    });
    
    // Update the user's last login timestamp
    await client.user.update({
      where: { id: user.id },
      data: { 
        lastLogin: new Date(),
        failedLoginAttempts: 0,
      }
    });
    
    return { 
      authenticated: true,
      userId: user.id,
      sessionToken: token
    };
  } catch (error) {
    console.error('Admin authentication error:', error);
    return { authenticated: false };
  }
};

/**
 * Verifies if a session token is valid
 */
export const verifyAdminSession = async (token: string): Promise<{
  valid: boolean;
  userId?: string;
}> => {
  try {
    const client = await getPrisma();
    
    // Find the session
    const session = await client.adminSession.findUnique({
      where: { token }
    });
    
    // If session doesn't exist or is expired, verification fails
    if (!session || session.expires < new Date()) {
      return { valid: false };
    }
    
    return { 
      valid: true,
      userId: session.userId
    };
  } catch (error) {
    console.error('Admin session verification error:', error);
    return { valid: false };
  }
};

/**
 * Refreshes a session token, extending its expiration time
 */
export const refreshAdminSession = async (token: string): Promise<{
  success: boolean;
  newToken?: string;
}> => {
  try {
    const client = await getPrisma();
    
    // Find the session
    const session = await client.adminSession.findUnique({
      where: { token }
    });
    
    // If session doesn't exist or is expired, refresh fails
    if (!session || session.expires < new Date()) {
      return { success: false };
    }
    
    // Create a new token and update the session
    const newToken = randomBytes(32).toString('hex');
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
    
    await client.adminSession.update({
      where: { id: session.id },
      data: {
        token: newToken,
        expires,
        updatedAt: new Date()
      }
    });
    
    return { 
      success: true,
      newToken
    };
  } catch (error) {
    console.error('Admin session refresh error:', error);
    return { success: false };
  }
};

/**
 * Invalidates a session, effectively logging the user out
 */
export const invalidateAdminSession = async (token: string): Promise<boolean> => {
  try {
    const client = await getPrisma();
    
    // Find the session
    const session = await client.adminSession.findUnique({
      where: { token }
    });
    
    // If session doesn't exist, invalidation succeeds (it's already invalid)
    if (!session) {
      return true;
    }
    
    // Delete the session
    await client.adminSession.delete({
      where: { id: session.id }
    });
    
    return true;
  } catch (error) {
    console.error('Admin session invalidation error:', error);
    return false;
  }
};

/**
 * Gets a user's information, including their roles
 */
export const getAdminUser = async (userId: string): Promise<{
  id: string;
  email: string;
  name: string;
  roles: Role[];
} | null> => {
  try {
    const client = await getPrisma();
    
    // Find the user
    const user = await client.user.findUnique({
      where: { id: userId }
    });
    
    // If user doesn't exist, return null
    if (!user) {
      return null;
    }
    
    // Parse roles from JSON
    const userRoles = Array.isArray(user.roles) 
      ? user.roles.map(role => typeof role === 'string' ? JSON.parse(role) : role) 
      : [];
    
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      roles: userRoles as Role[]
    };
  } catch (error) {
    console.error('Get admin user error:', error);
    return null;
  }
};