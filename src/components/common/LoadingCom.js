import React from "react";
import SpinAntCom from "../ant/SpinAntCom";

const LoadingCom = ({ isChild = false }) => {
  if (isChild)
    return (
      <div className="w-full h-full fixed !top-1/2 !left-0">
        <SpinAntCom loadingText="Loading..." />
      </div>
    );
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-20 flex justify-center items-center">
      {/* <div>
          <Spin size="large" />
        </div> */}
      <div className="loader-box">
        <div className="loader-10"></div>
      </div>
    </div>
  );
};

export default LoadingCom;
