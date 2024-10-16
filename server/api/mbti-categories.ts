// /api/mbti-categories.js
import { MongoClient, Db } from "mongodb";

let client: MongoClient;
let db: Db;

async function connectToDatabase(): Promise<Db> {
  if (!client) {
    client = new MongoClient(process.env.MONGODB_URI as string);
    await client.connect();
    db = client.db(process.env.DB_NAME);
  }
  return db;
}

export default defineEventHandler(async (event) => {
  const db = await connectToDatabase();
  const collection = db.collection(process.env.MBTI_CATEGORIES_COLLECTION!);

  const data = await collection.find({}).toArray();
  return data;
});
