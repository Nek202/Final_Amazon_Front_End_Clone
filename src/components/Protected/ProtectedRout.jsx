import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../DataProvider/DataProvider";

const ProtectedRoute = ({ children, msg = "", redirect = "/" }) => {
  const { state } = useContext(DataContext); // ✅ Correct destructuring
  const { user } = state;
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/auth", { state: { msg, redirect } });
    }
  }, [user, msg, redirect, navigate]);

  return user ? children : null;
};

export default ProtectedRoute;
