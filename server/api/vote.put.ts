import { H3Event } from "h3";
import { MongoClient, ObjectId } from "mongodb";

export default defineEventHandler(async (event: H3Event) => {
  const query = getQuery(event);
  const { id, mbtiType } = query;

  if (!id) {
    return sendError(
      event,
      createError({ statusCode: 400, statusMessage: "ID parameter is missing" })
    );
  }

  try {
    const client = await MongoClient.connect(process.env.MONGODB_URI as string);
    const db = client.db(process.env.DB_NAME);
    const collection = db.collection(process.env.FIGURES_COLLECTION!);

    const updateQuery = { _id: new ObjectId(id as string) };
    const updateOperation = mbtiType
      ? { $inc: { [`mbti_votes.${mbtiType}`]: 1 } }
      : { $inc: { votes: 1 } };

    await collection.updateOne(updateQuery, updateOperation);

    client.close();
  } catch (error) {
    console.error("Database update error:", error);
    return sendError(
      event,
      createError({
        statusCode: 500,
        statusMessage: "An error occurred during the update process",
      })
    );
  }
});
