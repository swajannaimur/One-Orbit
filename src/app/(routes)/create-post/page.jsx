

import { getServerSession } from 'next-auth';
import AddPost from '../../../components/forms/AddPost';
import React from 'react';
import { redirect } from 'next/navigation';
import { FiPlusCircle, FiLayout, FiCheckCircle } from 'react-icons/fi';
import BackButton from '../../../components/BackButton';
const Page = async () => {
    const session = await getServerSession();

    if (!session) {
        redirect("/login");
    }

    return (
        <div className="min-h-screen bg-linear-to-br  from-gray-50 to-blue-50 py-8">
            <div className="container mx-auto px-4 max-w-4xl">
                {/* Header Section */}
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center mb-4">
                        <div className="p-3 bg-primary/10 rounded-full">
                            <FiPlusCircle className="text-3xl text-primary" />
                        </div>
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-3">
                        Share Your Project
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Showcase your work to the community. Fill in the details below to add your project to our platform.
                    </p>
                </div>

                {/* Stats/Info Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <FiLayout className="text-blue-600 text-lg" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Step 1</p>
                                <p className="font-semibold text-gray-900">Project Details</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-green-100 rounded-lg">
                                <FiPlusCircle className="text-green-600 text-lg" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Step 2</p>
                                <p className="font-semibold text-gray-900">Add Content</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-purple-100 rounded-lg">
                                <FiCheckCircle className="text-purple-600 text-lg" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Step 3</p>
                                <p className="font-semibold text-gray-900">Review & Submit</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Back Navigation - Using Client Component */}
                <div className="mb-6">
                    <BackButton />
                </div>

                {/* AddPost Component Container */}
                <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                    <div className="p-1 bg-linear-to-r from-primary to-blue-600"></div>
                    <div className="p-8">
                        <div className="mb-6">
                            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                                <FiPlusCircle className="text-primary" />
                                Project Information
                            </h2>
                            <p className="text-gray-600 mt-2">
                                Please provide all the necessary details about your project. Fields marked with * are required.
                            </p>
                        </div>
                        <AddPost />
                    </div>
                </div>

                {/* Help Text */}
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-500">
                        Need help? Check out our{' '}
                        <a href="/guide" className="text-primary hover:text-primary/80 font-medium transition-colors">
                            project submission guide
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Page;