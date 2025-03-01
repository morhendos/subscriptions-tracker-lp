// We need to use dynamic import for mongodb with Next.js
let MongoClient: any;
let ServerApiVersion: any;

// Only import MongoDB in server contexts
if (typeof window === 'undefined') {
  // This is a server-side only import
  import('mongodb').then((mongodb) => {
    MongoClient = mongodb.MongoClient;
    ServerApiVersion = mongodb.ServerApiVersion;
  });
}

if (!process.env.MONGODB_URI) {
  throw new Error('Please add MONGODB_URI to your environment variables');
}

const uri = process.env.MONGODB_URI;

// Global variable to store the connection
let client: any;
let clientPromise: Promise<any>;

// Cache the MongoDB connection in development
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

let cachedClient: any = null;
let cachedDb: any = null;

async function connectToDatabase() {
  // Check the cached connection
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  // Import MongoDB dynamically
  const { MongoClient } = await import('mongodb');
  
  // Connect to the database
  const client = await MongoClient.connect(MONGODB_URI as string);
  
  const db = client.db('subscriptions-tracker');
  
  // Cache the connection
  cachedClient = client;
  cachedDb = db;
  
  return { client, db };
}

export default connectToDatabase;
