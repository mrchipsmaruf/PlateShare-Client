import React, { useState } from 'react';
import { Link, NavLink } from 'react-router';
import logo from '../assets/logo.png';
import { useAuth } from "../Hooks/useAuth";
import toast from 'react-hot-toast';
import LoadingSpinner from './LoadingSpinner';
import { FiMenu, FiX } from 'react-icons/fi';

const Navbar = () => {
    const { user, logOut, loading } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);

    if (loading) {
        return <LoadingSpinner />;
    }

    const handleLogout = () => {
        logOut()
            .then(() => toast.success("User logged out successfully!"))
            .catch((err) => console.error(err));
    };

    return (
        <nav className="w-full py-4 bg-white sticky top-0 z-50 shadow-sm">
            <div className="w-full flex justify-between items-center px-4">

                <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition">
                    <img className="w-[50px]" src={logo} alt="logo" />
                    <h2 className="text-2xl font-semibold text-red-500">
                        <span className="text-yellow-400">Plate</span>Share
                    </h2>
                </Link>

                <div className="flex md:hidden">
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="text-2xl text-gray-700 hover:text-yellow-400"
                    >
                        {menuOpen ? <FiX /> : <FiMenu />}
                    </button>
                </div>

                <div className="hidden md:flex items-center gap-8">
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

                <div className="hidden md:flex items-center gap-4">
                    {!user ? (
                        <Link to="/auth/login">
                            <button
                                onClick={() => toast.success("Redirecting to login...")}
                                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-500 transition">
                                Login
                            </button>
                        </Link>
                    ) : (
                        <div className="flex items-center gap-3">
                            <img
                                src={user?.photoURL || "https://i.ibb.co/4Y3p8Fh/user.png"}
                                alt="user"
                                className="w-10 h-10 rounded-full border-2 border-yellow-400 object-cover"
                            />
                            <button
                                onClick={handleLogout}
                                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-500 transition">
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {menuOpen && (
                <div className="md:hidden bg-white border-t border-gray-200 shadow-inner px-4 py-3 space-y-3">
                    <NavLink
                        to="/"
                        onClick={() => setMenuOpen(false)}
                        className="block text-gray-700 hover:text-yellow-400">
                        Home
                    </NavLink>
                    <NavLink
                        to="/available-foods"
                        onClick={() => setMenuOpen(false)}
                        className="block text-gray-700 hover:text-yellow-400">
                        Available Foods
                    </NavLink>

                    {user && (
                        <>
                            <NavLink
                                to="/add-food"
                                onClick={() => setMenuOpen(false)}
                                className="block text-gray-700 hover:text-yellow-400">
                                Add Food
                            </NavLink>
                            <NavLink
                                to="/manage-my-foods"
                                onClick={() => setMenuOpen(false)}
                                className="block text-gray-700 hover:text-yellow-400">
                                Manage My Foods
                            </NavLink>
                            <NavLink
                                to="/my-food-request"
                                onClick={() => setMenuOpen(false)}
                                className="block text-gray-700 hover:text-yellow-400">
                                My Food Requests
                            </NavLink>
                        </>
                    )}

                    <div className="border-t pt-3">
                        {!user ? (
                            <Link to="/auth/login" onClick={() => setMenuOpen(false)}>
                                <button
                                    onClick={() => toast.success("Redirecting to login...")}
                                    className="w-full bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-500 transition">
                                    Login
                                </button>
                            </Link>
                        ) : (
                            <button
                                onClick={() => {
                                    handleLogout();
                                    setMenuOpen(false);
                                }}
                                className="w-full bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-500 transition">
                                Logout
                            </button>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
