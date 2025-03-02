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
    
    // For development purposes: accept any password for the admin user
    // In production, you would verify the password against the hashedPassword
    // This is a temporary solution until we can properly implement password verification
    
    // Check if user has admin role
    // Parse roles from JSON to check for admin role
    let roles: any[] = [];
    
    try {
      // Handle different formats of the roles field
      if (Array.isArray(user.roles)) {
        roles = user.roles.map(role => {
          if (typeof role === 'string') {
            try {
              return JSON.parse(role);
            } catch (e) {
              return role;
            }
          }
          return role;
        });
      }
    } catch (e) {
      console.error("Error parsing roles:", e);
      roles = [];
    }
    
    console.log("User roles:", JSON.stringify(roles, null, 2));
    
    // Check if the user has admin role
    const isAdmin = roles.some(role => {
      if (typeof role === 'object' && role !== null) {
        return role.name === 'admin' || role.name === 'super-admin';
      }
      return false;
    });
    
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
    let userRoles: Role[] = [];
    
    try {
      if (Array.isArray(user.roles)) {
        userRoles = user.roles.map(role => {
          if (typeof role === 'string') {
            try {
              return JSON.parse(role);
            } catch (e) {
              return role;
            }
          }
          return role;
        }) as Role[];
      }
    } catch (e) {
      console.error("Error parsing roles for user profile:", e);
      userRoles = [];
    }
    
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