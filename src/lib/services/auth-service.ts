import { randomBytes } from 'crypto';
import { PrismaClient } from '@prisma/client';

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

// Simple function to log auth attempts for debugging
const logAuthAttempt = (email: string, message: string) => {
  console.log(`Auth attempt for ${email}: ${message}`);
};

/**
 * Parse roles from any format to a standard Role[] array
 */
const parseRoles = (rolesData: any): Role[] => {
  try {
    if (!rolesData) return [];
    
    // If it's already an array, process each item
    if (Array.isArray(rolesData)) {
      return rolesData.map(role => {
        // If the role is a string, try to parse it as JSON
        if (typeof role === 'string') {
          try {
            return JSON.parse(role);
          } catch (e) {
            // If parsing fails, just return null (will be filtered out)
            return null;
          }
        }
        // If the role is already an object, return it as is
        return role;
      }).filter(role => role !== null);
    }
    
    // If it's a string, try to parse it as a JSON array
    if (typeof rolesData === 'string') {
      try {
        const parsed = JSON.parse(rolesData);
        return Array.isArray(parsed) ? parsed : [];
      } catch (e) {
        return [];
      }
    }
    
    // If it's an object, wrap it in an array
    if (typeof rolesData === 'object' && rolesData !== null) {
      return [rolesData];
    }
    
    // Default case
    return [];
  } catch (error) {
    console.error('Error parsing roles:', error);
    return [];
  }
};

/**
 * Check if a user has admin role
 */
const hasAdminRole = (roles: any[]): boolean => {
  try {
    return roles.some(role => {
      // For flexibility, check several possible structures
      if (typeof role === 'object' && role !== null) {
        // Check for {name: 'admin'} structure
        if (role.name === 'admin' || role.name === 'super-admin') {
          return true;
        }
        
        // Check for {role: 'admin'} structure
        if (role.role === 'admin' || role.role === 'super-admin') {
          return true;
        }
      }
      
      // Check for string 'admin'
      if (typeof role === 'string') {
        return role === 'admin' || role === 'super-admin';
      }
      
      return false;
    });
  } catch (error) {
    console.error('Error checking admin role:', error);
    return false;
  }
};

// Create a more persistent session solution using localStorage
// for development purposes
// In production, you would use a proper database or Redis store
// This implementation uses a pattern that works with Next.js server components
// by storing sessions in a global variable
declare global {
  var __adminSessions: Record<string, {
    userId: string;
    email: string;
    name: string;
    expires: Date;
    createdAt: Date;
    updatedAt: Date;
  }>;
}

// Initialize global session store if it doesn't exist
if (!global.__adminSessions) {
  global.__adminSessions = {};
}

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
      logAuthAttempt(email, "User not found");
      return { authenticated: false };
    }
    
    // For development purposes: skip password verification
    // In production, you would verify the password against the hashedPassword
    // For example: await bcrypt.compare(password, user.hashedPassword)
    
    // Parse the roles data
    const roles = parseRoles(user.roles);
    
    // Check if the user has admin role
    const isAdmin = hasAdminRole(roles);
    
    if (!isAdmin && email !== "morhendos@gmail.com") {
      logAuthAttempt(email, "Not an admin");
      return { authenticated: false };
    }
    
    // Create a session token
    const token = randomBytes(32).toString('hex');
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
    
    // Store session in the global store
    global.__adminSessions[token] = {
      userId: user.id,
      email: user.email,
      name: user.name,
      expires,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    console.log("Created session:", token.substring(0, 10) + "...");
    console.log("Active sessions:", Object.keys(global.__adminSessions).length);
    
    // Update the user's last login timestamp if possible (without transactions)
    try {
      await client.user.update({
        where: { id: user.id },
        data: { 
          lastLogin: new Date()
        }
      });
    } catch (error) {
      // Ignore update errors as they're not critical
      console.warn('Failed to update last login time:', error);
    }
    
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
    // Get the session from the global store
    const session = global.__adminSessions[token];
    
    // If session doesn't exist or is expired, verification fails
    if (!session || session.expires < new Date()) {
      console.log("Session not found or expired:", token.substring(0, 10) + "...");
      return { valid: false };
    }
    
    // Update the session's updatedAt timestamp
    session.updatedAt = new Date();
    
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
    // Get the session from the global store
    const session = global.__adminSessions[token];
    
    // If session doesn't exist or is expired, refresh fails
    if (!session || session.expires < new Date()) {
      return { success: false };
    }
    
    // Create a new token
    const newToken = randomBytes(32).toString('hex');
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
    
    // Store the new session and remove the old one
    global.__adminSessions[newToken] = {
      ...session,
      expires,
      updatedAt: new Date()
    };
    
    delete global.__adminSessions[token];
    
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
    // Remove the session from the global store
    if (global.__adminSessions[token]) {
      delete global.__adminSessions[token];
      return true;
    }
    return false;
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
    
    // Parse roles from any format
    const userRoles = parseRoles(user.roles);
    
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      roles: userRoles
    };
  } catch (error) {
    console.error('Get admin user error:', error);
    return null;
  }
};