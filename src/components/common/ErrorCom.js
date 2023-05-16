import React from "react";
import { MESSAGE_GENERAL } from "../../constants/config";

const ErrorCom = () => {
  return (
    <div className="text-danger bg-red-100 p-4 rounded-lg text-center">
      {MESSAGE_GENERAL ??
        "Something was wrong, Component Error!"}
    </div>
  );
};

export default ErrorCom;
