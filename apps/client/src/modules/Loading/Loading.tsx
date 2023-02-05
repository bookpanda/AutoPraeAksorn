import React, { FC } from "react";

import { CircularProgress, Typography } from "@mui/material";

import { useAppContext } from "$core/contexts/app";

export const Loading: FC = () => {
  const appContext = useAppContext();
  const { loadingText } = appContext;
  return (
    <div className="flex h-[40vh] flex-col items-center justify-center">
      <Typography
        component="p"
        fontWeight="bold"
        sx={{ marginBottom: "2vh" }}
        variant="body1"
      >
        This can take up to 30 seconds, please be patient like the students on
        the card stunts stand.
      </Typography>
      <CircularProgress size="10vh" />
      <Typography
        component="h5"
        fontWeight="bold"
        sx={{ marginTop: "2vh" }}
        variant="h5"
      >
        Did you know?
      </Typography>
      <Typography component="p" sx={{ marginTop: "2vh" }} variant="body1">
        {loadingText}
      </Typography>
    </div>
  );
};
