import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../Hooks/useAuth";
import { updateProfile } from "firebase/auth";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { toast } from "react-hot-toast";
import { EyeIcon, EyeOffIcon } from "lucide-react";

const Register = () => {
    const { createUser, googleLogin } = useAuth();
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const photoURL = e.target.photoURL.value;
        const password = e.target.password.value;

        if (password.length < 6) {
            setError("Password must be at least 6 characters long");
            return;
        }
        if (!/[A-Z]/.test(password)) {
            setError("Password must contain at least one uppercase letter");
            return;
        }
        if (!/[a-z]/.test(password)) {
            setError("Password must contain at least one lowercase letter");
            return;
        }

        setError("");
        createUser(email, password)
            .then((result) => {
                updateProfile(result.user, {
                    displayName: name,
                    photoURL: photoURL,
                })
                    .then(() => {
                        toast.success("Registration successful!");
                        navigate("/", { replace: true });
                    })
                    .catch((err) => toast.error("Profile update failed: " + err.message));
            })
            .catch((err) => toast.error("Registration failed: " + err.message));
    };

    const handleGoogleLogin = () => {
        googleLogin()
            .then(() => {
                toast.success("Logged in with Google!");
                navigate("/", { replace: true });
            })
            .catch((err) => toast.error(err.message));
    };

    return (
        <div className="w-11/12 mx-auto">
            <Navbar />

            <div className="flex justify-center items-center min-h-[80vh]">
                <div className="bg-red-50 p-8 rounded-2xl shadow-md w-full max-w-md">
                    <h2 className="text-2xl font-bold text-center mb-6 text-yellow-400">Welcome to <br /> <span className="text-red-400 text-4xl">PlateShare</span></h2>

                    <form onSubmit={handleRegister} className="space-y-4">
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            className="w-full p-2 border rounded-md bg-white"
                            required />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            className="w-full p-2 border rounded-md bg-white"
                            required />
                        <input
                            type="text"
                            name="photoURL"
                            placeholder="Photo URL"
                            className="w-full p-2 border rounded-md bg-white" />

                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Password"
                                className="w-full p-2 border rounded-md pr-10 bg-white"
                                required />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-2.5 text-gray-500">
                                {showPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
                            </button>
                        </div>

                        {error && <p className="text-red-500 text-sm">{error}</p>}

                        <button
                            type="submit"
                            className="w-full bg-yellow-400 text-white py-2 rounded-lg hover:bg-yellow-500 transition">
                            Register
                        </button>
                    </form>

                    <div className="flex items-center my-4">
                        <hr className="flex-grow border-gray-300" />
                        <span className="mx-2 text-gray-500 text-sm">or</span>
                        <hr className="flex-grow border-gray-300" />
                    </div>

                    <button
                        onClick={handleGoogleLogin}
                        className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition">
                        Continue with Google
                    </button>

                    <p className="text-center mt-4 text-sm">
                        Already have an account?{" "}
                        <Link to="/auth/login" className="text-yellow-500 font-semibold">
                            Login here
                        </Link>
                    </p>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Register;
