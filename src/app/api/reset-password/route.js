import User from "@/models/User";
import connect from "@/utils/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";


export const POST = async (request) => {
    const {password, email} = await request.json();

    await connect();

    const existingUser = await User.findOne({email});

    const hashedPassword = await bcrypt.hash(password,5);
    existingUser.password = hashedPassword;

    existingUser.resetToken = undefined;
    existingUser.resetTokenExpiry = undefined;


    try{
        await existingUser.save();
        return new NextResponse("User's password is updated", {status: 200});
    }
    catch(err){
        return new NextResponse(err,{status: 500})
    }
   

}