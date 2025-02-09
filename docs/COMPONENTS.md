# Component Documentation Guidelines

## Overview
This document outlines the standards and best practices for components in the Subscriptions Tracker landing page project.

## Component Structure

### Base Component Template
```typescript
'use client'; // Only if component needs client-side features

import { useState, useEffect } from 'react';
import type { ComponentProps } from './types';

interface Props extends ComponentProps {
  // Component props
}

export function ComponentName({ prop1, prop2 }: Props): JSX.Element {
  // Implementation
}
```

### Component Organization
```
src/components/
├── common/         # Shared components
├── features/       # Feature-specific components
├── layout/         # Layout components
└── ui/            # UI components from shadcn/ui
```

## Component Categories

### Layout Components
Layout components handle the overall structure and positioning:
- Header
- Footer
- Container
- Grid
- Section

### Feature Components
Components specific to subscription tracking features:
- PricingPlans
- FeatureComparison
- SubscriptionCalculator
- SavedMoneyDisplay

### Common Components
Reusable components across the application:
- Button
- Card
- Input
- Modal
- Toast

### UI Components
shadcn/ui components with our customizations:
- Alert
- Dialog
- Dropdown
- Form elements

## Best Practices

### Performance
1. Use React.memo for expensive renders
```typescript
export const ExpensiveComponent = React.memo(function ExpensiveComponent() {
  // Implementation
});
```

2. Optimize event handlers
```typescript
const handleClick = useCallback(() => {
  // Implementation
}, [dependencies]);
```

3. Proper key usage
```typescript
{items.map((item) => (
  <Item key={item.id} {...item} />
))}
```

### Accessibility
1. Semantic HTML
```typescript
// Good
<button onClick={handleClick}>Click me</button>

// Bad
<div onClick={handleClick}>Click me</div>
```

2. ARIA attributes
```typescript
<button
  aria-label="Close modal"
  aria-expanded={isOpen}
  onClick={handleClose}
>
  ×
</button>
```

3. Keyboard navigation
```typescript
function handleKeyDown(event: KeyboardEvent) {
  if (event.key === 'Enter' || event.key === ' ') {
    handleAction();
  }
}
```

### State Management
1. Local state
```typescript
const [isOpen, setIsOpen] = useState(false);
```

2. Derived state
```typescript
const isValid = useMemo(() => {
  return value.length >= minLength;
}, [value, minLength]);
```

### Props Interface
```typescript
interface ButtonProps {
  /** Button variant style */
  variant?: 'primary' | 'secondary' | 'ghost';
  /** Button size */
  size?: 'sm' | 'md' | 'lg';
  /** Called when button is clicked */
  onClick?: () => void;
  /** Button content */
  children: React.ReactNode;
}
```

## Example Components

### Feature Component Example
```typescript
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import type { Plan } from '@/types';

interface PricingCardProps {
  plan: Plan;
  isPopular?: boolean;
  onSelect: (plan: Plan) => void;
}

export function PricingCard({ 
  plan, 
  isPopular = false,
  onSelect 
}: PricingCardProps): JSX.Element {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);
  const handleClick = () => onSelect(plan);

  return (
    <Card
      className={cn(
        'transition-all duration-300',
        isPopular && 'ring-2 ring-primary',
        isHovered && 'transform scale-105'
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Card content */}
    </Card>
  );
}
```

### Common Component Example
```typescript
'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error, label, helperText, className, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label className="text-sm font-medium">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            'w-full px-3 py-2 border rounded-md',
            'focus:outline-none focus:ring-2',
            error ? 'border-red-500' : 'border-gray-300',
            className
          )}
          {...props}
        />
        {(error || helperText) && (
          <p className={cn(
            'text-sm',
            error ? 'text-red-500' : 'text-gray-500'
          )}>
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
```

## Testing Components

### Unit Test Example
```typescript
import { render, fireEvent } from '@testing-library/react';
import { PricingCard } from './PricingCard';

describe('PricingCard', () => {
  const mockPlan = {
    id: '1',
    name: 'Basic',
    price: 9.99
  };

  it('should call onSelect when clicked', () => {
    const handleSelect = jest.fn();
    const { getByRole } = render(
      <PricingCard 
        plan={mockPlan} 
        onSelect={handleSelect} 
      />
    );

    fireEvent.click(getByRole('button'));
    expect(handleSelect).toHaveBeenCalledWith(mockPlan);
  });
});
```

## Component Documentation

### JSDoc Comments
```typescript
/**
 * A customizable button component that supports different variants and sizes.
 *
 * @example
 * ```tsx
 * <Button variant="primary" size="lg" onClick={handleClick}>
 *   Click Me
 * </Button>
 * ```
 */
export function Button({ variant, size, children }: ButtonProps): JSX.Element {
  // Implementation
}
```

### Props Documentation
All props should be documented with:
- Description
- Type information
- Default values
- Required/optional status
- Examples if needed

### Usage Examples
Include common use cases and variations:
```typescript
// Basic usage
<Button>Click Me</Button>

// With all props
<Button
  variant="primary"
  size="lg"
  onClick={handleClick}
  disabled={isLoading}
>
  {isLoading ? 'Loading...' : 'Submit'}
</Button>
```

## Component Review Checklist

### Functionality
- [ ] Component works as intended
- [ ] All props are properly typed
- [ ] Error states are handled
- [ ] Loading states are handled
- [ ] Edge cases are considered

### Performance
- [ ] No unnecessary re-renders
- [ ] Proper use of hooks
- [ ] Optimized for large datasets
- [ ] Bundle size impact considered

### Accessibility
- [ ] Proper ARIA attributes
- [ ] Keyboard navigation
- [ ] Screen reader friendly
- [ ] Color contrast compliance

### Testing
- [ ] Unit tests written
- [ ] Integration tests if needed
- [ ] Edge cases tested
- [ ] Accessibility tests

### Documentation
- [ ] Props documented
- [ ] Usage examples provided
- [ ] Edge cases noted
- [ ] Performance considerations documented
