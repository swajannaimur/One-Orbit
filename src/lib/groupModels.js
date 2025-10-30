import clientPromise from "./mongodb";
import { ObjectId } from "mongodb";

export async function createGroup(groupData) {
  const client = await clientPromise;
  const db = client.db(process.env.DB_NAME);

  const group = {
    name: groupData.name,
    description: groupData.description,
    createdBy: groupData.createdBy,
    members: groupData.members, // Array of ObjectIds
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const result = await db.collection("groups").insertOne(group);

  // Return with string IDs for client
  return {
    _id: result.insertedId.toString(),
    ...group,
    createdBy: group.createdBy.toString(),
    members: group.members.map((id) => id.toString()),
  };
}

export async function getGroupsByUser(userId) {
  const client = await clientPromise;
  const db = client.db(process.env.DB_NAME);

  const groups = await db
    .collection("groups")
    .find({ members: userId })
    .sort({ updatedAt: -1 })
    .toArray();

  // Convert ObjectIds to strings for client-side use
  return groups.map((group) => ({
    ...group,
    _id: group._id.toString(),
    createdBy: group.createdBy.toString(),
    members: group.members.map((id) => id.toString()),
  }));
}

export async function addMemberToGroup(groupId, userId) {
  const client = await clientPromise;
  const db = client.db(process.env.DB_NAME);

  const result = await db.collection("groups").updateOne(
    { _id: groupId },
    {
      $addToSet: { members: userId }, // userId is ObjectId
      $set: { updatedAt: new Date() },
    }
  );

  return result;
}

export async function getGroupById(groupId) {
  const client = await clientPromise;
  const db = client.db(process.env.DB_NAME);

  const group = await db.collection("groups").findOne({ _id: groupId });

  if (group) {
    return {
      ...group,
      _id: group._id.toString(),
      createdBy: group.createdBy.toString(),
      members: group.members.map((id) => id.toString()),
    };
  }
  return null;
}

// New function to check if user is member of group
export async function isUserMemberOfGroup(groupId, userId) {
  const client = await clientPromise;
  const db = client.db(process.env.DB_NAME);

  const group = await db.collection("groups").findOne({
    _id: new ObjectId(groupId),
    members: new ObjectId(userId),
  });

  return group !== null;
}
