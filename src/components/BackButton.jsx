"use client";
import { FiArrowLeft } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

const BackButton = () => {
    const router = useRouter();

    const handleBack = () => {
        router.back();
    };

    return (
        <button 
            onClick={handleBack}
            className="flex items-center gap-2 text-gray-600 dark:text-white font-medium group"
        >
            <FiArrowLeft className="text-lg group-hover:-translate-x-1 transition-transform duration-200" />
            Back to Projects
        </button>
    );
};

export default BackButton;