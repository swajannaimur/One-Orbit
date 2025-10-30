import clientPromise from "@/lib/mongodb";

export async function GET(req) {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);
    const collection = db.collection("users-invites");
    

    const doneUsers = await collection
      .find(
        { status: "done" },          // filter done users
        { projection: { password: 0 } } // hide password
      )
      .toArray();

    return new Response(JSON.stringify({ users: doneUsers }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching done invites:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
