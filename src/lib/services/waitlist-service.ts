import { Collection, Db, ObjectId } from 'mongodb';
import { connectToDatabase } from '../database';
import { 
  WaitlistEntry, 
  WaitlistEntryWithId, 
  CreateWaitlistEntryInput,
  UpdateWaitlistEntryInput 
} from '@/types/waitlist';

class WaitlistService {
  private db: Db | null = null;
  private collection: Collection | null = null;
  private collectionName = 'waitlist';

  /**
   * Initialize the database connection
   */
  private async init(): Promise<Collection> {
    if (this.collection) return this.collection;
    
    this.db = await connectToDatabase();
    this.collection = this.db.collection(this.collectionName);
    
    // Create indexes if they don't exist
    await this.collection.createIndex({ email: 1 }, { unique: true });
    await this.collection.createIndex({ createdAt: -1 });
    
    return this.collection;
  }

  /**
   * Transform MongoDB document to WaitlistEntryWithId
   */
  private transformEntry(doc: any): WaitlistEntryWithId {
    return {
      id: doc._id.toString(),
      name: doc.name,
      email: doc.email,
      createdAt: doc.createdAt,
      source: doc.source,
      interests: doc.interests || [],
      notes: doc.notes || '',
      contacted: doc.contacted,
      convertedToCustomer: doc.convertedToCustomer
    };
  }

  /**
   * Add a new entry to the waitlist
   */
  async addToWaitlist(entry: CreateWaitlistEntryInput): Promise<{ success: boolean; message: string; id?: string }> {
    try {
      const collection = await this.init();
      
      // Check if email already exists
      const existingEntry = await collection.findOne({ email: entry.email });
      if (existingEntry) {
        return { 
          success: false, 
          message: 'Email already registered for waitlist' 
        };
      }
      
      // Create new entry
      const result = await collection.insertOne({
        name: entry.name,
        email: entry.email,
        source: entry.source || 'waitlist_page',
        interests: entry.interests || [],
        createdAt: new Date(),
        contacted: false,
        convertedToCustomer: false
      });
      
      return { 
        success: true, 
        message: 'Added to waitlist successfully',
        id: result.insertedId.toString()
      };
    } catch (error) {
      console.error('Error adding to waitlist:', error);
      return { 
        success: false, 
        message: 'Failed to add to waitlist' 
      };
    }
  }

  /**
   * Get all waitlist entries
   */
  async getAllEntries(): Promise<WaitlistEntryWithId[]> {
    try {
      const collection = await this.init();
      const entries = await collection.find({})
        .sort({ createdAt: -1 })
        .toArray();
      
      return entries.map(entry => this.transformEntry(entry));
    } catch (error) {
      console.error('Error fetching waitlist entries:', error);
      return [];
    }
  }

  /**
   * Get a specific waitlist entry
   */
  async getEntry(id: string): Promise<WaitlistEntryWithId | null> {
    try {
      const collection = await this.init();
      const entry = await collection.findOne({ _id: new ObjectId(id) });
      
      if (!entry) return null;
      return this.transformEntry(entry);
    } catch (error) {
      console.error(`Error fetching waitlist entry ${id}:`, error);
      return null;
    }
  }

  /**
   * Update a waitlist entry
   */
  async updateEntry(id: string, update: UpdateWaitlistEntryInput): Promise<boolean> {
    try {
      const collection = await this.init();
      const result = await collection.updateOne(
        { _id: new ObjectId(id) },
        { $set: update }
      );
      
      return result.modifiedCount > 0;
    } catch (error) {
      console.error(`Error updating waitlist entry ${id}:`, error);
      return false;
    }
  }

  /**
   * Delete a waitlist entry
   */
  async deleteEntry(id: string): Promise<boolean> {
    try {
      const collection = await this.init();
      const result = await collection.deleteOne({ _id: new ObjectId(id) });
      
      return result.deletedCount > 0;
    } catch (error) {
      console.error(`Error deleting waitlist entry ${id}:`, error);
      return false;
    }
  }

  /**
   * Get stats about the waitlist
   */
  async getStats(): Promise<{ 
    total: number; 
    contacted: number; 
    converted: number;
    lastWeek: number;
  }> {
    try {
      const collection = await this.init();
      const total = await collection.countDocuments();
      const contacted = await collection.countDocuments({ contacted: true });
      const converted = await collection.countDocuments({ convertedToCustomer: true });
      
      // Get last week stats
      const lastWeek = new Date();
      lastWeek.setDate(lastWeek.getDate() - 7);
      const lastWeekCount = await collection.countDocuments({ createdAt: { $gte: lastWeek } });
      
      return {
        total,
        contacted,
        converted,
        lastWeek: lastWeekCount
      };
    } catch (error) {
      console.error('Error getting waitlist stats:', error);
      return { total: 0, contacted: 0, converted: 0, lastWeek: 0 };
    }
  }
}

// Export as singleton
export const waitlistService = new WaitlistService();
