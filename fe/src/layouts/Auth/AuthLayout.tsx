import React, { createContext, useState } from "react";
import { Outlet } from "react-router-dom";

import styles from "./AuthLayout.module.scss";

export interface IAuthLayoutContext {
  isNavigated: boolean;
  setIsNavigated: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AuthLayoutContext = createContext<IAuthLayoutContext>({
  isNavigated: false,
  setIsNavigated: () => {},
});

export default function AuthLayout() {
  const [isNavigated, setIsNavigated] = useState(false);

  return (
    <div className={styles["auth-layout"]}>
      <div className={`${styles["left-bg-object"]} ${isNavigated && styles['fade-out-left']}`}></div>
      <div className={`${styles["right-bg-object"]} ${isNavigated && styles['fade-out-right']}`}></div>
      <div className={styles["main-objects"]}>
        <AuthLayoutContext.Provider value={{ isNavigated, setIsNavigated }}>
          <Outlet />
        </AuthLayoutContext.Provider>
      </div>
    </div>
  );
}
