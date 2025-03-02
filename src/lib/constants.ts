/**
 * Application-wide constants
 */

/**
 * Authentication
 * This is used as a fallback only if NEXT_PUBLIC_ADMIN_API_KEY env var is not set
 */
export const DEFAULT_ADMIN_KEY = 'admin-secret-key';

/**
 * Feature flags
 */
export const FEATURES = {
  // Core feature flags
  PAYMENT_ENABLED: false, // Toggle when payment system is ready
  PREMIUM_FEATURES_ENABLED: false, // For testing premium features

  // User experience flags
  WAITLIST_ENABLED: true, // Email collection for premium plans
  SHOW_COMING_SOON: true, // Display "coming soon" badges

  // Development & testing flags
  MOCK_PAYMENT_FLOW: false, // Enable simulated payment
  DEBUG_MODE: process.env.NODE_ENV === 'development' // Show debug information in UI
};
