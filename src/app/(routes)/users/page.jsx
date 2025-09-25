
import clientPromise from '@/lib/mongodb';
import React from 'react';

const page = async () => {
    const client = await clientPromise
    const db = client.db(process.env.DB_NAME)
    const usersCollection = await db.collection("users-data").find({}).toArray()

    console.log(usersCollection);

    return (
        <div>
            <h2>this is users page</h2>
        </div>
    );
};

export default page;