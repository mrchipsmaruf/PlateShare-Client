import React from 'react';
import { Link, NavLink } from 'react-router';
import logo from '../assets/logo.png';
import { useAuth } from "../Hooks/useAuth";

const Navbar = () => {
    const { user, logOut } = useAuth();

    const handleLogout = () => {
        logOut()
            .then(() => console.log("User logged out"))
            .catch((err) => console.error(err));
    };

    return (
        <nav className="w-full bg-white py-4">
            <div className="w-full flex justify-between items-center px-4">

                <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition">
                    <img className="w-[60px]" src={logo} alt="logo" />
                    <h2 className="text-3xl font-semibold text-red-500">
                        <span className="text-yellow-400">Plate</span>Share
                    </h2>
                </Link>

                <div className="flex items-center gap-8">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive ? "text-yellow-400 font-semibold" : "text-gray-700 hover:text-yellow-400"
                        }>
                        Home
                    </NavLink>
                    <NavLink
                        to="/available-foods"
                        className={({ isActive }) =>
                            isActive ? "text-yellow-400 font-semibold" : "text-gray-700 hover:text-yellow-400"
                        }>
                        Available Foods
                    </NavLink>

                    {user && (
                        <>
                            <NavLink
                                to="/add-food"
                                className={({ isActive }) =>
                                    isActive ? "text-yellow-400 font-semibold" : "text-gray-700 hover:text-yellow-400"
                                }>
                                Add Food
                            </NavLink>
                            <NavLink
                                to="/manage-my-foods"
                                className={({ isActive }) =>
                                    isActive ? "text-yellow-400 font-semibold" : "text-gray-700 hover:text-yellow-400"
                                }>
                                Manage My Foods
                            </NavLink>
                            <NavLink
                                to="/my-food-request"
                                className={({ isActive }) =>
                                    isActive ? "text-yellow-400 font-semibold" : "text-gray-700 hover:text-yellow-400"
                                }>
                                My Food Requests
                            </NavLink>
                        </>
                    )}
                </div>

                <div className="flex items-center gap-4">
                    {!user ? (
                        <Link to="/auth/login">
                            <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-500">
                                Login
                            </button>
                        </Link>
                    ) : (
                        <div className="relative group">
                            <img
                                src={user?.photoURL || "https://i.ibb.co/4Y3p8Fh/user.png"}
                                alt="user"
                                className="w-10 h-10 rounded-full border-2 border-yellow-400 cursor-pointer"
                            />
                            <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                    onClick={handleLogout}
                                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 rounded-lg"
                                >
                                    Logout
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
