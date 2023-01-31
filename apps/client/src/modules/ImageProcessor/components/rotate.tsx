import React, { FC } from "react";

import { useProcessContext } from "$core/contexts/process";

export const Rotate: FC = () => {
  const processContext = useProcessContext();
  const { imgSrc, rotate, setRotate } = processContext;
  return (
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
  );
};
