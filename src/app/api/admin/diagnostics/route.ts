import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { AUTH_CONFIG } from '@/lib/auth/config';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth/auth-options';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    // Check for authentication
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'Unauthorized - please log in' },
        { status: 401 }
      );
    }

    // Check for admin role
    const userRoles = session.user.roles || [];
    const isAdmin = userRoles.some(role => role.name === 'admin');
    if (!isAdmin) {
      return NextResponse.json(
        { error: 'Forbidden - admin access required' },
        { status: 403 }
      );
    }

    // Now run diagnostics
    const diagnostics = {
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
      nodeVersion: process.version,
      auth: {
        nextAuthUrl: process.env.NEXTAUTH_URL || 'Not set',
        hasNextAuthSecret: !!process.env.NEXTAUTH_SECRET,
        adminRoles: AUTH_CONFIG.ADMIN_ROLES,
        sessionStrategy: 'jwt',
      },
      session: {
        user: {
          id: session.user.id,
          email: session.user.email,
          name: session.user.name,
          roles: session.user.roles,
        }
      },
      database: {
        hasConnectionString: !!process.env.DATABASE_URL,
        connectionTest: 'pending',
        userCount: 0,
        collections: [],
        adminUser: null
      }
    };

    // Test database connection
    try {
      // Test basic connectivity
      const userCount = await prisma.user.count();
      diagnostics.database.connectionTest = 'successful';
      diagnostics.database.userCount = userCount;

      // Get collections info (safely)
      try {
        const collectionsData = await prisma.$queryRaw`SHOW COLLECTIONS`;
        diagnostics.database.collections = collectionsData;
      } catch (e) {
        diagnostics.database.collections = ['Error fetching collections'];
      }

      // Try to find admin user (safely masking sensitive data)
      const adminUser = await prisma.user.findFirst({
        where: {
          email: session.user.email,
        }
      });

      if (adminUser) {
        diagnostics.database.adminUser = {
          id: adminUser.id,
          email: adminUser.email,
          name: adminUser.name,
          emailVerified: adminUser.emailVerified,
          hasPassword: !!adminUser.hashedPassword,
          passwordLength: adminUser.hashedPassword?.length,
          roles: adminUser.roles,
          createdAt: adminUser.createdAt,
          failedLoginAttempts: adminUser.failedLoginAttempts,
        };
      }
    } catch (e) {
      const error = e as Error;
      diagnostics.database.connectionTest = `failed: ${error.message}`;
    }

    return NextResponse.json(diagnostics);
  } catch (error) {
    console.error('Diagnostics API error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: 'Internal error running diagnostics', details: errorMessage },
      { status: 500 }
    );
  }
}
