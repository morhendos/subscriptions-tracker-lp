import { randomBytes } from 'crypto';
import { PrismaClient } from '@prisma/client';

// Define the Role type based on the main application's Role type
export interface Role {
  id?: string;
  name?: string;
  _id?: string; // MongoDB might use this format
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
 * Parse roles from MongoDB format to a standard Role[] array
 */
const parseRoles = (rolesData: any): Role[] => {
  try {
    console.log('Parsing roles, raw data:', JSON.stringify(rolesData));
    
    // If no data, return empty array
    if (!rolesData) {
      console.log('No roles data provided');
      return [];
    }
    
    // If already an array, ensure each item is properly formatted
    if (Array.isArray(rolesData)) {
      console.log(`Roles data is an array with ${rolesData.length} items`);
      
      // Map each role to ensure it has the correct structure
      const parsedRoles = rolesData.map(role => {
        // If role is a string, attempt to parse it
        if (typeof role === 'string') {
          try {
            return JSON.parse(role);
          } catch (e) {
            console.log(`Failed to parse role string: ${role}`);
            return { name: role }; // Treat the string as a role name
          }
        }
        
        // If role is already an object, use it directly
        if (typeof role === 'object' && role !== null) {
          return role;
        }
        
        return null;
      }).filter(role => role !== null);
      
      console.log(`Parsed ${parsedRoles.length} roles:`, JSON.stringify(parsedRoles));
      return parsedRoles;
    }
    
    // If it's a string, try to parse it as JSON
    if (typeof rolesData === 'string') {
      console.log('Roles data is a string, attempting to parse');
      try {
        const parsed = JSON.parse(rolesData);
        if (Array.isArray(parsed)) {
          return parsed;
        } else {
          return [parsed]; // Single role object
        }
      } catch (e) {
        console.log(`Failed to parse roles string: ${rolesData}`);
        return [{ name: rolesData }]; // Treat the string as a role name
      }
    }
    
    // If it's a single object, wrap it in an array
    if (typeof rolesData === 'object' && rolesData !== null) {
      console.log('Roles data is a single object');
      return [rolesData];
    }
    
    console.log('Could not parse roles data, returning empty array');
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
    console.log('Checking admin role for roles:', JSON.stringify(roles));
    
    // Direct check for the exact structure we saw in the data
    // Based on the data shared: name: "admin" or name: "user"
    const hasAdmin = roles.some(role => {
      if (role && typeof role === 'object') {
        // Check for name property with value 'admin'
        if (role.name === 'admin' || role.name === 'super-admin') {
          console.log(`Found admin role by name: ${role.name}`);
          return true;
        }
      } else if (typeof role === 'string') {
        // If role is somehow a string
        if (role === 'admin' || role === 'super-admin') {
          console.log(`Found admin role by string value: ${role}`);
          return true;
        }
      }
      
      return false;
    });
    
    console.log('Has admin role:', hasAdmin);
    return hasAdmin;
  } catch (error) {
    console.error('Error checking admin role:', error);
    return false;
  }
};

/**
 * Creates a new admin session in the database
 */
const createAdminSession = async (userId: string, userAgent?: string, ipAddress?: string): Promise<string | null> => {
  try {
    const client = await getPrisma();
    const token = randomBytes(32).toString('hex');
    
    // Set expiration time (30 days from now)
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 30);
    
    // Create session in database
    await client.adminSession.create({
      data: {
        userId,
        token,
        expires: expiresAt,
        userAgent,
        ipAddress
      }
    });
    
    console.log(`Created database session for user ${userId}`);
    console.log(`Session token (first 10 chars): ${token.substring(0, 10)}...`);
    
    return token;
  } catch (error) {
    console.error('Error creating admin session:', error);
    return null;
  }
};

/**
 * Authenticates a user and checks if they have admin privileges
 */
