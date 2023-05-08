import React from "react";

const CourseGridMod = ({ children, type = "col-4" }) => {
  if (type !== "col-4")
    return (
      <div className="courses-grid grid grid-cols-1 gap-x-10 gap-y-16">{children}</div>
    );
  return (
    <div className="courses-grid grid grid-cols-4 gap-x-7 gap-y-16">{children}</div>
  );
};

export default CourseGridMod;
