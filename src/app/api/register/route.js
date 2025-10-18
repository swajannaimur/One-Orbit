import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";

const USERS_COLLECTION = "users-data";

export const POST = async (request) => {
  try {
    const { name, email, password, image, role } = await request.json();

    // ✅ Validate inputs
    if (!name || !email || !password || !image || !role) {
      return new NextResponse("Missing fields", { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);

    // ✅ Check if user already exists
    const existingUser = await db.collection(USERS_COLLECTION).findOne({ email });
    if (existingUser) {
      return new NextResponse("Email is already in use.", { status: 400 });
    }

    // ✅ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Insert user into database
    const result = await db.collection(USERS_COLLECTION).insertOne({
      name,
      email,
      password: hashedPassword,
      image,
      role,
      friends: [],
      status: "offline", // ✅ must be a string
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    console.log("✅ User inserted with ID:", result.insertedId);

    return new NextResponse("User is Registered Successfully.", { status: 200 });

  } catch (err) {
    console.error("❌ Register error:", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
