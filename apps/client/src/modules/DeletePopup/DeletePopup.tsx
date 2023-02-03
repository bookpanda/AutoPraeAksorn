import React, { FC } from "react";

import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";

import { useAppContext } from "$core/contexts/app";

export const DeletePopup: FC = () => {
  const appContext = useAppContext();
  const { currentImage, deleteImage, deletePopup, setDeletePopup } = appContext;
  const handleClose = () => {
    setDeletePopup(false);
  };
  const handleDelete = () => {
    deleteImage(currentImage.index);
    setDeletePopup(false);
  };

  return (
    <Dialog
      aria-describedby="alert-dialog-description"
      aria-labelledby="alert-dialog-title"
      open={deletePopup}
      onClose={handleClose}
    >
      <DialogTitle id="alert-dialog-title">
        {"Are you sure you want to delete this?"}
      </DialogTitle>
      <DialogActions>
        <Button onClick={handleClose}>Cancle</Button>
        <Button onClick={handleDelete}>Delete</Button>
      </DialogActions>
    </Dialog>
  );
};
