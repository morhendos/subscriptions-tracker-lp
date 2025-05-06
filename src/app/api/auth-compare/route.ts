import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

/**
 * This endpoint compares session data with database data to help diagnose auth issues
 */
export async function GET(request: NextRequest) {
  try {
    // Get parameters from request
    const url = new URL(request.url);
    
    // Validate the secret key (set this in your environment variables)
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
        { error: 'Invalid secret key' },
        { status: 403 }
      );
    }
    
    // Get email from query
    const email = url.searchParams.get('email');
    if (!email) {
      return NextResponse.json(
        { error: 'Email parameter is required' },
        { status: 400 }
      );
    }
    
    // 1. Get raw database user
    const dbUser = await prisma.user.findUnique({
      where: { email }
    });
    
    if (!dbUser) {
      return NextResponse.json(
        { error: 'User not found in database' },
        { status: 404 }
      );
    }
    
    // 2. Get JWT token from request
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET
    });
    
    // 3. Get session from request
    const session = await getServerSession(authOptions);
    
    // Compare the data and return the differences
    const result = {
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
      host: request.headers.get('host'),
      nextAuthUrl: process.env.NEXTAUTH_URL,
      database: {
        user: dbUser ? {
          id: dbUser.id,
          email: dbUser.email,
          name: dbUser.name,
          emailVerified: dbUser.emailVerified,
          roles: dbUser.roles,
          rolesType: typeof dbUser.roles,
          hashedPasswordLength: dbUser.hashedPassword?.length || 0,
          createdAt: dbUser.createdAt,
          updatedAt: dbUser.updatedAt,
        } : null,
      },
      token: token ? {
        sub: token.sub,
        name: token.name,
        email: token.email,
        roles: token.roles,
        rolesType: typeof token.roles,
        isArray: Array.isArray(token.roles),
        exp: token.exp,
        iat: token.iat,
        jti: token.jti,
      } : null,
      session: session ? {
        user: session.user ? {
          name: session.user.name,
          email: session.user.email,
          roles: session.user.roles,
          rolesType: typeof session.user.roles,
          isArray: Array.isArray(session.user.roles),
        } : null,
        expires: session.expires
      } : null,
      analysis: {
        hasToken: !!token,
        hasSession: !!session,
        userMatchesToken: dbUser && token ? dbUser.email === token.email : false,
        userMatchesSession: dbUser && session?.user ? dbUser.email === session.user.email : false,
        tokenMatchesSession: token && session?.user ? token.email === session.user.email : false,
      }
    };
    
    // Role checking analysis for each source
    if (dbUser) {
      let dbUserHasAdmin = false;
      try {
        const roles = typeof dbUser.roles === 'string' ? JSON.parse(dbUser.roles) : dbUser.roles;
        if (Array.isArray(roles)) {
          dbUserHasAdmin = roles.some((role: any) => 
            (typeof role === 'string' && role === 'admin') || 
            (typeof role === 'object' && role?.name === 'admin')
          );
        }
      } catch (e) {
        // Ignore parsing errors
      }
      result.analysis.dbUserHasAdmin = dbUserHasAdmin;
    }
    
    if (token?.roles) {
      let tokenHasAdmin = false;
      try {
        if (Array.isArray(token.roles)) {
          tokenHasAdmin = token.roles.some((role: any) => 
            (typeof role === 'string' && role === 'admin') || 
            (typeof role === 'object' && role?.name === 'admin')
          );
        }
      } catch (e) {
        // Ignore parsing errors
      }
      result.analysis.tokenHasAdmin = tokenHasAdmin;
    }
    
    if (session?.user?.roles) {
      let sessionHasAdmin = false;
      try {
        if (Array.isArray(session.user.roles)) {
          sessionHasAdmin = session.user.roles.some((role: any) => 
            (typeof role === 'string' && role === 'admin') || 
            (typeof role === 'object' && role?.name === 'admin')
          );
        }
      } catch (e) {
        // Ignore parsing errors
      }
      result.analysis.sessionHasAdmin = sessionHasAdmin;
    }

    return NextResponse.json(result);
    
  } catch (error) {
    console.error('Auth compare API error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: 'Internal error comparing auth data', details: errorMessage },
      { status: 500 }
    );
  }
}