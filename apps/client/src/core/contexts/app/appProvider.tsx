import { FC, PropsWithChildren, useEffect, useState } from "react";

import { CurrentImage, ImagesData } from "$core/@types";
import { standPreview } from "$core/api/standPreview";

import { randomLoadingText } from "../process/randomLoadingText";

import { AppContext } from "./appContext";

export const AppProvider: FC<PropsWithChildren> = ({ children }) => {
  const [images, setImages] = useState<ImagesData>({ data: [] });
  const [loading, setLoading] = useState(true);
  const [loadingText, setLoadingText] = useState("");
  const [preview, setPreview] = useState(false);
  const [currentImage, setCurrentImage] = useState<CurrentImage>({
    base64: "",
    index: -1,
    code: [],
  });
  const [deletePopup, setDeletePopup] = useState(false);
  const [standLoading, setStandLoading] = useState(false);
  const [standImage, setStandImage] = useState("");

  useEffect(() => {
    const a = localStorage.getItem("images");
    if (a) {
      const image: ImagesData = JSON.parse(a);
      setImages(image);
    }
  }, [loading]);

  useEffect(() => {
    const a = localStorage.getItem("standImage");
    if (a) {
      setStandImage(JSON.parse(a));
    }
  }, [standLoading]);

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
    });
  };

  const downloadJSON = (index: number) => {
    const code = images.data;
    let codeJSON = "";
    if (index === -1) {
      const onlyCode = [];
      for (let i = 0; i < code.length; i++) {
        onlyCode.push(code[i].code);
      }
      codeJSON = JSON.stringify(onlyCode);
    } else {
      codeJSON = JSON.stringify(code[index].code);
    }
    const dataStr =
      "data:text/json;charset=utf-8," + encodeURIComponent(codeJSON);
    const downloadAnchorNode = document.createElement("a");
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "code.json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
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
        standImage,
        setStandImage,
        downloadJSON,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
