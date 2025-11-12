import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { useAuth } from "../Hooks/useAuth";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import toast from "react-hot-toast";

const Login = () => {
    const { signIn, googleLogin } = useAuth();
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const handleLogin = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        signIn(email, password)
            .then(() => {
                toast.success("Login successful!");
                setError("");
                navigate(from, { replace: true });
            })
            .catch((err) => {
                setError("Invalid credentials");
                toast.error(err.message);
            });
    };

    const handleGoogleLogin = () => {
        googleLogin()
            .then(() => {
                toast.success("Logged in with Google!");
                navigate(from, { replace: true });
            })
            .catch((err) => toast.error(err.message));
    };

    return (
        <div className='w-11/12 mx-auto'>
            <Navbar />

            <div className="flex justify-center items-center min-h-[80vh]">
                <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
                    <h2 className="text-2xl font-bold text-center mb-6 text-yellow-500">Login</h2>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            className="w-full p-2 border rounded-md"
                            required/>
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            className="w-full p-2 border rounded-md"
                            required/>
                        {error && <p className="text-red-500 text-sm">{error}</p>}

                        <button
                            type="submit"
                            className="w-full bg-yellow-400 text-white py-2 rounded-lg hover:bg-yellow-500 transition">
                            Login
                        </button>
                    </form>

                    <div className="mt-4">
                        <button
                            onClick={handleGoogleLogin}
                            className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition">
                            Login with Google
                        </button>
                    </div>

                    <p className="text-center mt-4 text-sm">
                        New user?{" "}
                        <Link to="/auth/register" className="text-yellow-500 font-semibold">
                            Register here
                        </Link>
                    </p>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Login;
