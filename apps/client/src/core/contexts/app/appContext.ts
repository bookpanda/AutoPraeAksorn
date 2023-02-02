import { createContext, useContext } from "react";

import { ImagesData } from "$core/@types";

interface IAppContext {
  images: ImagesData;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  setImages: (image: ImagesData) => void;
  preview: boolean;
  previewImage: string;
  setPreview: (open: boolean) => void;
  setPreviewImage: (previewImage: string) => void;
  loadingText: string;
  setLoadingText: (text: string) => void;
}

export const AppContext = createContext<IAppContext>({
  images: { data: [] },
  loading: false,
  setLoading: () => null,
  setImages: () => null,
  preview: false,
  previewImage: "",
  setPreview: () => null,
  setPreviewImage: () => null,
  loadingText: "",
  setLoadingText: () => null,
});

export function useAppContext() {
  return useContext(AppContext);
}
