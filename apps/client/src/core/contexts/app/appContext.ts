import { createContext, useContext } from "react";

import { ImagesData } from "$core/@types";

interface IAppContext {
  image: ImagesData;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

export const AppContext = createContext<IAppContext>({
  image: { data: [] },
  loading: false,
  setLoading: () => null,
});

export function useAppContext() {
  return useContext(AppContext);
}
