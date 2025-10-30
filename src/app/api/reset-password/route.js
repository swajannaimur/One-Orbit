import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req) {
	try {
		const { token, password } = await req.json();

		if (!token || !password) {
			return NextResponse.json(
				{ message: "Invalid Request" },
				{ status: 400 }
			);
		}

		const client = await clientPromise;
		const db = client.db(process.env.DB_NAME);
		const usersCollection = db.collection("users-data");

		const user = await usersCollection.findOne({
			resetToken: token,
			resetTokenExpiry: { $gt: new Date() },
		});

		if (!user) {
			return NextResponse.json(
				{ message: "Invalid or expired token" },
				{ status: 400 }
			);
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		await usersCollection.updateOne(
			{ _id: user._id },
			{
				$set: { password: hashedPassword },
				$unset: { resetToken: "", resetTokenExpiry: "" },
			}
		);

        return NextResponse.json({message: "Password Rest Successfull"}, {status: 200});
	} catch (error) {
        console.log("Error in Reset password api : ", error);
        return NextResponse.json({message: "Internal Server Error"}, {status: 500});
    }
}
