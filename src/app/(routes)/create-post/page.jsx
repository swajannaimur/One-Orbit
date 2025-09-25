import AddPost from '@/components/forms/AddPost';
import React from 'react';

const page = () => {


    return (
        <div className='min-h-screen'>
            <div className=" p-8 w-full">
                <h2 className="text-3xl font-bold text-center text-primary mb-6">
                    Add Your Desired Project
                </h2>
                <AddPost />
            </div>
        </div>
    );
};

export default page;