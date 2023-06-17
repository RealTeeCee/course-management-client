import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const DialogConfirm = ({
  open,
  onClose,
  closeContent,
  onConfirm,
  confirmContent,
  title,
  content,
}) => {
  return (
    <div>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>{closeContent}</Button>
          <Button autoFocus onClick={onConfirm}>
            {confirmContent}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DialogConfirm;
