import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";

const USERS_COLLECTION = "users-data";

export const POST = async (request) => {
  try {
    const { name, email, password, image, role } = await request.json();

    if (!name || !email || !password || !image || !role) {
      return new NextResponse("Missing fields", { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);

    const existingUser = await db.collection(USERS_COLLECTION).findOne({ email });
    if (existingUser) {
      return new NextResponse("Email is already in use.", { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 5);

    const result = await db.collection(USERS_COLLECTION).insertOne({
      name,
      email,
      password: hashedPassword,
      image,
      role,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    console.log("User inserted:", result.insertedId);

    return new NextResponse("User is Registered Successfully.", { status: 200 });
  } catch (err) {
    console.error("Register error:", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
