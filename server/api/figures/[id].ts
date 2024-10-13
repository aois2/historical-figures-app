import { MongoClient, Db, ObjectId } from "mongodb";

let client: MongoClient | null = null;
let db: Db | null = null;

async function connectToDatabase(): Promise<Db> {
  if (!client) {
    const mongoUri = process.env.MONGODB_URI as string;
    client = new MongoClient(mongoUri);
    await client.connect();
    db = client.db("historical_figures_db");
  }
  return db as Db;
}

export default defineEventHandler(async (event) => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection("figures");

    const id = event.context.params?.id;
    if (!id) {
      throw new Error("ID is required");
    }

    const figure = await collection.findOne({ _id: new ObjectId(id) });

    if (!figure) {
      throw new Error("Figure not found");
    }

    return figure;
  } catch (error) {
    console.error("Error fetching figure:", error);
    throw new Error("Failed to fetch figure data");
  }
});
