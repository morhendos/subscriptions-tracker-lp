# Subscriptions Tracker Placeholder Images

This directory contains context-specific SVG placeholders designed to provide meaningful visual representation for different sections of the Subscriptions Tracker landing page.

## Available Placeholders

| Filename | Purpose | Size | Description |
|----------|---------|------|-------------|
| `dashboard.svg` | Dashboard/UI mockups | 800×500 | Wireframe representation of subscription management dashboard with charts and UI elements |
| `team-member.svg` | Team photos | 300×300 | Professional silhouette suitable for About/Careers pages |
| `blog-thumbnail.svg` | Blog post images | 600×340 | Thematic illustration showing subscription management concepts |
| `service-logo.svg` | Integration partners | 200×200 | Abstract company logo placeholder for service integrations |
| `feature-savings.svg` | Feature illustrations | 600×400 | Graph visualization showing subscription cost savings |

## Usage

Import the constants from the index file:

```javascript
import { PLACEHOLDERS } from '/public/placeholders/index.js';

// Then use in components
<Image 
  src={PLACEHOLDERS.DASHBOARD} 
  alt="Subscription management dashboard" 
  width={800} 
  height={500}
/>
```

## Benefits Over Generic Placeholders

1. **Contextually Appropriate**: Each placeholder visually represents its intended content
2. **Accessibility**: Proper ARIA attributes and descriptive elements
3. **Consistent Styling**: All placeholders follow the same design language
4. **Optimized Size**: SVGs are lightweight (under 5KB each) and scale perfectly
5. **Clear Documentation**: Standardized naming conventions and usage examples
6. **Better UX**: Provides meaningful visual context while final assets are in development

## Design Principles

The placeholders follow these design principles:

- **Minimalist**: Clean, simple designs that don't distract
- **On-brand**: Uses the application's color palette and styling
- **Informative**: Conveys the purpose and content it represents
- **Accessible**: Includes proper titles, descriptions, and ARIA attributes
- **Responsive**: SVG format ensures crisp display at any size

## Transitioning to Final Assets

When replacing these placeholders with final production assets:

1. Keep the same file dimensions when possible
2. Maintain the same file paths or update the constants in `index.js`
3. Preserve the descriptive alt text from the examples
4. Consider keeping SVG format for UI elements and illustrations for optimal performance

## Contributing New Placeholders

When adding new placeholder types:

1. Follow the established naming convention
2. Use the SVG format with appropriate viewBox settings
3. Include accessibility information (title, desc)
4. Add the new placeholder to the `PLACEHOLDERS` object in `index.js`
5. Document it in this README
