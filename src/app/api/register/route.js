import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";

// collection name
const USERS_COLLECTION = "users-data";

// to register as a new user we need to create POST request manually
export const POST = async (request) => {
    try {
        const { name, email, password, role } = await request.json();

        // connect with mongodb
        const client = await clientPromise;
        const db = client.db(process.env.DB_NAME); // database name

        // checking if the user already exists
        const existingUser = await db.collection(USERS_COLLECTION).findOne({ email });
        if (existingUser) {
            return new NextResponse("Email is already in use.", { status: 400 });
        }

        // if the user is new , then continue further processes
        // hash his/her password
        const hashedPassword = await bcrypt.hash(password, 5);

        // now insert the new user to the database
        await db.collection(USERS_COLLECTION).insertOne({
            name,
            email,
            password: hashedPassword,
            role,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        return new NextResponse("User is Registered Successfully.", { status: 200 });
    }
    catch (err) {
        console.error("Register error : ", err);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
};