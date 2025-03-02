# Analytics Implementation

This document explains the approach we've taken to implement analytics properly in the Subscriptions Tracker landing page.

## Problem Solved

The original implementation had several issues:

1. The `useSearchParams()` hook was being used without proper Suspense boundaries, causing build errors
2. Analytics was embedded directly in the `<head>` element, which was problematic for Next.js rendering
3. The waitlist stats API didn't declare dynamic usage properly

## Solution

We've implemented the following changes:

### 1. Split Analytics into Components

- `Analytics.tsx` - Exports the base component and script-loading functionality
- `AnalyticsPageTracker.tsx` - Dedicated component for page tracking that uses client-side hooks

### 2. Fixed Root Layout

- Added proper Suspense boundary for components using `useSearchParams()`
- Kept script loading in the `<head>` for optimal loading
- Moved the page tracking component to the `<body>` with proper suspense boundary

### 3. Fixed API Route

- Added `export const dynamic = 'force-dynamic'` to the waitlist stats API
- This properly indicates to Next.js that the route requires dynamic rendering

## How to Use

The analytics implementation now consists of two parts:

```tsx
// In layout.tsx
import { Analytics } from "@/components/Analytics";
import AnalyticsPageTracker from "@/components/AnalyticsPageTracker";
import { Suspense } from "react";

// In <head> - this loads the scripts but doesn't use client hooks
<Analytics 
  googleAnalyticsId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}
  microsoftClarityId={process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID}
/>

// In <body> - this uses client hooks and needs Suspense
<Suspense fallback={null}>
  <AnalyticsPageTracker 
    googleAnalyticsId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}
  />
</Suspense>
```

## Best Practices

- Always wrap components using `useSearchParams()` or other client-side hooks in Suspense
- Use a dedicated component for page tracking to isolate client-side code
- Mark API routes that require dynamic behavior with `export const dynamic = 'force-dynamic'`
