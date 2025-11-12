import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { useNavigate } from "react-router";

const ErrorPage = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col min-h-screen bg-red-100">
            <Navbar />

            <div className="flex-grow flex flex-col justify-center items-center text-center px-6 py-12">
                <img
                    src="https://media.giphy.com/media/UoeaPqYrimha6rdTFV/giphy.gif"
                    alt="404 Not Found"
                    className="w-64 h-64 object-contain mb-6"
                />
                <h1 className="text-5xl font-bold text-red-400 mb-4">
                    404 - Page Not Found
                </h1>
                <p className="text-gray-600 mb-8 text-lg max-w-md">
                    Oops! The page you’re looking for doesn’t exist or has been moved.
                </p>

                <button
                    onClick={() => navigate("/")}
                    className="bg-red-400 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-yellow-400 transition"
                >
                    Back to Home
                </button>
            </div>

            <Footer />
        </div>
    );
};

export default ErrorPage;
