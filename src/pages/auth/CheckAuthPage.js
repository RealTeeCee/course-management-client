import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { MESSAGE_FORBIDDEN, MESSAGE_UNAUTHORIZE } from "../../constants/config";
import { USER_ROLE } from "../../constants/permissions";
import ErrorPage from "../errors/ErrorPage";

const CheckAuthPage = ({ allowPermissions = [] }) => {
  const { user } = useSelector((state) => state.auth);
  const userRole = user?.role || USER_ROLE;
  const location = useLocation();

  return allowPermissions?.includes(userRole) ? (
    <Outlet></Outlet>
  ) : user ? (
    <Navigate to="/forbidden" replace state={{ from: location }}></Navigate>
  ) : (
    <Navigate to="/login" replace state={{ from: location }}></Navigate>
  );
};

export default CheckAuthPage;
