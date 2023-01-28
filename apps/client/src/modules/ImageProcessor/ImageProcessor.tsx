import React, { useEffect, useRef, useState } from "react";
import ReactCrop, {
  Crop,
  PixelCrop,
  centerCrop,
  makeAspectCrop,
} from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import FileResizer from "react-image-file-resizer";

import Image from "next/image";

import { Button } from "@mui/material";

import { canvasPreview } from "./canvasPreview";
import { getCroppedImg } from "./getCroppedImage";
import { useDebounceEffect } from "./useDebounceEffect";

// This is to demonstate how to make and center a % aspect crop
// which is a bit trickier so we use some helper functions.
function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number
) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: "%",
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
}

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
        // We use canvasPreview as it's much faster than imgPreview.
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
    if (previewCanvasRef.current && crop) {
      const croppedImg = await getCroppedImg(
        previewCanvasRef.current,
        crop,
        "as"
      );
      console.log(croppedImg as Blob);
    }
    // const newImage = await new Promise((resolve) => {
    //   FileResizer.imageFileResizer(
    //     croppedImg as Blob,
    //     25,
    //     50,
    //     "PNG",
    //     10,
    //     0,
    //     (uri) => {
    //       resolve(uri);
    //     },
    //     "base64"
    //   );
    // });
    // console.log(newImage);
    // }
    const canvas = document.getElementById("canvasId");
    if (previewCanvasRef.current) {
      const image = previewCanvasRef.current.toDataURL("image/png");
      // .replace("image/png", "image/octet-stream"); // here is the most important part because if you dont replace you will get a DOM 18 exception.
      // window.location.href = image; // it will save locally
      console.log(image);

      const contents = image.split(",")[1];
      const obj = { filename: "image.png", contents };
      const formData = new FormData();
      formData.append("filename", "image.png");
      formData.append("contents", contents);
      console.log(formData, contents);
      const url = "https://AutoPraeAksorn.idhibhat-pankam.repl.co";
      await fetch(url, {
        method: "POST",
        headers: {
          // Accept: "application/json",
          // "Content-Type": "application/json",
        },
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          localStorage.setItem("imgData", data.content);
        });
      // .then((response) => response.blob())
      // .then((imageBlob) => {
      //   // Then create a local URL for that image and print it
      //   const imageObjectURL = URL.createObjectURL(imageBlob);
      //   console.log(imageObjectURL);
      // });
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
