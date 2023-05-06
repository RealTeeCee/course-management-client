import React from "react";

const CourseDescMod = ({className = "", children}) => {
  return (
    <p className={`mb-[1rem] text-sm text-gray-400 ${className}`}>
      {children}
    </p>
  );
};

export default CourseDescMod;