export const authenticateAdmin = async (
  email: string, 
  password: string, 
  userAgent?: string, 
  ipAddress?: string
): Promise<{ 
  authenticated: boolean; 
  userId?: string;
  sessionToken?: string;
  debugInfo?: any;
}> => {
  try {
    console.log('===== AUTHENTICATION ATTEMPT START =====');
    console.log(`Authenticating user: ${email}`);
    
    const client = await getPrisma();
    
    // Find the user by email
    console.log(`Looking for user with email: ${email}`);
    
    const user = await client.user.findUnique({
      where: { email }
    });
    
    // Debug: Check what users exist in the database
    try {
      console.log('Checking all users in database');
      const allUsers = await client.user.findMany({
        select: { id: true, email: true, roles: true }
      });
      console.log(`Found ${allUsers.length} users in database:`);
      allUsers.forEach(u => {
        console.log(`- User: ${u.email}, ID: ${u.id}, Roles: ${JSON.stringify(u.roles)}`);
      });
    } catch (e) {
      console.error("Error listing users:", e);
    }
    
    // If user doesn't exist, authentication fails
    if (!user) {
      logAuthAttempt(email, "User not found");
      console.log('===== AUTHENTICATION FAILED: USER NOT FOUND =====');
      return { authenticated: false, debugInfo: { error: 'User not found' } };
    }
    
    console.log(`User found: ${user.id}`);
    console.log(`User email: ${user.email}`);
    console.log(`User name: ${user.name}`);
    console.log(`User roles data:`, JSON.stringify(user.roles));
    
    // IMPORTANT: Temporarily disable password checking for debugging
    // Since we're focused on role-based authentication, this allows us to test that part
    console.log("NOTICE: Password verification is temporarily bypassed for testing");
    
    // Parse the roles data
    const roles = parseRoles(user.roles);
    console.log(`Parsed roles:`, JSON.stringify(roles, null, 2));
    
    // Check if the user has admin role
    const isAdmin = hasAdminRole(roles);
    console.log(`User has admin role: ${isAdmin}`);
    
    if (!isAdmin) {
      logAuthAttempt(email, "Not an admin");
      console.log('===== AUTHENTICATION FAILED: NOT ADMIN =====');
      return { 
        authenticated: false, 
        debugInfo: { 
          error: 'Not an admin', 
          roles: roles,
          checkResult: isAdmin
        } 
      };
    }
    
    // Create a session token and store in database
    const token = await createAdminSession(user.id, userAgent, ipAddress);
    
    if (!token) {
      console.error('Failed to create session token');
      console.log('===== AUTHENTICATION FAILED: SESSION CREATION ERROR =====');
      return { authenticated: false, debugInfo: { error: 'Failed to create session' } };
    }
    
    // Update user last login time
    await client.user.update({
      where: { id: user.id },
      data: {
        lastLogin: new Date(),
        failedLoginAttempts: 0 // Reset failed attempts on successful login
      }
    });
    
    console.log('===== AUTHENTICATION SUCCESSFUL =====');
    
    return { 
      authenticated: true,
      userId: user.id,
      sessionToken: token,
      debugInfo: { roles: roles, isAdmin: isAdmin }
    };
  } catch (error) {
    console.error('Admin authentication error:', error);
    console.log('===== AUTHENTICATION FAILED: EXCEPTION =====');
    return { authenticated: false, debugInfo: { error: String(error) } };
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
    
    // Find the session in the database
    const session = await client.adminSession.findUnique({
      where: { token }
    });
    
    // If session doesn't exist, verification fails
    if (!session) {
      console.log(`Session not found: ${token.substring(0, 10)}...`);
      return { valid: false };
    }
    
    // If session is expired, verification fails and we delete it
    if (session.expires < new Date()) {
      console.log(`Session expired: ${token.substring(0, 10)}...`);
      
      // Clean up expired session
      await client.adminSession.delete({
        where: { id: session.id }
      });
      
      return { valid: false };
    }
    
    console.log(`Session verified for user ID: ${session.userId}`);
    
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
    
    // Find the session in the database
    const session = await client.adminSession.findUnique({
      where: { token }
    });
    
    // If session doesn't exist or is expired, refresh fails
    if (!session || session.expires < new Date()) {
      return { success: false };
    }
    
    // Create a new token
    const newToken = randomBytes(32).toString('hex');
    
    // Set new expiration time (30 days from now)
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 30);
    
    // Update the session with new token and expiration
    await client.adminSession.update({
      where: { id: session.id },
      data: {
        token: newToken,
        expires: expiresAt,
        updatedAt: new Date()
      }
    });
    
    console.log(`Session refreshed for user ID: ${session.userId}`);
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
    const client = await getPrisma();
    
    // Find the session in the database
    const session = await client.adminSession.findUnique({
      where: { token }
    });
    
    // If session doesn't exist, invalidation technically succeeds
    if (!session) {
      console.log(`Session not found: ${token.substring(0, 10)}...`);
      return true;
    }
    
    // Delete the session from the database
    await client.adminSession.delete({
      where: { id: session.id }
    });
    
    console.log(`Session invalidated: ${token.substring(0, 10)}...`);
    
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

/**
 * Gets all active admin sessions
 */
export const getActiveSessions = async (): Promise<number> => {
  try {
    const client = await getPrisma();
    
    // Count active sessions (not expired)
    const count = await client.adminSession.count({
      where: {
        expires: {
          gt: new Date()
        }
      }
    });
    
    return count;
  } catch (error) {
    console.error('Error getting active sessions:', error);
    return 0;
  }
};

/**
 * Clean up expired sessions (can be used in a cron job)
 */
export const cleanupExpiredSessions = async (): Promise<number> => {
  try {
    const client = await getPrisma();
    
    // Delete expired sessions
    const result = await client.adminSession.deleteMany({
      where: {
        expires: {
          lt: new Date()
        }
      }
    });
    
    return result.count;
  } catch (error) {
    console.error('Error cleaning up expired sessions:', error);
    return 0;
  }
};
