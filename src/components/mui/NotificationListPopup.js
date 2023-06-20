import { Badge } from "antd";
import React, { useState } from "react";
import { IconBellCom } from "../icon";
import NotificationList from "./NotificationList";
import { useSelector } from "react-redux";
import { selectAllCourseState } from "../../store/course/courseSelector";

const NotificationListPopup = () => {
  const [showNotif, setShowNotif] = useState(false);
  const { notifs } = useSelector(selectAllCourseState);
  return (
    <ul className="nav-menus">
      <li className="profile-nav onhover-dropdown p-0 me-0 relative">
        <div className="profile-nav-bridge absolute h-5 -bottom-2 w-full"></div>
        <div
          className="media profile-media gap-x-2"
          onClick={() => setShowNotif(!showNotif)}
        >
          <Badge count={notifs.length} showZero={false}>
            <IconBellCom></IconBellCom>
          </Badge>
        </div>
        {showNotif ? (
          <ul
            style={{
              position: "absolute",
              zIndex: 5,
              top: 35,
              right: 10,
              width: 360,
            }}
          >
            <NotificationList notifs={notifs}></NotificationList>
          </ul>
        ) : null}
      </li>
    </ul>
  );
};

export default NotificationListPopup;
