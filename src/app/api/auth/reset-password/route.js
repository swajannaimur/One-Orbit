import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";



export async function POST(req) {
    try{
        const { token, newPassword } = await req.json();

        const client = await clientPromise;
        const db = client.db(process.env.DB_NAME);

        const tokenDoc = await db.collection("passwordResetTokens").findOne({ token });

        if(!tokenDoc){
            return NextResponse.json({error: "Invalid token"}, {status: 400});
        }

        if (new Date(tokenDoc.expiresAt) < new Date() ) {
            return NextResponse.json({ error: "Token Expired"}, { status: 400}); 
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await db.collection("users-data").updateOne(
            {_id: tokenDoc.userId},
            { $set: { password: hashedPassword }}
        );

        await db.collection("passwordResetTokens").deleteOne({ token });

        return NextResponse.json({ message: "Password updated successfully"});

    }
    catch(error){
        console.log("Error in reset-password API : ", error);
        return NextResponse.json({ error : "Internal Server Error"} , {status: 500})
    }
}