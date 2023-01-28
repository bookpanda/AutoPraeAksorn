import React, { useEffect, useRef, useState } from "react";
import ReactCrop, { Crop, PixelCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

import Image from "next/image";

import { Button } from "@mui/material";

import { canvasPreview } from "./canvasPreview";
import { centerAspectCrop } from "./centerAspectCrop";
import { useDebounceEffect } from "./useDebounceEffect";

export function ImageProcessor() {
  const [imgSrc, setImgSrc] = useState("");
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);
  const [aspect, setAspect] = useState<number | undefined>(2 / 1);

  function onSelectFile(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      setCrop(undefined); // Makes crop preview update between images.
      const reader = new FileReader();
      reader.addEventListener("load", () =>
        setImgSrc(reader.result?.toString() || "")
      );
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    if (aspect) {
      const { height, width } = e.currentTarget;
      setCrop(centerAspectCrop(width, height, aspect));
    }
  }

  useDebounceEffect(
    async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
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

  function handleToggleAspectClick() {
    if (aspect) {
      setAspect(undefined);
    } else if (imgRef.current) {
      const { height, width } = imgRef.current;
      setAspect(2 / 1);
      setCrop(centerAspectCrop(width, height, 2 / 1));
    }
  }

  const test = async () => {
    if (previewCanvasRef.current) {
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
          localStorage.setItem("imgData", data.content);
        });
    }
  };
  const [imgL, setImgL] = useState("");
  useEffect(() => {
    const a = localStorage.getItem("imgData");
    if (a) setImgL("data:image/png;base64," + a);
  }, []);

  return (
    <div className="App">
      <div className="Crop-Controls">
        <input accept="image/*" type="file" onChange={onSelectFile} />
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
        <div>
          <button onClick={handleToggleAspectClick}>
            Toggle aspect {aspect ? "off" : "on"}
          </button>
        </div>
      </div>
      {!!imgSrc && (
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
      <Button onClick={() => test()}>save</Button>
      {imgL && <Image alt="Crop me" height={100} src={imgL} width={100} />}
    </div>
  );
}
