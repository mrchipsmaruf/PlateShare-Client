import React, { useEffect, useState } from "react";
import { useAuth } from "../Hooks/useAuth";
import Swal from "sweetalert2";

const MyFoodRequests = () => {
    const { user } = useAuth();
    const [requests, setRequests] = useState([]);
    const [refresh, setRefresh] = useState(false);

    const fetchRequests = () => {
        if (!user?.email) return;
        fetch(`https://plate-share-server-beta.vercel.app/my-requests?email=${user.email}`)
            .then((res) => res.json())
            .then((data) => setRequests(data))
            .catch((err) => console.error("Error fetching requests:", err));
    };

    useEffect(() => {
        fetchRequests();
    }, [user?.email, refresh]);

    useEffect(() => {
        const interval = setInterval(() => setRefresh((prev) => !prev), 5000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const handleStorage = (e) => {
            if (e.key === "requestsUpdated") {
                fetchRequests();
            }
        };

        window.addEventListener("storage", handleStorage);

        const handleSameTab = () => fetchRequests();
        window.addEventListener("requests-updated", handleSameTab);

        return () => {
            window.removeEventListener("storage", handleStorage);
            window.removeEventListener("requests-updated", handleSameTab);
        };
    }, []);

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won’t be able to undo this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://plate-share-server-beta.vercel.app/my-requests/${id}`, {
                    method: "DELETE",
                })
                    .then((res) => res.json())
                    .then((data) => {
                        if (data.deletedCount > 0 || data.success) {
                            setRequests((prev) => prev.filter((r) => r._id !== id));
                            Swal.fire("Deleted!", "Your request has been deleted.", "success");

                            localStorage.setItem("requestsUpdated", Date.now().toString());
                            window.dispatchEvent(new Event("requests-updated"));
                        } else {
                            Swal.fire("Error!", "Failed to delete request.", "error");
                        }
                    })
                    .catch((err) => {
                        console.error("Error deleting request:", err);
                        Swal.fire("Error!", "Something went wrong while deleting.", "error");
                    });
            }
        });
    };

    return (
        <div className="max-w-5xl mx-auto py-10 px-4">
            <h2 className="text-3xl font-bold text-center text-yellow-500 mb-8">
                My <span className="text-red-400">Food</span> Requests
            </h2>

            {requests.length === 0 ? (
                <p className="text-center text-gray-500">
                    You haven’t requested any food yet.
                </p>
            ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {requests.map((req) => (
                        <div
                            key={req._id}
                            className="border rounded-xl shadow-md overflow-hidden bg-white">
                            <img
                                src={req.foodImage}
                                alt={req.foodName}
                                className="h-48 w-full object-cover" />
                            <div className="p-4">
                                <h3 className="text-lg font-semibold text-red-400">
                                    {req.foodName}
                                </h3>
                                <p className="text-gray-600 text-sm mb-2">
                                    <span className="font-medium">Location:</span>{" "}
                                    {req.location}
                                </p>
                                <p className="text-gray-600 text-sm mb-2">
                                    <span className="font-medium">Contact:</span>{" "}
                                    {req.contact}
                                </p>
                                <p
                                    className={`text-sm font-semibold mt-2 ${req.status === "pending"
                                            ? "text-yellow-500"
                                            : req.status === "accepted"
                                                ? "text-green-500"
                                                : "text-red-500"
                                        }`}>
                                    Status: {req.status}
                                </p>

                                <button
                                    onClick={() => handleDelete(req._id)}
                                    className="mt-3 w-full bg-red-400 text-white px-4 py-1 rounded hover:bg-red-600 text-sm">
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyFoodRequests;
