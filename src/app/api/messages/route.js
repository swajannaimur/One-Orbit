// import clientPromise from "@/lib/mongodb";
// import { NextResponse } from "next/server";
// import Ably from "ably";

// export async function GET(request) {
//   try {
//     const { searchParams } = new URL(request.url);
//     const userId = searchParams.get("userId");
//     const friendId = searchParams.get("friendId");

//     if (!userId || !friendId) {
//       return NextResponse.json(
//         { error: "Missing userId or friendId" },
//         { status: 400 }
//       );
//     }

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
//       .sort({ timestamp: 1 })
//       .toArray();

//     return NextResponse.json(messages);
//   } catch (error) {
//     console.error("Failed to fetch messages:", error);
//     return NextResponse.json(
//       { error: "Failed to fetch messages" },
//       { status: 500 }
//     );
//   }
// }

// export async function POST(request) {
//   try {
//     const body = await request.json();
//     const { senderId, receiverId, text } = body;

//     if (!senderId || !receiverId || !text) {
//       return NextResponse.json({ error: "Missing fields" }, { status: 400 });
//     }

//     const client = await clientPromise;
//     const db = client.db(process.env.DB_NAME);
//     const collection = db.collection("messages");

//     const message = {
//       senderId,
//       receiverId,
//       text,
//       timestamp: new Date(),
//     };

//     const result = await collection.insertOne(message);
//     const savedMessage = { _id: result.insertedId, ...message };

//     // Publish to Ably (server-side publish using ABLY_API_KEY)
//     const ablyKey = process.env.ABLY_API_KEY;
//     if (!ablyKey) {
//       console.warn(
//         "ABLY_API_KEY not set — message will not be published to Ably."
//       );
//     } else {
//       const ably = new Ably.Rest({ key: ablyKey });
//       // Channel naming strategy for private messages:
//       // Make channel name deterministic based on the two user IDs so both subscribe to same channel
//       const [a, b] = [String(senderId), String(receiverId)].sort();
//       const channelName = `private:${a}:${b}`;

//       // Publish the saved message
//       await ably.channels.get(channelName).publish("message", savedMessage);
//     }

//     return NextResponse.json(savedMessage, { status: 201 });
//   } catch (error) {
//     console.error("Failed to send message:", error);
//     return NextResponse.json(
//       { error: "Failed to send message" },
//       { status: 500 }
//     );
//   }
// }






























import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Ably from "ably";
import { ObjectId } from "mongodb";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const friendId = searchParams.get("friendId");
    const groupId = searchParams.get("groupId");

    if ((!userId || !friendId) && !groupId) {
      return NextResponse.json(
        { error: "Missing required parameters" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);
    const collection = db.collection("messages");

    let query = {};
    if (groupId) {
      // Group messages
      query = { groupId: new ObjectId(groupId) };
    } else {
      // Private messages
      query = {
        $or: [
          { senderId: userId, receiverId: friendId },
          { senderId: friendId, receiverId: userId },
        ],
      };
    }

    const messages = await collection
      .find(query)
      .sort({ timestamp: 1 })
      .toArray();

    return NextResponse.json(messages);
  } catch (error) {
    console.error("Failed to fetch messages:", error);
    return NextResponse.json(
      { error: "Failed to fetch messages" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { senderId, receiverId, groupId, text } = body;

    if (!senderId || !text || (!receiverId && !groupId)) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);
    const collection = db.collection("messages");

    const message = {
      senderId,
      text,
      timestamp: new Date(),
    };

    // Add receiverId for private messages or groupId for group messages
    if (receiverId) {
      message.receiverId = receiverId;
      message.type = "private";
    } else if (groupId) {
      message.groupId = new ObjectId(groupId); // Convert to ObjectId
      message.type = "group";
    }

    const result = await collection.insertOne(message);
    const savedMessage = {
      _id: result.insertedId.toString(),
      ...message,
      // Convert ObjectId back to string for client
      groupId: message.groupId ? message.groupId.toString() : undefined,
    };

    // Publish to Ably
    const ablyKey = process.env.ABLY_API_KEY;
    if (!ablyKey) {
      console.warn(
        "ABLY_API_KEY not set — message will not be published to Ably."
      );
    } else {
      const ably = new Ably.Rest({ key: ablyKey });

      let channelName;
      if (receiverId) {
        // Private message channel
        const [a, b] = [String(senderId), String(receiverId)].sort();
        channelName = `private:${a}:${b}`;
      } else {
        // Group message channel
        channelName = `group:${groupId}`;
      }

      await ably.channels.get(channelName).publish("message", savedMessage);
    }

    return NextResponse.json(savedMessage, { status: 201 });
  } catch (error) {
    console.error("Failed to send message:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}