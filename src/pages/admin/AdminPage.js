import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ButtonCom } from "../../components/button";
import GapYCom from "../../components/common/GapYCom";
import { HeadingH1Com, HeadingH2Com } from "../../components/heading";
import { MESSAGE_UNAUTHORIZE } from "../../constants/config";

const AdminPage = () => {
  // const { user } = useSelector((state) => state.auth);
  // const navigate = useNavigate();

  return (
    <>
      <HeadingH1Com>Admin Dashboard</HeadingH1Com>
      <GapYCom></GapYCom>
      <div className="row">
        <div className="col-sm-12">
          <div className="card">
            <div className="card-header py-3">
              <HeadingH2Com className="text-tw-light-pink">
                Management Area
              </HeadingH2Com>
            </div>
            <div className="card-body flex gap-x-4 h-[30vh]">
              <NavLink to="/admin/courses">
                <ButtonCom backgroundColor="gradient">Course</ButtonCom>
              </NavLink>
              <NavLink to="/admin/blogs">
                <ButtonCom backgroundColor="gradient">Blog</ButtonCom>
              </NavLink>
            </div>
            
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminPage;
