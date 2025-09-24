import dbConnect from '@/lib/dbConnect';
import React from 'react';

const page = async () => {
    const usersCollection = dbConnect("users-data") 
    const data = await usersCollection.find({}).toArray();
    console.log(data);
    
    return (
        <div>
            <h2>this is users page</h2>
        </div>
    );
};

export default page;