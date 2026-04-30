import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const AdminPrivateRoute = () => {
  const location = useLocation();

  // ✅ Example auth check (adjust as per your auth logic)
  const adminToken = localStorage.getItem("adminToken");
  const isAdminLoggedIn = Boolean(adminToken);

  if (!isAdminLoggedIn) {
    return (
      <Navigate
        to="/admin/login"
        replace
        state={{ from: location }}
      />
    );
  }

  return <Outlet />;
};

export default AdminPrivateRoute;
