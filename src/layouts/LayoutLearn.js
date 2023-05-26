import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { CollapseAntCom } from "../components/ant";
import GapYCom from "../components/common/GapYCom";

const sectionItems = [
  {
    id: 1,
    name: "Introduce",
  },
  {
    id: 2,
    name: "How to install PHP",
  },
];

const lessionItems = [
  {
    id: 1,
    name: "What is PHP",
    duration: "02:58",
    section_id: 1,
  },
  {
    id: 2,
    name: "What is Laravel",
    duration: "05:58",
    section_id: 1,
  },
  {
    id: 3,
    name: "Install XamPP",
    duration: "02:18",
    section_id: 2,
  },
  {
    id: 4,
    name: "Install phpMyAdmin",
    duration: "06:18",
    section_id: 2,
  },
];

const sessionIds = sectionItems.map((item) => String(item.id));
const totalLession = 2;

const LayoutLearning = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openKeys, setOpenKeys] = useState(String(sectionItems[0].id));
  const handleChangeCollapse = (keys) => {
    setOpenKeys(keys);
    if (keys.length === sectionItems.length) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };

  const handleToggleOpen = () => {
    setIsOpen(!isOpen);
    if (isOpen) {
      setOpenKeys([]);
    }
  };

  return (
    <div className="px-10 py-6 bg-tw-light text-black min-h-screen">
      <div className="topbar flex items-center justify-between mb-8">
        <div>
          <Link to="/" className="inline-block">
            <img
              srcSet="/logo192.png"
              className="w-12 h-12"
              alt="Course Management Logo"
            />
          </Link>
        </div>
        <div className="flex items-center justify-between gap-x-5">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perferendis
          laborum ipsa sint sit porro eaque aliquid, pariatur in modi cumque,
          iste repudiandae expedita ducimus odit dolorem, repellat ut velit
          nobis?
        </div>
      </div>

      <div className="flex gap-x-10 items-start">
        <div className="sidebar w-[400px]">
          <CollapseAntCom
            type="learn"
            isOpen={isOpen}
            onChange={handleChangeCollapse}
            openKeys={openKeys}
            parentItems={sectionItems}
            childItems={lessionItems}
            slug="php-basic"
          ></CollapseAntCom>
        </div>
        <div className="flex-1">
          <Outlet></Outlet>
        </div>
      </div>

      <GapYCom></GapYCom>
      <footer className="footer bg-tw-light text-black flex justify-center items-center text-4xl z-10 relative mx-auto">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 footer-copyright text-center">
              <p className="mb-0">Copyright 2023 © Course Management</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LayoutLearning;
