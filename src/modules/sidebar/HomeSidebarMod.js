import React from "react";
import { NavLink } from "react-router-dom";
import {
  IconBlogCom,
  IconHomeCom,
  IconLearnCom,
  IconMapCom,
  IconMoonCom,
  IconSunCom,
} from "../../components/icon";

const sidebarItems = [
  {
    icon: <IconHomeCom className="mx-auto" />,
    title: "Home",
    url: "/",
  },
  {
    icon: <IconMapCom className="mx-auto" />,
    title: "Route",
    url: "/route-map",
  },
  {
    icon: <IconLearnCom className="mx-auto" />,
    title: "Learn",
    url: "/learning",
  },
  {
    icon: <IconBlogCom className="mx-auto" />,
    title: "Blog",
    url: "/blog",
  },
  {
    icon: <IconMoonCom className="mx-auto" />,
    title: "Mode",
    url: "/mode",
    onClick: () => {},
  },
];

const HomeSidebarMod = () => {
  return (
    <div className="w-full md:w-[76px] rounded-3xl bg-tw-light shadow-primary text-center text-xs flex flex-col">
      {sidebarItems.map((item) => (
        <NavLink
          key={item.title}
          // className={``}
          className={({ isActive }) =>
            isActive
              ? "active tw-transition-all text-center bg-gray-200 block p-3 rounded-xl last:mt-auto last:shadow-primary"
              : "tw-transition-all text-center bg-tw-light block p-3 rounded-xl last:mt-auto last:shadow-primary"
          }
          to={item.url}
        >
          <span>{item.icon}</span>
          <div className="mt-1">{item.title}</div>
        </NavLink>
      ))}
    </div>
  );
};

export default HomeSidebarMod;
