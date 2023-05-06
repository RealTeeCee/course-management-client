import React from "react";
import { RatingMuiCom } from "../../components/mui";

const CourseAuthorMod = ({ authorName = "", rating = 5 }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-x-3">
        <img
          srcSet="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
          className="w-8 h-8 rounded-full object-cover"
          alt="User Avatar"
        />
        <p className="text-xs text-gray-400">
          By <span className="text-gray-600 font-semibold">{authorName}</span>
        </p>
      </div>
      <RatingMuiCom defaultValue={rating} readOnly></RatingMuiCom>
    </div>
  );
};

export default CourseAuthorMod;
