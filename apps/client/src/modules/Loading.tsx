import React, { FC } from "react";

import { CircularProgress, Typography } from "@mui/material";

import { useAppContext } from "$core/contexts/app";

export const Loading: FC = () => {
  const appContext = useAppContext();
  const { loadingText } = appContext;
  return (
    <div className="flex h-[40vh] flex-col items-center justify-center">
      <CircularProgress size={90} />
      <Typography className="mt-8 font-bold" component="h5" variant="h5">
        Did you know?
      </Typography>
      <Typography
        className="mt-8 text-center font-bold"
        component="h5"
        variant="h5"
      >
        {loadingText}
      </Typography>
    </div>
  );
};
