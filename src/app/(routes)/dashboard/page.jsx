"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardRedirect() {
    const { data: session, status } = useSession();
    const router = useRouter();

    console.log(session);

    useEffect(() => {
        if (status === "loading") return;

        if (!session) {
            router.push("/login");
            return;
        }

        const role = session?.user?.role;
        console.log("User role:", role);

        if (role === "admin") {
            router.push("/dashboard/admin-dashboard");
        } else if (role === "developer") {
            router.push("/dashboard/developer-dashboard");
        } else if (role === "client") {
            router.push("/dashboard/client-dashboard");
        }
        else {
            router.push("/unauthorized");
        }
    }, [session, status, router]);

    return (
        <div className="flex justify-center items-center h-screen text-gray-600">
            Redirecting to your dashboard...
        </div>
    );
}
