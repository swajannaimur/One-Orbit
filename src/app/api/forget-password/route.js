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
			subject: "Reset your OneOrbit Password securely ",
			text: `
                Hello,

                We received a request to reset your OneOrbit account password.
                You can reset it by clicking the secure link below:

                ${resetUrl}

                If you didn't request this, please ignore this email.

                Thank you,
                OneOrbit Team
                `,
            html: `
                <p>Click below to reset your password:</p>
                <a href="${resetUrl}" style="color: #1a73e8;">Reset Password</a>
                <p>If the button doesn’t work, copy and paste this link into your browser:</p>
                <p>${resetUrl}</p>
                `
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
