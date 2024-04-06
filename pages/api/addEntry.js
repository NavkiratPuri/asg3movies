// pages/api/addEntry.js

import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const client = new MongoClient(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    try {
      await client.connect();
      const database = client.db('IMR');
      const collection = database.collection('movies');

      const { title, actors, release_year } = req.body;

      const result = await collection.insertOne({ title, actors, release_year });
      res.status(201).json({ message: 'Entry added successfully', entry: result.ops[0] });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    } finally {
      await client.close();
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
