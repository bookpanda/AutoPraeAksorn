import { createContext, useContext } from "react";

import { CurrentImage, ImagesData } from "$core/@types";

interface IAppContext {
  images: ImagesData;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  setImages: (image: ImagesData) => void;
  preview: boolean;
  currentImage: CurrentImage;
  setPreview: (open: boolean) => void;
  setCurrentImage: (CurrentImage: CurrentImage) => void;
  loadingText: string;
  setLoadingText: (text: string) => void;
  deleteImage: (index: number) => void;
  deletePopup: boolean;
  setDeletePopup: (deletePopup: boolean) => void;
  standImage: string;
  standLoading: boolean;
  setStandImage: (image: string) => void;
  setStandLoading: (standLoading: boolean) => void;
  standCheer: (imageURL: string) => void;
  downloadJSON: (index: number) => void;
}

export const AppContext = createContext<IAppContext>({
  images: { data: [] },
  loading: false,
  setLoading: () => null,
  setImages: () => null,
  preview: false,
  currentImage: { base64: "", index: -1, code: [] },
  setPreview: () => null,
  setCurrentImage: () => null,
  loadingText: "",
  setLoadingText: () => null,
  deleteImage: () => null,
  deletePopup: false,
  setDeletePopup: () => null,
  standImage: "",
  standLoading: false,
  setStandImage: () => null,
  setStandLoading: () => null,
  standCheer: () => null,
  downloadJSON: () => null,
});

export function useAppContext() {
  return useContext(AppContext);
}
