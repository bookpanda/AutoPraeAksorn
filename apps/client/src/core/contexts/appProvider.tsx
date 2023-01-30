import { FC, PropsWithChildren, useState } from "react";

import { AppContext } from "./appContext";

export const AppProvider: FC<PropsWithChildren> = ({ children }) => {
  const [image, setImage] = useState([]);
  return (
    <AppContext.Provider value={{ image }}>{children}</AppContext.Provider>
  );
};
