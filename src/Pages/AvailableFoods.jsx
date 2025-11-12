import React from "react";
import { useLoaderData, useNavigate } from "react-router";

const AvailableFoods = () => {
    const foods = useLoaderData();
    const navigate = useNavigate();

    return (
        <section className="w-full px-6 py-12 bg-red-100">
            <h2 className="text-3xl font-bold text-center mb-10 text-red-400">
                Available <span className="text-yellow-400">Foods</span>
            </h2>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 px-4">
                {foods.length > 0 ? (
                    foods.map((food) => (
                        <div
                            key={food._id}
                            className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition duration-300"
                        >
                            <img
                                src={food.food_image}
                                alt={food.food_name}
                                className="w-full h-56 object-cover"
                            />
                            <div className="p-5">
                                <h3 className="text-xl font-semibold text-yellow-400 mb-2">
                                    {food.food_name}
                                </h3>
                                <p className="text-gray-600 text-sm mb-1">
                                    {food.food_quantity}
                                </p>
                                <p className="text-gray-500 text-sm mb-3">
                                    {food.pickup_location}
                                </p>
                                <p className="text-gray-500 text-sm mb-3">
                                    Expire Date:{" "}
                                    <span className="font-medium text-gray-700">
                                        {food.expire_date}
                                    </span>
                                </p>
                                <p className="text-gray-500 text-sm mb-3">
                                    Status:{" "}
                                    <span
                                        className={`font-semibold ${food.food_status === "Available"
                                                ? "text-green-600"
                                                : "text-red-500"
                                            }`}
                                    >
                                        {food.food_status}
                                    </span>
                                </p>
                                <button
                                    onClick={() => navigate(`/food-details/${food._id}`)}
                                    className="w-full bg-red-400 text-white py-2 rounded-lg hover:bg-yellow-400 transition"
                                >
                                    View Details
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-600 col-span-3">
                        No available foods found.
                    </p>
                )}
            </div>
        </section>
    );
};

export default AvailableFoods;
