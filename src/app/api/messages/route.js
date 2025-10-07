// import clientPromise from "@/lib/mongodb";

// export async function GET(request) {
//   try {
//     const { searchParams } = new URL(request.url);
//     const userId = searchParams.get("userId");
//     const friendId = searchParams.get("friendId");

//     const client = await clientPromise;
//     const db = client.db(process.env.DB_NAME);
//     const collection = db.collection("messages");

//     const messages = await collection
//       .find({
//         $or: [
//           { senderId: userId, receiverId: friendId },
//           { senderId: friendId, receiverId: userId },
//         ],
//       })
//       .sort({ createdAt: 1 })
//       .toArray();

//     return new Response(JSON.stringify(messages), {
//       status: 200,
//       headers: { "Content-Type": "application/json" },
//     });
//   } catch (error) {
//     return new Response(JSON.stringify({ error: "Failed to fetch messages" }), {
//       status: 500,
//       headers: { "Content-Type": "application/json" },
//     });
//   }
// }

// export async function POST(request) {
//   try {
//     const { senderId, receiverId, text } = await request.json();

//     const client = await clientPromise;
//     const db = client.db(process.env.DB_NAME);
//     const collection = db.collection("messages");

//     const message = {
//       senderId,
//       receiverId,
//       text,
//       createdAt: new Date(),
//     };

//     const result = await collection.insertOne(message);

//     return new Response(
//       JSON.stringify({
//         _id: result.insertedId,
//         ...message,
//       }),
//       {
//         status: 201,
//         headers: { "Content-Type": "application/json" },
//       }
//     );
//   } catch (error) {
//     return new Response(JSON.stringify({ error: "Failed to send message" }), {
//       status: 500,
//       headers: { "Content-Type": "application/json" },
//     });
//   }
// }
