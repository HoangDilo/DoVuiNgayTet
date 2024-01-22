import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  const [isFirstLoad, setIsFirstLoad] = useState(false);
  useEffect(() => {
    setTimeout(() => {
        setIsFirstLoad(true)
    }, 2000);
  }, []);
  return (
    <div>
        {isFirstLoad && <span>Background intro coming in</span>}
        <Outlet />
    </div>
  );
}
