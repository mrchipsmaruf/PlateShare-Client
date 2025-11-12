import React from "react";

const OurMission = () => {
    return (
        <section className="w-full bg-green-50 py-16">
            <div className="max-w-6xl mx-auto px-6 text-center">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">
                    Our <span className="text-green-600">Mission</span>
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-10">
                    At <span className="text-red-400 font-semibold">PlateShare</span>, our mission is to reduce food waste
                    and fight hunger through community sharing. By connecting those with extra food
                    to those in need, we’re creating a circle of kindness and sustainability.
                </p>

                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 text-gray-700">
                    <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
                        <h3 className="text-2xl font-bold text-green-600 mb-2">5K+</h3>
                        <p>Meals Shared</p>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
                        <h3 className="text-2xl font-bold text-green-600 mb-2">2K+</h3>
                        <p>Active Donators</p>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
                        <h3 className="text-2xl font-bold text-green-600 mb-2">3K+</h3>
                        <p>Happy Recipients</p>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
                        <h3 className="text-2xl font-bold text-green-600 mb-2">50+</h3>
                        <p>Cities Connected</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OurMission;
