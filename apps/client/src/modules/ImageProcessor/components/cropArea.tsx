import React, { FC } from "react";
import ReactCrop from "react-image-crop";

import Image from "next/image";

import { useProcessContext } from "$core/contexts/process";

export const CropArea: FC = () => {
  const processContext = useProcessContext();
  const {
    aspect,
    crop,
    imgRef,
    imgSrc,
    onImageLoad,
    rotate,
    scale,
    setCompletedCrop,
    setCrop,
  } = processContext;
  return (
    <div className="w-full md:w-2/5">
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
  );
};
