import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { useAuth } from "../Hooks/useAuth";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { toast } from "react-hot-toast";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../Firebase/firebase.config";
import { EyeIcon, EyeOffIcon } from "lucide-react";

const Login = () => {
    const { signIn, googleLogin } = useAuth();
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [emailForReset, setEmailForReset] = useState("");
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

    const handleForgotPassword = async () => {
        if (!emailForReset) {
            toast.error("Please enter your email to reset password");
            return;
        }
        try {
            await sendPasswordResetEmail(auth, emailForReset);
            toast.success("Password reset email sent!");
        } catch (error) {
            toast.error("Error sending reset email: " + error.message);
        }
    };

    return (
        <div className="w-11/12 mx-auto">
            <Navbar />

            <div className="flex justify-center items-center min-h-[80vh]">
                <div className="bg-red-50 p-8 rounded-2xl shadow-md w-full max-w-md">
                    <h2 className="text-2xl font-bold text-center mb-6 text-yellow-400">Welcome back to <span className="text-red-400 text-4xl">PlateShare</span></h2>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={emailForReset}
                            onChange={(e) => setEmailForReset(e.target.value)}
                            className="w-full p-2 border rounded-md bg-white"
                            required/>

                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Password"
                                className="w-full p-2 border rounded-md pr-10 bg-white"
                                required/>
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-2.5 text-gray-500">
                                {showPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
                            </button>
                        </div>

                        {error && <p className="text-red-500 text-sm">{error}</p>}

                        <div className="text-right">
                            <button
                                type="button"
                                onClick={handleForgotPassword}
                                className="text-sm text-yellow-500 hover:underline">
                                Forgot password?
                            </button>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-yellow-400 text-white py-2 rounded-lg hover:bg-yellow-500 transition">
                            Login
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
