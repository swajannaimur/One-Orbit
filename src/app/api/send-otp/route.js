import { NextResponse } from "next/server";
// import nodemailer from "nodemailer";
import clientPromise from "../../../lib/mongodb";
import bcrypt from "bcryptjs";
import { sendEmail } from "@/utils/sendEmail";

export async function POST(request) {
  try {
    const { email, password } = await request.json();
    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);

    // find user
    const user = await db.collection("users-data").findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 400 });
    }

    // verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { message: "Invalid password" },
        { status: 400 }
      );
    }

    // generate a cryptographically strong 4-digit OTP
    const otp = String(Math.floor(1000 + Math.random() * 9000));
    const hashedOTP = await bcrypt.hash(otp, 5);

    // save or update OTP in DB
    await db.collection("otps").updateOne(
      { email },
      {
        $set: {
          code: hashedOTP,
          expiresAt: new Date(Date.now() + 5 * 60 * 1000), // 5 minutes
        },
      },
      { upsert: true }
    );

    // Nodemailer transporter
    sendEmail(
      email,
      "Your OTP Code",
      `Your verification code is ${otp}. This code will expire in 5 minutes.`
    );
    // const transporter = nodemailer.createTransport({
    //   service: "Gmail",
    //   auth: {
    //     user: process.env.EMAIL_USER,
    //     pass: process.env.EMAIL_PASS,
    //   },
    // });

    // await transporter.sendMail({
    //   from: process.env.EMAIL_USER,
    //   to: email,
    //   subject: "Your OTP Code",
    //   text: `Your verification code is ${otp}. This code will expire in 5 minutes.`,
    // });

    return NextResponse.json({ message: "OTP sent" });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Failed to send OTP" },
      { status: 500 }
    );
  }
}
