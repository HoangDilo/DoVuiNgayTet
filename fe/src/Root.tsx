import React, { createContext, useState } from "react";
import { Outlet } from "react-router-dom";

export interface IAppContext {
  storedUsername: string;
  setStoredUsername: React.Dispatch<React.SetStateAction<string>>;
}

export const AppContext = createContext<IAppContext>({
  storedUsername: "",
  setStoredUsername: () => {},
});

export default function Root() {
  const [storedUsername, setStoredUsername] = useState("");

  return (
    <AppContext.Provider value={{ storedUsername, setStoredUsername }}>
      {/* this will be the whole app layout */}
      <Outlet />
    </AppContext.Provider>
  );
}
