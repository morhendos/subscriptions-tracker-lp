/**
 * Feature flag configuration for the application
 * Toggle these flags to enable/disable features during development
 * and to control feature availability in production.
 */

export const FEATURES = {
  // Core feature flags
  PAYMENT_ENABLED: false,          // Toggle when payment system is ready
  PREMIUM_FEATURES_ENABLED: false, // For testing premium features
  
  // User experience flags
  WAITLIST_ENABLED: true,          // Email collection for premium plans
  SHOW_COMING_SOON: true,          // Display "coming soon" badges
  
  // Development & testing flags
  MOCK_PAYMENT_FLOW: false,        // Enable simulated payment
  DEBUG_MODE: false                // Show debug information in UI
};
