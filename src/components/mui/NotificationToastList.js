import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Slide from "@mui/material/Slide";
import { useDispatch, useSelector } from "react-redux";
import { selectAllCourseState } from "../../store/course/courseSelector";
import React, { useEffect, useState } from "react";
import { onRemoveFromToastList } from "../../store/course/courseSlice";
import { selectUser } from "../../store/auth/authSelector";

function TransitionUp(props) {
  return <Slide {...props} direction="up" />;
}

export default function NotificationToastList() {
  const dispatch = useDispatch();
  const { notifToastList, updatedNotifToastList } =
    useSelector(selectAllCourseState);
  const user = useSelector(selectUser);
  console.log(updatedNotifToastList);

  const [newNotifToastList, setNewNotifToastList] = useState([]);
  console.log(newNotifToastList);
  const [openStates, setOpenStates] = useState(false);

  useEffect(() => {
    console.log(
      "aaaaaaaaaaaaaaaaaaAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
    );
    if (user?.id > 0 && notifToastList?.length > 0) {
      const isReadNotifToastList = notifToastList.filter(
        (notif) => notif.read === false
      );
      setNewNotifToastList(isReadNotifToastList);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id, notifToastList?.length]);

  // const handleOpen = (toast, index) => () => {
  //   console.log(toast);
  //   if (toast.length > 0) {
  //     setOpenStates((prevOpenStates) =>
  //       prevOpenStates.map((state, i) => (i === index ? true : state))
  //     );
  //   }
  //   dispatch(onRemoveFromToastList(toast));
  // };

  const handleClose = (toast, index) => () => {
    dispatch(onRemoveFromToastList(toast));
    setOpenStates(false);
    // setOpenStates((prevOpenStates) =>
    //   prevOpenStates.map((state, i) => (i === index ? false : state))
    // );
  };

  useEffect(() => {
    if (updatedNotifToastList?.length === 0 && newNotifToastList?.length > 0) {
      setOpenStates(true);
      // setOpenStates(notifToastList ? notifToastList.map(() => false) : []);
    } else if (updatedNotifToastList?.length > 0) {
      setOpenStates(true);
    }
  }, [newNotifToastList?.length, updatedNotifToastList?.length]);

  return (
    <React.Fragment>
      {updatedNotifToastList?.length > 0
        ? updatedNotifToastList &&
          updatedNotifToastList.map((toast, index) => (
            <React.Fragment key={toast.id}>
              {/*<Button onClick={handleClick(index)}>Up</Button>*/}
              <Snackbar
                open={openStates}
                // onClose={() => dispatch(onRemoveFromToastList(toast))}
                onClose={handleClose(toast, index)}
                autoHideDuration={4000}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                TransitionComponent={TransitionUp}
                message={toast.content}
              />
            </React.Fragment>
          ))
        : newNotifToastList &&
          newNotifToastList.map((toast, index) => (
            <React.Fragment key={toast.id}>
              {/*<Button onClick={handleClick(index)}>Up</Button>*/}
              <Snackbar
                open={openStates}
                // onClose={() => dispatch(onRemoveFromToastList(toast))}
                onClose={handleClose(toast, index)}
                autoHideDuration={4000}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                style={{ position: "absolute", bottom: 10 + index * 50 }}
                TransitionComponent={TransitionUp}
                message={toast.content}
              />
            </React.Fragment>
          ))}
    </React.Fragment>
  );
}
