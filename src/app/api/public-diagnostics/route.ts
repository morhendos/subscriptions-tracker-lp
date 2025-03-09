import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { AUTH_CONFIG } from '@/lib/auth/config';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    // Check for a secret key in query parameter for basic protection
    const url = new URL(request.url);
    const secretKey = url.searchParams.get('key');
    const expectedSecret = process.env.ADMIN_FIX_SECRET;
    
    if (!expectedSecret) {
      return NextResponse.json(
        { error: 'Admin fix secret not configured on server' },
        { status: 500 }
      );
    }
    
    if (secretKey !== expectedSecret) {
      return NextResponse.json(
        { error: 'Unauthorized - invalid key' },
        { status: 401 }
      );
    }

    // Now run diagnostics
    const diagnostics: any = {
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
      nodeVersion: process.version,
      auth: {
        nextAuthUrl: process.env.NEXTAUTH_URL || 'Not set',
        hasNextAuthSecret: !!process.env.NEXTAUTH_SECRET,
        adminRoles: AUTH_CONFIG.ADMIN_ROLES,
        sessionStrategy: 'jwt',
      },
      database: {
        hasConnectionString: !!process.env.DATABASE_URL,
        connectionTest: 'pending',
        userCount: 0,
        adminUserInfo: null
      }
    };

    // Check Auth Info
    if (process.env.NEXTAUTH_URL) {
      const parsedUrl = new URL(process.env.NEXTAUTH_URL);
      diagnostics.auth.domain = parsedUrl.hostname;
      diagnostics.auth.protocol = parsedUrl.protocol;
    }

    // Test database connection
    try {
      // Test basic connectivity
      const userCount = await prisma.user.count();
      diagnostics.database.connectionTest = 'successful';
      diagnostics.database.userCount = userCount;

      // Try to find admin user (safely masking sensitive data)
      const adminUser = await prisma.user.findFirst({
        where: {
          email: 'morhendos@gmail.com'
        }
      });

      if (adminUser) {
        // Safely reveal diagnostic info but protect sensitive data
        diagnostics.database.adminUserInfo = {
          id: adminUser.id.substring(0, 8) + '...',
          emailVerified: adminUser.emailVerified,
          hasPassword: !!adminUser.hashedPassword,
          passwordLength: adminUser.hashedPassword?.length || 0,
          roleType: typeof adminUser.roles,
          rolesData: JSON.stringify(adminUser.roles).substring(0, 100),
          createdAt: adminUser.createdAt,
          failedLoginAttempts: adminUser.failedLoginAttempts || 0,
        };
      } else {
        diagnostics.database.adminUserInfo = 'Admin user not found';
      }

      // Get counts of other collections
      const waitlistCount = await prisma.waitlistEntry.count();
      diagnostics.database.waitlistCount = waitlistCount;
    } catch (e) {
      const error = e as Error;
      diagnostics.database.connectionTest = `failed: ${error.message}`;
    }

    return NextResponse.json(diagnostics);
  } catch (error) {
    console.error('Public diagnostics API error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: 'Internal error running diagnostics', details: errorMessage },
      { status: 500 }
    );
  }
}
