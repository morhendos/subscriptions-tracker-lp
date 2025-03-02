import { MongoClient, Db } from 'mongodb';

const uri = process.env.MONGODB_URI || '';
const dbName = process.env.MONGODB_DB || 'subscriptions';

// Cache the MongoDB connection to prevent multiple connections
let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

if (!uri) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

export async function connectToDatabase(): Promise<Db> {
  // If we have a cached connection, use it
  if (cachedDb) {
    return cachedDb;
  }

  if (!cachedClient) {
    cachedClient = new MongoClient(uri);
    await cachedClient.connect();
  }

  const db = cachedClient.db(dbName);
  cachedDb = db;
  
  return db;
}

// Close the connection when the process terminates
process.on('SIGTERM', async () => {
  console.log('SIGTERM received, closing MongoDB connection');
  if (cachedClient) {
    await cachedClient.close();
    cachedClient = null;
    cachedDb = null;
  }
});
