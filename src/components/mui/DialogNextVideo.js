import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const AlertDialog = ({ open, onClose, onNext, isFinal }) => {
  //   const [open, setOpen] = React.useState(false);

  //   const handleClickOpen = () => {
  //     setOpen(true);
  //   };

  //   const handleClose = () => {
  //     setOpen(false);
  //   };

  return (
    <div>
      <Dialog
        open={open}
        // onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {isFinal
              ? "Are you ready to take on an exam?"
              : "Do you want to go to next video?"}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>No</Button>
          <Button autoFocus onClick={onNext}>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AlertDialog;
