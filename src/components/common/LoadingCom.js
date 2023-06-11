import React from "react";

const LoadingCom = () => {
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
