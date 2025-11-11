import React from 'react';
import { Link, NavLink } from 'react-router';
import logo from '../assets/logo.png'

const Navbar = () => {

    const handleLogout = () => {
        logOut()
            .then(() => console.log("User logged out"))
            .catch((err) => console.error(err));
    };
    return (
        <div>
            <div>
                <img src={logo} alt="" />
                <h2><span>Plate</span>Share</h2>
            </div>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/available-foods">Available Foods</NavLink>
            {
                user && (<div>
                    <NavLink to="/add-food">Add Food</NavLink>
                    <NavLink to="/manage-my-foods">Manage My Foods</NavLink>
                    <NavLink to="/my-food-requests">My Food Requests</NavLink>
                </div>
                )
            }
            <div className="flex items-center gap-4">
                {!user ? (
                    <Link to="/login">
                        <button className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600">
                            Login
                        </button>
                    </Link>
                ) : (
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="flex items-center gap-2">
                            <img
                                src={user.photoURL || "https://i.ibb.co/4Y3p8Fh/user.png"}
                                alt="user"
                                className="w-10 h-10 rounded-full border-2 border-orange-500"
                            />
                        </div>
                        <ul
                            tabIndex={0}
                            className="dropdown-content z-[1] menu p-2 shadow bg-white rounded-box w-48"
                        >
                            <li>
                                <button onClick={handleLogout} className="text-red-600">
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;