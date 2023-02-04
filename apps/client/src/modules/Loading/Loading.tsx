import React, { FC } from "react";

import { CircularProgress, Typography } from "@mui/material";

import { useAppContext } from "$core/contexts/app";

export const Loading: FC = () => {
  const appContext = useAppContext();
  const { loadingText } = appContext;
  return (
    <div className="flex h-[40vh] flex-col items-center justify-center">
      <Typography
        component="h5"
        fontWeight="bold"
        sx={{ marginBottom: 6 }}
        variant="h5"
      >
        This can take up to 30 seconds, please be patient like the students on
        the card stunts stand.
      </Typography>
      <CircularProgress size={90} />
      <Typography
        component="h5"
        fontWeight="bold"
        sx={{ marginTop: 6 }}
        variant="h5"
      >
        Did you know?
      </Typography>
      <Typography component="h5" sx={{ marginTop: 4 }} variant="h5">
        {loadingText}
      </Typography>
    </div>
  );
};
