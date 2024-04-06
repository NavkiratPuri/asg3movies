import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
  const client = new MongoClient(process.env.MONGODB_URI, { // Create a new MongoClient instance
    useNewUrlParser: true, // Set the useNewUrlParser option to true
    useUnifiedTopology: true, // Set the useUnifiedTopology option to true
  });

  try {
    await client.connect(); // Connect to the MongoDB server
    const database = client.db('IMR'); // Get the 'IMR' database
    const collection = database.collection('movies'); // Get the 'movies' collection
    const data = await collection.find({}).toArray(); // Find all documents in the collection and convert them to an array
    res.status(200).json(data); // Send the data as a JSON response with a 200 status code
  } catch (err) {
    console.error(err); // Log any errors to the console
    res.status(500).json({ error: 'Internal Server Error' }); // Send an error response with a 500 status code
  } finally {
    await client.close(); // Close the MongoDB connection
  }
}
