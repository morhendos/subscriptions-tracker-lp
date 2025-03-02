import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

/**
 * GET /api/admin/debug - Debug endpoint for checking database connection and admin users
 * This is a development-only endpoint and should be disabled in production
 */
export async function GET(req: NextRequest) {
  console.log("GET /api/admin/debug - Testing database connection and admin roles");
  
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Debug endpoint disabled in production' }, { status: 403 });
  }
  
  try {
    // Connect to the database
    console.log("Initializing Prisma client...");
    const prisma = new PrismaClient();
    
    // Test database connection
    console.log("Testing database connection...");
    await prisma.$connect();
    console.log("Database connection successful");
    
    // Check for admin users
    console.log("Looking for users with admin role...");
    const users = await prisma.user.findMany();
    console.log(`Found ${users.length} users in the database`);
    
    // For each user, check if they have an admin role
    const adminUsers = [];
    for (const user of users) {
      try {
        let roles = [];
        
        if (Array.isArray(user.roles)) {
          // Parse the roles to check for admin role
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
        
        // Check if any role has name 'admin' or 'super-admin'
        const isAdmin = roles.some(role => {
          if (typeof role === 'object' && role !== null) {
            return role.name === 'admin' || role.name === 'super-admin';
          }
          return false;
        });
        
        if (isAdmin) {
          adminUsers.push({
            id: user.id,
            email: user.email,
            name: user.name,
            roles: roles
          });
        }
      } catch (e) {
        console.error(`Error processing user ${user.id}:`, e);
      }
    }
    
    console.log(`Found ${adminUsers.length} admin users`);
    
    // Clean up
    await prisma.$disconnect();
    
    return NextResponse.json({
      success: true,
      dbConnection: true,
      totalUsers: users.length,
      adminUsers: adminUsers,
      rawUsers: users.map(user => ({
        id: user.id,
        email: user.email,
        name: user.name,
        roles: user.roles
      }))
    });
  } catch (error) {
    console.error('Debug error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Debug failed', 
        details: String(error),
        stack: error instanceof Error ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}