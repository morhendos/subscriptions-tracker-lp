/**
 * Subscriptions Tracker - Placeholder Images
 * 
 * This file documents all available placeholder SVG images.
 * Each image is designed for a specific context and provides better visual
 * representation than generic placeholders until final images are available.
 */

const PLACEHOLDERS = {
  // Dashboard and feature visualization
  DASHBOARD: '/placeholders/dashboard.svg',
  FEATURE_SAVINGS: '/placeholders/feature-savings.svg',
  
  // People and team members
  TEAM_MEMBER: '/placeholders/team-member.svg',
  
  // Content placeholders
  BLOG_THUMBNAIL: '/placeholders/blog-thumbnail.svg',
  
  // Integration and partners
  SERVICE_LOGO: '/placeholders/service-logo.svg',
};

/**
 * Usage guide:
 * 
 * 1. Import this file:
 *    import { PLACEHOLDERS } from '/public/placeholders/index.js';
 * 
 * 2. Use the constants in your Image components:
 *    <Image src={PLACEHOLDERS.DASHBOARD} alt="Dashboard visualization" width={800} height={500} />
 * 
 * Benefits:
 * - Consistent naming across components
 * - Better visual representation than generic placeholders
 * - Appropriate sizes and aspect ratios for each context
 * - Accessible with proper ARIA attributes in the SVGs
 * 
 * All placeholders are SVGs and scale well to different sizes while maintaining
 * small file sizes (typically under 5KB each).
 */

export { PLACEHOLDERS };
