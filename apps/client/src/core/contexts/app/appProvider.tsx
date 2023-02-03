import { FC, PropsWithChildren, useEffect, useState } from "react";

import { CurrentImage, ImagesData } from "$core/@types";
import { standPreview } from "$core/api/standPreview";

import { randomLoadingText } from "../process/randomLoadingText";

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
  const [standLoading, setStandLoading] = useState(false);

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

  const standCheer = async (imageURL: string) => {
    const contents = imageURL.split(",")[1];
    const formData = new FormData();
    formData.append("contents", contents);
    setLoadingText(randomLoadingText());
    setStandLoading(true);
    await standPreview(formData).then(() => {
      setStandLoading(false);
      window.open("http://localhost:4200/standcheer");
    });
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
        standLoading,
        setStandLoading,
        standCheer,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
