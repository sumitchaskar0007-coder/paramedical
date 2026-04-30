import React from "react";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {

  const isAuth = localStorage.getItem("privateAuth");

  if (!isAuth) {
    return <Navigate to="/private-login" />;
  }

  return children;
}