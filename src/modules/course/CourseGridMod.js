import React from "react";

const CourseGridMod = ({ children }) => {
  return (
    <div className="courses-grid grid grid-cols-4 gap-x-7">{children}</div>
  );
};

export default CourseGridMod;
