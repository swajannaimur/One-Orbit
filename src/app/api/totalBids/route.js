import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";


export async function GET(req){
    try{
        // accesing the clientEmail - coming from client-side
        const clientEmail = req.headers.get("clientEmail");

        if(!clientEmail) {
            return NextResponse.json({error: "clientEmail did not come"} , {status: 400});
        }

        // connecting to the db
        const client = await clientPromise;
		const db = client.db(process.env.DB_NAME);
		const collection = db.collection("bids");

        // aggregation query
        const result = await collection.aggregate([
            {
                $match: {
                    clientEmail: clientEmail,
                },
            },
            {
                $group: {
                    _id: "$projectName",
                    developerEmails: { $push: "$developerEmail"},
                    bids: { $push: "$bid"},
                },
            },
            {
                $project: {
                    _id: 0,
                    projectName: "$_id",
                    developerEmails: 1,
                    bids: 1,
                },
            },
        ]).toArray();

        // returning api response
        return NextResponse.json({ success: true, data: result});
    }
    catch(error){
        console.log("Error in fetching total bids" , error);
        return NextResponse.json({ error: "Internal Server Error"}, {status: 500});
    }
}