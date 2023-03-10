import React, { FC } from "react";

import { useProcessContext } from "$core/contexts/process";

export const CompletedCrop: FC = () => {
  const processContext = useProcessContext();
  const { completedCrop, previewCanvasRef } = processContext;
  return (
    <div className="flex w-full items-center justify-center md:w-2/5">
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
  );
};
