import React from "react";

const LoadingSpinner = () => {
    return (
        <div className="flex flex-col justify-center items-center h-screen bg-gray-50">
            <div className="w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>

            <p className="mt-4 text-yellow-500 font-semibold text-lg">Loading...</p>

            <div className="w-80 mt-8 space-y-3">
                <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
            </div>
        </div>
    );
};

export default LoadingSpinner;
