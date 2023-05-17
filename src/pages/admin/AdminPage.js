import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { HeadingH1Com } from "../../components/heading";
import { MESSAGE_UNAUTHORIZE } from "../../constants/config";

const AdminPage = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  console.log("User: ", user);
  console.log("User: ", user.email);
  useEffect(() => {
    if (!user || !user.email) {
      navigate("/login");
    }
    if (user.role !== "ADMIN") {
      toast.error(MESSAGE_UNAUTHORIZE);
      navigate("/");
      return;
    }
  }, [navigate, user]);
  return (
    <>
      <HeadingH1Com>Admin Page</HeadingH1Com>

      <NavLink to="/admin/create-course">Create Course</NavLink>
    </>
  );
};

export default AdminPage;
