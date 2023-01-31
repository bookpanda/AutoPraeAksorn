import React, { FC } from "react";

import { Slider } from "@mui/material";

import { useProcessContext } from "$core/contexts/process";

export const Rotate: FC = () => {
  const processContext = useProcessContext();
  const { imgSrc, rotate, setRotate } = processContext;
  const handleChange = (e: Event) => {
    if (e.target) {
      const target = e.target as HTMLInputElement;
      setRotate(Math.min(180, Math.max(-180, Number(target.value))));
    }
  };
  return (
    <div className="w-1/3 bg-pink-100">
      <label htmlFor="rotate-input">Rotate: </label>
      <Slider
        defaultValue={0}
        disabled={!imgSrc}
        id="scale-input"
        max={180}
        min={-180}
        step={1}
        value={rotate}
        valueLabelDisplay="auto"
        onChange={(e) => handleChange(e)}
      />
    </div>
  );
};
