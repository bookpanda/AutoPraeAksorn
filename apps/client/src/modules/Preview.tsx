import React, { FC } from "react";

import Image from "next/image";

import { Backdrop } from "@mui/material";

import { useAppContext } from "$core/contexts/app";

export const Preview: FC = () => {
  const appContext = useAppContext();
  const { preview, previewImage, setPreview } = appContext;
  const handleClose = () => {
    setPreview(false);
  };

  return (
    <Backdrop
      open={preview}
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      onClick={handleClose}
    >
      <Image alt="image" height={1000} src={previewImage} width={1000}></Image>
    </Backdrop>
  );
};
