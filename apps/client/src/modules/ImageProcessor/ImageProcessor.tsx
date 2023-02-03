import React from "react";
import "react-image-crop/dist/ReactCrop.css";

import { Button } from "@mui/material";

import { useProcessContext } from "$core/contexts/process";

import { canvasPreview } from "./canvasPreview";
import { CompletedCrop } from "./components/completedCrop";
import { CropArea } from "./components/cropArea";
import { Rotate } from "./components/rotate";
import { Scale } from "./components/scale";
import { UploadButton } from "./components/uploadButton";
import { useDebounceEffect } from "./useDebounceEffect";

export function ImageProcessor() {
  const processContext = useProcessContext();
  const {
    completedCrop,
    imgRef,
    imgSrc,
    previewCanvasRef,
    processImage,
    rotate,
    scale,
  } = processContext;

  useDebounceEffect(
    async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef?.current &&
        previewCanvasRef?.current
      ) {
        canvasPreview(
          imgRef.current,
          previewCanvasRef.current,
          completedCrop,
          scale,
          rotate
        );
      }
    },
    100,
    [completedCrop, scale, rotate]
  );

  return (
    <div className="App min-h-[40vh] p-4">
      <UploadButton />
      <div className="Crop-Controls">
        {imgSrc && (
          <div className="flex justify-center space-x-8 p-8">
            <CropArea />
            <CompletedCrop />
          </div>
        )}
        {imgSrc && (
          <div className="flex flex-col items-center">
            <Scale />
            <Rotate />

            <Button
              className="mt-8 w-1/5"
              component="label"
              variant="contained"
              onClick={() => processImage()}
            >
              save
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
