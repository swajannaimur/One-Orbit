import clientPromise from "../../../lib/mongodb";
import crypto from "crypto";
import { NextResponse } from "next/server";

export const POST = async (request) => {
	try {
		const { token } = await request.json();

		// Mongo connection
		const client = await clientPromise;
		const db = client.db();
		const usersCollection = db.collection("users-data");

		// hash incoming token
		const hashedToken = crypto
			.createHash("sha256")
			.update(token)
			.digest("hex");

		// find user with valid token
		const user = await usersCollection.findOne({
			resetToken: hashedToken,
			resetTokenExpiry: { $gt: Date.now() },
		});

		if (!user) {
			return new NextResponse("Invalid token or token has expired", {
				status: 400,
			});
		}

		// success
		return new NextResponse(JSON.stringify(user), { status: 200 });
	} catch (err) {
		return new NextResponse(err.message, { status: 500 });
	}
};
