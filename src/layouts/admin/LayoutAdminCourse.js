import React from "react";
import { HeadingH1Com } from "../../components/heading";

const LayoutAdminCourse = ({ title = "Admin Courses", children }) => {
  return (
    <>
      <HeadingH1Com>{title}</HeadingH1Com>
      {children}
    </>
  );
};

export default LayoutAdminCourse;
