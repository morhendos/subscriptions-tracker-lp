# Changelog

## [Unreleased] - CTA Buttons Fix

### Added
- Added `actionUrl` property to the `PricingTier` interface in `src/config/pricing.ts`
- Implemented specific URLs for both free and lifetime tiers pointing to the appropriate signup pages

### Fixed
- Updated PricingSection component to use proper navigation with Link component
- Fixed Features page CTA to direct users to signup rather than pricing page 
- Added PricingSection component to the main page (was imported but not rendered)

### Changed
- Optimized user journey by ensuring all CTAs have appropriate actions assigned
- Improved conversion flow by providing more direct paths to signup

## [0.1.0] - 2025-03-01
- Initial landing page implementation
