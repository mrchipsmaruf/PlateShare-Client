import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const FeaturedFoods = () => {
    const [foods, setFoods] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:3000/featured-foods")
            .then((res) => res.json())
            .then((data) => setFoods(data))
            .catch((error) => console.error("Error loading featured foods:", error));
    }, []);

    return (
        <section className="w-full px-6 py-12 bg-red-100">
            <h2 className="text-3xl font-bold text-center mb-10 text-red-400">
                Featured <span className="text-yellow-400">Foods</span>
            </h2>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 px-4">
                {foods.map((food) => (
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
                            <p className="text-gray-600 text-sm mb-1">{food.food_quantity}</p>
                            <p className="text-gray-500 text-sm mb-3">{food.pickup_location}</p>
                            <button
                                onClick={() => navigate(`/foods/${food._id}`)}
                                className="w-full bg-red-400 text-white py-2 rounded-lg hover:bg-yellow-400 transition"
                            >
                                View Details
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="text-center mt-12">
                <button
                    onClick={() => navigate("/available-foods")}
                    className="bg-red-400 text-white px-8 py-3 rounded-lg text-lg hover:bg-yellow-400 transition"
                >
                    Show All
                </button>
            </div>
        </section>
    );
};

export default FeaturedFoods;
