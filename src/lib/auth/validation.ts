import { AUTH_CONFIG } from './config';

export class AuthError extends Error {
  code: string;

  constructor(message: string, code: string) {
    super(message);
    this.code = code;
    this.name = 'AuthError';
  }
}

export function validateEmail(email: string): boolean {
  // Basic email validation
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validatePassword(password: string): boolean {
  return password.length >= AUTH_CONFIG.MIN_PASSWORD_LENGTH;
}

export function isValidRole(role: string): boolean {
  // Using type assertion to match the expected literal type
  return AUTH_CONFIG.ADMIN_ROLES.includes(role as "admin");
}

export function hasRequiredRole(userRoles: string[], requiredRoles: string[]): boolean {
  if (!userRoles || !requiredRoles) return false;
  return userRoles.some(role => requiredRoles.includes(role));
}

export function isAdmin(userRoles: string[]): boolean {
  return hasRequiredRole(userRoles, AUTH_CONFIG.ADMIN_ROLES);
}
