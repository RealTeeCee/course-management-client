import React from "react";
import { Outlet } from "react-router-dom";
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
    </div>
  );
};

export default LayoutHome;
