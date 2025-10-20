import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";


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
        // const postsCollection = db.collection("posts");

        // aggregation query
        const result = await collection.aggregate([

            // step 1 : convert projectId from string to ObjectId
            {
                $addFields: {
                    projectIdObj: {$toObjectId: "$projectId"},
                },
            },
            // step 2 : filtering bids by clientEmail
            {
                $match: {
                    clientEmail: clientEmail,
                },
            },
            // step 3 : lookup project details from posts collection
            {
                $lookup: {
                    from: "posts",
                    localField: "projectIdObj",
                    foreignField: "_id",
                    as: "projectDetails",
                },
            },
            // step 4 : grouping by projectName
            {
                $group: {
                    _id: "$projectName",
                    developerEmails: { $push: "$developerEmail"},
                    bids: { $push: "$bid"},
                    project: { $first: { $arrayElemAt: ["$projectDetails", 0]}},
                },
            },
            // step 5 : which fields you want to show
            {
                $project: {
                    _id: 0,
                    projectName: "$_id",
                    developerEmails: 1,
                    bids: 1,
                    projectDetails: "$project",
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