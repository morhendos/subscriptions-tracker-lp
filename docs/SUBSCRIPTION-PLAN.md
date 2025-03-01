# Subscription & Payment Implementation Plan

This document outlines the implementation plan for the subscription and payment system for Subscriptions Tracker.

## Overview

- **Current State**: Landing page advertises Free and Lifetime plans, but the application has no payment integration yet
- **Goal**: Implement a coherent user journey with payment processing while minimizing disruption
- **Approach**: Phased implementation with feature flags and progressive enhancement

## Feature Flag System

The feature flag system allows toggling features on and off without changing code. The main feature flags are:

```typescript
// src/config/features.ts
export const FEATURES = {
  // Core feature flags
  PAYMENT_ENABLED: false,          // Toggle when payment system is ready
  PREMIUM_FEATURES_ENABLED: false, // For testing premium features
  
  // User experience flags
  WAITLIST_ENABLED: true,          // Email collection for premium plans
  SHOW_COMING_SOON: true,          // Display "coming soon" badges
}
```

## Implementation Phases

### Phase 1: User Expectation Management

- [x] **Feature Flag System**
  - [x] Create configuration file for feature flags
  - [x] Implement flag for payment features
  - [x] Implement flag for premium features
  - [x] Add toggle mechanism for testing environments

- [x] **"Coming Soon" Implementation**
  - [x] Create modal component for premium features
  - [x] Modify pricing buttons to show modal for premium plans
  - [x] Design clear messaging about upcoming premium features
  - [x] Implement redirection to free signup from modal

- [x] **Email Collection System UI**
  - [x] Create waitlist form UI component
  - [x] Create waitlist page
  - [x] Add API endpoint structure for email storage
  - [x] Set up success/error handling

- [ ] **Waitlist Database Implementation**
  - [ ] Set up database collection/table for waitlist entries
  - [ ] Create schema for waitlist entries (name, email, timestamp, source)
  - [ ] Update API endpoint to store submissions in database
  - [ ] Add email validation and duplicate checking
  - [ ] Implement admin view for waitlist entries

- [ ] **Premium Feature Gating**
  - [x] Create PremiumFeatureGate component
  - [ ] Wrap premium features with gate component
  - [ ] Implement upgrade prompts in appropriate places

### Phase 2: Mock Payment Architecture

- [ ] **Mock Payment Provider**
  - [ ] Create PaymentProvider interface
  - [ ] Implement MockPaymentProvider class
  - [ ] Build simulated payment flow UI

- [ ] **Subscription Management Service**
  - [ ] Design SubscriptionPlan interface
  - [ ] Implement plan data structures
  - [ ] Create SubscriptionService class

- [ ] **User Plan Data**
  - [ ] Update user data model to include plan information
  - [ ] Create UI for displaying current plan
  - [ ] Implement plan upgrade UI workflow

### Phase 3: Payment Integration

- [ ] **Payment Processor Integration**
  - [ ] Select payment provider (Stripe, PayPal, etc.)
  - [ ] Implement payment API endpoints
  - [ ] Build secure checkout flow
  - [ ] Create receipt/invoice system

- [ ] **Subscription Management**
  - [ ] Implement backend validation for premium features
  - [ ] Create subscription lifecycle management
  - [ ] Build admin tools for subscription management

## Waitlist Database Implementation Details

### Database Schema

```typescript
// MongoDB schema example
interface WaitlistEntry {
  name: string;            // User's name
  email: string;           // User's email (indexed, unique)
  createdAt: Date;         // Timestamp of submission
  source: string;          // Where they signed up (pricing page, feature gate, etc.)
  interests?: string[];    // Optional: specific premium features they're interested in
  notes?: string;          // Optional: additional information
  contacted: boolean;      // Whether they've been contacted about premium launch
  convertedToCustomer: boolean; // Whether they've converted to a paid customer
}
```

### API Endpoint Implementation

