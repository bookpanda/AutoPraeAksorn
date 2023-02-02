import { FC, PropsWithChildren, useEffect, useState } from "react";

import { ImagesData } from "$core/@types";

import { AppContext } from "./appContext";

export const AppProvider: FC<PropsWithChildren> = ({ children }) => {
  const [images, setImages] = useState<ImagesData>({ data: [] });
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const a = localStorage.getItem("images");
    if (a) {
      const image: ImagesData = JSON.parse(a);
      setImages(image);
    }
  }, [loading]);
  return (
    <AppContext.Provider value={{ images, loading, setLoading, setImages }}>
      {children}
    </AppContext.Provider>
  );
};
