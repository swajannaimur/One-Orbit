import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function GET(req) {
	try {
		const clientEmail = req.headers.get("clientEmail");

		if (!clientEmail) {
			return NextResponse.json(
				{ error: "clientEmail did not come" },
				{ status: 400 }
			);
		}

		// connect db
		const client = await clientPromise;
		const db = client.db(process.env.DB_NAME);
		const postsCollection = db.collection("posts");

		const result = await postsCollection
			.aggregate([
				// 1️⃣ match projects for this client
				{
					$match: { clientEmail: clientEmail },
				},
				// 2️⃣ lookup all bids for this project
				{
					$lookup: {
						from: "bids",
						let: { postId: { $toString: "$_id" } }, // convert _id to string
						pipeline: [
							{
								$match: {
									$expr: {
										$eq: ["$projectId", "$$postId"], // match string IDs
									},
								},
							},
							{
								$project: {
									_id: 0,
									developerEmail: 1,
									bid: 1,
								},
							},
						],
						as: "bidsData",
					},
				},
				// 3️⃣ final projection
				{
					$project: {
						_id: 0,
						projectId: "$_id",
						projectName: 1,
						category: 1,
						budget: 1,
						clientName: 1,
						clientEmail: 1,
						projectDetails: "$$ROOT",
						developerEmails: {
							$map: {
								input: "$bidsData",
								as: "b",
								in: "$$b.developerEmail",
							},
						},
						bids: {
							$map: {
								input: "$bidsData",
								as: "b",
								in: "$$b.bid",
							},
						},
					},
				},
			])
			.toArray();

		return NextResponse.json({ success: true, data: result });
	} catch (error) {
		console.error("Error in fetching total bids:", error);
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 }
		);
	}
}
