import { useContext } from "react";
import { AuthContext } from "../Context/AuthProvider";

export const useAuth = () => {
    let auth = useContext(AuthContext);
    return auth;
};
