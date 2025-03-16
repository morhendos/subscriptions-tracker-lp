/**
 * Client-side authentication utilities
 * 
 * These functions help secure the authentication process by implementing
 * client-side password hashing and other security measures.
 */

import crypto from 'crypto';

/**
 * Hash a password client-side before sending it to the server
 * This is a simple implementation that can be replaced with a more secure one in the future
 * 
 * @param password The plaintext password
 * @param salt Optional salt (default uses a timestamp-based salt)
 * @returns A hashed version of the password suitable for transit
 */
export function hashPasswordForTransit(password: string, salt?: string): string {
  // Create a salt if not provided (timestamp-based)
  const useSalt = salt || new Date().getTime().toString();
  
  // Create an HMAC using SHA-256
  const hmac = crypto.createHmac('sha256', useSalt);
  hmac.update(password);
  
  // Return the hashed password with the salt
  return `${useSalt}:${hmac.digest('hex')}`;
}

/**
 * Pre-process login credentials before submitting the form
 * This function can be used with form events to hash the password before sending
 * 
 * @param event The form submission event
 */
export function preprocessLoginSubmit(event: any): void {
  // Get the form from the event
  const form = event.target as HTMLFormElement;
  
  // Find the password field
  const passwordField = form.querySelector('input[type="password"]') as HTMLInputElement;
  if (!passwordField) return;
  
  // Get the current password value
  const plainPassword = passwordField.value;
  
  // Hash the password
  const hashedPassword = hashPasswordForTransit(plainPassword);
  
  // Replace the password in the form
  passwordField.value = hashedPassword;
}

/**
 * Initialize client-side auth security on a page
 * This will set up event listeners for login forms
 */
export function initClientAuthSecurity(): void {
  if (typeof document === 'undefined') return; // Server-side rendering check
  
  // Find all login forms
  const loginForms = document.querySelectorAll('form[action*="auth"]');
  
  // Add event listeners to each form
  loginForms.forEach(form => {
    form.addEventListener('submit', preprocessLoginSubmit);
  });
}
