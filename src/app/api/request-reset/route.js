import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";
import crypto from "crypto";
import { sendResetEmail } from "@/lib/nodemailer";




export async function POST(req){
    try{
        const { email } = await req.json();

        if(!email) {
            return NextResponse.json({ message: "Email is required"}, {status: 400});
        }

        const client = await clientPromise;
        const db = client.db(process.env.DB_NAME);
        const usersCollection = db.collection("users-data");

        const user = await usersCollection.findOne({ email });
        if(!user) {
            return NextResponse.json({ message: "User doesn't exist"}, {status: 404});
        }

        // now , generate reset token
        const token = crypto.randomBytes(32).toString("hex");
        const expiry = new Date(Date.now() + 3600000) // 1 hour

        // saving this token in the user's object
        await usersCollection.updateOne(
            {email},
            {$set: {resetToken: token, resetTokenExpiry: expiry}}
        );

        // calling nodemailer function in lib folder
        await sendResetEmail(email, token);

        return NextResponse.json({ message: "Password Reset Link is sent to the given email"}, {status: 200});


    }
    catch(error){
        console.log("Error in request-reset api: ", error);
        return NextResponse.json({message: "Intenal Server Error"}, {status: 500});
    }
}