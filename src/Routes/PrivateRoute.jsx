import React from "react";
import { Navigate, useLocation } from "react-router";
import { useAuth } from "../Hooks/useAuth";
import { toast } from "react-hot-toast";
import LoadingSpinner from "../Components/LoadingSpinner";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return (
            <LoadingSpinner></LoadingSpinner>
        );
    }

    if (!user) {
        toast.error("Please log in to continue.");
        return <Navigate to="/auth/login" state={{ from: location }} replace />;
    }

    return children;
};

export default PrivateRoute;
