import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation';
import React from 'react'

export default async function DashboardHome() {

    const session = await getServerSession();

    if(!session) {
        redirect("/login");
    }
    

    return (
        // main div
        <div className="border-4">
            


            <h2 className="text-xl font-semibold my-5 p-6">Welcome to Dashboard Home as Client</h2>

            <button className="btn">DaisyUI button</button>
        </div>
    )
}
