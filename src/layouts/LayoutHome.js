import React from "react";
import { Outlet } from "react-router-dom";
import GapYCom from "../components/common/GapYCom";
import OverplayCom from "../components/common/OverplayCom";
import { HomeSidebarMod, HomeTopbarMod } from "../modules/sidebar";

const LayoutHome = () => {
  return (
    <div className="px-10 py-6 bg-tw-light text-black min-h-screen">
      <OverplayCom></OverplayCom>
      <HomeTopbarMod></HomeTopbarMod>
      <div className="flex gap-x-10 items-start">
        <HomeSidebarMod></HomeSidebarMod>
        <div className="flex-1">
          <Outlet></Outlet>
        </div>
      </div>
      <GapYCom></GapYCom>
      <div className="bg-black text-white flex justify-center items-center text-4xl h-[30vh] z-10 relative">
        Footer
      </div>
    </div>
  );
};

export default LayoutHome;
