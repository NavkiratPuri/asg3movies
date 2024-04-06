import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI; // MongoDB connection URI

let client;

export async function connectToDatabase() {
  if (!client) { // Check if client is already connected
    client = new MongoClient(uri, { // Create a new MongoClient instance
      useNewUrlParser: true, // Use new URL parser
      useUnifiedTopology: true, // Use new server discovery and monitoring engine
    });

    try {
      await client.connect(); // Connect to MongoDB
      console.log('Connected to MongoDB');
    } catch (err) {
      console.error('Error connecting to MongoDB:', err);
    }
  }

  return client; // Return the MongoDB client
}
