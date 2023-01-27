import React, { useRef, useState } from "react";
import ReactCrop, { Crop, centerCrop, makeAspectCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

import Image, { StaticImageData } from "next/image";

import { Button } from "@mui/material";

import { plates } from "../../../public";

export const TestProcessor = () => {
  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    const { naturalHeight: height, naturalWidth: width } = e.currentTarget;

    const crop = centerCrop(
      makeAspectCrop(
        {
          // You don't need to pass a complete crop into
          // makeAspectCrop or centerCrop.
          unit: "%",
          width: 90,
        },
        2 / 1,
        width,
        height
      ),
      width,
      height
    );
    console.log("on image load");

    setCrop(crop);
  }
  function getCroppedImg(
    image: CanvasImageSource,
    pixelCrop: Crop = crop,
    fileName = "image"
  ) {
    const canvas = document.createElement("canvas");
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;
    const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");

    (ctx as CanvasRenderingContext2D).drawImage(
      image,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height
    );

    // As Base64 string
    // const base64Image = canvas.toDataURL('image/jpeg');

    // As a blob
    return new Promise((resolve, reject) => {
      canvas.toBlob((file) => {
        file.name = fileName;
        resolve(file);
      }, "image/jpeg");
    });
  }

  const test = async () => {
    const croppedImg = await getCroppedImg(image, crop, "ass");
  };
  const [crop, setCrop] = useState<Crop>();
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  return (
    <>
      <p>TestProcessor</p>
      <ReactCrop aspect={2 / 1} crop={crop} onChange={(c) => setCrop(c)}>
        <Image alt="image" src={plates} onLoad={onImageLoad} />
      </ReactCrop>
      <Button>Save</Button>
      <canvas
        ref={previewCanvasRef}
        style={{
          border: "1px solid black",
          objectFit: "contain",
          // width: completedCrop.width,
          // height: completedCrop.height,
        }}
      />
    </>
  );
};
