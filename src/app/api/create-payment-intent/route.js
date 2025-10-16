import { NextRequest, NextResponse } from "next/server";
// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); 

export async function POST (request) {

    try{

        const { amount } = await request.json();

        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: "usd",
            automatic_payment_methods: { enabled: true },
        });

        return NextResponse.json({ clientSecret: paymentIntent.client_secret });
    }
    catch(error){
        console.log("Internal Error: ", error);

        // handling other errors like network issue, parsing errors
        return NextResponse.json(
            { error: `Internal Server Error: ${error}`},
            { status: 500 }
        );
    }
}