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

  const handlePayNow = (item) => {
    sessionStorage.setItem("paymentData", JSON.stringify(item));
    router.push("/dashboard/client-dashboard/payment");
  };

  return (
    <div className="min-h-screen p-4 sm:p-6">
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      ) : data.length === 0 ? (
        <motion.div
          className="text-center text-base sm:text-lg font-semibold text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          No Unpaid Payments
        </motion.div>
      ) : (
        <>
          {/* 🟢 Table View for Large Screens */}
          <div className="hidden sm:block overflow-x-auto bg-white shadow-lg rounded-md mt-6">
            <table className="table table-zebra w-full min-w-[700px] text-sm sm:text-base">
              <thead className="bg-gradient-to-br from-blue-600 to-purple-600 text-white">
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
                    <td className="font-semibold break-words">
                      {item.projectName}
                    </td>
                    <td>
                      <div className="flex flex-wrap gap-1">
                        {item.developers?.map((dev, i) => (
                          <div key={i} className="badge badge-outline">
                            {dev}
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="font-bold">${item.budget}</td>
                    <td>
                      <span className="badge badge-success text-white font-semibold">{item.status}</span>
                    </td>
                    <td>
                      <span className="badge badge-warning text-white">
                        {item.payment}
                      </span>
                    </td>
                    <td>
                      <button
                        onClick={() => handlePayNow(item)}
                        className="btn btn-sm btn-linear"
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

          {/* 🔵 Card View for Mobile/Tablet */}
          <div className="grid gap-4 sm:hidden mt-6">
            {data.map((item, index) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="p-4 bg-white shadow-lg rounded-xl border border-gray-100"
              >
                <div className="flex justify-between items-center mb-2">
                  <h2 className="font-semibold text-base text-gray-800">
                    {item.projectName}
                  </h2>
                  <span className="badge badge-success text-xs">
                    {item.status}
                  </span>
                </div>

                <p className="text-sm text-gray-600 mb-1">
                  <span className="font-medium text-gray-700">Developers: </span>
                  {item.developers?.join(", ")}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <span className="font-medium text-gray-700">Budget: </span>${item.budget}
                </p>
                <p className="text-sm text-gray-600 mb-3">
                  <span className="font-medium text-gray-700">Payment: </span>
                  <span className="badge badge-warning text-white ml-1">
                    {item.payment}
                  </span>
                </p>

                <button
                  onClick={() => handlePayNow(item)}
                  className={`btn btn-sm w-full ${
                    item.payment === "completed"
                      ? "btn-disabled bg-gray-300 text-gray-600 cursor-not-allowed"
                      : "btn-primary"
                  }`}
                  disabled={item.payment === "completed"}
                >
                  {item.payment === "completed" ? "Paid" : "Pay Now"}
                </button>
              </motion.div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
