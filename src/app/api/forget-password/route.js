import clientPromise from "../../../lib/mongodb";
import { NextResponse } from "next/server";
import crypto from "crypto";
import sgMail from "@sendgrid/mail";

export const POST = async (request) => {
	try {
		const { email } = await request.json();

		const client = await clientPromise;
		const db = client.db(process.env.DB_NAME);
		const usersCollection = db.collection("users-data");

		const existingUser = await usersCollection.findOne({ email });
		if (!existingUser) {
			return new NextResponse("Email doesn't exist", { status: 400 });
		}

		// 1. Generate tokens
		const resetToken = crypto.randomBytes(20).toString("hex");
		const passwordResetToken = crypto
			.createHash("sha256")
			.update(resetToken)
			.digest("hex");
		const passwordResetExpires = Date.now() + 3600000; // 1 hour

		// 2. Update DB
		await usersCollection.updateOne(
			{ email },
			{
				$set: {
					resetToken: passwordResetToken,
					resetTokenExpiry: passwordResetExpires,
				},
			}
		);

		// 3. Send email
		const resetUrl = `http://localhost:3000/reset-password/${resetToken}`;
		const msg = {
			to: email,
			from: "yasinarafat1396@gmail.com", // verified sender
			subject: "Reset Password in OneOrbit",
			text: `Reset your password by clicking this link: ${resetUrl}`,
		};

		sgMail.setApiKey(process.env.SENDGRID_API_KEY || "");

		try {
			await sgMail.send(msg);
			return new NextResponse("Reset Password Email Sent.", {
				status: 200,
			});
		} catch (error) {
			// rollback token if failed
			await usersCollection.updateOne(
				{ email },
				{ $unset: { resetToken: "", resetTokenExpiry: "" } }
			);
			return new NextResponse("Failed to send Email. Try Again.", {
				status: 400,
			});
		}
	} catch (error) {
		console.error(error);
		return new NextResponse(error.message, { status: 500 });
	}
};
