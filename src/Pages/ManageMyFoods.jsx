import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthProvider";
import Swal from "sweetalert2";
import { Link } from "react-router";
import LoadingSpinner from "../Components/LoadingSpinner";

const ManageMyFoods = () => {
    const { user } = useContext(AuthContext);
    const [myFoods, setMyFoods] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user?.email) {
            fetch(`http://localhost:3000/my-foods?email=${user.email}`)
                .then((res) => res.json())
                .then((data) => {
                    setMyFoods(data);
                    setLoading(false);
                })
                .catch((err) => {
                    console.error("Error fetching foods:", err);
                    setLoading(false);
                });
        }
    }, [user]);

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
                fetch(`http://localhost:3000/foods/${id}`, {
                    method: "DELETE",
                })
                    .then((res) => res.json())
                    .then(() => {
                        setMyFoods((prev) => prev.filter((food) => food._id !== id));
                        Swal.fire("Deleted!", "Your food has been deleted.", "success");
                    })
                    .catch(() =>
                        Swal.fire("Error!", "Something went wrong while deleting.", "error")
                    );
            }
        });
    };

    if (loading) {
        return <LoadingSpinner></LoadingSpinner>;
    }

    return (
        <div className="py-10">
            <h2 className="text-3xl font-bold text-center mb-6 text-red-400">
                Manage <span className="text-yellow-400">My Foods</span>
            </h2>

            {myFoods.length === 0 ? (
                <p className="text-center text-gray-500">
                    You haven’t added any foods yet.
                </p>
            ) : (
                <div className="overflow-x-auto bg-yellow-50">
                    <table className="table w-full">
                        <thead className="bg-red-100 text-red-600">
                            <tr>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Quantity</th>
                                <th>Pickup Location</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {myFoods.map((food) => (
                                <tr key={food._id} className="hover:bg-red-50">
                                    <td>
                                        <img
                                            src={food.food_image}
                                            alt={food.food_name}
                                            className="w-16 h-16 object-cover rounded-lg"
                                        />
                                    </td>
                                    <td>{food.food_name}</td>
                                    <td>{food.food_quantity}</td>
                                    <td>{food.pickup_location}</td>
                                    <td>
                                        <span
                                            className={`px-3 py-1 rounded-full text-sm ${food.food_status === "Available"
                                                ? "bg-red-100 text-black"
                                                : "bg-gray-200 text-gray-600"
                                                }`}
                                        >
                                            {food.food_status}
                                        </span>
                                    </td>
                                    <td className="space-x-2">
                                        <Link
                                            to={`/update-food/${food._id}`}
                                            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                                        >
                                            Update
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(food._id)}
                                            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ManageMyFoods;
