import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import Auth from "../utils/auth";

const ProtectedRoute = () => {
    return Auth.isUserAuthenticated() ? <Outlet /> : <Navigate to="/admin/login" />;
};

export default ProtectedRoute;
