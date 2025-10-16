import { ObjectId } from "mongodb";
import clientPromise from "./mongodb";


export async function getDueProjects() {
  const client = await clientPromise;
  const db = client.db(process.env.DB_NAME);
  const now = new Date();
  const next24h = new Date(now.getTime() + 24 * 60 * 60 * 1000);
  const projects = await db.collection("posts").find({deadline: { $lte: next24h }, reminderSent: { $ne: true }}).toArray();
  return projects;
}

export async function markProjectReminderSent(id) {
  const client = await clientPromise;
  const db = client.db(process.env.DB_NAME);
  await db
    .collection("posts")
    .updateOne(
      { _id: new ObjectId(id) },
      { $set: { reminderSent: true, reminderSentAt: new Date() } }
    );
}
