import clientPromise from '@/lib/mongodb'
import { NextResponse } from 'next/server';
import React from 'react'

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);
    const collection = db.collection("users-data");
    const users = await collection.find({}).toArray();
    return new NextResponse(JSON.stringify(users), { status: 200 });
  } catch (error) {
    console.error(error);
    return new NextResponse(JSON.stringify({ success: false, error }), {
      status: 500,
    }); 
  }
}
