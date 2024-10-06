import { MongoClient, Db } from 'mongodb';

let client: MongoClient;
let db: Db;

async function connectToDatabase(): Promise<Db> {
  if (!client) {
    client = new MongoClient(process.env.MONGODB_URI as string);
    await client.connect();
    db = client.db('historical_figures_db');
  }
  return db;
}

export default defineEventHandler(async (event) => {
  const db = await connectToDatabase();
  const collection = db.collection('figures');

  // Fetch all historical figures
  const figures = await collection.find({}).toArray();

  return figures;
});
