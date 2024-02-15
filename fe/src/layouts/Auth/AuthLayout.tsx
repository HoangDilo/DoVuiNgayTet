import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import styles from "./AuthLayout.module.scss";

export default function AuthLayout() {
  return (
    <div className={styles["auth-layout"]}>
      <div className={styles["left-bg-object"]}></div>
      <div className={styles["right-bg-object"]}></div>
      <div className={styles["main-objects"]}>
        <Outlet />
      </div>
    </div>
  );
}
