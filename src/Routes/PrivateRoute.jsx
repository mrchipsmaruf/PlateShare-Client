import React, { useRef } from "react";
import { Navigate, useLocation } from "react-router";
import { useAuth } from "../Hooks/useAuth";
import { toast } from "react-hot-toast";
import LoadingSpinner from "../Components/LoadingSpinner";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();
    const toastShown = useRef(false);

    if (loading) {
        return <LoadingSpinner />;
    }

    if (!user) {
        if (!toastShown.current) {
            toast.error("Please log in to continue.");
            toastShown.current = true;
        }
        return <Navigate to="/auth/login" state={{ from: location }} replace />;
    }

    return children;
};

export default PrivateRoute;
