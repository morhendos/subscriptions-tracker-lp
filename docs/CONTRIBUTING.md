# Contributing to Subscriptions Tracker Landing Page

## Getting Started

### Prerequisites
- Node.js 18.x or higher
- Git
- Bun (preferred) or npm

### Development Environment Setup
1. Clone the repository:
```bash
git clone https://github.com/morhendos/subscriptions-tracker-lp.git
cd subscriptions-tracker-lp
```

2. Install dependencies:
```bash
bun install
# or
npm install
```

3. Start the development server:
```bash
bun dev
# or
npm run dev
```

### Environment Configuration
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_BASE_URL=http://localhost:3000
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=your_verification_code
```

## Development Workflow

### Branch Naming Convention
- Feature: `feature/descriptive-name`
- Bug fix: `fix/issue-description`
- Documentation: `docs/topic-name`
- Performance: `perf/optimization-description`
- Refactor: `refactor/component-name`

### Commit Messages
We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
type(scope): description

[optional body]

[optional footer]
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

Example:
```
feat(pricing): add monthly/yearly toggle

- Add toggle component
- Implement price calculation
- Add animation for smooth transition

Closes #123
```

### Pull Request Process
1. Update documentation if needed
2. Add or update tests
3. Ensure all tests pass
4. Update the changelog if needed
5. Get review from at least one team member

## Code Standards

### TypeScript
- Strict mode enabled
- Explicit return types for functions
- Interface over type when possible
- Proper type imports/exports

Example:
```typescript
interface UserProps {
  name: string;
  email: string;
  role: UserRole;
}

export function UserProfile({ name, email, role }: UserProps): JSX.Element {
  // Implementation
}
```

### React & Next.js
- Functional components with hooks
- Use Next.js App Router patterns
- Server components by default
- Client components when needed (use 'use client')

### CSS & Styling
- Use Tailwind CSS utilities
- Follow mobile-first approach
- Use CSS custom properties for theming
- Follow BEM for custom CSS (rare cases)

### Component Structure
```typescript
// imports
import { useState } from 'react';
import type { ComponentProps } from './types';

// types/interfaces
interface Props extends ComponentProps {
  variant: 'primary' | 'secondary';
}

// component
export function Component({ variant, ...props }: Props): JSX.Element {
  // hooks
  const [state, setState] = useState();

  // handlers
  const handleClick = () => {
    // implementation
  };

  // render
  return (
    // JSX
  );
}
```

## Testing

### Unit Tests
- Use Jest and React Testing Library
- Test behavior, not implementation
- One test file per component
- Follow AAA pattern (Arrange, Act, Assert)

Example:
```typescript
describe('Button', () => {
  it('should handle click events', () => {
    // Arrange
    const handleClick = jest.fn();
    const { getByRole } = render(<Button onClick={handleClick} />);

    // Act
    fireEvent.click(getByRole('button'));

    // Assert
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### Integration Tests
- Focus on component interactions
- Test user flows
- Mock external services

### E2E Tests
- Use Playwright
- Test critical user paths
- Run against staging environment

## Performance Guidelines

### Image Optimization
- Use Next.js Image component
- Proper sizing and formats
- Lazy loading when below fold

### Component Optimization
- Use React.memo when beneficial
- Proper key usage in lists
- Avoid unnecessary rerenders
- Code splitting for large components

### Bundle Optimization
- Dynamic imports for heavy components
- Tree shaking friendly imports
- Monitor bundle size with `@next/bundle-analyzer`

## Accessibility

### Requirements
- WCAG 2.1 Level AA compliance
- Proper heading hierarchy
- Keyboard navigation support
- ARIA labels where needed
- Color contrast compliance

### Checklist
- Semantic HTML
- Focus management
- Screen reader testing
- Responsive font sizes
- Alternative text for images

## Security

### Best Practices
- Regular dependency updates
- Content Security Policy
- XSS prevention
- CSRF protection
- Input sanitization

### API Guidelines
- Rate limiting
- Input validation
- Error handling
- Authentication checks

## Deployment

### Staging
1. Merge to `develop`
2. Automatic deployment to staging
3. Run E2E tests
4. Manual QA review

### Production
1. Create release PR to `main`
2. Review deployment checklist
3. Merge after approval
4. Monitor metrics after deploy

## Support

### Getting Help
- Check existing issues
- Join team Discord
- Review documentation
- Ask in #dev channel

### Reporting Issues
- Use issue templates
- Include reproduction steps
- Add relevant labels
- Link related PRs

## License
This project is licensed under the MIT License - see the LICENSE file for details.