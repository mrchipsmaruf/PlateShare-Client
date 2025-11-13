import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../Hooks/useAuth";
import toast from "react-hot-toast";

const AddFood = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        food_name: "",
        food_image: "",
        food_quantity: "",
        pickup_location: "",
        expire_date: "",
        additional_notes: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const newFood = {
                food_name: formData.food_name,
                food_image: formData.food_image,
                food_quantity: formData.food_quantity,
                pickup_location: formData.pickup_location,
                expire_date: formData.expire_date,
                additional_notes: formData.additional_notes,
                donator_name: user.displayName,
                donator_email: user.email,
                donator_image: user.photoURL,
                food_status: "Available",
            };

            const res = await fetch("https://plate-share-server-beta.vercel.app/foods", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newFood),
            });

            if (res.ok) {
                toast.success("Food added successfully!");
                navigate("/manage-my-foods");
            } else {
                toast.error("Failed to add food. Please try again.");
            }
        } catch (error) {
            console.error("Error adding food:", error);
            toast.error("Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="w-full px-6 py-12 bg-red-100 min-h-screen">
            <h2 className="text-3xl font-bold text-center mb-10 text-red-400">
                Add <span className="text-yellow-400">Food</span>
            </h2>

            <form
                onSubmit={handleSubmit}
                className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
                <div className="mb-4">
                    <label className="block text-gray-700 mb-1">Food Name</label>
                    <input
                        type="text"
                        name="food_name"
                        value={formData.food_name}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-yellow-400"/>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 mb-1">
                        Food Image URL
                    </label>
                    <input
                        type="url"
                        name="food_image"
                        value={formData.food_image}
                        onChange={handleChange}
                        placeholder="https://example.com/your-image.jpg"
                        required
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-yellow-400"/>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 mb-1">Food Quantity</label>
                    <input
                        type="text"
                        name="food_quantity"
                        value={formData.food_quantity}
                        onChange={handleChange}
                        placeholder="e.g., Serves 2 people"
                        required
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-yellow-400"/>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 mb-1">Pickup Location</label>
                    <input
                        type="text"
                        name="pickup_location"
                        value={formData.pickup_location}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-yellow-400"/>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 mb-1">Expire Date</label>
                    <input
                        type="date"
                        name="expire_date"
                        value={formData.expire_date}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-yellow-400"/>
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 mb-1">Additional Notes</label>
                    <textarea
                        name="additional_notes"
                        value={formData.additional_notes}
                        onChange={handleChange}
                        rows="3"
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-yellow-400"
                    ></textarea>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-red-400 text-white py-3 rounded-lg text-lg font-medium hover:bg-yellow-400 transition">
                    {loading ? "Adding..." : "Add Food"}
                </button>
            </form>
        </section>
    );
};

export default AddFood;
