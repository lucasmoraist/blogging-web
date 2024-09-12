import { authService } from "@/hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

export function PrivateRoute() {
    const { isLogged } = authService;

    return isLogged ? <Outlet /> : <Navigate to="/login" />;
}