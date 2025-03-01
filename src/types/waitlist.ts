/**
 * Types for waitlist functionality
 */

/**
 * Interface for waitlist entries stored in the database
 */
export interface WaitlistEntry {
  name: string;              // User's name
  email: string;             // User's email (indexed, unique)
  createdAt: Date;           // Timestamp of submission
  source: string;            // Where they signed up (pricing page, feature gate, etc.)
  interests?: string[];      // Optional: specific premium features they're interested in
  notes?: string;            // Optional: additional information
  contacted: boolean;        // Whether they've been contacted about premium launch
  convertedToCustomer: boolean; // Whether they've converted to a paid customer
}

/**
 * Interface for creating a new waitlist entry
 */
export interface CreateWaitlistEntryInput {
  name: string;
  email: string;
  source?: string;
  interests?: string[];
}

/**
 * Interface for waitlist entry update
 */
export interface UpdateWaitlistEntryInput {
  notes?: string;
  contacted?: boolean;
  convertedToCustomer?: boolean;
  interests?: string[];
}

/**
 * Waitlist entry with ID for frontend usage
 */
export interface WaitlistEntryWithId extends WaitlistEntry {
  id: string;
}
