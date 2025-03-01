import { prisma } from '../db/prisma';
import { Prisma } from '@prisma/client';

export interface WaitlistEntryData {
  email: string;
  name: string;
  ipAddress?: string;
  userAgent?: string;
  source?: string;
  referrer?: string;
  tags?: string[];
  metadata?: Record<string, any>;
}

export class WaitlistService {
  /**
   * Add a new entry to the waitlist
   */
  static async addToWaitlist(data: WaitlistEntryData) {
    try {
      const entry = await prisma.waitlistEntry.create({
        data: {
          email: data.email.toLowerCase().trim(),
          name: data.name.trim(),
          ipAddress: data.ipAddress,
          userAgent: data.userAgent,
          source: data.source,
          referrer: data.referrer,
          tags: data.tags || [],
          metadata: data.metadata as Prisma.JsonObject,
        },
      });
      return { success: true, entry };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // Handle known Prisma errors
        if (error.code === 'P2002') {
          // Unique constraint violation, likely for email
          return {
            success: false,
            error: 'Email already registered',
            code: 'EMAIL_EXISTS',
          };
        }
      }
      // Log the error for debugging
      console.error('Error adding to waitlist:', error);
      
      // Return a generic error
      return {
        success: false,
        error: 'Failed to add to waitlist',
        code: 'UNKNOWN_ERROR',
      };
    }
  }

  /**
   * Check if an email is already on the waitlist
   */
  static async isEmailRegistered(email: string): Promise<boolean> {
    const normalizedEmail = email.toLowerCase().trim();
    const entry = await prisma.waitlistEntry.findUnique({
      where: { email: normalizedEmail },
      select: { id: true },
    });
    return !!entry;
  }

  /**
   * Update the status of a waitlist entry
   */
  static async updateStatus(email: string, status: string) {
    const normalizedEmail = email.toLowerCase().trim();
    return prisma.waitlistEntry.update({
      where: { email: normalizedEmail },
      data: { status },
    });
  }

  /**
   * Add notes to a waitlist entry
   */
  static async addNotes(email: string, notes: string) {
    const normalizedEmail = email.toLowerCase().trim();
    const entry = await prisma.waitlistEntry.findUnique({
      where: { email: normalizedEmail },
      select: { notes: true },
    });

    const updatedNotes = entry?.notes
      ? `${entry.notes}\n\n${new Date().toISOString()}: ${notes}`
      : `${new Date().toISOString()}: ${notes}`;

    return prisma.waitlistEntry.update({
      where: { email: normalizedEmail },
      data: { notes: updatedNotes },
    });
  }

  /**
   * Add tags to a waitlist entry
   */
  static async addTags(email: string, tagsToAdd: string[]) {
    const normalizedEmail = email.toLowerCase().trim();
    const entry = await prisma.waitlistEntry.findUnique({
      where: { email: normalizedEmail },
      select: { tags: true },
    });

    // Combine existing tags with new ones, removing duplicates
    const uniqueTags = [...new Set([...(entry?.tags || []), ...tagsToAdd])];

    return prisma.waitlistEntry.update({
      where: { email: normalizedEmail },
      data: { tags: uniqueTags },
    });
  }

  /**
   * Get statistics about the waitlist
   */
  static async getStats() {
    const totalCount = await prisma.waitlistEntry.count();
    
    const lastWeekCount = await prisma.waitlistEntry.count({
      where: {
        createdAt: {
          gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        },
      },
    });

    const statusCounts = await prisma.waitlistEntry.groupBy({
      by: ['status'],
      _count: true,
    });

    const statusMap = statusCounts.reduce((acc, curr) => {
      acc[curr.status] = curr._count;
      return acc;
    }, {} as Record<string, number>);

    return {
      total: totalCount,
      lastWeek: lastWeekCount,
      byStatus: statusMap,
    };
  }
}
