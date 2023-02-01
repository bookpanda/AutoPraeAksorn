import React from "react";

import { Button, Paper, Typography } from "@mui/material";

import { useProcessContext } from "$core/contexts/process";

export const UploadButton = () => {
  const processContext = useProcessContext();
  const { imgSrc, onSelectFile } = processContext;

  return (
    <div className="flex items-center justify-center bg-blue-100">
      {imgSrc ? (
        <Button component="label" size="large" variant="contained">
          <Typography className="font-bold" variant="h5">
            Upload
          </Typography>
          <input accept="image/*" hidden type="file" onChange={onSelectFile} />
        </Button>
      ) : (
        <div className="flex w-full flex-col items-center">
          <Typography
            className="mb-8 font-semibold"
            component="h3"
            variant="h3"
          >
            Create your own Card Stunts here
          </Typography>
          <Paper
            className="flex h-[10vh] w-1/6 items-center justify-center"
            elevation={4}
          >
            <Button component="label" size="large" variant="text">
              <Typography className="font-bold" variant="h5">
                Upload
              </Typography>
              <input
                accept="image/*"
                hidden
                type="file"
                onChange={onSelectFile}
              />
            </Button>
          </Paper>
        </div>
      )}
    </div>
  );
};
