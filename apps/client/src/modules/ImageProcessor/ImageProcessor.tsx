import React from "react";
import "react-image-crop/dist/ReactCrop.css";

import { Button } from "@mui/material";

import { useProcessContext } from "$core/contexts/process";

import { canvasPreview } from "./canvasPreview";
import { CompletedCrop } from "./components/completedCrop";
import { CropArea } from "./components/cropArea";
import { Rotate } from "./components/rotate";
import { Scale } from "./components/scale";
import { useDebounceEffect } from "./useDebounceEffect";

export function ImageProcessor() {
  const processContext = useProcessContext();
  const {
    completedCrop,
    imgRef,
    imgSrc,
    onSelectFile,
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
    <div className="App bg-red-100">
      <div className="Crop-Controls bg-green-100">
        {!!imgSrc && (
          <div className="flex justify-center space-x-8 p-8">
            <CropArea />
            <CompletedCrop />
          </div>
        )}
        {imgSrc && (
          <div>
            <Scale />
            <Rotate />
          </div>
        )}
      </div>
      <input accept="image/*" type="file" onChange={onSelectFile} />
      <Button onClick={() => processImage()}>save</Button>
    </div>
  );
}
