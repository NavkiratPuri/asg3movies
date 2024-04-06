import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const client = new MongoClient(process.env.MONGODB_URI, {
      useNewUrlParser: true, // Use new URL parser
      useUnifiedTopology: true, // Use unified topology

    });

    try {
      await client.connect(); // Connect to the MongoDB server
      const database = client.db('IMR'); // Select the 'IMR' database
      const collection = database.collection('movies'); // Select the 'movies' collection

      const { title, actors, release_year } = req.body; // Extract title, actors, and release_year from the request body

      const result = await collection.insertOne({ title, actors, release_year }); // Insert a new document into the 'movies' collection
      res.status(201).json({ message: 'Entry added successfully', entry: result.ops[0] }); // Send a success response with the inserted document
    } catch (err) {
      console.error(err); // Log any errors that occur
      res.status(500).json({ error: 'Internal Server Error' }); // Send an error response
    } finally {
      await client.close(); // Close the MongoDB connection
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' }); // Send an error response for unsupported HTTP methods
  }
}
