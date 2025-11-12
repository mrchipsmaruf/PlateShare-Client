import React, { useEffect, useState } from "react";
import { Link } from "react-router";

const FeaturedFoods = () => {
    const [foods, setFoods] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/foods")
            .then((res) => res.json())
            .then((data) => {
                const sorted = data
                    .map((item) => ({
                        ...item,
                        serves: parseInt(item.quantity.match(/\d+/)?.[0] || 0),
                    }))
                    .sort((a, b) => b.serves - a.serves)
                    .slice(0, 6);
                setFoods(sorted);
            });
    }, []);

    return (
        <section className="bg-orange-50 py-16">
            <div className="w-11/12 mx-auto text-center">
                <h2 className="text-3xl font-bold text-yellow-500 mb-10">
                    🍽️ Featured <span className="text-red-500">Foods</span>
                </h2>

                {foods.length === 0 ? (
                    <p className="text-gray-500">Loading foods...</p>
                ) : (
                    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
                        {foods.map((food) => (
                            <div
                                key={food._id}
                                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition"
                            >
                                <img
                                    src={food.image}
                                    alt={food.foodName}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-4 text-left">
                                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                        {food.foodName}
                                    </h3>
                                    <p className="text-sm text-gray-600 mb-2">
                                        {food.description.slice(0, 60)}...
                                    </p>
                                    <p className="text-yellow-600 font-medium mb-2">
                                        {food.quantity}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        Donated by: {food.donorName}
                                    </p>
                                    <div className="mt-4">
                                        <Link to={`/foods/${food._id}`}>
                                            <button className="bg-yellow-400 text-white px-4 py-2 rounded-lg hover:bg-yellow-500 w-full">
                                                View Details
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default FeaturedFoods;
