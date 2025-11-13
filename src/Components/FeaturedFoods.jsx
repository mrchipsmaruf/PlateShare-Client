import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import LoadingSpinner from "./LoadingSpinner";

const FeaturedFoods = () => {
    const [featuredFoods, setFeaturedFoods] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        fetch("https://plate-share-server-beta.vercel.app/foods")
            .then((res) => res.json())
            .then((data) => {
                const sortedFoods = data
                    .map((food) => ({
                        ...food,
                        serves: parseInt(food.food_quantity.match(/\d+/)?.[0] || 0),
                    }))
                    .sort((a, b) => b.serves - a.serves)
                    .slice(0, 6);
                setFeaturedFoods(sortedFoods);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center py-20">
                <LoadingSpinner />
            </div>
        );
    }

    return (
        <section className="w-full mx-auto py-12 px-6 bg-red-100">
            <h2 className="text-3xl font-bold text-center mb-10 text-red-400">
                Featured <span className="text-yellow-400">Foods</span>
            </h2>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 px-4">
                {featuredFoods.map((food) => (
                    <div
                        key={food._id}
                        className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition duration-300">
                        <img
                            src={food.food_image}
                            alt={food.food_name}
                            className="w-full h-56 object-cover"/>
                        <div className="p-5">
                            <h3 className="text-xl font-semibold text-yellow-400 mb-2">
                                {food.food_name}
                            </h3>

                            <div className="flex items-center gap-3 mb-3">
                                <img
                                    src={food.donator_image}
                                    alt={food.donator_name}
                                    className="w-10 h-10 rounded-full object-cover border-2 border-yellow-400"/>
                                <p className="text-gray-700 text-sm font-bold">
                                    <span className="font-semibold">Donated by</span>{" "}
                                    {food.donator_name}
                                </p>
                            </div>

                            <p className="text-gray-600 text-sm mb-1">{food.food_quantity}</p>
                            <p className="text-gray-500 text-sm mb-1">
                                {food.pickup_location}
                            </p>
                            <p className="text-gray-500 text-sm mb-1">
                                Expire Date:{" "}
                                <span className="font-medium text-gray-700">
                                    {food.expire_date}
                                </span>
                            </p>
                            <p className="text-sm mb-3">
                                Status:{" "}
                                <span
                                    className={`font-semibold ${food.food_status === "Available"
                                        ? "text-green-600"
                                        : "text-red-500"
                                        }`}>
                                    {food.food_status}
                                </span>
                            </p>

                            <button
                                onClick={() => navigate(`/food-details/${food._id}`)}
                                className="w-full bg-red-400 text-white py-2 rounded-lg hover:bg-yellow-400 transition">
                                View Details
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="text-center mt-12">
                <button
                    onClick={() => navigate("/available-foods")}
                    className="bg-red-400 text-white px-8 py-3 rounded-lg text-lg hover:bg-yellow-400 transition">
                    Show All
                </button>
            </div>
        </section>
    );
};

export default FeaturedFoods;
