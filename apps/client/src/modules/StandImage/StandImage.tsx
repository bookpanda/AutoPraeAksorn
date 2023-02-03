import React, { FC, useEffect, useRef } from "react";

import Image from "next/image";

import { useAppContext } from "$core/contexts/app";

export const StandImage: FC = () => {
  const appContext = useAppContext();
  const { standImage } = appContext;

  return (
    <>
      <Image alt="image" height={1000} src={standImage} width={1000} />
    </>
  );
};
