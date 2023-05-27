import React, { useState } from "react";
import { CollapseAntCom } from "../../components/ant";

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

const LearnSidebarMod = () => {
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
  //   Open All
  const handleToggleOpen = () => {
    setIsOpen(!isOpen);
    if (isOpen) {
      setOpenKeys([]);
    }
  };

  return (
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
  );
};

export default LearnSidebarMod;
