import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";


export async function POST(req){
    try{
        const client = await clientPromise;
        const db = client.db(process.env.DB_NAME);

        const body = await req.json();
        // inserting in payment history
        const result = await db.collection("payment-history").insertOne(body);

        // updating assigned collection
        if(body?.project?.projectId) {
            const projectId = new ObjectId(body.project.projectId);
            const updateResult = await db.collection("assigned").updateOne(
                {projectId: projectId},
                {$set: {payment: "paid"}}
            );
            console.log("Assigned collection updated: ", updateResult.modifiedCount);
        }
            return NextResponse.json({ success: true, result });

    }
    catch(error){
        console.log("Error in saving payment : ", error);
        return NextResponse.json({ success : false, error: error.message}, {status: 500})
    }
}