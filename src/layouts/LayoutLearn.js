import React from "react";
import { Outlet } from "react-router-dom";
import GapYCom from "../components/common/GapYCom";
import { LearnSidebarMod, LearnTopbarMod } from "../modules/sidebar";

const LayoutLearning = () => {
  return (
    <div className="px-10 py-6 bg-tw-light text-black min-h-screen">
      <LearnTopbarMod></LearnTopbarMod>

      <div className="flex gap-x-10 items-start">
        <LearnSidebarMod></LearnSidebarMod>
        <div className="flex-1">
          <Outlet></Outlet>
        </div>
      </div>

      <GapYCom></GapYCom>
      <footer className="footer bg-tw-light text-black flex justify-center items-center text-4xl z-10 relative mx-auto">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 footer-copyright text-center">
              <p className="mb-0">Copyright 2023 © Click & Learn</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LayoutLearning;
