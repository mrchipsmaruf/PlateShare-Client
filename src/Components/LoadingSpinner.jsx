import React from "react";

const LoadingSpinner = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
            <div className="w-14 h-14 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-5 text-yellow-500 font-semibold text-lg">Loading...</p>
        </div>
    );
};

export default LoadingSpinner;
