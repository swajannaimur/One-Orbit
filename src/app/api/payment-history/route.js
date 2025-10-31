import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";


export async function POST(req){
    try{
        const client = await clientPromise;
        const db = client.db(process.env.DB_NAME);

        const body = await req.json();
        const result = await db.collection("payment-history").insertOne(body);

            return NextResponse.json({ success: true, result });

    }
    catch(error){
        console.log("Error in saving payment : ", error);
        return NextResponse.json({ success : false, error: error.message}, {status: 500})
    }
}