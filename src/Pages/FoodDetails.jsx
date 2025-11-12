import React from "react";
import { useLoaderData } from "react-router";
import { useNavigate } from "react-router";

const FoodDetails = () => {
    const food = useLoaderData();
    const navigate = useNavigate();

    if (!food) {
        return (
            <div className="text-center py-20 text-gray-600 text-lg">
                No food found
            </div>
        );
    }

    return (
        <section className="w-full min-h-screen bg-red-100 py-12 px-6">
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl overflow-hidden">
                <img
                    src={food.food_image}
                    alt={food.food_name}
                    className="w-full h-80 object-cover"
                />

                <div className="p-8">
                    <h2 className="text-3xl font-bold text-red-400 mb-3">
                        {food.food_name}
                    </h2>

                    <div className="flex items-center gap-3 mb-4">
                        <img
                            src={food.donator_image}
                            alt={food.donator_name}
                            className="w-12 h-12 rounded-full object-cover border-2 border-yellow-400"
                        />
                        <div>
                            <p className="text-gray-800 font-medium">
                                Donated by {food.donator_name}
                            </p>
                            <p className="text-gray-500 text-sm">{food.donator_email}</p>
                        </div>
                    </div>

                    <div className="space-y-2 mb-5">
                        <p className="text-gray-700">
                            <span className="font-semibold">Quantity:</span>{" "}
                            {food.food_quantity}
                        </p>
                        <p className="text-gray-700">
                            <span className="font-semibold">Pickup Location:</span>{" "}
                            {food.pickup_location}
                        </p>
                        <p className="text-gray-700">
                            <span className="font-semibold">Expire Date:</span>{" "}
                            {food.expire_date}
                        </p>
                        <p className="text-gray-700">
                            <span className="font-semibold">Status:</span>{" "}
                            <span
                                className={`font-semibold ${food.food_status === "Available"
                                        ? "text-green-600"
                                        : "text-red-500"
                                    }`}
                            >
                                {food.food_status}
                            </span>
                        </p>
                    </div>

                    {food.additional_notes && (
                        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md mb-6">
                            <h4 className="font-semibold text-yellow-700 mb-1">
                                Additional Notes:
                            </h4>
                            <p className="text-gray-700 text-sm">{food.additional_notes}</p>
                        </div>
                    )}

                    <div className="flex gap-4">
                        <button
                            onClick={() => navigate(-1)}
                            className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-300 transition"
                        >
                            Go Back
                        </button>

                        <button
                            disabled={food.food_status !== "Available"}
                            className={`flex-1 py-3 rounded-lg font-medium transition ${food.food_status === "Available"
                                    ? "bg-red-400 text-white hover:bg-yellow-400"
                                    : "bg-gray-400 text-gray-200 cursor-not-allowed"
                                }`}
                        >
                            Request This Food
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FoodDetails;
