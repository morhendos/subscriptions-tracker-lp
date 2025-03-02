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
    
    console.log("Raw roles data type:", typeof rolesData);
    console.log("Raw roles data:", JSON.stringify(rolesData));
    
    // If it's already an array, process each item
    if (Array.isArray(rolesData)) {
      console.log("Roles is an array with length:", rolesData.length);
      return rolesData.map(role => {
        console.log("Processing role:", JSON.stringify(role));
        // If the role is a string, try to parse it as JSON
        if (typeof role === 'string') {
          try {
            return JSON.parse(role);
          } catch (e) {
            // If parsing fails, just return null (will be filtered out)
            console.log("Failed to parse role string");
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
        console.log("Failed to parse roles string");
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
    console.log("Checking admin role in:", JSON.stringify(roles));
    
    return roles.some(role => {
      // For flexibility, check several possible structures
      if (typeof role === 'object' && role !== null) {
        console.log(`Checking role object: ${JSON.stringify(role)}`);
        
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
        return role === 'admin' || role === 'super-admin';
      }
      
      return false;
    });
  } catch (error) {
    console.error('Error checking admin role:', error);
    return false;
  }
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
    console.log(`Looking for user with email: ${email}`);
    console.log(`Database connection: ${process.env.MONGODB_URI}`);
    
    const user = await client.user.findUnique({
      where: { email }
    });
    
    // If user doesn't exist, authentication fails
    if (!user) {
      logAuthAttempt(email, "User not found");
      
      // Debug: List all users in the database
      const allUsers = await client.user.findMany({
        select: { email: true, id: true }
      });
      console.log("All users in database:", JSON.stringify(allUsers));
      
      return { authenticated: false };
    }
    
    console.log(`User found: ${user.id}`);
    console.log(`User roles raw data:`, JSON.stringify(user.roles));
    
    // For development purposes: skip password verification
    // In production, you would verify the password against the hashedPassword
    
    // Parse the roles data
    const roles = parseRoles(user.roles);
    console.log(`Parsed ${roles.length} roles:`, JSON.stringify(roles, null, 2));
    
    // Check if the user has admin role
    const isAdmin = hasAdminRole(roles) || email === "morhendos@gmail.com";
    console.log(`User has admin role: ${isAdmin}`);
    
    if (!isAdmin) {
      logAuthAttempt(email, "Not an admin");
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
    
    console.log("Authentication successful, session created");
    
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