import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ButtonCom } from "../../components/button";
import {
  IconBellCom,
  IconLoginCom,
  IconLogoutCom,
  IconRegisterCom,
  IconUserCom,
} from "../../components/icon";
import {
  AVATAR_DEFAULT,
  IMAGE_DEFAULT,
  MESSAGE_LOGOUT_SUCCESS,
} from "../../constants/config";
import { onRemoveToken } from "../../store/auth/authSlice";
import HomeSearchMod from "../HomeSearchMod";
import { onCourseInitalState } from "../../store/course/courseSlice";
import IconRefreshCom from "../../components/icon/IconRefreshCom";

const HomeTopbarMod = () => {
  const { user } = useSelector((state) => state.auth);
  const userName = user?.email.split("@")[0];
  const userItems = [
    {
      icon: <IconRegisterCom />,
      title: "Register",
      url: "/register",
    },
    {
      icon: <IconLoginCom />,
      title: "Log in",
      url: "/login",
    },
    {
      icon: <IconUserCom />,
      title: "Profile",
      url: `/profile/${userName}`,
    },
    {
      icon: <IconRefreshCom />,
      title: "Password",
      url: `/change-password`,
    },
    {
      icon: <IconLogoutCom />,
      title: "Log out",
      url: "/logout",
    },
  ];

  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="topbar flex items-center justify-between mb-8 pl-[14px]">
      <div>
        <Link to="/" className="inline-block">
          <img
            srcSet="/logo_click_thumb_light.png"
            className="w-12 h-12"
            alt="Click And Learn Logo"
          />
        </Link>
      </div>
      <div className="w-full max-w-[458px]">
        <HomeSearchMod></HomeSearchMod>
      </div>

      <div className="flex items-center justify-between gap-x-5">
        <ButtonCom to="/my-courses" className="flex items-center">
          <span className="text-sm font-medium">My Courses</span>
        </ButtonCom>
        <IconBellCom></IconBellCom>
        <ul className="nav-menus">
          <li className="profile-nav onhover-dropdown p-0 me-0 relative">
            <div className="profile-nav-bridge absolute h-5 -bottom-2 w-full"></div>
            <div className="media profile-media gap-x-2">
              <img
                className="object-cover rounded-full w-12 h-12"
                src={`${user ? user.image ?? AVATAR_DEFAULT : IMAGE_DEFAULT}`}
                alt="User Avatar"
              />
              <div className="media-body flex-1">
                <span className="text-tw-primary font-medium font-tw-third">
                  {user ? user.name : "Welcome"}
                </span>
                <p className="mb-0 font-roboto flex items-center gap-x-2">
                  {user ? user.role : "Guest"}
                  <i className="middle fa fa-angle-down flex-1"></i>
                </p>
              </div>
            </div>
            <ul className="profile-dropdown onhover-show-div active top-14 w-36">
              {userItems.map((item, index) => {
                // If user is login, exclude "/register" and "/login" URLs
                if (
                  user &&
                  (item.url === "/register" || item.url === "/login")
                ) {
                  return null;
                }
                // If user is not login, exclude "/logout" URL
                if (
                  !user &&
                  (item.url === "/logout" ||
                    item.url.includes("/profile") ||
                    item.url === "/change-password")
                ) {
                  return null;
                }
                const rest =
                  item.url === "/logout"
                    ? {
                        onClick: () => {
                          toast.success(MESSAGE_LOGOUT_SUCCESS);
                          dispatch(onRemoveToken());
                          dispatch(onCourseInitalState());
                        },
                      }
                    : {};

                return (
                  <UserItems
                    key={item.title}
                    url={item.url}
                    title={item.title}
                    icon={item.icon}
                    {...rest}
                  ></UserItems>
                );
              })}
              {/* <UserItems url={`/profile/${user.email}`} title="Profile"></UserItems>
              <UserItems url={`/logout`} title="Logout" icon={}></UserItems> */}
            </ul>
          </li>
        </ul>
        {/*
        <IconBellCom></IconBellCom>
        <img
          srcSet="assets/images/user/default.jpg"
          className="object-cover rounded-full w-12 h-12"
          alt="User Default"
          referrerPolicy="no-referrer"
        />
        <button onClick={() => navigate("/login")}>Login</button> */}
      </div>
    </div>
  );
};

const UserItems = ({
  url = "/",
  title = "",
  icon = <IconUserCom />,
  ...rest
}) => {
  return (
    <li>
      <Link
        to={url}
        className="flex items-center gap-x-2 py-2 px-3 hover:border-l-8  hover:border-tw-primary duration-200 transition-all hover:bg-tw-light hover:text-tw-primary"
        {...rest}
      >
        {icon}
        <span className="flex-1">{title}</span>
      </Link>
    </li>
  );
};

export default HomeTopbarMod;
