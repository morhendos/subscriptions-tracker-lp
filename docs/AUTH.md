# Authentication System Documentation

This document explains the authentication system implemented for the landing page admin panel.

## Overview

The authentication system is built using:

- **NextAuth.js** - Authentication framework for Next.js
- **Prisma** - ORM for database access
- **bcrypt** - For password hashing
- **MongoDB** - For storing user data

## Authentication Flow

1. Admin users log in via the `/auth/login` page
2. Authentication is handled by NextAuth's credentials provider
3. After successful authentication, users are redirected to the admin dashboard
4. Protected routes are secured using Next.js middleware

## Configuration

The following environment variables are required for authentication:

```env
# Required for authentication
NEXTAUTH_URL="http://localhost:3000"              # In production, set to your actual domain
NEXTAUTH_SECRET="your-random-secret-key"          # Used for JWT encryption
ADMIN_SECRET_KEY="your-admin-creation-secret-key" # Used for creating admin users
```

## User Roles

The system supports two roles:
- `user` - Basic authenticated user 
- `admin` - Administrator with full access to admin panel

Roles are stored as a JSON array in the User model.

## Setup Instructions

### 1. Database Setup

Ensure your Prisma schema is synced with the database:

```bash
npx prisma db push
```

### 2. Create Admin User

Use the provided script to create your first admin user:

```bash
npm run create-admin
```

This interactive script will prompt you for:
- Admin email
- Admin name
- Admin password

### 3. Authentication Endpoints

The following authentication endpoints are available:

- `/auth/login` - Login page
- `/auth/signout` - Signout page
- `/auth/error` - Error page
- `/api/auth/[...nextauth]` - NextAuth API routes

## Protected Routes

Any route under `/admin/*` is protected and requires authentication with the admin role.

## Components

Key authentication components:

- `AuthProvider` - Provider for NextAuth context
- `LoginForm` - Login form component
- `LogoutButton` - Logout button component
- `UserProfile` - User profile display component

## Middleware

The application uses Next.js middleware (`src/middleware.ts`) to protect routes based on authentication status and user roles.

## Security Considerations

- Passwords are hashed using bcrypt with a cost factor of 10
- JWT tokens are encrypted using the NEXTAUTH_SECRET
- Session data is stored in cookies with the httpOnly flag
- CSRF protection is enabled

## Troubleshooting

### Common Issues

1. **Unable to log in**: 
   - Ensure you're using the correct credentials
   - Check that the database connection is working

2. **Middleware not working**:
   - Verify that your middleware.ts file is correctly configured
   - Make sure your matchers are correctly set up

3. **Session not persisting**:
   - Check that NEXTAUTH_SECRET is correctly set
   - Verify cookie settings in auth-options.ts

### Debugging

You can enable debug mode by setting:

```env
NODE_ENV=development
```

This will provide more detailed logging in the console.
