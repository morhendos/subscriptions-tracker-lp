import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

/**
 * Debug endpoint to check user roles in the database
 * This is for development use only and should be removed in production
 */
export async function GET(req: NextRequest) {
  // Only allow in development or testing environments
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json(
      { error: 'Debug endpoints are not available in production' },
      { status: 403 }
    );
  }
  
  try {
    // Get the email from query params
    const email = req.nextUrl.searchParams.get('email');
    
    const prisma = new PrismaClient();
    
    let result;
    if (email) {
      // Get single user if email is provided
      const user = await prisma.user.findUnique({
        where: { email },
        select: {
          id: true,
          email: true,
          name: true,
          roles: true,
          hashedPassword: true, // Include for debugging
        },
      });
      
      if (!user) {
        return NextResponse.json(
          { error: 'User not found' },
          { status: 404 }
        );
      }
      
      result = {
        user,
        roleInfo: {
          type: typeof user.roles,
          isArray: Array.isArray(user.roles),
          length: Array.isArray(user.roles) ? user.roles.length : 'N/A',
          stringified: JSON.stringify(user.roles),
        }
      };
    } else {
      // Get all users if no email provided
      const users = await prisma.user.findMany({
        select: {
          id: true,
          email: true,
          name: true,
          roles: true,
        },
      });
      
      result = {
        users,
        count: users.length,
        adminCount: users.filter(u => {
          if (Array.isArray(u.roles)) {
            return u.roles.some((role: any) => {
              if (role && typeof role === 'object' && 'name' in role) {
                return role.name === 'admin';
              }
              return false;
            });
          }
          return false;
        }).length,
      };
    }
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('Debug roles error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch role information', details: String(error) },
      { status: 500 }
    );
  }
}