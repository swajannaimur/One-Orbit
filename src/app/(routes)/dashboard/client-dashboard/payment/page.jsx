"use client";

import CheckoutPage from "@/components/payment/CheckoutPage";
import convertToSubcurrency from "@/lib/convertToSubcurrency";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC === undefined) {
    throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC is not defined");
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC);

export default function Payment() {

    const [project, setProject] = useState(null);

    useEffect(() => {
        const stored = sessionStorage.getItem("paymentData");
        if (stored) {
            setProject(JSON.parse(stored))
        }

    }, [])
    console.log(project);

    const amount = project?.budget ? parseInt(project.budget) : 1;

    console.log(typeof(amount))

    return (
        <div className="max-w-4xl mx-auto px-10 text-center">
            <div className="mb-10">
                <h1 className="text-4xl font-bold bg-gradient-to-br from-blue-600 to-purple-600 bg-clip-text text-transparent">Paying </h1>
                <h2 className="text-2xl">
                    to <span className="font-bold">{project?.developers}</span>
                </h2>
            </div>

            <Elements
                stripe={stripePromise}
                options={{
                    mode: "payment",
                    amount: convertToSubcurrency(amount),
                    currency: "usd",
                }}
            >
                <CheckoutPage amount={amount}></CheckoutPage>
            </Elements>
        </div>

    );
}
