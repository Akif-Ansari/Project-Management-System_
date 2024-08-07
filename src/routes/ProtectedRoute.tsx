import React, { ReactNode } from "react";
import { useAuth } from "../contexts/AuthContextProvider";
import { Navigate, useSearchParams } from "react-router-dom";

const ProtectedRoute = ({ element }: { element: ReactNode }) => {
  const { isLogin } = useAuth();

  return isLogin ? element : <Navigate to="/" />;
};

export default ProtectedRoute;
