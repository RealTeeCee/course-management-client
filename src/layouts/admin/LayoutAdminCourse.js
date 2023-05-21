import React from "react";
import GapYCom from "../../components/common/GapYCom";
import { HeadingH1Com } from "../../components/heading";

const LayoutAdminCourse = ({ title = "Admin Courses", children }) => {
  return (
    <>
      <HeadingH1Com>{title}</HeadingH1Com>
      <GapYCom></GapYCom>
      {children}
    </>
  );
};

export default LayoutAdminCourse;
