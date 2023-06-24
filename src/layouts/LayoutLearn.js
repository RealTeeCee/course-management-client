import React from "react";
import { Outlet } from "react-router-dom";
import GapYCom from "../components/common/GapYCom";
import { FooterMod } from "../modules/footer";
import { LearnSidebarMod, LearnTopbarMod } from "../modules/sidebar";

const LayoutLearning = () => {
  return (
    <>
      <div className="px-10 py-6 bg-tw-light text-black">
        <LearnTopbarMod></LearnTopbarMod>

        <div className="flex gap-x-10 items-start">
          <LearnSidebarMod></LearnSidebarMod>
          <div className="flex-1">
            <Outlet></Outlet>
          </div>
        </div>

        <GapYCom></GapYCom>
      </div>
      <FooterMod />
    </>
  );
};

export default LayoutLearning;
