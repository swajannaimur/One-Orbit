import clientPromise from "../../../lib/mongodb";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const POST = async (request) => {
	try {
		const { password, email } = await request.json();

		// Mongo connection
		const client = await clientPromise;
		const db = client.db();
		const usersCollection = db.collection("users-data"); // ✅ তোমার collection

		// check user
		const existingUser = await usersCollection.findOne({ email });
		if (!existingUser) {
			return new NextResponse("User not found", { status: 400 });
		}

		// hash password
		const hashedPassword = await bcrypt.hash(password, 5);

		// update user
		await usersCollection.updateOne(
			{ email },
			{
				$set: {
					password: hashedPassword,
				},
				$unset: {
					resetToken: "",
					resetTokenExpiry: "",
				},
			}
		);

		return new NextResponse("User's password is updated", { status: 200 });
	} catch (err) {
		return new NextResponse(err.message, { status: 500 });
	}
};
