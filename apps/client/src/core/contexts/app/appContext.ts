import { createContext, useContext } from "react";

import { ImagesData } from "$core/@types";

interface IAppContext {
  images: ImagesData;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  setImages: (image: ImagesData) => void;
}

export const AppContext = createContext<IAppContext>({
  images: { data: [] },
  loading: false,
  setLoading: () => null,
  setImages: () => null,
});

export function useAppContext() {
  return useContext(AppContext);
}
