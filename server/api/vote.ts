import { MongoClient, ObjectId } from "mongodb";

export default async function handler(req, res) {
  const { id, mbtiType } = req.query;

  if (req.method !== "PUT") {
    return res.status(405).json({ message: "Only PUT requests are allowed" });
  }

  const client = await MongoClient.connect(process.env.MONGODB_URI as string);
  const db = client.db("historical_figures");
  const collection = db.collection("figures");

  const updateQuery = { _id: new ObjectId(id) };
  const updateOperation = mbtiType
    ? { $inc: { [`mbti_votes.${mbtiType}`]: 1 } } // Increment MBTI vote count
    : { $inc: { votes: 1 } }; // Increment individual vote count

  await collection.updateOne(updateQuery, updateOperation);

  client.close();
  res.status(200).json({ message: "Vote counted!" });
}
