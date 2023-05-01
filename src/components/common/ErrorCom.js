import React from "react";

const ErrorCom = () => {
  return (
    <div className="text-danger bg-red-100 p-4 rounded-lg text-center">
      {process.env.REACT_APP_MESSAGE_GENERAL ??
        "Something was wrong, Component Error!"}
    </div>
  );
};

export default ErrorCom;
