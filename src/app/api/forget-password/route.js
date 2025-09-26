import User from "@/models/User";
import connect from "@/utils/db";
import { NextResponse } from "next/server";
import crypto from "crypto";
import sgMail from "@sendgrid/mail";



// signup korte post request lage
// ei jonno we want to pass the data from the frontend

export const POST = async (request) => {
	const { email } = await request.json();

	await connect();

	// checking if the use is already exist
	const existingUser = await User.findOne({ email });

	if (!existingUser) {
		return new NextResponse("Email doesn't exist ", { status: 400 });
	}

    // ekhon crypto diye "reset token", "reset password token" and "expiry date" banate hobe

    const resetToken = crypto.randomBytes(20).toString('hex');
    const passwordResetToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    
    const passwordResetExpires = Date.now() + 3600000; // 1 hour in miliseconds

    existingUser.resetToken = passwordResetToken;
    existingUser.resetTokenExpiry = passwordResetExpires;
    const resetUrl = `localhost:3000/reset-password/${resetToken}`;

    console.log("reset url :" , resetUrl);

    const body = "Reset Password by clicking on the following url : " + resetUrl;

    const msg = {
        to: email,
        from: "yasinarafat1396@gmail.com",
        subject: "Reset Password",
        text: body
    }

    sgMail.setApiKey(process.env.SENDGRID_API_KEY || "");
    
    sgMail.send(msg).then(()=>{
        return new NextResponse("Reset password email is sent.", {status: 200});

    }).catch(async(error) =>{
        existingUser.resetToken = undefined;
        existingUser.resetTokenExpiry = undefined;
        await existingUser.save();

        return new NextResponse("Failed sending email. Try Again", {
            status: 400,
        });
    });


    try{
        await existingUser.save();
        return new NextResponse("Email is sent for resetting password",{
            status: 200,
        });
    } catch(error){
        return new NextResponse(error, {
            status: 500,
        });
    }



    // token generate kora holo

    // we can now store this reset token in the url,
    // that will be passing it with the email id

    // ** ei reset token ta url a store hok, kintu database a store kora jabe na. 
    // ... tahole problem hobe

    // that's why creating another token


    // passwordResetToken ta user model and database a store kora hobe

	
};
