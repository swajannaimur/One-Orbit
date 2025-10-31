"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

export default function PaymentSuccess() {
    const params = useSearchParams();
    const paymentIntent = params.get("payment_intent");
    const amount = params.get("amount");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!paymentIntent) return;

        const savePayment = async () => {
            try {
                const stored = sessionStorage.getItem("paymentData");
                const project = stored ? JSON.parse(stored) : null;

                const res = await fetch("/api/payment-history", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        project,
                        paymentId: paymentIntent,
                        paidAt: new Date(),
                        paidAmount: amount,
                        paidTo: project?.developers,
                    }),
                });

                const data = await res.json();
                if (data.success) {
                    toast.success("Payment saved successfully!");
                } else {
                    toast.error("Failed to save payment!");
                }
            } catch (error) {
                console.error(error);
                toast.error("Error saving payment!");
            } finally {
                setLoading(false);
            }
        };

        savePayment();
    }, [paymentIntent, amount]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-white">
            {loading ? (
                <span className="loading loading-spinner loading-lg"></span>
            ) : (
                <>
                    <h1 className="text-3xl font-bold">Payment Successful</h1>
                    <p className="mt-2 text-lg">Transaction ID: {paymentIntent}</p>
                    <p className="text-gray-400">Amount: ${amount}</p>
                </>
            )}
        </div>
    );
}
