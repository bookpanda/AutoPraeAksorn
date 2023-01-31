import React, { useEffect, useState } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

import Image from "next/image";

import { Button } from "@mui/material";

import { ImagesData } from "$core/@types";
import { useProcessContext } from "$core/contexts/process";

import { canvasPreview } from "./canvasPreview";
import { useDebounceEffect } from "./useDebounceEffect";

export function ImageProcessor() {
  const processContext = useProcessContext();
  const {
    aspect,
    completedCrop,
    crop,
    imgRef,
    imgSrc,
    onImageLoad,
    onSelectFile,
    previewCanvasRef,
    rotate,
    scale,
    setCompletedCrop,
    setCrop,
    setRotate,
    setScale,
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
        <div>
          <label htmlFor="scale-input">Scale: </label>
          <input
            disabled={!imgSrc}
            id="scale-input"
            step="0.1"
            type="number"
            value={scale}
            onChange={(e) => setScale(Number(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor="rotate-input">Rotate: </label>
          <input
            disabled={!imgSrc}
            id="rotate-input"
            type="number"
            value={rotate}
            onChange={(e) =>
              setRotate(Math.min(180, Math.max(-180, Number(e.target.value))))
            }
          />
        </div>
      </div>
      {!!imgSrc && (
        <div>
          <ReactCrop
            aspect={aspect}
            crop={crop}
            onChange={(_, percentCrop) => setCrop(percentCrop)}
            onComplete={(c) => setCompletedCrop(c)}
          >
            <Image
              ref={imgRef}
              alt="Crop me"
              height={800}
              src={imgSrc}
              style={{ transform: `scale(${scale}) rotate(${rotate}deg)` }}
              width={800}
              onLoad={onImageLoad}
            />
          </ReactCrop>
        </div>
      )}
      <div>
        {!!completedCrop && (
          <canvas
            ref={previewCanvasRef}
            id="canvasId"
            style={{
              border: "1px solid black",
              objectFit: "contain",
              width: completedCrop.width,
              height: completedCrop.height,
            }}
          />
        )}
      </div>
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
