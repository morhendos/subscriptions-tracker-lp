import connectToDatabase from '../db/mongodb';

// Types (we'll define them here since we're no longer importing directly)
interface ObjectId {
  toString(): string;
}

export interface WaitlistEntry {
  _id?: ObjectId;
  email: string;
  name: string;
  ipAddress?: string;
  userAgent?: string;
  source?: string;
  referrer?: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  notes?: string;
  tags: string[];
  metadata?: Record<string, any>;
}

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
  private static DB_NAME = 'subscriptions-tracker';
  private static COLLECTION_NAME = 'waitlist';
  
  /**
   * Get the waitlist collection
   */
  private static async getCollection() {
    const { db } = await connectToDatabase();
    return db.collection(this.COLLECTION_NAME);
  }
  
  /**
   * Validate an email address format
   */
  private static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  /**
   * Add a new entry to the waitlist
   */
  static async addToWaitlist(data: WaitlistEntryData) {
    try {
      // Basic validation
      if (!data.email || !data.name) {
        return {
          success: false,
          error: 'Email and name are required',
          code: 'MISSING_FIELDS',
        };
      }
      
      // Normalize email
      const email = data.email.toLowerCase().trim();
      
      // Validate email format
      if (!this.isValidEmail(email)) {
        return {
          success: false,
          error: 'Invalid email format',
          code: 'INVALID_EMAIL',
        };
      }
      
      // Get collection
      const collection = await this.getCollection();
      
      // Check if email already exists
      const existingEntry = await collection.findOne({ email });
      if (existingEntry) {
        return {
          success: false,
          error: 'Email already registered',
          code: 'EMAIL_EXISTS',
        };
      }
      
      // Create entry
      const now = new Date();
      const entry: WaitlistEntry = {
        email,
        name: data.name.trim(),
        ipAddress: data.ipAddress,
        userAgent: data.userAgent,
        source: data.source,
        referrer: data.referrer,
        status: 'active',
        createdAt: now,
        updatedAt: now,
        tags: data.tags || [],
        metadata: data.metadata,
      };
      
      // Insert entry
      const result = await collection.insertOne(entry);
      
      return { 
        success: true, 
        entry: {
          ...entry,
          _id: result.insertedId 
        }
      };
    } catch (error) {
      // Log the error for debugging
      console.error('Error adding to waitlist:', error);
      
      // Return a generic error
      return {
        success: false,
        error: 'Failed to add to waitlist',
        code: 'DATABASE_ERROR',
      };
    }
  }
  
  /**
   * Check if an email is already on the waitlist
   */
  static async isEmailRegistered(email: string): Promise<boolean> {
    try {
      const normalizedEmail = email.toLowerCase().trim();
      const collection = await this.getCollection();
      const entry = await collection.findOne({ email: normalizedEmail });
      return !!entry;
    } catch (error) {
      console.error('Error checking email registration:', error);
      return false;
    }
  }
  
  /**
   * Update the status of a waitlist entry
   */
  static async updateStatus(email: string, status: string) {
    try {
      const normalizedEmail = email.toLowerCase().trim();
      const collection = await this.getCollection();
      
      const result = await collection.updateOne(
        { email: normalizedEmail },
        { 
          $set: { 
            status,
            updatedAt: new Date()
          } 
        }
      );
      
      return { 
        success: result.matchedCount > 0,
        modified: result.modifiedCount > 0
      };
    } catch (error) {
      console.error('Error updating status:', error);
      return { success: false, modified: false };
    }
  }
  
  /**
   * Add notes to a waitlist entry
   */
  static async addNotes(email: string, notes: string) {
    try {
      const normalizedEmail = email.toLowerCase().trim();
      const collection = await this.getCollection();
      
      // Get existing entry
      const entry = await collection.findOne({ email: normalizedEmail });
      if (!entry) {
        return { success: false, error: 'Email not found' };
      }
      
      // Update notes
      const updatedNotes = entry.notes
        ? `${entry.notes}\n\n${new Date().toISOString()}: ${notes}`
        : `${new Date().toISOString()}: ${notes}`;
      
      const result = await collection.updateOne(
        { email: normalizedEmail },
        { 
          $set: { 
            notes: updatedNotes,
            updatedAt: new Date()
          } 
        }
      );
      
      return { 
        success: result.matchedCount > 0,
        modified: result.modifiedCount > 0
      };
    } catch (error) {
      console.error('Error adding notes:', error);
      return { success: false, modified: false };
    }
  }
  
  /**
   * Add tags to a waitlist entry
   */
  static async addTags(email: string, tagsToAdd: string[]) {
    try {
      const normalizedEmail = email.toLowerCase().trim();
      const collection = await this.getCollection();
      
      const result = await collection.updateOne(
        { email: normalizedEmail },
        { 
          $addToSet: { tags: { $each: tagsToAdd } },
          $set: { updatedAt: new Date() }
        }
      );
      
      return { 
        success: result.matchedCount > 0,
        modified: result.modifiedCount > 0
      };
    } catch (error) {
      console.error('Error adding tags:', error);
      return { success: false, modified: false };
    }
  }
  
  /**
   * Get statistics about the waitlist
   */
  static async getStats() {
    try {
      const collection = await this.getCollection();
      
      // Get total count
      const totalCount = await collection.countDocuments();
      
      // Get count for last week
      const lastWeekCount = await collection.countDocuments({
        createdAt: {
          $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        },
      });
      
      // Get count by status
      const statusCounts = await collection.aggregate([
        { $group: { _id: "$status", count: { $sum: 1 } } }
      ]).toArray();
      
      const byStatus = statusCounts.reduce((acc, curr) => {
        acc[curr._id] = curr.count;
        return acc;
      }, {} as Record<string, number>);
      
      return {
        total: totalCount,
        lastWeek: lastWeekCount,
        byStatus,
      };
    } catch (error) {
      console.error('Error getting stats:', error);
      return {
        total: 0,
        lastWeek: 0,
        byStatus: {},
      };
    }
  }
}
