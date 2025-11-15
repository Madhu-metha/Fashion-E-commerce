import { Navigate } from "react-router-dom";

import { useAuth } from "../context/useAuth";

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
    const { user } = useAuth();

    if (!user) {
        alert("Please log in to access this page.");
        return <Navigate to="/login" replace />;
    }

    return children;
}
