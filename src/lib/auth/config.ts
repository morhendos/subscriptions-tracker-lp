export const AUTH_CONFIG = {
  SESSION_MAX_AGE: 30 * 24 * 60 * 60, // 30 days
  ROUTES: {
    signIn: '/auth/login',
    signOut: '/auth/signout',
    error: '/auth/error',
  },
  MIN_PASSWORD_LENGTH: 8,
  ADMIN_ROLES: ['admin'],
} as const;
