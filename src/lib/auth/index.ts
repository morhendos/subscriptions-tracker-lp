// Export auth configuration
export * from './config';

// Export auth options for NextAuth
export { authOptions } from './auth-options';

// Export validation utilities
export * from './validation';

// Export auth service functions
export * from './auth-service';

// Helper function to check if user has admin role
export const isAdmin = (user: any) => {
  if (!user || !user.roles) return false;
  
  return user.roles.some((role: any) => 
    role.name === 'admin' || role === 'admin'
  );
};
