import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";


export async function GET(){
    try{
        const client = await clientPromise;
        const db = client.db(process.env.DB_NAME);

        const data = await db.collection("assigned").find({
            status: "completed",
            payment: "not-paid"
        }).toArray();

        return NextResponse.json({ success: true, data});
    }
    catch(error){
        console.log(error);
        return NextResponse.json({ success: false, message: "Failed to fetch data"}, {status: 500})
    }
}