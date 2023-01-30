import { createContext, useContext } from "react";

interface IAppContext {
  image: { base64: string; code: number[][] }[];
}

export const AppContext = createContext<IAppContext>({
  image: [],
});

export function useAppContext() {
  return useContext(AppContext);
}
