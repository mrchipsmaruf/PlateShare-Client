import React from "react";
import { ClipboardList, Search, HandHeart } from "lucide-react";

const HowItWorks = () => {
    return (
        <section className="w-full bg-yellow-50 py-16">
            <div className="max-w-6xl mx-auto text-center px-6">
                <h2 className="text-3xl font-bold text-red-400 mb-10">
                    How It <span className="text-yellow-400">Works</span>
                </h2>

                <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="bg-white rounded-2xl shadow-md p-8 hover:shadow-lg transition">
                        <ClipboardList className="mx-auto text-red-400 w-14 h-14 mb-4" />
                        <h3 className="text-xl font-semibold mb-2 text-gray-800">1. Post Food</h3>
                        <p className="text-gray-600">
                            Share surplus meals by posting food details, pickup time, and location.
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl shadow-md p-8 hover:shadow-lg transition">
                        <Search className="mx-auto text-red-400 w-14 h-14 mb-4" />
                        <h3 className="text-xl font-semibold mb-2 text-gray-800">2. Find Food</h3>
                        <p className="text-gray-600">
                            Browse available meals near you and choose what suits your needs.
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl shadow-md p-8 hover:shadow-lg transition">
                        <HandHeart className="mx-auto text-red-400 w-14 h-14 mb-4" />
                        <h3 className="text-xl font-semibold mb-2 text-gray-800">3. Collect Food</h3>
                        <p className="text-gray-600">
                            Connect with the donator and collect your meal — sharing made simple!
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
