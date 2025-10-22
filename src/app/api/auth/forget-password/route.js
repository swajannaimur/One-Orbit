import clientPromise from "@/lib/mongodb";
import { sendEmail } from "@/utils/sendEmail";
import { NextResponse } from "next/server";




export async function POST(req) {
    try{
        const { email } = await req.json();

        const client = await clientPromise;
        const db = client.db(process.env.DB_NAME);
        const usersCollection = db.collection("users-data");

        // step 1 : checking the user (exist or not)
        const existingUser = await usersCollection.findOne({ email: email });

        // user exist na korle
        if(!existingUser) {
            return NextResponse.json({ error : "User not Found"} , { status: 404 });
        }

        // step 2 : Generating secure token
        const token = crypto.randomBytes(32).toString("hex");
        const expireTime = new Date(Date.now() + 1000 * 60 * 15) // 15 minutes

        // step 3 : Saving the token in Database
        await db.collection("passwordResetTokens").insertOne({
            userId: existingUser._id,
            token,
            expiresAt: expireTime,
        });

        // step 4 : building reset link
        const resetLink = `${process.env.NEXTAUTH_URL}/reset-password/${token}`;

        // step 5 : Send Email
        await sendEmail({
            to: email,
            subject: "Reset your OneOrbit Password",
            html: `
            <p>Hello ${user.name || "User"},</p>
            <p>Click the link below to reset your password:</p>
            <a href="${resetLink}" target="_blank">${resetLink}</a>
            <p>This link will expire in 15 minutes.</p>
            `
        });

        return NextResponse.json({ message: "Reset email sent"});
    }
    catch(error){
        console.log("Forgot password Error : " ,error);
        return NextResponse.json({ error : "Internal Server Error"}, {status: 500});
    }
}