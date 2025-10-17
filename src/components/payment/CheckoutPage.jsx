"use client";

import convertToSubcurrency from "@/lib/convertToSubcurrency";
import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";


const CheckoutPage = ({ amount } ) => {
	
    const stripe = useStripe();
    const elements = useElements();
    
    const [errorMessage, setErrorMessage] = useState();
    const [clientSecret, setClientSecret] = useState("");
    const [loading, setLoading] = useState(false);


    useEffect(()=>{
        fetch("/api/create-payment-intent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ amount: convertToSubcurrency(amount) }),
        })
        .then((res)=> res.json())
        .then((data) => setClientSecret(data.clientSecret));
    }, [amount]);
    

    const handleSubmit = async(event) =>{
        event.preventDefault();
        setLoading(true);

        if(!stripe || !elements) {
            return;
        } 

        const { error : submitError } = await elements.submit();

        if(submitError) {
            setErrorMessage(submitError.message);
            setLoading(false);
            return;
        };

        const { error } = await stripe.confirmPayment({
          elements,
          clientSecret,
          confirmParams: {
            return_url: `https://one-orbit.vercel.app/payment-success?amount=${amount}`,
          },
        });

        if(error) {
            setErrorMessage(error.message);
        } else {

        }

        setLoading(false);




    };


    if(!clientSecret || !stripe || !elements) {
        return (
            <div className="flex items-center justify-center">

                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em]" role="status">

                    <span>
                        Loading...
                    </span>

                </div>

            </div>
        );
    }



    return <div>

        <form onSubmit={handleSubmit}>
            {clientSecret && <PaymentElement></PaymentElement>}

            

            <button
            disabled = {!stripe || loading}
            className="bg-black px-6 py-3 mt-4 rounded-md w-full text-xl font-bold disabled:opacity-50 disabled:animate-pulse">{!loading ? `Pay $${amount}` : "Processing..."}</button>
        </form>
        
        </div>;
};

export default CheckoutPage;
