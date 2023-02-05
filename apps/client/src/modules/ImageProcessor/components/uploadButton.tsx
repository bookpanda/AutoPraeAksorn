import React from "react";

import { Button, Paper, Typography } from "@mui/material";

import { useProcessContext } from "$core/contexts/process";

export const UploadButton = () => {
  const processContext = useProcessContext();
  const { imgSrc, onSelectFile } = processContext;

  return (
    <div className="flex items-center justify-center">
      {imgSrc ? (
        <Button component="label" size="large" variant="contained">
          <Typography fontWeight="bold" variant="h5">
            Upload
          </Typography>
          <input accept="image/*" hidden type="file" onChange={onSelectFile} />
        </Button>
      ) : (
        <div className="flex w-full flex-col items-center space-y-8">
          <Typography
            component="h4"
            fontWeight="bold"
            sx={{ textAlign: "center" }}
            variant="h4"
          >
            Create your own Card Stunts here
          </Typography>
          <Paper
            className="flex h-[8vh] w-1/4 items-center justify-center  md:w-1/6"
            elevation={4}
          >
            <Button component="label" size="large" variant="text">
              <Typography fontWeight="bold" variant="h5">
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
