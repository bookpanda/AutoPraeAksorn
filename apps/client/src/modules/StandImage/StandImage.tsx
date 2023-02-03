import React, { FC, useEffect, useRef } from "react";

import Image from "next/image";

export const StandImage: FC = () => {
  const standImage = useRef("");
  useEffect(() => {
    const a = localStorage.getItem("standImage");
    if (a) {
      standImage.current = JSON.parse(a);
    }
  }, []);
  return (
    <>
      <Image alt="image" height={1000} src={standImage.current} width={1000} />
    </>
  );
};
