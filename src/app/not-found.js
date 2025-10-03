"use client"

import Link from "next/link"

export default function notFound(){
 return(
    <div className="flex flex-col items-center justify-center min-h-screen gap-5">
        <h2 className="text-red-500 text-center text-5xl font-bold">
          404 Not Found
        </h2>
        <Link href={'/'}><button className="btn btn-primary">Go to Home</button></Link>
    </div>
 )   
}