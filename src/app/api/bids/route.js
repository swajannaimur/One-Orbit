import clientPromise from "@/lib/mongodb";

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
