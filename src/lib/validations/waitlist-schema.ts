import { z } from 'zod';

/**
 * Schema for validating waitlist entry submissions
 */
export const waitlistEntrySchema = z.object({
  email: z
    .string()
    .email('Please enter a valid email address')
    .min(5, 'Email is too short')
    .max(100, 'Email is too long')
    .trim()
    .toLowerCase(),
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name is too long')
    .trim(),
  source: z
    .string()
    .optional(),
  referrer: z
    .string()
    .optional(),
});

export type WaitlistEntryForm = z.infer<typeof waitlistEntrySchema>;

/**
 * Schema for validating waitlist statistics
 */
export const waitlistStatsSchema = z.object({
  total: z.number().int().nonnegative(),
  lastWeek: z.number().int().nonnegative(),
  byStatus: z.record(z.string(), z.number().int().nonnegative()),
});

export type WaitlistStats = z.infer<typeof waitlistStatsSchema>;
