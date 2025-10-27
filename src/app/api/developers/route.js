import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export const GET = async (req) => {
	try {
		const email = req.headers.get("devEmail");
		if (!email) {
			return NextResponse.json(
				{ error: "Email header is missing" },
				{ status: 400 }
			);
		}

		const client = await clientPromise;
		const db = client.db(process.env.DB_NAME);
		const usersCollection = db.collection("users-data");

		const singleDeveloper = await usersCollection.findOne({ email });

		if (!singleDeveloper) {
			return NextResponse.json(
				{ error: "Developer Not Found" },
				{ status: 404 }
			);
		}

        // console.log(singleDeveloper);
		return NextResponse.json(singleDeveloper);

	} catch (error) {
		console.log("Error fetching developer : ", error);
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 }
		);
	}
};
