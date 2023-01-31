import { FC, PropsWithChildren, useEffect, useState } from "react";

import { ImagesData } from "$core/@types";

import { AppContext } from "./appContext";

export const AppProvider: FC<PropsWithChildren> = ({ children }) => {
  const [image, setImage] = useState<ImagesData>({ data: [] });
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const a = localStorage.getItem("images");
    if (a) {
      const image: ImagesData = JSON.parse(a);
      setImage(image);
    }
  }, []);
  return (
    <AppContext.Provider value={{ image, loading, setLoading }}>
      {children}
    </AppContext.Provider>
  );
};
