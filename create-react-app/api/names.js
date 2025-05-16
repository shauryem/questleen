const clientPromise = require('../lib/mongodb');

module.exports = async function handler(req, res) {
  try {
    console.log('Attempting to connect to MongoDB...');
    const client = await clientPromise;
    console.log('Connected to MongoDB successfully');
    
    const db = client.db('questleen');
    const collection = db.collection('names');

    if (req.method === 'GET') {
      console.log('Processing GET request...');
      // Get all names from MongoDB
      const result = await collection.find({}).toArray();
      const names = result.map(doc => doc.name);
      console.log('Retrieved names:', names);
      res.status(200).json({ names });
    } else if (req.method === 'POST') {
      console.log('Processing POST request...');
      // Add a new name
      const { name } = req.body;
      if (!name || typeof name !== 'string' || name.trim() === '') {
        console.log('Invalid name provided');
        return res.status(400).json({ error: 'Name is required' });
      }

      // Insert the new name
      console.log('Inserting name:', name.trim());
      await collection.insertOne({ name: name.trim(), createdAt: new Date() });
      
      // Get updated list of names
      const result = await collection.find({}).toArray();
      const names = result.map(doc => doc.name);
      console.log('Updated names list:', names);
      
      res.status(201).json({ names });
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Detailed database error:', {
      message: error.message,
      stack: error.stack,
      code: error.code,
      name: error.name
    });
    res.status(500).json({ error: `Database error: ${error.message}` });
  }
} 