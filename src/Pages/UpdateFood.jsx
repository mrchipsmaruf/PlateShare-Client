import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import toast from "react-hot-toast";

const UpdateFood = () => {
    const { id } = useParams();
    const [food, setFood] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:3000/foods/${id}`)
            .then((res) => res.json())
            .then((data) => setFood(data))
            .catch(() => toast.error("Failed to load food data"));
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFood({ ...food, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { _id, ...updatePayload } = food;

            const res = await fetch(`http://localhost:3000/foods/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatePayload),
            });

            const data = await res.json();
            console.log("Update response:", res.status, data);

            if (res.ok && data.success) {
                toast.success(data.message || "Food updated successfully!");
                navigate("/manage-my-foods");
            } else {
                toast.error(data.message || "Failed to update food");
            }
        } catch (err) {
            console.error("Error updating food:", err);
            toast.error("Server error while updating food");
        }
    };

    if (!food) return <p className="text-center mt-10">Loading...</p>;

    return (
        <section className="w-full px-6 py-12 bg-red-100 min-h-screen">
            <h2 className="text-3xl font-bold text-center mb-10 text-red-400">
                Update <span className="text-yellow-400">Food</span>
            </h2>

            <form
                onSubmit={handleSubmit}
                className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
                <div className="mb-4">
                    <label className="block text-gray-700 mb-1">Food Name</label>
                    <input
                        type="text"
                        name="food_name"
                        value={food.food_name || ""}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-yellow-400"/>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 mb-1">Food Image URL</label>
                    <input
                        type="url"
                        name="food_image"
                        value={food.food_image || ""}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-yellow-400"/>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 mb-1">Food Quantity</label>
                    <input
                        type="text"
                        name="food_quantity"
                        value={food.food_quantity || ""}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-yellow-400"/>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 mb-1">Pickup Location</label>
                    <input
                        type="text"
                        name="pickup_location"
                        value={food.pickup_location || ""}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-yellow-400"/>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 mb-1">Expire Date</label>
                    <input
                        type="date"
                        name="expire_date"
                        value={food.expire_date?.split("T")[0] || ""}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-yellow-400"/>
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 mb-1">Additional Notes</label>
                    <textarea
                        name="additional_notes"
                        value={food.additional_notes || ""}
                        onChange={handleChange}
                        rows="3"
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-yellow-400"
                    ></textarea>
                </div>

                <button
                    type="submit"
                    className="w-full bg-red-400 text-white py-3 rounded-lg text-lg font-medium hover:bg-yellow-400 transition">
                    Update Food
                </button>
            </form>
        </section>
    );
};

export default UpdateFood;
