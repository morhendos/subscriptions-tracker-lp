// Export auth helpers
export const isAdmin = (user: any) => {
  if (!user || !user.roles) return false;
  
  return user.roles.some((role: any) => 
    role.name === 'admin' || role === 'admin'
  );
};

// Config values for auth
export const AUTH_CONFIG = {
  SESSION_MAX_AGE: 30 * 24 * 60 * 60, // 30 days
  ROUTES: {
    signIn: '/auth/login',
    signUp: '/signup',
    error: '/error',
  },
  MIN_PASSWORD_LENGTH: 8,
};
