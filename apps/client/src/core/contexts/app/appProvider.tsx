import { FC, PropsWithChildren, useEffect, useState } from "react";

import { ImagesData } from "$core/@types";

import { AppContext } from "./appContext";

export const AppProvider: FC<PropsWithChildren> = ({ children }) => {
  const [images, setImages] = useState<ImagesData>({ data: [] });
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const [preview, setPreview] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  useEffect(() => {
    const a = localStorage.getItem("images");
    if (a) {
      const image: ImagesData = JSON.parse(a);
      setImages(image);
    }
  }, [loading]);
  return (
    <AppContext.Provider
      value={{
        images,
        loading,
        setLoading,
        setImages,
        preview,
        setPreview,
        previewImage,
        setPreviewImage,
        loadingText,
        setLoadingText,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
