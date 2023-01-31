import { FC, PropsWithChildren, useRef, useState } from "react";
import { Crop, PixelCrop } from "react-image-crop";

import { centerAspectCrop } from "$modules/ImageProcessor/centerAspectCrop";

import { ProcessContext } from "./processContext";

export const ProcessProvider: FC<PropsWithChildren> = ({ children }) => {
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

  function handleToggleAspectClick() {
    if (aspect) {
      setAspect(undefined);
    } else if (imgRef.current) {
      const { height, width } = imgRef.current;
      setAspect(2 / 1);
      setCrop(centerAspectCrop(width, height, 2 / 1));
    }
  }
  return (
    <ProcessContext.Provider
      value={{
        imgSrc,
        previewCanvasRef,
        imgRef,
        completedCrop,
        crop,
        scale,
        rotate,
        aspect,
        onSelectFile,
        onImageLoad,
        handleToggleAspectClick,
        setRotate,
        setScale,
        setCompletedCrop,
        setCrop,
      }}
    >
      {children}
    </ProcessContext.Provider>
  );
};
