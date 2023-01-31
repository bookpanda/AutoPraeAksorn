import { createContext, useContext } from "react";

import { ImagesData } from "$core/@types";

interface IAppContext {
  image: ImagesData;
}

export const AppContext = createContext<IAppContext>({
  image: { data: [] },
});

export function useAppContext() {
  return useContext(AppContext);
}
