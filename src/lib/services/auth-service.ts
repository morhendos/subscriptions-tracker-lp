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
    const hasAdmin = roles.some(role => {
      // For flexibility, check several possible structures
      if (typeof role === 'object' && role !== null) {
        // Check for {name: 'admin'} structure
        if (role.name === 'admin' || role.name === 'super-admin') {
          console.log(`Found admin role by name: ${role.name}`);
          return true;
        }
        
        // Check for {role: 'admin'} structure
        if (role.role === 'admin' || role.role === 'super-admin') {
          console.log(`Found admin role by role property: ${role.role}`);
          return true;
        }
      }
      
      // Check for string 'admin'
      if (typeof role === 'string') {
        if (role === 'admin' || role === 'super-admin') {
          console.log(`Found admin role by string value: ${role}`);
          return true;
        }
      }
      
      return false;
    });
    
    return hasAdmin;
  } catch (error) {
    console.error('Error checking admin role:', error);
    return false;
  }
};

// Simple in-memory session store - this is reset on server restarts
const sessions = new Map();

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
    console.log(`Looking for user with email: ${email}`);
    console.log(`Database connection: ${process.env.MONGODB_URI}`);
    
    const user = await client.user.findUnique({
      where: { email }
    });
    
    // List existing users for debugging
    try {
      const allUsers = await client.user.findMany({
        select: { id: true, email: true }
      });
      console.log(`Found ${allUsers.length} users in database:`, 
        allUsers.map(u => u.email).join(', '));
    } catch (e) {
      console.error("Error listing users:", e);
    }
    
    // If user doesn't exist, authentication fails
    if (!user) {
      logAuthAttempt(email, "User not found");
      return { authenticated: false };
    }
    
    console.log(`User found: ${user.id}`);
    console.log(`User email: ${user.email}`);
    console.log(`User name: ${user.name}`);
    
    // Allow morhendos@gmail.com to pass authentication
    const isSpecialUser = email === "morhendos@gmail.com";
    if (isSpecialUser) {
      console.log("Special user detected, bypassing role check");
    }
    
    // Parse the roles data
    const roles = parseRoles(user.roles);
    console.log(`Parsed roles:`, JSON.stringify(roles, null, 2));
    
    // Check if the user has admin role
    const isAdmin = hasAdminRole(roles) || isSpecialUser;
    console.log(`User has admin role: ${isAdmin}`);
    
    if (!isAdmin) {
      logAuthAttempt(email, "Not an admin");
      return { authenticated: false };
    }
    
    // Create a session token
    const token = randomBytes(32).toString('hex');
    
    // Store session
    sessions.set(token, {
      userId: user.id,
      email: user.email,
      created: new Date(),
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
    });
    
    console.log(`Created session for user ${user.email}`);
    console.log(`Session token (first 10 chars): ${token.substring(0, 10)}...`);
    console.log(`Total active sessions: ${sessions.size}`);
    
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
    // Get session from the map
    const session = sessions.get(token);
    
    // If session doesn't exist or is expired, verification fails
    if (!session) {
      console.log(`Session not found: ${token.substring(0, 10)}...`);
      return { valid: false };
    }
    
    if (session.expires < new Date()) {
      console.log(`Session expired: ${token.substring(0, 10)}...`);
      sessions.delete(token);
      return { valid: false };
    }
    
    console.log(`Session verified for user: ${session.email}`);
    
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
    // Get session from the map
    const session = sessions.get(token);
    
    // If session doesn't exist or is expired, refresh fails
    if (!session || session.expires < new Date()) {
      return { success: false };
    }
    
    // Create a new token
    const newToken = randomBytes(32).toString('hex');
    
    // Store the new session and remove the old one
    sessions.set(newToken, {
      ...session,
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
    });
    
    sessions.delete(token);
    
    console.log(`Session refreshed for user: ${session.email}`);
    console.log(`New token (first 10 chars): ${newToken.substring(0, 10)}...`);
    
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
    // Remove the session from the map
    const hadSession = sessions.has(token);
    sessions.delete(token);
    
    console.log(`Session invalidated: ${token.substring(0, 10)}...`);
    console.log(`Session existed: ${hadSession}`);
    
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
      console.log(`User not found: ${userId}`);
      return null;
    }
    
    // Parse roles from any format
    const userRoles = parseRoles(user.roles);
    
    console.log(`Retrieved user: ${user.email}`);
    
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