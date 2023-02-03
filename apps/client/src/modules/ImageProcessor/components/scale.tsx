import React, { FC } from "react";

import { Slider } from "@mui/material";

import { useProcessContext } from "$core/contexts/process";

export const Scale: FC = () => {
  const processContext = useProcessContext();
  const { imgSrc, scale, setScale } = processContext;
  const handleChange = (e: Event) => {
    if (e.target) {
      const target = e.target as HTMLInputElement;
      setScale(Number(target.value));
    }
  };
  return (
    <div className="w-1/3">
      <label className="text-xl font-bold" htmlFor="scale-input">
        Scale:{" "}
      </label>
      <Slider
        defaultValue={1}
        disabled={!imgSrc}
        id="scale-input"
        max={5}
        min={0}
        step={0.05}
        value={scale}
        valueLabelDisplay="auto"
        onChange={(e) => handleChange(e)}
      />
    </div>
  );
};
