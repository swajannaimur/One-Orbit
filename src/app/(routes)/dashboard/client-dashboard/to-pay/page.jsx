"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function ToPayPage() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchToPayData = async () => {
            try {
                const res = await fetch("/api/to-pay");
                const json = await res.json();
                if (json.success) setData(json.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchToPayData();
    }, []);

    // console.log('To pay data : ', data);

    const handlePayNow = (item) => {
        sessionStorage.setItem("paymentData", JSON.stringify(item));
        router.push("/dashboard/client-dashboard/payment");
    };

    return (
        <div className="min-h-screen p-6">
            <motion.h1
                className="text-3xl font-bold mb-6 text-center text-primary"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                To Pay Projects
            </motion.h1>

            {loading ? (
                <div className="flex justify-center items-center h-40">
                    <span className="loading loading-spinner loading-lg text-primary"></span>
                </div>
            ) : data.length === 0 ? (
                <motion.div
                    className="text-center text-lg font-semibold text-gray-500"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    No Unpaid Payments
                </motion.div>
            ) : (
                <div className="overflow-x-auto bg-white shadow-lg rounded-2xl mt-6">
                    <table className="table table-zebra w-full min-w-[600px]">
                        {/* min-w ensures table is scrollable on small screens */}
                        <thead className="bg-primary text-white">
                            <tr>
                                <th>SL</th>
                                <th>Project Name</th>
                                <th>Developers</th>
                                <th>Budget ($)</th>
                                <th>Status</th>
                                <th>Payment</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, index) => (
                                <motion.tr
                                    key={item._id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="hover"
                                >
                                    <th>{index + 1}</th>
                                    <td className="font-semibold">{item.projectName}</td>
                                    <td>
                                        {item.developers?.map((dev, i) => (
                                            <div key={i} className="badge badge-outline mr-1">
                                                {dev}
                                            </div>
                                        ))}
                                    </td>
                                    <td>${item.budget}</td>
                                    <td>
                                        <span className="badge badge-success">{item.status}</span>
                                    </td>
                                    <td>
                                        <span className="badge badge-warning text-white">{item.payment}</span>
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => handlePayNow(item)}
                                            className="btn"
                                            disabled={item.payment === "completed"}
                                        >
                                            {item.payment === "completed" ? "Paid" : "Pay Now"}
                                        </button>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>

    );
}
