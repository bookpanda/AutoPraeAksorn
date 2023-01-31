import React, { FC } from "react";

import { useProcessContext } from "$core/contexts/process";

export const Scale: FC = () => {
  const processContext = useProcessContext();
  const { imgSrc, scale, setScale } = processContext;
  return (
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
  );
};
