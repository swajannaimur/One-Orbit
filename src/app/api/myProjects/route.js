import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(req) {
	try {
		
        const email = req.headers.get("email");

        if(!email) {
            return NextResponse.json({ error: "Email is required to come from client side"} , {status: 400});
        }


        const client = await clientPromise;
		const db = client.db(process.env.DB_NAME);
		const collection = db.collection("posts");

        // filtering by clientEmail
        const myPosts = await collection.find({ clientEmail: email }).toArray();

        return NextResponse.json(myPosts);


	} catch (error) {
		console.log("Error in fetching my posts , ", error);
        return NextResponse.json({ error : "Internal server error"}, {status: 500});
	}
}
