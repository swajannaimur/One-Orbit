"use client";

import CheckoutPage from "@/components/payment/CheckoutPage";
import convertToSubcurrency from "@/lib/convertToSubcurrency";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC === undefined) {
	throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC is not defined");
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC);

export default function Payment() {
	const amount = 49.99;

	return (
		<main className="max-w-6xl mx-auto p-10 text-center text-white m-10 rounded-md bg-gradient-to-tr from-blue-500 to-purple-500">
			<div className="mb-10">
				<h1 className="text-4xl font-extrabold">Sonny</h1>
				<h2 className="text-2xl">
					has requested <span className="font-bold">${amount}</span>
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
		</main>
	);
}
