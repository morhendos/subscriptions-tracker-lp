// Export auth configuration
export * from './config';

// Export auth options for NextAuth
export { authOptions } from './auth-options';

// Export validation utilities
export * from './validation';

// Export auth service functions
export * from './auth-service';

// Helper function to check if user has admin role - IMPROVED VERSION
export const isAdmin = (user: any) => {
  if (!user || !user.roles) return false;
  
  return user.roles.some((role: any) => {
    // If role is a string
    if (typeof role === 'string') {
      return role === 'admin';
    }
    
    // If role is an object (standard case)
    if (typeof role === 'object' && role !== null) {
      return role.name === 'admin';
    }
    
    return false;
  });
};
