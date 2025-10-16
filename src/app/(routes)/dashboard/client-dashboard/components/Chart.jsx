"use client";
import React from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";


const data = [
    { name: "Pending", Projects: 12 },
    { name: "Completed", Projects: 30 },
    { name: "Not Completed", Projects: 8 },
];

const Chart = () => {
    return (
        <div className="w-full h-64 bg-white rounded-xl shadow-md p-4">
            <h2 className="text-lg font-semibold mb-4 text-gray-700">
                Project Status Overview
            </h2>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" stroke="#555" />
                    <YAxis stroke="#555" />
                    <Tooltip
                        contentStyle={{ backgroundColor: "#f9f9f9", borderRadius: 8 }}
                    />
                    <Legend />
                    <Bar dataKey="Projects" fill="#4f46e5" barSize={40} radius={[5, 5, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default Chart;
