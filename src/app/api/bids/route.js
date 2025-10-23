import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb"; 

export async function POST(req) {
    try {
        const client = await clientPromise;
        const db = client.db(process.env.DB_NAME);
        const bidsCollection = db.collection("bids");

        const body = await req.json();
        const result = await bidsCollection.insertOne({
            ...body,
            createdAt: new Date(),
        });

        return new Response(
            JSON.stringify({ success: true, id: result.insertedId }),
            { status: 201 }
        );
    } catch (error) {
        console.error("Error inserting bid:", error);
        return new Response(JSON.stringify({ success: false, error }), {
            status: 500,
        });
    }
}

export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db(process.env.DB_NAME);
        const bidsCollection = db.collection("bids");

        const bids = await bidsCollection.find({}).sort({ createdAt: -1 }).toArray();

        return new Response(JSON.stringify(bids), { status: 200 });
    } catch (error) {
        console.error("Error fetching bids:", error);
        return new Response(JSON.stringify({ success: false, error }), {
            status: 500,
        });
    }
}


// export async function DELETE(req) {
//   const id = req.nextUrl.searchParams.get("id");
//   if (!id) return new Response("Missing ID", { status: 400 });

//   try {
//     const client = await clientPromise;
//     const db = client.db(process.env.DB_NAME);
//     const collection = db.collection("bids");

//     const result = await collection.deleteOne({ _id: new ObjectId(id) });
//     if (result.deletedCount === 0)
//       return new Response("Not found", { status: 404 });

//     return new Response(JSON.stringify({ success: true }), { status: 200 });
//   } catch (err) {
//     return new Response(JSON.stringify({ success: false, error: err.message }), { status: 500 });
//   }
// }

export async function DELETE(req) {
  const id = req.nextUrl.searchParams.get("id");
  if (!id) return new Response("Missing ID", { status: 400 });

  try {
    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);
    const collection = db.collection("bids");

    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0)
      return new Response("Not found", { status: 404 });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    return new Response(
      JSON.stringify({ success: false, error: err.message }),
      { status: 500 }
    );
  }
}