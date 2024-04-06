// pages/api/mongodb.js

import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
  const client = new MongoClient(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    const database = client.db('IMR');
    const collection = database.collection('movies');
    const data = await collection.find({}).toArray();
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    await client.close();
  }
}
