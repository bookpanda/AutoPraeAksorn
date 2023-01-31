import React, { useEffect, useState } from "react";
import "react-image-crop/dist/ReactCrop.css";

import Image from "next/image";

import { Button } from "@mui/material";

import { ImagesData } from "$core/@types";
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

  const test = async () => {
    if (previewCanvasRef?.current) {
      const imageURL = previewCanvasRef.current.toDataURL("image/png");
      const contents = imageURL.split(",")[1];
      const formData = new FormData();
      formData.append("contents", contents);
      const url = "https://AutoPraeAksorn.idhibhat-pankam.repl.co";
      await fetch(url, {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          let imagesData: ImagesData = { data: [] };
          if (localStorage.getItem("images") !== null) {
            imagesData = JSON.parse(localStorage.getItem("images") as string);
          }
          imagesData.data.push({
            base64: data.content,
            code: [[0]],
          });
          localStorage.setItem("images", JSON.stringify(imagesData));
        });
    }
  };
  const [imgL, setImgL] = useState<string[]>([]);
  useEffect(() => {
    const a = localStorage.getItem("images");
    if (a) {
      const image: ImagesData = JSON.parse(a);
      const gallery = [];
      for (let i = 0; i < image.data.length; i++) {
        gallery.push("data:image/png;base64," + image.data[i].base64);
      }
      setImgL(gallery);
    }
  }, []);

  return (
    <div className="App bg-red-100">
      <div className="Crop-Controls bg-green-100">
        <Scale />
        <Rotate />
      </div>
      {!!imgSrc && <CropArea />}
      <CompletedCrop />
      <input accept="image/*" type="file" onChange={onSelectFile} />
      <Button onClick={() => test()}>save</Button>
      {imgL.map((picture, index) => (
        <Image
          key={index}
          alt="Crop me"
          className="mb-2"
          height={100}
          src={picture}
          width={100}
        />
      ))}
    </div>
  );
}
