import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export async function POST(request) {
  try {
    const { email, code } = await request.json();
    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);

    const record = await db.collection("otps").findOne({ email });


    if (!record) {
      return NextResponse.json({ message: "OTP not found" }, { status: 400 });
    }

    // Check expiry
    if (new Date() > new Date(record.expiresAt)) {
      return NextResponse.json({ message: "OTP expired" }, { status: 400 });
    }

    // Compare bcrypt-hashed OTP
    const isMatch = await bcrypt.compare(code, record.code);
    if (!isMatch) {
      return NextResponse.json({ message: "Invalid OTP" }, { status: 400 });
    }

    // OTP verified → delete it
    await db.collection("otps").deleteOne({ email });

    return NextResponse.json({ message: "OTP verified", isMatch });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Error verifying OTP" },
      { status: 500 }
    );
  }
}
