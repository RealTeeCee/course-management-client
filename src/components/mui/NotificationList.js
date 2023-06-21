import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useDispatch } from "react-redux";
import { onReadNotification } from "../../store/course/courseSlice";
import { convertSecondToDiffForHumans } from "../../utils/helper";

export default function NotificationList({ notifs }) {
  const dispatch = useDispatch();
  const handleReadNotification = (notifId) => {
    dispatch(onReadNotification(notifId));
  };
  return (
    <List
      sx={{
        width: "100%",
        maxWidth: 360,
        bgcolor: "background.paper",
        borderRadius: 2,
        padding: "5px",
      }}
    >
      {notifs.map((notif, i) => (
        <React.Fragment key={notif.id}>
          <ListItem
            alignItems="flex-start"
            onClick={() => handleReadNotification(notif.id)}
            sx={{
              bgcolor: notif.read ? "#fff" : "#757575",
              borderRadius: 2,
              "&:hover": {
                bgcolor: notif.read ? "#f0f0f0" : "#616161",
              },
            }}
          >
            <ListItemAvatar>
              <Avatar
                alt={notif.userFrom.first_name}
                src={notif.userFrom.imageUrl}
              />
            </ListItemAvatar>
            <ListItemText
              primary={
                <React.Fragment>
                  <Typography
                    sx={{
                      display: "inline",
                      color: notif.read ? "black" : "#fff",
                    }}
                    component="span"
                    variant="body2"
                  >
                    {notif.read ? (
                      notif.userFrom.first_name
                    ) : (
                      <React.Fragment>
                        {notif.userFrom.first_name}{" "}
                        <strong style={{ color: "violet" }}>unread</strong>
                      </React.Fragment>
                    )}
                  </Typography>
                </React.Fragment>
              }
              secondary={
                <React.Fragment>
                  {notif.content}
                  <Typography
                    sx={{
                      display: "inline",
                      color: notif.read ? "black" : "#cfc6d5",
                    }}
                    component="span"
                    variant="body2"
                  >
                    <br></br>
                    {convertSecondToDiffForHumans(
                      Math.floor(Date.now() / 1000) -
                        Math.floor(new Date(notif.created_at).getTime() / 1000)
                    )}{" "}
                    ago...
                  </Typography>
                </React.Fragment>
              }
            />
          </ListItem>
          {i === notifs.length - 1 ? null : (
            <Divider variant="inset" component="li" />
          )}
        </React.Fragment>
      ))}
    </List>
  );
}
