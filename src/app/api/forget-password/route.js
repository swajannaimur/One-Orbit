import clientPromise from "../../../lib/mongodb";
import { NextResponse } from "next/server";
import crypto from "crypto";
import sgMail from "@sendgrid/mail";

export const POST = async (request) => {
	try {
		const { email } = await request.json();

		// Mongo connection
		const client = await clientPromise;
		const db = client.db(); // default DB from URI
		const usersCollection = db.collection("users-data");

		// check user
		const existingUser = await usersCollection.findOne({ email });
		if (!existingUser) {
			return new NextResponse("Email doesn't exist", { status: 400 });
		}

		// token generate
		const resetToken = crypto.randomBytes(20).toString("hex");
		const passwordResetToken = crypto
			.createHash("sha256")
			.update(resetToken)
			.digest("hex");
		const passwordResetExpires = Date.now() + 3600000; // 1 hour

		// DB update
		await usersCollection.updateOne(
			{ email },
			{
				$set: {
					resetToken: passwordResetToken,
					resetTokenExpiry: passwordResetExpires,
				},
			}
		);

		const resetUrl = `http://localhost:3000/reset-password/${resetToken}`;
		const body = `Reset your password by clicking the link: ${resetUrl}`;

		// send email
		sgMail.setApiKey(process.env.SENDGRID_API_KEY || "");
		const msg = {
			to: email,
			from: "yasinarafat1396@gmail.com", // must be verified sender
			subject: "Reset Password",
			text: body,
		};

		try {
			await sgMail.send(msg);
			return new NextResponse("Reset password email sent", {
				status: 200,
			});
		} catch (error) {
			// rollback if email fails
			await usersCollection.updateOne(
				{ email },
				{ $unset: { resetToken: "", resetTokenExpiry: "" } }
			);
			return new NextResponse("Failed sending email. Try again.", {
				status: 400,
			});
		}
	} catch (error) {
		return new NextResponse(error.message, { status: 500 });
	}
};
