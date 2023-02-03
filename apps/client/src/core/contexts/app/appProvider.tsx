import { FC, PropsWithChildren, useEffect, useState } from "react";

import { CurrentImage, ImagesData } from "$core/@types";

import { AppContext } from "./appContext";

export const AppProvider: FC<PropsWithChildren> = ({ children }) => {
  const [images, setImages] = useState<ImagesData>({ data: [] });
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const [preview, setPreview] = useState(false);
  const [currentImage, setCurrentImage] = useState<CurrentImage>({
    base64: "",
    index: -1,
    code: [],
  });
  const [deletePopup, setDeletePopup] = useState(false);
  useEffect(() => {
    const a = localStorage.getItem("images");
    if (a) {
      const image: ImagesData = JSON.parse(a);
      setImages(image);
    }
  }, [loading]);
  const deleteImage = (index: number) => {
    const data = images.data;
    data.splice(index, 1);
    setImages({ data });
    localStorage.setItem("images", JSON.stringify(images));
  };
  return (
    <AppContext.Provider
      value={{
        images,
        loading,
        setLoading,
        setImages,
        preview,
        setPreview,
        currentImage,
        setCurrentImage,
        loadingText,
        setLoadingText,
        deleteImage,
        deletePopup,
        setDeletePopup,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
