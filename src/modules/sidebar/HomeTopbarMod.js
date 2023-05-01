import React from "react";
import { ButtonCom } from "../../components/button";
import { IconBellCom } from "../../components/icon";
import HomeSearchMod from "../HomeSearchMod";

const HomeTopbarMod = () => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-x-10 flex-1">
        <img
          srcSet="logo192.png"
          className="w-12 h-12"
          alt="Course Management Logo"
        />
        <div className="w-full max-w-[458px]">
          <HomeSearchMod></HomeSearchMod>
        </div>
      </div>

      <div className="flex items-center gap-x-6 flex-1 justify-end">
        <span className="text-base font-medium text-gray-500">My course</span>
        <IconBellCom></IconBellCom>
        <img srcSet="assets/images/user/default.jpg" className="object-cover rounded-full w-12 h-12" alt="User Default" />
      </div>
    </div>
  );
};

export default HomeTopbarMod;
