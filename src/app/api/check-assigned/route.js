import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(req) {
	try {
		const client = await clientPromise;
		const db = client.db(process.env.DB_NAME);

		const projectId = req.nextUrl.searchParams.get("projectId");

		if (!projectId) {
			return NextResponse.json(
				{ assigned: false, error: "Missing projectId" },
				{ status: 400 }
			);
		}

		// Try both cases: string or ObjectId
		let existing = await db.collection("assigned").findOne({ projectId });

		if (!existing) {
			try {
				existing = await db
					.collection("assigned")
					.findOne({ projectId: new ObjectId(projectId) });
			} catch (err) {
				// ignore invalid ObjectId
			}
		}

		if (existing) {
			return NextResponse.json({ assigned: true });
		} else {
			return NextResponse.json({ assigned: false });
		}
	} catch (error) {
		console.error("Error checking assigned:", error);
		return NextResponse.json(
			{ assigned: false, error: "Internal server error" },
			{ status: 500 }
		);
	}
}
