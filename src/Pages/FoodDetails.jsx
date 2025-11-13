import React, { useState } from "react";
import { useLoaderData, useNavigate } from "react-router";
import { useAuth } from "../Hooks/useAuth";
import { toast } from "react-hot-toast";

const FoodDetails = () => {
    const food = useLoaderData();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        location: "",
        reason: "",
        contact: "",
    });

    if (!food) {
        return (
            <div className="text-center py-20 text-gray-600 text-lg">
                No food found
            </div>
        );
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            toast.error("Please login to request food");
            navigate("/auth/login");
            return;
        }

        const requestData = {
            foodId: food._id,
            foodName: food.food_name,
            foodImage: food.food_image,
            donatorEmail: food.donator_email,
            requesterName: user.displayName,
            requesterEmail: user.email,
            requesterPhoto: user.photoURL,
            location: formData.location,
            reason: formData.reason,
            contact: formData.contact,
            status: "pending",
            requestDate: new Date(),
        };

        try {
            const res = await fetch("http://localhost:3000/food-requests", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestData),
            });

            const data = await res.json();

            if (data.success) {
                toast.success("Request submitted successfully!");
                setShowModal(false);
                navigate("/my-food-requests");
            } else {
                toast.error(data.message || "Failed to submit request");
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        }
    };

    return (
        <section className="w-full min-h-screen bg-red-100 py-12 px-6 relative">
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl overflow-hidden">
                <img
                    src={food.food_image}
                    alt={food.food_name}
                    className="w-full h-80 object-cover"/>

                <div className="p-8">
                    <h2 className="text-3xl font-bold text-red-400 mb-3">
                        {food.food_name}
                    </h2>

                    <div className="flex items-center gap-3 mb-4">
                        <img
                            src={food.donator_image}
                            alt={food.donator_name}
                            className="w-12 h-12 rounded-full object-cover border-2 border-yellow-400"/>
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
                                    }`}>
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
                            className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-300 transition">
                            Go Back
                        </button>

                        <button
                            disabled={food.food_status !== "Available"}
                            onClick={() => setShowModal(true)}
                            className={`flex-1 py-3 rounded-lg font-medium transition ${food.food_status === "Available"
                                    ? "bg-red-400 text-white hover:bg-yellow-400"
                                    : "bg-gray-400 text-gray-200 cursor-not-allowed"
                                }`}>
                            Request This Food
                        </button>
                    </div>
                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 flex justify-center items-center bg-white/70 backdrop-blur-sm z-50">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 relative">
                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute top-3 right-4 text-gray-500 hover:text-red-500 text-xl">
                            ✕
                        </button>

                        <h3 className="text-2xl font-bold text-red-400 mb-6 text-center">
                            Request <span className="text-yellow-400">This Food</span>
                        </h3>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input
                                type="text"
                                name="location"
                                placeholder="Your Location"
                                value={formData.location}
                                onChange={handleChange}
                                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                required/>
                            <textarea
                                name="reason"
                                placeholder="Why do you need this food?"
                                value={formData.reason}
                                onChange={handleChange}
                                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                rows="3"
                                required>
                            </textarea>
                            <input
                                type="text"
                                name="contact"
                                placeholder="Contact Number"
                                value={formData.contact}
                                onChange={handleChange}
                                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                required />

                            <button
                                type="submit"
                                className="w-full bg-yellow-400 text-white py-3 rounded-lg hover:bg-yellow-500 transition font-semibold">
                                Submit Request
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </section>
    );
};

export default FoodDetails;
