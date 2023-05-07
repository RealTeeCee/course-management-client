import React, { useEffect, useState } from "react";
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
    title: "Course",
    url: "/courses",
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
  const [isScrolled, setIsScrolled] = useState(false);
  const navLinkClass = "tw-transition-all text-center block p-3 rounded-xl last:mt-auto last:shadow-primary bg-tw-light";

  useEffect(() => {
    function handleScroll() {
      const sidebar = document.querySelector(".sidebar");
      if (!sidebar) return;
      const { top } = sidebar.getBoundingClientRect();
      const scrollY = window.pageYOffset || document.documentElement.scrollTop;
      const actualTop = top + scrollY;
      if(actualTop > 500){

        setIsScrolled(true);
      }else {
        setIsScrolled(false);
      }
    }

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <>
      <div className="sidebar-hidden w-full md:w-[76px]"></div>
      <div className={`${isScrolled ? "sidebar fixed animate-slide-in w-full md:w-[76px] rounded-3xl bg-tw-light shadow-2xl text-center text-xs flex flex-col flex-shrink-0" : "sidebar fixed w-full md:w-[76px] rounded-3xl bg-tw-light shadow-primary text-center text-xs flex flex-col flex-shrink-0"}`}>
        {sidebarItems.map((item) => (
          <NavLink
            key={item.title}
            // className={``}
            className={({ isActive }) =>
              isActive
                ? `active ${navLinkClass} bg-gray-200 text-tw-primary`
                : navLinkClass
            }
            to={item.url}
          >
            <span>{item.icon}</span>
            <div className="mt-1">{item.title}</div>
          </NavLink>
        ))}
      </div>
    </>
  );
};

export default HomeSidebarMod;
