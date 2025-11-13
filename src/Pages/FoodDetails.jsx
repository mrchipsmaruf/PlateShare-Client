import React, { useState, useEffect } from "react";
import { useLoaderData, useNavigate } from "react-router";
import { useAuth } from "../Hooks/useAuth";
import { toast } from "react-hot-toast";

const FoodDetails = () => {
    const foodData = useLoaderData();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [food, setFood] = useState(foodData);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        location: "",
        reason: "",
        contact: "",
    });

    const [requests, setRequests] = useState([]);
    const [updatingId, setUpdatingId] = useState(null);
    const [loadingRequests, setLoadingRequests] = useState(false);

    const fetchRequests = async () => {
        if (!food?._id) return;
        setLoadingRequests(true);
        try {
            const res = await fetch(`https://plate-share-server-beta.vercel.app/food-requests/${food._id}`);
            const data = await res.json();
            if (user?.email && food?.donator_email && user.email === food.donator_email) {
                setRequests(Array.isArray(data) ? data : []);
            } else if (user?.email) {
                setRequests(Array.isArray(data) ? data.filter(r => r.requesterEmail === user.email) : []);
            } else {
                setRequests([]);
            }
        } catch (err) {
            console.error("Error loading requests:", err);
        } finally {
            setLoadingRequests(false);
        }
    };

    useEffect(() => {
        if (!user || !food?._id) return;
        fetchRequests();
    }, [user?.email, food._id, food.donator_email]);

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
            const res = await fetch("https://plate-share-server-beta.vercel.app/food-requests", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(requestData),
            });

            const data = await res.json();

            if (data.success) {
                toast.success("Request submitted successfully!");
                setRequests(prev => [...prev, { ...requestData, _id: data.insertedId || Date.now().toString() }]);
                setShowModal(false);
                localStorage.setItem("requestsUpdated", Date.now());
                await fetchRequests();
            } else {
                toast.error(data.message || "Failed to submit request");
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        }
    };

    const handleStatusUpdate = async (id, status) => {
        setUpdatingId(id);

        try {
            const res = await fetch(`https://plate-share-server-beta.vercel.app/food-requests/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status }),
            });

            if (!res.ok) {
                throw new Error("Failed to update request");
            }

            const result = await res.json();
            toast.success(result.message);

            const updatedRes = await fetch(`https://plate-share-server-beta.vercel.app/food-requests/${food._id}`);
            const updatedData = await updatedRes.json();
            setRequests(updatedData);

            if (status === "accepted") {
                setFood(prev => ({ ...prev, food_status: "Donated" }));
            } else if (status === "rejected") {
                setFood(prev => ({ ...prev, food_status: "Available" }));
            }

            localStorage.setItem("requestsUpdated", Date.now().toString());
            window.dispatchEvent(new Event("storage"));

        } catch (err) {
            console.error(err);
            toast.error("Error updating request");
        } finally {
            setUpdatingId(null);
        }
    };


    if (!food) {
        return (
            <div className="text-center py-20 text-gray-600 text-lg">
                No food found
            </div>
        );
    }

    return (
        <section className="w-full min-h-screen bg-red-100 py-12 px-6 relative">
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl overflow-hidden">
                <img
                    src={food.food_image}
                    alt={food.food_name}
                    className="w-full h-80 object-cover" />

                <div className="p-8">
                    <h2 className="text-3xl font-bold text-red-400 mb-3">
                        {food.food_name}
                    </h2>

                    <div className="flex items-center gap-3 mb-4">
                        <img
                            src={food.donator_image}
                            alt={food.donator_name}
                            className="w-12 h-12 rounded-full object-cover border-2 border-yellow-400" />
                        <div>
                            <p className="text-gray-800 font-medium">
                                Donated by {food.donator_name}
                            </p>
                            <p className="text-gray-500 text-sm">{food.donator_email}</p>
                        </div>
                    </div>

                    <div className="space-y-2 mb-5">
                        <p><span className="font-semibold">Quantity:</span> {food.food_quantity}</p>
                        <p><span className="font-semibold">Pickup Location:</span> {food.pickup_location}</p>
                        <p><span className="font-semibold">Expire Date:</span> {food.expire_date}</p>
                        <p>
                            <span className="font-semibold">Status:</span>{" "}
                            <span
                                className={`font-semibold ${food.food_status === "Available"
                                    ? "text-green-600"
                                    : food.food_status === "Donated"
                                        ? "text-blue-600"
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

            {requests.length > 0 && (
                <div className="max-w-5xl mx-auto bg-white mt-10 p-6 rounded-lg shadow">
                    <h3 className="text-2xl font-bold text-red-400 mb-4">
                        Food <span className="text-yellow-400">Requests</span>
                    </h3>

                    <table className="w-full border text-left">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="p-2 border">Requester</th>
                                <th className="p-2 border">Reason</th>
                                <th className="p-2 border">Contact</th>
                                <th className="p-2 border">Location</th>
                                <th className="p-2 border">Status</th>
                                <th className="p-2 border">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requests.map((req) => (
                                <tr key={req._id}>
                                    <td className="p-2 border flex items-center gap-2">
                                        <img src={req.requesterPhoto} alt={req.requesterName} className="w-8 h-8 rounded-full" />
                                        {req.requesterName}
                                    </td>
                                    <td className="p-2 border">{req.reason}</td>
                                    <td className="p-2 border">{req.contact}</td>
                                    <td className="p-2 border">{req.location}</td>
                                    <td className="p-2 border font-semibold capitalize">{req.status}</td>
                                    <td className="p-2 border">
                                        {req.status === "pending" ? (
                                            <>
                                                <button
                                                    onClick={() => handleStatusUpdate(req._id, "accepted")}
                                                    disabled={updatingId === req._id}
                                                    className={`px-2 py-1 rounded mr-2 ${updatingId === req._id
                                                        ? "bg-green-400 text-white cursor-not-allowed"
                                                        : "bg-green-500 text-white hover:bg-green-600"
                                                        }`}>
                                                    Accept
                                                </button>

                                                <button
                                                    onClick={() => handleStatusUpdate(req._id, "rejected")}
                                                    disabled={updatingId === req._id}
                                                    className={`px-2 py-1 rounded ${updatingId === req._id
                                                        ? "bg-red-400 text-white cursor-not-allowed"
                                                        : "bg-red-500 text-white hover:bg-red-600"
                                                        }`}>
                                                    Reject
                                                </button>
                                            </>
                                        ) : (
                                            <span className={`font-semibold ${req.status === "accepted" ? "text-green-600" : "text-red-600"}`}>
                                                {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {loadingRequests && <p className="text-sm text-gray-500 mt-2">Refreshing...</p>}
                </div>
            )}

            {showModal && (
                <div className="fixed inset-0 flex justify-center items-center bg-white/70 backdrop-blur-sm z-50">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 relative">
                        <button onClick={() => setShowModal(false)} className="absolute top-3 right-4 text-gray-500 hover:text-red-500 text-xl">✕</button>

                        <h3 className="text-2xl font-bold text-red-400 mb-6 text-center">Request <span className="text-yellow-400">This Food</span></h3>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input type="text" name="location" placeholder="Your Location" value={formData.location} onChange={handleChange} required className="w-full p-3 border rounded-md focus:ring-2 focus:ring-yellow-400" />
                            <textarea name="reason" placeholder="Why do you need this food?" value={formData.reason} onChange={handleChange} rows="3" required className="w-full p-3 border rounded-md focus:ring-2 focus:ring-yellow-400" />
                            <input type="text" name="contact" placeholder="Contact Number" value={formData.contact} onChange={handleChange} required className="w-full p-3 border rounded-md focus:ring-2 focus:ring-yellow-400" />

                            <button type="submit" className="w-full bg-yellow-400 text-white py-3 rounded-lg hover:bg-yellow-500 transition font-semibold">Submit Request</button>
                        </form>
                    </div>
                </div>
            )}
        </section>
    );
};

export default FoodDetails;