```typescript
// src/app/api/waitlist/route.ts
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/database';

export async function POST(request: Request) {
  try {
    const { email, name, source = 'waitlist_page' } = await request.json();
    
    // Validate inputs
    if (!email || !name) {
      return NextResponse.json(
        { error: 'Email and name are required' },
        { status: 400 }
      );
    }
    
    // Connect to database
    const db = await connectToDatabase();
    const waitlistCollection = db.collection('waitlist');
    
    // Check for duplicate email
    const existingEntry = await waitlistCollection.findOne({ email });
    if (existingEntry) {
      return NextResponse.json(
        { success: false, message: 'Email already registered for waitlist' },
        { status: 409 }
      );
    }
    
    // Create new entry
    const result = await waitlistCollection.insertOne({
      name,
      email,
      source,
      createdAt: new Date(),
      contacted: false,
      convertedToCustomer: false
    });
    
    // Optional: Send confirmation email
    // await sendConfirmationEmail(email, name);
    
    return NextResponse.json(
      { success: true, message: 'Added to waitlist', id: result.insertedId },
      { status: 201 }
    );
  } catch (error) {
    console.error('Waitlist error:', error);
    return NextResponse.json(
      { error: 'Failed to join waitlist' },
      { status: 500 }
    );
  }
}
```

### Admin Dashboard

Create a simple admin dashboard to:
1. View all waitlist entries
2. Export data as CSV
3. Mark entries as contacted
4. Filter and sort entries
5. Add notes to entries

This can be built as a protected route in the main application or as a separate admin tool.

### Database Service

```typescript
// src/lib/database.ts
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const dbName = process.env.MONGODB_DB || 'subscriptions_tracker';

let cachedClient = null;
let cachedDb = null;

export async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }

  if (!cachedClient) {
    cachedClient = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  const db = cachedClient.db(dbName);
  cachedDb = db;
  return db;
}
```

## Component Usage Guide

### Coming Soon Modal

Display a modal for premium features that aren't yet available:

```tsx
import ComingSoonModal from '@/components/ComingSoonModal';

// Inside your component
const [showModal, setShowModal] = useState(false);

return (
  <>
    <Button onClick={() => setShowModal(true)}>
      Get Premium Feature
    </Button>
    
    <ComingSoonModal 
      isOpen={showModal}
      onClose={() => setShowModal(false)}
      planName="Lifetime Plan"
    />
  </>
);
```

### Premium Feature Gate

Gate premium features behind a paywall or waitlist:

```tsx
import { PremiumFeatureGate } from '@/components/PremiumFeatureGate';

// Inside your component
return (
  <PremiumFeatureGate
    featureId="advancedAnalytics"
    title="Advanced Analytics"
    description="Get detailed insights into your subscription spending with our premium plan."
  >
    {/* The actual premium feature UI */}
    <AdvancedAnalyticsComponent />
  </PremiumFeatureGate>
);
```

### Waitlist Form

Collect user information for premium feature waitlist:

```tsx
import { WaitlistForm } from '@/components/WaitlistForm';

// Inside your page component
return (
  <div className="container">
    <h1>Join our Premium Waitlist</h1>
    <WaitlistForm />
  </div>
);
```

## Testing the Implementation

To test different states of the payment system, modify the feature flags in `src/config/features.ts`:

1. **Test Free Features Only**:
   ```typescript
   PAYMENT_ENABLED: false,
   PREMIUM_FEATURES_ENABLED: false,
   ```

2. **Test Premium Features Without Payment**:
   ```typescript
   PAYMENT_ENABLED: false,
   PREMIUM_FEATURES_ENABLED: true,
   ```

3. **Test Full Payment Flow**:
   ```typescript
   PAYMENT_ENABLED: true,
   PREMIUM_FEATURES_ENABLED: true,
   ```

## Future Considerations

- **Analytics**: Track conversion rates from waitlist to paid users
- **A/B Testing**: Test different messaging for premium features
- **Internationalization**: Support multiple currencies and payment methods
- **Gifting**: Allow users to gift premium plans to others
- **Affiliate Program**: Create referral system for premium plans

## References

- **Feature Flags**: [Martin Fowler's Feature Toggles](https://martinfowler.com/articles/feature-toggles.html)
- **Payment Processing**: [Stripe Documentation](https://stripe.com/docs)
- **UI Components**: [shadcn/ui Documentation](https://ui.shadcn.com)
- **MongoDB**: [MongoDB Documentation](https://docs.mongodb.com/)
