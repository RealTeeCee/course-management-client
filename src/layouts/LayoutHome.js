import React from "react";
import { HomeSidebarMod, HomeTopbarMod } from "../modules/sidebar";

const LayoutHome = ({ children }) => {
  return (
    <div className="px-10 py-6 bg-tw-light text-black">
      <HomeTopbarMod></HomeTopbarMod>
      <div>
        <HomeSidebarMod></HomeSidebarMod>
        {children}
      </div>
    </div>
  );
};

export default LayoutHome;
