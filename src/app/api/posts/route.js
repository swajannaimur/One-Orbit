import clientPromise from "@/lib/mongodb";

export async function POST(req) {

  try {
    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);
    const collection = db.collection("posts");
    const body = await req.json();
    const result = await collection.insertOne({
      ...body,
      assigned: false,
      members: [],
      reminderSent: false,
      deadline: new Date(body.deadline),
      createdAt: new Date(),
    });

    return new Response(
      JSON.stringify({ success: true, id: result.insertedId }),
      { status: 201 }
    );

  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ success: false, error }), {
      status: 500,
    });
  }
}

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);
    const collection = db.collection("posts");

    const posts = await collection.find({}).sort({ createdAt: -1 }).toArray();

    return new Response(JSON.stringify(posts), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ success: false, error }), {
      status: 500,
    });
  }
}